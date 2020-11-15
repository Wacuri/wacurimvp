import path from 'path';
import express from 'express';
import secure from 'ssl-express-www';
import bodyParser from 'body-parser';
import api from './api';
import ssr from './ssr';

import Agenda from 'agenda';
import Agendash from 'agendash';

import session from 'express-session';
import createMongoStore from 'connect-mongo';
const MongoStore = require('connect-mongo')(session);
import mongoose from 'mongoose';

const app = express();


app.use(secure);

// app.use(express.static(path.join(__dirname, '..', 'public/webfonts')));

app.use('/webfonts', express.static(path.join(__dirname, '../public/webfonts')))
// res.sendfile(path.join(__dirname, '..', 'public/webfonts/fa-sold-900.woff'));
const agenda = new Agenda({db: {address: process.env.MONGODB_URI || process.env.MONGO_URL ,
                                useNewUrlParser: true }});

// WARNING!!! This is what is causing the hang up!
// it is not really clear what we use this for.


app.use(session({
  secret: 'a tuna is a like a bullet',
  saveUninitialized: true, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { secure: true, expires: new Date(253402300000000) }
}));

app.use('/jobs', Agendash(agenda));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/api', api);
app.use("/webfonts", express.static(__dirname +  '/../public/webfonts/'));
app.use('/*', ssr);

// This is a test to see if this shows up in the Heroku log..
console.log("HELLO WORLD");
// This is a test to see if this shows up in the Heroku log..
console.log("assigned port",process.env.PORT);
app.listen(process.env.PORT || 5000, () => {
  console.log('Hello World listening on port 5000!');
});
