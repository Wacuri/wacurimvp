// api.js -- The main endpoint for communications.
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import fs from 'fs';
import path from 'path';
import express from 'express';
import OpenTok from 'opentok';
import mongoose from 'mongoose';
import JourneySpace from '../models/journey_space';
import JourneyParticipant from '../models/journey_participant';
import JourneyRSVP from '../models/journey_rsvp';
import JourneyContent from '../models/journey_content';
import Feedback from '../models/feedback';
import dotenv from 'dotenv';
require('isomorphic-fetch');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL);

function promisify(fn) {
  /**
   * @param {...Any} params The params to pass into *fn*
   * @return {Promise<Any|Any[]>}
   */
  return function promisified(...params) {
    return new Promise((resolve, reject) => fn(...params.concat([(err, ...args) => err ? reject(err) : resolve( args.length < 2 ? args[0] : args )])))
  }
}

const opentok = new OpenTok(process.env.OPENTOK_KEY, process.env.OPENTOK_SECRET);
const router = express.Router();

function generateToken(sessionId) {
	let tokenOptions = {};
	tokenOptions.role = "publisher";
	// Generate a token.
	const token = opentok.generateToken(sessionId, tokenOptions);
	return token;
}

// TODO: switch to POST, just using GET for easier testing
router.get('/journeys/:room', async (req, res) => {
	const {room} = req.params;
	const journeySpace = await JourneySpace.findOne({room}).exec();
	if (journeySpace) {
    try {
      await journeySpace.joined();
    } catch(e) {
      // journey may already be in joined state, catch error here and ignore
    }

    if (!journeySpace.sessionId) {
      const session = await new Promise((resolve, reject) => {
        opentok.createSession(async (err, session) => {
          if (err) reject(err);
          resolve(session);
        });
      });
      journeySpace.sessionId = session.sessionId;
      await journeySpace.save();
    }
    const participants = await JourneyParticipant.find({journeySpace, present: true}).lean().exec();
    const currentUserParticipant = await JourneyParticipant.findOne({journeySpace, user: req.session.id}).exec();
    if (!currentUserParticipant) {
      const newParticipant = new JourneyParticipant({journeySpace, user: req.session.id, present: true});
      await newParticipant.save();
      participants.push(newParticipant);
      const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
      if (globalSpace) {
        opentok.signal(globalSpace.sessionId, null, { 'type': 'newJoin', 'data': JSON.stringify(newParticipant.toJSON()) }, () => {});
      }
    } else {
      currentUserParticipant.present = true;
      await currentUserParticipant.save();
    }
    const response = journeySpace.toJSON();
    response.participants = participants;
		res.json({
			...response,
			token: generateToken(journeySpace.sessionId),
		});
	} else {
		opentok.createSession(async (err, session) => {
		  if (err) throw err;
			// create new journey space, save tok session id
      const db = mongoose.connection;
      let selectedJourney;
      if (req.query.journey) {
        selectedJourney = await JourneyContent.findOne({name: req.query.journey}).lean().exec();
      }
      if (!selectedJourney) {
        const randomJourney = (await db.collection('journeycontents').aggregate([{$sample: {size: 1}}]).toArray())[0];
        selectedJourney = randomJourney;
      }
      const newJourneySpace = new JourneySpace({
        room, 
        sessionId: session.sessionId,
        journey: selectedJourney.filePath,
        name: req.query.name || selectedJourney.name,
        image: selectedJourney.image,
        owner: req.session.id,
      });
			await newJourneySpace.save();
      const response = newJourneySpace.toJSON();
      response.participants = [];
      response.rsvps = [];
			res.json({
				...response,
				token: generateToken(session.sessionId),
			});
		});
	}
});

router.post('/journeys/:room/joined', async (req, res) => {
	const {room} = req.params;
  const {id: connectionId} = req.body;
  req.session.connections = req.session.connections || {};
  req.session.connections[room] = connectionId;
	const journeySpace = await JourneySpace.findOne({room}).lean().exec();
	if (journeySpace) {
    let participant = await JourneyParticipant.findOne({journeySpace, user: req.session.id}).exec();
    if (participant) {
      participant.connectionId = connectionId;
      participant.present = true;
      await participant.save();
    } else {
      participant = new JourneyParticipant({journeySpace, user: req.session.id, connectionId});
      await participant.save();
    }
    const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
    if (globalSpace) {
      opentok.signal(globalSpace.sessionId, null, { 'type': 'journeyerJoined', 'data': JSON.stringify(participant.toJSON()) }, () => {});
    }
    res.json(participant.toJSON());
  } else {
    res.sendStatus(404);
  }
});

