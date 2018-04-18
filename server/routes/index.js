import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import api from './api';
import ssr from './ssr';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', api);
app.use('/*', ssr);

app.listen(3000, () => {
  console.log('Hello World listening on port 3000!');
});
