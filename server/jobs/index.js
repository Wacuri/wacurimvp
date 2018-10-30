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
    console.log("CREATE JOURNEY SPACE CALLED");    
  try {
    const total = await db.collection('journeycontents').countDocuments();
      const randomJourney = (await db.collection('journeycontents').find().skip(offset++ % total).limit(1).toArray())[0];
      var seconds_to_add_to_now = 0;
      if (job.attrs.data && job.attrs.data.separation_sec) {
          console.log("DATA",job.attrs.data.separation_sec);
          seconds_to_add_to_now = job.attrs.data.separation_sec;          
      } else {
          console.log("NO DATA");
          seconds_to_add_to_now = 10*60;
      }
      var start_at = moment().add(seconds_to_add_to_now, 'seconds').toDate();
      console.log("START_AT",start_at);
    const journeySpace = new JourneySpace({
      journey: randomJourney.filePath,
      name: randomJourney.name,
      image: randomJourney.image,
      room: `${randomJourney.name.toLowerCase().replace(/[^a-z]/ig, '-')}-${(new Date()).getTime()}`,
        startAt: start_at,
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
  console.log("CLEAR EXPRIED JOURNEYS CALLED");        
  try {
    const expiredJourneys = await JourneySpace.find({state: 'created', startAt: {$lt: moment().subtract(1, 'minutes')}}).exec();
      const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
      console.log("GLOBAL SPACE SESSIONID",globalSpace.sessionId);          
      for (let journey of expiredJourneys) {
          console.log("EXPRIING",journey);
          await journey.expire();
          if (globalSpace) {
              console.log("SENDING SIGNAL",globalSpace.sessionId);
        opentok.signal(globalSpace.sessionId, null, { 'type': 'expiredJourney', 'data': JSON.stringify(journey) }, () => {});
      }
    }
    done();
  } catch(e) {
    console.log(e);
    done(e);
  }
});
// This function exists only for debugging purposes.
agenda.define('clear journeys', async function(job, done) {
    console.log('CLEAR JOURNEY');
  try {
    const expiredJourneys = await JourneySpace.find({state: 'created'}).exec();
    const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
    for (let journey of expiredJourneys) {
        await journey.expire();
        console.log("expired journey",journey);
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

// This function exists only for debugging purposes.
agenda.define('clear failed jobs', async function(job, done) {
    console.log('CLEAR JOURNEY');
  try {
    const expiredJourneys = await JourneySpace.find({state: 'created'}).exec();
    const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
    for (let journey of expiredJourneys) {
        await journey.expire();
        console.log("expired journey",journey);
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

// This fails when the session id is null, filling the database with empty jobs.
// I don't understand what "globalSpace" is here, and why this is happening.
agenda.define('start journey', async function(job, done) {
    try {
        const {journey} = job.attrs.data;
        const journeySpace = await JourneySpace.findById(journey).exec();
        if (journeySpace.sessionId != null) {
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
        }
        done();
    } catch(e) {
        done(e);
    }
});

// This is the filling algorithm. We have to pass data to the jobs.
// Our basic algorithm will be to have queue length QL and
// a queue duration QD. For now, QD = QL * 1 minute.
// QL is for now about 30, about the number of journeys we have.
// In theory these could be dynamically adjusted.

// The Agenda.on function below exists to "load" the JourneyBoard which
// has been a problem. Our basic algorithm is to run evenly
// space the journeys through out QD/QL as per QL.
const QL = 10;
const QD = 10; // this is measured in minutes

agenda.on('ready', function() {
    console.log("ON READY CALLED");
    var separation_sec = (QD * 60) / QL;

    // This is only used for debugging, in situations which may occur
    // when working in this area.
    agenda.schedule('2 seconds', 'clear journeys');
    
    for(var i = 0; i < QL; i++) {
        var data = {separation_sec: (separation_sec * i) };
        agenda.schedule(20+' seconds','create journey space',data);        
    }

    agenda.every('1 minute', 'create journey space');

    agenda.every('1 minute', 'clear expired journeys');

    agenda.start();
});

