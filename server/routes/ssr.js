import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import App from '../../client/src/app';
import state from '../../client/src/state';

const router = express.Router();

router.get('/', (req, res) => {
  const context = {};

  state.loggedIn = req.session.loggedIn;
  state.user = req.session.user;
  console.log('GOT SESSION', req.session, req.originalUrl);

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.originalUrl}
      context={context}
    >
      <App />
    </StaticRouter>
  );

  console.log('GOT HTML', html, context.url);
  if (context.url) {
    console.log('REDIRECT');
    if (req.originalUrl != '/favicon.ico') {
      res.writeHead(301, {
        Location: context.url,
      });
    }
    res.end();
  } else {
    res.status(200).render(process.env.NODE_ENV === 'production' ? 'index.ejs' : 'index.dev.ejs', {
      html,
      script: JSON.stringify({openTokKey: process.env.OPENTOK_KEY, loggedIn: req.session.loggedIn, user: req.session.user, sessionId: req.sessionID}),
    });
  }
});


export default router;
