const dotenv = require('dotenv');

dotenv.config();
global.__CLIENT__ = false;
global.__SERVER__ = true;

var extendRequire = require("isomorphic-loader/lib/extend-require");

require('./jobs');

extendRequire().then(function () {
    require("./routes");
}).catch(function (err) {
    console.log(err);
});
