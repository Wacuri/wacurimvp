import fs from 'fs';
import path from 'path';
import express from 'express';
import OpenTok from 'opentok';
import mongoose from 'mongoose';
import JourneySpace from '../models/journey_space';
import JourneyParticipant from '../models/journey_participant';
import JourneyRSVP from '../models/journey_rsvp';
import JourneyContent from '../models/journey_content';
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
router.get('/sessions/:room', async (req, res) => {
	const {room} = req.params;
	const existingSession = await JourneySpace.findOne({room}).exec();
	if (existingSession) {
    if (!existingSession.sessionId) {
      const session = await new Promise((resolve, reject) => {
        opentok.createSession(async (err, session) => {
          if (err) reject(err);
          resolve(session);
        });
      });
      existingSession.sessionId = session.sessionId;
      await existingSession.save();
    }
    const participants = await JourneyParticipant.find({session: existingSession, present: true}).lean().exec();
    const rsvps = await JourneyRSVP.find({journey: existingSession}).lean().exec();
    const currentUserHasRSVP = rsvps.findIndex(rsvp => rsvp.user === req.session.id) > -1;
    if (!currentUserHasRSVP) {
      const rsvp = new JourneyRSVP({journey: existingSession, user: req.session.id});
      await rsvp.save();
      rsvps.push(rsvp);
    }
    const response = existingSession.toJSON();
    response.participants = participants;
    response.rsvps = rsvps;
		res.json({
			...response,
			token: generateToken(existingSession.sessionId),
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
      const newSession = new JourneySpace({
        room, 
        sessionId: session.sessionId,
        journey: selectedJourney.filePath,
        name: req.query.name || selectedJourney.name,
        image: selectedJourney.image,
      });
			await newSession.save();
      const response = newSession.toJSON();
      response.participants = [];
      response.rsvps = [];
			res.json({
				...response,
				token: generateToken(session.sessionId),
			});
		});
	}
});

router.post('/sessions/:room/joined', async (req, res) => {
	const {room} = req.params;
  const {id: connectionId} = req.body;
  req.session.connections = req.session.connections || {};
  req.session.connections[room] = connectionId;
	const existingSession = await JourneySpace.findOne({room}).lean().exec();
	if (existingSession) {
      const participantExists = (await JourneyParticipant.count({session: existingSession, connectionId})) > 0;
      if (!participantExists) {
        const participant = new JourneyParticipant({session: existingSession, connectionId: connectionId, user: req.session.user});
        await participant.save();
      }
  }
  res.sendStatus(200);
});

router.get('/sessions/:room/:connectionId', async (req, res) => {
  const {room, connectionId} = req.params;
	const existingSession = await JourneySpace.findOne({room}).lean().exec();
	if (existingSession) {
    const participant = await JourneyParticipant.findOne({session: existingSession, connectionId}).exec();
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
        from: 'journeyrsvps',
        localField: '_id',
        foreignField: 'journey',
        as: 'rsvps'
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
  const existingSession = await JourneySpace.findOne({room:'temp-home-location'}).exec();
  if (existingSession) {
  console.log("**** SENDING SIGNAL")
  let messageData = {
    userName: "Bob",
    description: "some text",
    url: "http://www.news.google.com"
  }

  signal(existingSession.sessionId, {type: 'displayJourneyRequest', data: JSON.stringify(messageData)});
  return res.sendStatus(200);
  }
  res.sendStatus(200);
});

router.get('/sessions/:room/connections/:connection/ready', async (req, res) => {
  const {room, connection} = req.params;
  const existingSession = await JourneySpace.findOne({room}).exec();
	if (existingSession) {
    const participant = await JourneyParticipant.findOne({session: existingSession, connectionId: connection});
    participant.ready = true;
    await participant.save();
    signal(existingSession.sessionId, {type: 'ready', data: 'foo'});
    const allReady = (await JourneyParticipant.count({session: existingSession, ready: false, present: true})) === 0;
    if (allReady) {
      // signal(existingSession.sessionId, {type: 'startJourney', data: 'foo'});
    }
    return res.sendStatus(200);
  }
  res.sendStatus(200);
});

router.get('/journeys', async (req, res) => {
  const journeys = await JourneyContent.find().exec();
  res.json(journeys);
});

router.put('/sessions/:room/journey', async (req, res) => {
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
router.post('/sessions/:room/start', async (req, res) => {
  const {room} = req.params;
  const existingSession = await JourneySpace.findOne({room}).exec();
	if (existingSession) {
    try {
      await existingSession.start();
    } catch(e) {
      console.log('error starting journey', e);
    }
    signal(existingSession.sessionId, {type: 'startJourney', data: ''});
  }
});

router.post('/sessions/:room/pause', async (req, res) => {
  const {room} = req.params;
  const existingSession = await JourneySpace.findOne({room}).exec();
	if (existingSession) {
    try {
      await existingSession.pause();
    } catch(e) {
      console.log('error pausing journey', e);
    }
    signal(existingSession.sessionId, {type: 'pauseJourney', data: ''});
  }
});


router.post('/sessions/:room/flag', async (req, res) => {
  const {room} = req.params;
  const userId = req.sessionID; // using sessionId as representation of user for now
  const existingSession = await JourneySpace.findOne({room}).exec();
	if (existingSession) {
    existingSession.flags.push({user: userId});
    await existingSession.save();
    const participants = await JourneyParticipant.find({session: existingSession, present: true}).lean().exec();
    return res.json({...existingSession.toJSON(), participants});
  }
  res.sendStatus(404);
});

router.post('/event', async (req, res) => {
  const {sessionId, connection} = req.body;
  const session = await JourneySpace.findOne({sessionId}).exec();

  console.log("*******" + req.body)

  switch(req.body.event) {
    case 'connectionCreated':
      if (session) {
        const participantExists = (await JourneyParticipant.count({session, connectionId: connection.id})) > 0;
        if (!participantExists) {
          const participant = new JourneyParticipant({session, connectionId: connection.id});
          await participant.save();
        }
      }
      break;
    case 'connectionDestroyed':
      if (session) {
        const participant= await JourneyParticipant.findOne({session, connectionId: connection.id});
        if (participant) {
          participant.present = false;
          await participant.save();
        }
      }
      break
  }
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

function signal(sessionId, data) {
  fetch(`https://api.opentok.com/v2/project/${process.env.OPENTOK_KEY}/session/${sessionId}/signal`, {
    headers: {
      'X-TB-PARTNER-AUTH': `${process.env.OPENTOK_KEY}:${process.env.OPENTOK_SECRET}`
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data)
  }).then(response => console.log(response));
}

export default router;