router.get('/journeys/:room/:connectionId', async (req, res) => {
  const {room, connectionId} = req.params;
	const journeySpace = await JourneySpace.findOne({room}).lean().exec();
	if (journeySpace) {
    const participant = await JourneyParticipant.findOne({session: journeySpace, connectionId}).exec();
    res.json(participant);
    return;
  }
  res.sendStatus(500);
});

router.get('/active_journeys', async(req, res) => {
  const journeys = await JourneySpace.aggregate([
    {
      $match: {
        state: {$in: ['created', 'joined']}, startAt: {$gte: new Date()}, room: {$ne: 'temp-home-location'}
      }
    }, 

    {
      $lookup: {
        from: 'journeyparticipants',
        localField: '_id',
        foreignField: 'journeySpace',
        as: 'participants'
      }
    },

    {
      $project: {
        room: 1,
        name: 1,
        journey: 1,
        image: 1,
        startAt: 1,
        participants: {
          $filter: {
            input: "$participants",
            as: "participants",
            cond: { $eq: ['$$participants.present', true] }
          }
        }
      }
    },

    {
      $sort: {startAt: 1}
    }
  ]);

  res.json(journeys);
});

router.post('/journeys/:id/rsvp', async (req, res) => {
  const journey = await JourneySpace.findById(req.params.id).exec();
  try {
    await journey.joined();
  } catch(e) {
    console.log(e);
  }
  const rsvp = new JourneyRSVP({journey, user: req.session.id});
  await rsvp.save();
  const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
  if (globalSpace) {
    opentok.signal(globalSpace.sessionId, null, { 'type': 'newRSVP', 'data': JSON.stringify(rsvp) }, () => {});
  }
  res.json(rsvp);
});

router.post('/journeys/:room/completed', async (req, res) => {
  const journey = await JourneySpace.findOne({room: req.params.room}).exec();
  await journey.complete();
  const response = journey.toJSON();
  const participants = await JourneyParticipant.find({session: journey, present: true}).lean().exec();
  response.participants = participants;
  opentok.signal(journey.sessionId, null, { 'type': 'journeyUpdated', 'data': JSON.stringify(response) }, () => {});
  res.sendStatus(200);
});

router.put('/journeys/:room/progress', async (req, res) => {
  const {currentTime} = req.body;
  const journey = await JourneySpace.findOne({room: req.params.room}).exec();
  journey.currentTime = currentTime;
  await journey.save();
  res.sendStatus(200);
});

router.post('/journeys/:id/feedback', async (req, res) => {
    console.log("FEEBACK", req.body.rating);
    console.log("FEEBACK", req.body.feeling);
    console.log("FEEBACK", req.body.text);
    console.log("FEEBACK", req.body.journey);
    console.log("FEEBACK", req.body.room);    

    
    const newFeedback = new Feedback({rating: req.body.rating,
				      feeling: req.body.feeling,
				      text: req.body.text,
				      journey: req.body.journey,
				      room: req.body.room });
    
    console.log("newFeedback",newFeedback);
    
    await newFeedback.save(function (err, fluffy) {
	if (err) return console.error(err);
    });
});

router.post('/journeys/:id/skip', async (req, res) => {
  const journey = await JourneySpace.findOne({room: req.params.id}).exec();
  await journey.skip();
  const response = journey.toJSON();
  const participants = await JourneyParticipant.find({session: journey, present: true}).lean().exec();
  response.participants = participants;
  opentok.signal(journey.sessionId, null, { 'type': 'journeyUpdated', 'data': JSON.stringify(response) }, () => {});
});

// TEMP: Use get for convenience. hardcode temp-home-location for the room
// Trigger a general announcement to everyone
router.get('/sessions/test/temp-home-location', async (req, res) => {
  // const {room, connection} = req.params;
  const journeySpace = await JourneySpace.findOne({room:'temp-home-location'}).exec();
  if (journeySpace) {
  console.log("**** SENDING SIGNAL")
  let messageData = {
    userName: "Bob",
    description: "some text",
    url: "http://www.news.google.com"
  }

  opentok.signal(journeySpace.sessionId, null, {type: 'displayJourneyRequest', data: JSON.stringify(messageData)}, () => {});
  return res.sendStatus(200);
  }
  res.sendStatus(200);
});

