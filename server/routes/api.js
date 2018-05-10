import fs from 'fs';
import path from 'path';
import express from 'express';
import OpenTok from 'opentok';
import mongoose from 'mongoose';
import TokSession from '../models/tok_session';
import TokSessionParticipant from '../models/tok_session_participant';
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
  console.log('return token', token);
	return token;
}

// TODO: switch to POST, just using GET for easier testing
router.get('/sessions/:room', async (req, res) => {
	const {room} = req.params;
	const existingSession = await TokSession.findOne({room}).lean().exec();
	if (existingSession) {
    const participants = await TokSessionParticipant.find({session: existingSession, present: true}).lean().exec();
    existingSession.participants = participants;
		res.json({
			...existingSession,
			token: generateToken(existingSession.sessionId),
		});
	} else {
		opentok.createSession(async (err, session) => {
		  if (err) throw err;
			// save the sessionId
			const newSession = new TokSession({room, sessionId: session.sessionId});
			await newSession.save();
			res.json({
				...newSession.toJSON(),
				token: generateToken(session.sessionId),
			});
		});
	}
});

// TEMP: Use get for convenience.[] hardcode temp-home-location for the room
// Trigger a general announcement to everyone
router.get('/sessions/test/temp-home-location', async (req, res) => {
  // const {room, connection} = req.params;
  const existingSession = await TokSession.findOne({room:'temp-home-location'}).exec();
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
  const existingSession = await TokSession.findOne({room}).exec();
	if (existingSession) {
    const participant = await TokSessionParticipant.findOne({session: existingSession, connectionId: connection});
    participant.ready = true;
    await participant.save();
    signal(existingSession.sessionId, {type: 'ready', data: 'foo'});
    const allReady = (await TokSessionParticipant.count({session: existingSession, ready: false, present: true})) === 0;
    if (allReady) {
      // signal(existingSession.sessionId, {type: 'startJourney', data: 'foo'});
    }
    return res.sendStatus(200);
  }
  res.sendStatus(200);
});

router.get('/journeys', async (req, res) => {
  const readdirAsync = promisify(fs.readdir)
  const journeyFiles = (await readdirAsync(path.join(__dirname, '..', 'public/journeys'))).filter(file => {
    return path.extname(file) === '.mp3';
  }).map(file => {
    return `/journeys/${file}`
  });
  res.json(journeyFiles);
});

router.put('/sessions/:room/journey', async (req, res) => {
  console.log('UPDATE JOURNEY');
  const {journey} = req.body;
  const {room} = req.params;
  const existingSession = await TokSession.findOne({room}).exec();
	if (existingSession) {
    existingSession.journey = journey;
    await existingSession.save();
    signal(existingSession.sessionId, {type: 'updatedJourney', data: journey});
  }
  res.sendStatus(200);
});

// TODO: this should really verify that the user hitting this endpoint is authorized to do so (e.g. that they are the journey's host)
router.post('/sessions/:room/start', async (req, res) => {
  const {room} = req.params;
  const existingSession = await TokSession.findOne({room}).exec();
	if (existingSession) {
    await existingSession.start();
    signal(existingSession.sessionId, {type: 'startJourney', data: ''});
  }
});

router.post('/event', async (req, res) => {
  console.log('GOT EVENT', req.body);
  res.sendStatus(200);
  const {sessionId, connection} = req.body;
  const session = await TokSession.findOne({sessionId}).exec();

  console.log("*******" + req.body)

  switch(req.body.event) {
    case 'connectionCreated':
      if (session) {
        const participantExists = (await TokSessionParticipant.count({session, connectionId: connection.id})) > 0;
        if (!participantExists) {
          const participant = new TokSessionParticipant({session, connectionId: connection.id});
          await participant.save();
        }
      }
      break;
    case 'connectionDestroyed':
      if (session) {
        const participant= await TokSessionParticipant.findOne({session, connectionId: connection.id});
        if (participant) {
          participant.present = false;
          await participant.save();
        }
      }
      break
  }
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

