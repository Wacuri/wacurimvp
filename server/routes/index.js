import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import ssr from './ssr';

import Agenda from 'agenda';
import Agendash from 'agendash';

import session from 'express-session';
import createMongoStore from 'connect-mongo';


const app = express();
const agenda = new Agenda({db: {address: process.env.MONGODB_URI || process.env.MONGO_URL}});

app.use(session({
    secret: 'qVaNxeu5VVEAtkyFJ/62EKcp7Lw=',
    saveUninitialized: false, // don't create session until something stored
	  resave: false, //don't save session if unmodified
    store: new (createMongoStore(session))({url: process.env.MONGODB_URI || process.env.MONGO_URL}),
    cookie: {expires: new Date(253402300000000)}
}));

app.use('/jobs', Agendash(agenda));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', api);
app.use('/*', ssr);

app.listen(process.env.PORT || 5000, () => {
  console.log('Hello World listening on port 5000!');
});