router.get('/journeys/:room/connections/:connection/ready', async (req, res) => {
  const {room, connection} = req.params;
  const journeySpace = await JourneySpace.findOne({room}).exec();
	if (journeySpace) {
    const participant = await JourneyParticipant.findOne({session: journeySpace, connectionId: connection});
    participant.ready = true;
    await participant.save();
    opentok.signal(journeySpace.sessionId, null, {type: 'ready', data: 'foo'}, () => {});
    const allReady = (await JourneyParticipant.count({session: journeySpace, ready: false, present: true})) === 0;
    if (allReady) {
      // signal(journeySpace.sessionId, {type: 'startJourney', data: 'foo'});
    }
    return res.sendStatus(200);
  }
  res.sendStatus(200);
});

router.get('/journeys', async (req, res) => {
  const journeys = await JourneyContent.find().exec();
  res.json(journeys);
});

router.put('/journeys/:room/journey', async (req, res) => {
  const {journey: journeyFile} = req.body;
  const {room} = req.params;
  const journey = await JourneySpace.findOne({room}).exec();
  const journeyContent = await JourneyContent.findOne({filePath: journeyFile}).exec();
	if (journey) {
    journey.journey = journeyContent.filePath;
    journey.image = journeyContent.image;
    journey['name'] = journeyContent.get('name');
    await journey.save();
    await journey.reset();
    const response = journey.toJSON();
    const participants = await JourneyParticipant.find({session: journey, present: true}).lean().exec();
    response.participants = participants;
    opentok.signal(journey.sessionId, null, { 'type': 'journeyUpdated', 'data': JSON.stringify(response) }, () => {});
  }
  res.sendStatus(200);
});

// TODO: this should really verify that the user hitting this endpoint is authorized to do so (e.g. that they are the journey's host)
router.post('/journeys/:room/start', async (req, res) => {
  const {room} = req.params;
  const journeySpace = await JourneySpace.findOne({room}).exec();
	if (journeySpace) {
    try {
      await journeySpace.start();
    } catch(e) {
      console.log('error starting journey', e);
    }
    opentok.signal(journeySpace.sessionId, null, {type: 'startJourney', data: ''}, () => {});
  }
  res.sendStatus(200);
});

router.post('/journeys/:room/pause', async (req, res) => {
  const {room} = req.params;
  const journeySpace = await JourneySpace.findOne({room}).exec();
	if (journeySpace) {
    try {
      await journeySpace.pause();
    } catch(e) {
      console.log('error pausing journey', e);
    }
    opentok.signal(journeySpace.sessionId, null, {type: 'pauseJourney', data: ''}, () => {});
  }
});


router.post('/journeys/:room/flag', async (req, res) => {
  const {room} = req.params;
  const userId = req.sessionID; // using sessionId as representation of user for now
  const journeySpace = await JourneySpace.findOne({room}).exec();
	if (journeySpace) {
    journeySpace.flags.push({user: userId, flagged: req.body.stream});
    await journeySpace.save();
    const participants = await JourneyParticipant.find({session: journeySpace, present: true}).lean().exec();
    return res.json({...journeySpace.toJSON(), participants});
  }
  res.sendStatus(404);
});

router.post('/event', async (req, res) => {
  const {sessionId, connection} = req.body;
  const journeySpace = await JourneySpace.findOne({sessionId}).exec();

  console.log(req.body.event, JSON.stringify(req.body, null, 2));

  switch(req.body.event) {
    case 'connectionCreated':
      break;
    case 'connectionDestroyed':
      if (journeySpace) {
        const participant= await JourneyParticipant.findOne({journeySpace, connectionId: connection.id});
        if (participant) {
          participant.present = false;
          await participant.save();
          const globalSpace = await JourneySpace.findOne({room: 'temp-home-location'}).exec();
          if (globalSpace) {
            opentok.signal(globalSpace.sessionId, null, { 'type': 'journeyerLeftSpace', 'data': JSON.stringify(participant.toJSON()) }, () => {});
          }
        }
      }
      break
  }
  res.sendStatus(200);
});

router.post('/login', (req, res) => {
  req.session.loggedIn = true;
  req.session.user = {
    name: req.body.name
  };
  res.json({loggedIn: true, user: {name: req.body.name}});
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
      res
        .clearCookie('connect.sid')
        .redirect('/login')
    });
});

export default router;

