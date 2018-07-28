import fs from 'fs';
import path from 'path';
import Agenda from 'Agenda';
import _ from 'lodash';
import OpenTok from 'opentok';
import moment from 'moment';
import mongoose from 'mongoose';
import JourneySpace from '../models/journey_space';
import JourneyParticipant from '../models/journey_participant';
import JourneyRSVP from '../models/journey_rsvp';
import JourneyContent from '../models/journey_content';

const agenda = new Agenda({db: {address: process.env.MONGODB_URI || process.env.MONGO_URL}});
const opentok = new OpenTok(process.env.OPENTOK_KEY, process.env.OPENTOK_SECRET);
const db = mongoose.connection;

var offset = 0;
agenda.define('create journey space', async function(job, done) {
  try {
    const total = await db.collection('journeycontents').count();
    const randomJourney = (await db.collection('journeycontents').find().skip(offset++ % total).limit(1).toArray())[0];
    const journeySpace = new JourneySpace({
      journey: randomJourney.filePath,
      name: randomJourney.name,
      image: randomJourney.image,
      room: `${randomJourney.name.toLowerCase().replace(/[^a-z]/ig, '-')}-${(new Date()).getTime()}`,
      startAt: moment().add(10, 'minutes').toDate()
    });
    await journeySpace.save();
    await agenda.schedule(journeySpace.startAt, 'start journey', {journey: journeySpace._id});
    const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
    if (globalSpace) {
      const response = journeySpace.toJSON();
      response.participants = [];
      opentok.signal(globalSpace.sessionId, null, { 'type': 'createdNewJourney', 'data': JSON.stringify(response) }, done);
    } else {
      done();
    }
  } catch(e) {
    console.log(e);
    done(e);
  }
});

agenda.define('clear expired journeys', async function(job, done) {
  try {
    const expiredJourneys = await JourneySpace.find({state: 'created', startAt: {$lt: moment().subtract(1, 'minutes')}}).exec();
    const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
    for (let journey of expiredJourneys) {
      await journey.expire();
      if (globalSpace) {
        opentok.signal(globalSpace.sessionId, null, { 'type': 'expiredJourney', 'data': JSON.stringify(journey) }, () => {});
      }
    }
    done();
  } catch(e) {
    console.log(e);
    done(e);
  }
});

agenda.define('start journey', async function(job, done) {
  try {
    const {journey} = job.attrs.data;
    const journeySpace = await JourneySpace.findById(journey).exec();
    const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
    const participants = await JourneyParticipant.find({journeySpace: journeySpace._id, present: true}).exec();
    if (participants.length > 1) {
      await journeySpace.start();
      opentok.signal(journeySpace.sessionId, null, { 'type': 'startJourney', 'data': JSON.stringify({journey}) }, () => {});
    } else {
      await journeySpace.fail();
      opentok.signal(journeySpace.sessionId, null, { 'type': 'failJourney', 'data': JSON.stringify({journey}) }, () => {});
      opentok.signal(globalSpace.sessionId, null, { 'type': 'failJourney', 'data': JSON.stringify(journeySpace.toJSON()) }, () => {});
    }
    done();
  } catch(e) {
    done(e);
  }
});


agenda.on('ready', function() {
  agenda.every('1 minute', 'create journey space');
  agenda.every('1 minute', 'clear expired journeys');

  agenda.start();
});

