import fs from 'fs';
import path from 'path';
import express from 'express';
import OpenTok from 'opentok';
import mongoose from 'mongoose';
import TokSession from '../models/tok_session';
import TokSessionParticipant from '../models/tok_session_participant';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

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
	const existingSession = await TokSession.findOne({room}).exec();
	if (existingSession) {
		res.json({
			...existingSession.toJSON(),
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

router.get('/sessions/:room/connections/:connection/ready', async (req, res) => {
  const {room, connection} = req.params;
  const existingSession = await TokSession.findOne({room}).exec();
	if (existingSession) {
    const participant = await TokSessionParticipant.findOne({session: existingSession, connectionId: connection});
    participant.ready = true;
    await participant.save();
    return res.sendStatus(200);
  }
  res.sendStsatus(200);
});

router.get('/journeys', async (req, res) => {
  const readdirAsync = promisify(fs.readdir)
  const journeyFiles = (await readdirAsync(path.join(__dirname, '..', 'public/journeys'))).filter(file => {
    return file[0] != '.';
  }).map(file => {
    return `${req.protocol}://${req.headers.host}/journeys/${file}`
  });
  res.json(journeyFiles);
});

router.post('/event', async (req, res) => {
  console.log('GOT EVENT', req.body);
  res.sendStatus(200);
  const {sessionId, connection} = req.body;
  const session = await TokSession.findOne({sessionId}).exec();
  
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

export default router;

