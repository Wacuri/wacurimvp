import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import App from '../../client/src/app';
console.log(process.env);

const router = express.Router();

router.get('/', (req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.originalUrl}
      context={context}
    >
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).render(process.env.NODE_ENV === 'production' ? 'index.ejs' : 'index.dev.ejs', {
      html,
      script: JSON.stringify({openTokKey: process.env.OPENTOK_KEY}),
    });
  }
});


export default router;
