require('babel-register')({
});
const dotenv = require('dotenv');

dotenv.config();
global.__CLIENT__ = false;
global.__SERVER__ = true;

const routes = require('./routes');

exports = routes;
