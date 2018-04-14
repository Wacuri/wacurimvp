import express from 'express';
import OpenTok from 'opentok';
import mongoose from 'mongoose';
import TokSession from '../models/tok_session';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

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

export default router;

