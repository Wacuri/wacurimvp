/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactEasyState = __webpack_require__(5);

var state = (0, _reactEasyState.store)(_extends({
  session: null,
  sessionId: null,
  journeys: [],
  joinableJourneys: [],
  loggedIn: false,
  user: null,
  location: '/'
}, global.__INITIAL_STATE__ || {}));

exports.default = state;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const createJob = __webpack_require__(17);
const processJobs = __webpack_require__(64);

module.exports = {
  createJob,
  processJobs
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-easy-state");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("human-interval");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("opentok-react");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@opentok/client");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Internal method to turn priority into a number
 * @param {String|Number} priority string to parse into number
 * @returns {Number} priority that was parsed
 */
const parsePriority = priority => {
  const priorityMap = {
    lowest: -20,
    low: -10,
    normal: 0,
    high: 10,
    highest: 20
  };
  if (typeof priority === 'number' || priority instanceof Number) {
    return priority;
  }
  return priorityMap[priority];
};

class Job {
  constructor(args) {
    args = args || {};

    // Remove special args
    this.agenda = args.agenda;
    delete args.agenda;

    // Process args
    args.priority = parsePriority(args.priority) || 0;

    // Set attrs to args
    const attrs = {};
    for (const key in args) {
      if ({}.hasOwnProperty.call(args, key)) {
        attrs[key] = args[key];
      }
    }

    // Set defaults if undefined
    // NOTE: What is the difference between 'once' here and 'single' in agenda/index.js?
    attrs.nextRunAt = attrs.nextRunAt || new Date();
    attrs.type = attrs.type || 'once';
    this.attrs = attrs;
  }
}

Job.prototype.toJSON = __webpack_require__(46);
Job.prototype.computeNextRunAt = __webpack_require__(47);
Job.prototype.repeatEvery = __webpack_require__(50);
Job.prototype.repeatAt = __webpack_require__(51);
Job.prototype.disable = __webpack_require__(52);
Job.prototype.enable = __webpack_require__(53);
Job.prototype.unique = __webpack_require__(54);
Job.prototype.schedule = __webpack_require__(55);
Job.prototype.priority = __webpack_require__(56);
Job.prototype.fail = __webpack_require__(57);
Job.prototype.run = __webpack_require__(58);
Job.prototype.isRunning = __webpack_require__(59);
Job.prototype.save = __webpack_require__(60);
Job.prototype.remove = __webpack_require__(61);
Job.prototype.touch = __webpack_require__(62);

module.exports = Job;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("date.js");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Job = __webpack_require__(15);

/**
 * Create Job object from data
 * @param {Object} agenda instance of Agenda
 * @param {Object} jobData job data
 * @returns {module.Job} returns created job
 */
module.exports = (agenda, jobData) => {
  jobData.agenda = agenda;
  return new Job(jobData);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("opentok");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _anotherMongooseStatemachine = __webpack_require__(76);

var _anotherMongooseStatemachine2 = _interopRequireDefault(_anotherMongooseStatemachine);

var _moment = __webpack_require__(8);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlagSchema = new _mongoose.Schema({
  user: { type: String },
  reason: { type: String }
});

var JourneySpaceSchema = new _mongoose.Schema({
  room: { type: String, index: true },
  name: { type: String, index: true },
  image: { type: String },
  currentTime: { type: Number },
  sessionId: { type: String, index: true },
  journey: { type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3' },
  startAt: { type: Date, default: function _default() {
      return (0, _moment2.default)().add(10, 'minutes').toDate();
    } },
  flags: { type: [FlagSchema], default: [] }
}, {
  timestamps: true
});

JourneySpaceSchema.plugin(_anotherMongooseStatemachine2.default, {
  states: {
    created: { default: true },
    joined: {},
    started: {},
    completed: {},
    ended: {},
    expired: {},
    failed: {}
  },
  transitions: {
    joined: { from: 'created', to: 'joined' },
    start: { from: ['joined', 'created', 'failed'], to: 'started' },
    fail: { from: '*', to: 'failed' },
    complete: { from: ['started', 'created'], to: 'completed' },
    end: { from: '*', to: 'ended' },
    expire: { from: '*', to: 'expired' }
  }
});

var JourneySpace = _mongoose2.default.model('JourneySpace', JourneySpaceSchema);

exports.default = JourneySpace;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyRSVPSchema = new _mongoose.Schema({
  journey: { type: _mongoose.Schema.Types.ObjectId, ref: 'JourneySpace' },
  user: { type: String }
});

var JourneyRSVP = _mongoose2.default.model('JourneyRSVP', JourneyRSVPSchema);

exports.default = JourneyRSVP;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyContentSchema = new _mongoose.Schema({
  filePath: { type: String },
  image: { type: String }
}, {
  timestamps: true
});

var JourneyContent = _mongoose2.default.model('JourneyContent', JourneyContentSchema);

exports.default = JourneyContent;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
module.exports = __webpack_require__(28);


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill/lib/index");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dotenv = __webpack_require__(12);

dotenv.config();
global.__CLIENT__ = false;
global.__SERVER__ = true;

var extendRequire = __webpack_require__(29);

__webpack_require__(30);

extendRequire().then(function () {
    __webpack_require__(77);
}).catch(function (err) {
    console.log(err);
});

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-loader/lib/extend-require");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fs = __webpack_require__(13);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _Agenda = __webpack_require__(31);

var _Agenda2 = _interopRequireDefault(_Agenda);

var _lodash = __webpack_require__(75);

var _lodash2 = _interopRequireDefault(_lodash);

var _opentok = __webpack_require__(18);

var _opentok2 = _interopRequireDefault(_opentok);

var _moment = __webpack_require__(8);

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _journey_space = __webpack_require__(19);

var _journey_space2 = _interopRequireDefault(_journey_space);

var _journey_rsvp = __webpack_require__(20);

var _journey_rsvp2 = _interopRequireDefault(_journey_rsvp);

var _journey_content = __webpack_require__(21);

var _journey_content2 = _interopRequireDefault(_journey_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var agenda = new _Agenda2.default({ db: { address: process.env.MONGODB_URI || process.env.MONGO_URL } });
var opentok = new _opentok2.default(process.env.OPENTOK_KEY, process.env.OPENTOK_SECRET);
var db = _mongoose2.default.connection;

agenda.define('create journey space', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(job, done) {
    var randomJourney, journeySpace, globalSpace, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.collection('journeycontents').aggregate([{ $sample: { size: 1 } }]).toArray();

          case 3:
            randomJourney = _context.sent[0];
            journeySpace = new _journey_space2.default({
              journey: randomJourney.filePath,
              name: randomJourney.name,
              image: randomJourney.image,
              room: randomJourney.name.toLowerCase().replace(/[^a-z]/ig, '-') + '-' + new Date().getTime(),
              startAt: (0, _moment2.default)().add(10, 'minutes').toDate()
            });
            _context.next = 7;
            return journeySpace.save();

          case 7:
            _context.next = 9;
            return agenda.schedule(journeySpace.startAt, 'start journey', { journey: journeySpace._id });

          case 9:
            _context.next = 11;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 11:
            globalSpace = _context.sent;

            if (globalSpace) {
              response = journeySpace.toJSON();

              response.rsvps = [];
              opentok.signal(globalSpace.sessionId, null, { 'type': 'createdNewJourney', 'data': JSON.stringify(response) }, done);
            } else {
              done();
            }
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            done(_context.t0);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

agenda.define('clear expired journeys', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(job, done) {
    var expiredJourneys, globalSpace, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, journey;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _journey_space2.default.find({ state: 'created', startAt: { $lt: (0, _moment2.default)().subtract(1, 'minutes') } }).exec();

          case 3:
            expiredJourneys = _context2.sent;
            _context2.next = 6;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 6:
            globalSpace = _context2.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 10;
            _iterator = expiredJourneys[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 20;
              break;
            }

            journey = _step.value;
            _context2.next = 16;
            return journey.expire();

          case 16:
            if (globalSpace) {
              opentok.signal(globalSpace.sessionId, null, { 'type': 'expiredJourney', 'data': JSON.stringify(journey) }, function () {});
            }

          case 17:
            _iteratorNormalCompletion = true;
            _context2.next = 12;
            break;

          case 20:
            _context2.next = 26;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](10);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 26:
            _context2.prev = 26;
            _context2.prev = 27;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 29:
            _context2.prev = 29;

            if (!_didIteratorError) {
              _context2.next = 32;
              break;
            }

            throw _iteratorError;

          case 32:
            return _context2.finish(29);

          case 33:
            return _context2.finish(26);

          case 34:
            done();
            _context2.next = 41;
            break;

          case 37:
            _context2.prev = 37;
            _context2.t1 = _context2['catch'](0);

            console.log(_context2.t1);
            done(_context2.t1);

          case 41:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 37], [10, 22, 26, 34], [27,, 29, 33]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

agenda.define('start journey', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(job, done) {
    var journey, journeySpace, rsvps;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            journey = job.attrs.data.journey;
            _context3.next = 4;
            return _journey_space2.default.findById(journey).exec();

          case 4:
            journeySpace = _context3.sent;
            _context3.next = 7;
            return _journey_rsvp2.default.find({ journey: journeySpace._id }).exec();

          case 7:
            rsvps = _context3.sent;

            if (!(rsvps.length > 1)) {
              _context3.next = 14;
              break;
            }

            _context3.next = 11;
            return journeySpace.start();

          case 11:
            opentok.signal(journeySpace.sessionId, null, { 'type': 'startJourney', 'data': JSON.stringify({ journey: journey }) }, function () {});
            _context3.next = 17;
            break;

          case 14:
            _context3.next = 16;
            return journeySpace.fail();

          case 16:
            opentok.signal(journeySpace.sessionId, null, { 'type': 'failJourney', 'data': JSON.stringify({ journey: journey }) }, function () {});

          case 17:
            done();
            _context3.next = 23;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3['catch'](0);

            done(_context3.t0);

          case 23:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 20]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

agenda.on('ready', function () {
  agenda.every('1 minute', 'create journey space');
  agenda.every('1 minute', 'clear expired journeys');

  agenda.start();
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const Agenda = __webpack_require__(32);

module.exports = Agenda;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * General Notes:
 * - Refactor remaining deprecated MongoDB Native Driver methods: findAndModify()
 */

const Emitter = __webpack_require__(14).EventEmitter;
const humanInterval = __webpack_require__(7);

class Agenda extends Emitter {
  constructor(config, cb) {
    super();

    if (!(this instanceof Agenda)) {
      return new Agenda(config);
    }

    config = config || {};

    this._name = config.name;
    this._processEvery = humanInterval(config.processEvery) || humanInterval('5 seconds');
    this._defaultConcurrency = config.defaultConcurrency || 5;
    this._maxConcurrency = config.maxConcurrency || 20;
    this._defaultLockLimit = config.defaultLockLimit || 0;
    this._lockLimit = config.lockLimit || 0;
    this._definitions = {};
    this._runningJobs = [];
    this._lockedJobs = [];
    this._jobQueue = [];
    this._defaultLockLifetime = config.defaultLockLifetime || 10 * 60 * 1000; // 10 minute default lockLifetime
    this._sort = config.sort || {nextRunAt: 1, priority: -1};
    this._indices = Object.assign({name: 1}, this._sort, {priority: -1, lockedAt: 1, nextRunAt: 1, disabled: 1});

    this._isLockingOnTheFly = false;
    this._jobsToLock = [];
    if (config.mongo) {
      this.mongo(config.mongo, config.db ? config.db.collection : undefined, cb);
    } else if (config.db) {
      this.database(config.db.address, config.db.collection, config.db.options, cb);
    }
  }
}

Agenda.prototype.mongo = __webpack_require__(33);
Agenda.prototype.database = __webpack_require__(34);
Agenda.prototype.db_init = __webpack_require__(36); // eslint-disable-line camelcase
Agenda.prototype.name = __webpack_require__(37);
Agenda.prototype.processEvery = __webpack_require__(38);
Agenda.prototype.maxConcurrency = __webpack_require__(39);
Agenda.prototype.defaultConcurrency = __webpack_require__(40);
Agenda.prototype.lockLimit = __webpack_require__(41);
Agenda.prototype.defaultLockLimit = __webpack_require__(42);
Agenda.prototype.defaultLockLifetime = __webpack_require__(43);
Agenda.prototype.sort = __webpack_require__(44);
Agenda.prototype.create = __webpack_require__(45);
Agenda.prototype.jobs = __webpack_require__(63);
Agenda.prototype.purge = __webpack_require__(65);
Agenda.prototype.define = __webpack_require__(66);
Agenda.prototype.every = __webpack_require__(67);
Agenda.prototype.schedule = __webpack_require__(68);
Agenda.prototype.now = __webpack_require__(69);
Agenda.prototype.cancel = __webpack_require__(70);
Agenda.prototype.saveJob = __webpack_require__(71);
Agenda.prototype.start = __webpack_require__(72);
Agenda.prototype.stop = __webpack_require__(73);
Agenda.prototype._findAndLockNextJob = __webpack_require__(74);

module.exports = Agenda;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Build method used to add MongoDB connection details
 * @param {MongoClient} mdb instance of MongoClient to use
 * @param {String} collection name collection we want to use ('agendaJobs')
 * @param {Function} cb called when MongoDB connection fails or passes
 * @returns {exports} instance of Agenda
 */
module.exports = function(mdb, collection, cb) {
  this._mdb = mdb;
  this.db_init(collection, cb);
  return this;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const MongoClient = __webpack_require__(35).MongoClient;
const debug = __webpack_require__(0)('agenda:database');

/**
 * Connect to the spec'd MongoDB server and database.
 * @param {String} url MongoDB server URI
 * @param {String} collection name of collection to use
 * @param {Object} options options for connecting
 * @param {Function} cb callback of MongoDB connection
 * @returns {exports}
 * NOTE:
 * If `url` includes auth details then `options` must specify: { 'uri_decode_auth': true }. This does Auth on
 * the specified database, not the Admin database. If you are using Auth on the Admin DB and not on the Agenda DB,
 * then you need to authenticate against the Admin DB and then pass the MongoDB instance into the constructor
 * or use Agenda.mongo(). If your app already has a MongoDB connection then use that. ie. specify config.mongo in
 * the constructor or use Agenda.mongo().
 */
module.exports = function(url, collection, options, cb) {
  const self = this;
  if (!url.match(/^mongodb:\/\/.*/)) {
    url = 'mongodb://' + url;
  }

  collection = collection || 'agendaJobs';
  options = Object.assign({autoReconnect: true, reconnectTries: Number.MAX_SAFE_INTEGER, reconnectInterval: this._processEvery}, options);
  MongoClient.connect(url, options, (error, db) => {
    if (error) {
      debug('error connecting to MongoDB using collection: [%s]', collection);
      if (cb) {
        cb(error, null);
      } else {
        throw error;
      }
      return;
    }
    debug('successful connection to MongoDB using collection: [%s]', collection);
    self._mdb = db;
    self.db_init(collection, cb);
  });
  return this;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:db_init');

/**
 * Internal method called in the case where new indices have an error during creation
 * @param {Error} err error returned from index creation from before
 * @param {*} result result passed in from earlier attempt of creating index
 * @param {Agenda} self instance of Agenda
 * @param {Function} cb called when indices fail or pass
 * @returns {undefined}
 */
const handleLegacyCreateIndex = (err, result, self, cb) => {
  if (err && err.message !== 'no such cmd: createIndex') {
    debug('not attempting legacy index, emitting error');
    self.emit('error', err);
  } else {
    // Looks like a mongo.version < 2.4.x
    err = null;
    self._collection.ensureIndex(self._indices, {
      name: 'findAndLockNextJobIndex'
    });
    self.emit('ready');
  }
  if (cb) {
    cb(err, self._collection);
  }
};

/**
 * Setup and initialize the collection used to manage Jobs.
 * @param {String} collection name or undefined for default 'agendaJobs'
 * @param {Function} cb called when the db is initialized
 * @returns {undefined}
 */
module.exports = function(collection, cb) {
  const self = this;
  debug('init database collection using name [%s]', collection);
  this._collection = this._mdb.collection(collection || 'agendaJobs');
  debug('attempting index creation');
  this._collection.createIndex(this._indices, {
    name: 'findAndLockNextJobIndex'
  }, (err, result) => {
    if (err) {
      debug('index creation failed, attempting legacy index creation next');
    } else {
      debug('index creation success');
    }
    handleLegacyCreateIndex(err, result, self, cb);
  });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:name');

/**
 * Set name of queue
 * @param {String} name name of agenda instance
 * @returns {exports} agenda instance
 */
module.exports = function(name) {
  debug('Agenda.name(%s)', name);
  this._name = name;
  return this;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const humanInterval = __webpack_require__(7);
const debug = __webpack_require__(0)('agenda:processEvery');

/**
 * Set the default process interval
 * @param {Number} time time to process
 * @returns {exports} agenda instance
 */
module.exports = function(time) {
  debug('Agenda.processEvery(%d)', time);
  this._processEvery = humanInterval(time);
  return this;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:maxConcurrency');

/**
 * Set the concurrency for jobs (globally), type does not matter
 * @param {Number} num max concurrency value
 * @returns {exports} agenda instance
 */
module.exports = function(num) {
  debug('Agenda.maxConcurrency(%d)', num);
  this._maxConcurrency = num;
  return this;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:defaultConcurrency');

/**
 * Set the default concurrency for each job
 * @param {Number} num default concurrency
 * @returns {exports} agenda instance
 */
module.exports = function(num) {
  debug('Agenda.defaultConcurrency(%d)', num);
  this._defaultConcurrency = num;
  return this;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:locklimit');

/**
 * Set the default amount jobs that are allowed to be locked at one time (GLOBAL)
 * NOTE: Is this different than max concurrency?
 * @param {Number} num Lock limit
 * @returns {exports} agenda instance
 */
module.exports = function(num) {
  debug('Agenda.lockLimit(%d)', num);
  this._lockLimit = num;
  return this;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:defaultLockLimit');

/**
 * Set default lock limit per job type
 * @param {Number} num Lock limit per job
 * @returns {exports} agenda instance
 */
module.exports = function(num) {
  debug('Agenda.defaultLockLimit(%d)', num);
  this._defaultLockLimit = num;
  return this;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:defaultLockLifetime');

/**
 * Set the default lock time (in ms)
 * Default is 10 * 60 * 1000 ms (10 minutes)
 * @param {Number} ms time in ms to set default lock
 * @returns {exports} agenda instance
 */
module.exports = function(ms) {
  debug('Agenda.defaultLockLifetime(%d)', ms);
  this._defaultLockLifetime = ms;
  return this;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:sort');

/**
 * Set the sort query for finding next job
 * Default is { nextRunAt: 1, priority: -1 }
 * @param {Object} query sort query object for MongoDB
 * @returns {exports} agenda instance
 */
module.exports = function(query) {
  debug('Agenda.sort([Object])');
  this._sort = query;
  return this;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:create');
const Job = __webpack_require__(15);

/**
 * Given a name and some data, create a new job
 * @param {String} name name of job
 * @param {Object} data data to set for job
 * @access protected
 * @returns {module.Job} instance of new job
 */
module.exports = function(name, data) {
  debug('Agenda.create(%s, [Object])', name);
  const priority = this._definitions[name] ? this._definitions[name].priority : 0;
  const job = new Job({name, data, type: 'normal', priority, agenda: this});
  return job;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Given a job, turn it into an object we can store in Mongo
 * @returns {Object} json object from Job
 */
module.exports = function() {
  const self = this;
  const attrs = self.attrs || {};
  const result = {};

  for (const prop in attrs) {
    if ({}.hasOwnProperty.call(attrs, prop)) {
      result[prop] = attrs[prop];
    }
  }

  const dates = ['lastRunAt', 'lastFinishedAt', 'nextRunAt', 'failedAt', 'lockedAt'];
  dates.forEach(d => {
    if (result[d]) {
      result[d] = new Date(result[d]);
    }
  });

  return result;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const humanInterval = __webpack_require__(7);
const CronTime = __webpack_require__(48).CronTime;
const moment = __webpack_require__(49);
const date = __webpack_require__(16);
const debug = __webpack_require__(0)('agenda:job');

/**
 * Internal method used to compute next time a job should run and sets the proper values
 * @returns {exports} instance of Job instance
 */
module.exports = function() {
  const interval = this.attrs.repeatInterval;
  const timezone = this.attrs.repeatTimezone;
  const repeatAt = this.attrs.repeatAt;
  this.attrs.nextRunAt = undefined;

  const dateForTimezone = date => {
    date = moment(date);
    if (timezone !== null) {
      date.tz(timezone);
    }
    return date;
  };

  /**
   * Internal method that computes the interval
   * @returns {undefined}
   */
  const computeFromInterval = () => {
    debug('[%s:%s] computing next run via interval [%s]', this.attrs.name, this.attrs._id, interval);
    let lastRun = this.attrs.lastRunAt || new Date();
    lastRun = dateForTimezone(lastRun);
    try {
      const cronTime = new CronTime(interval);
      let nextDate = cronTime._getNextDateFrom(lastRun);
      if (nextDate.valueOf() === lastRun.valueOf()) {
        // Handle cronTime giving back the same date for the next run time
        nextDate = cronTime._getNextDateFrom(dateForTimezone(new Date(lastRun.valueOf() + 1000)));
      }
      this.attrs.nextRunAt = nextDate;
      debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt.toISOString());
    } catch (e) {
      // Nope, humanInterval then!
      try {
        if (!this.attrs.lastRunAt && humanInterval(interval)) {
          this.attrs.nextRunAt = lastRun.valueOf();
          debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt.toISOString());
        } else {
          this.attrs.nextRunAt = lastRun.valueOf() + humanInterval(interval);
          debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt.toISOString());
        }
      } catch (e) {}
    } finally {
      if (isNaN(this.attrs.nextRunAt)) {
        this.attrs.nextRunAt = undefined;
        debug('[%s:%s] failed to calculate nextRunAt due to invalid repeat interval', this.attrs.name, this.attrs._id);
        this.fail('failed to calculate nextRunAt due to invalid repeat interval');
      }
    }
  };

  /**
   * Internal method to compute next run time from the repeat string
   * @returns {undefined}
   */
  function computeFromRepeatAt() {
    const lastRun = this.attrs.lastRunAt || new Date();
    const nextDate = date(repeatAt).valueOf();

    // If you do not specify offset date for below test it will fail for ms
    const offset = Date.now();
    if (offset === date(repeatAt, offset).valueOf()) {
      this.attrs.nextRunAt = undefined;
      debug('[%s:%s] failed to calculate repeatAt due to invalid format', this.attrs.name, this.attrs._id);
      this.fail('failed to calculate repeatAt time due to invalid format');
    } else if (nextDate.valueOf() === lastRun.valueOf()) {
      this.attrs.nextRunAt = date('tomorrow at ', repeatAt);
      debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt.toISOString());
    } else {
      this.attrs.nextRunAt = date(repeatAt);
      debug('[%s:%s] nextRunAt set to [%s]', this.attrs.name, this.attrs._id, this.attrs.nextRunAt.toISOString());
    }
  }

  if (interval) {
    computeFromInterval.call(this);
  } else if (repeatAt) {
    computeFromRepeatAt.call(this);
  }
  return this;
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("cron");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Sets a job to repeat every X amount of time
 * @param {String} interval repeat every X
 * @param {Object} options options to use for job
 * @returns {exports} instance of Job
 */
module.exports = function(interval, options) {
  options = options || {};
  this.attrs.repeatInterval = interval;
  this.attrs.repeatTimezone = options.timezone ? options.timezone : null;
  return this;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Sets a job to repeat at a specific time
 * @param {String} time time to repeat job at (human readable or number)
 * @returns {exports} instance of Job
 */
module.exports = function(time) {
  this.attrs.repeatAt = time;
  return this;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Prevents the job type from running
 * @returns {exports} instance of Job
 */
module.exports = function() {
  this.attrs.disabled = true;
  return this;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Allows job type to run
 * @returns {exports} instance of Job
 */
module.exports = function() {
  this.attrs.disabled = false;
  return this;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Data to ensure is unique for job to be created
 * @param {Object} unique mongo data query for unique
 * @param {Object} opts unique options
 * @returns {exports} instance of Job
 */
module.exports = function(unique, opts) {
  this.attrs.unique = unique;
  this.attrs.uniqueOpts = opts;
  return this;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const date = __webpack_require__(16);

/**
 * Schedules a job to run at specified time
 * @param {String} time schedule a job to run "then"
 * @returns {exports} instance of Job
 */
module.exports = function(time) {
  this.attrs.nextRunAt = (time instanceof Date) ? time : date(time);
  return this;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Internal method to turn priority into a number
 * @param {String|Number} priority string to parse into number
 * @returns {Number} priority that was parsed
 */
const parsePriority = priority => {
  const priorityMap = {
    lowest: -20,
    low: -10,
    normal: 0,
    high: 10,
    highest: 20
  };
  if (typeof priority === 'number' || priority instanceof Number) {
    return priority;
  }
  return priorityMap[priority];
};

/**
 * Sets priority of the job
 * @param {String} priority priority of when job should be queued
 * @returns {exports} instance of Job
 */
module.exports = function(priority) {
  this.attrs.priority = parsePriority(priority);
  return this;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:job');

/**
 * Fails the job with a reason (error) specified
 * @param {Error|String} reason reason job failed
 * @returns {exports} instance of Job
 */
module.exports = function(reason) {
  if (reason instanceof Error) {
    reason = reason.message;
  }
  this.attrs.failReason = reason;
  this.attrs.failCount = (this.attrs.failCount || 0) + 1;
  const now = new Date();
  this.attrs.failedAt = now;
  this.attrs.lastFinishedAt = now;
  debug('[%s:%s] fail() called [%d] times so far', this.attrs.name, this.attrs._id, this.attrs.failCount);
  return this;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:job');

/**
 * Internal method (RUN)
 * @param {Function} cb called when job persistence in MongoDB fails or passes
 * @returns {undefined}
 */
module.exports = function(cb) {
  const self = this;
  const agenda = self.agenda;
  const definition = agenda._definitions[self.attrs.name];

  setImmediate(() => {
    self.attrs.lastRunAt = new Date();
    debug('[%s:%s] setting lastRunAt to: %s', self.attrs.name, self.attrs._id, self.attrs.lastRunAt.toISOString());
    self.computeNextRunAt();
    self.save(() => {
      const jobCallback = function(err) {
        if (err) {
          self.fail(err);
        }

        if (!err) {
          self.attrs.lastFinishedAt = new Date();
        }
        self.attrs.lockedAt = null;
        debug('[%s:%s] job finished at [%s] and was unlocked', self.attrs.name, self.attrs._id, self.attrs.lastFinishedAt);

        self.save((saveErr, job) => {
          cb && cb(err || saveErr, job);  // eslint-disable-line no-unused-expressions
          if (err) {
            agenda.emit('fail', err, self);
            agenda.emit('fail:' + self.attrs.name, err, self);
            debug('[%s:%s] failed to be saved to MongoDB', self.attrs.name, self.attrs._id);
          } else {
            agenda.emit('success', self);
            agenda.emit('success:' + self.attrs.name, self);
            debug('[%s:%s] was saved successfully to MongoDB', self.attrs.name, self.attrs._id);
          }
          agenda.emit('complete', self);
          agenda.emit('complete:' + self.attrs.name, self);
          debug('[%s:%s] job has finished', self.attrs.name, self.attrs._id);
        });
      };

      try {
        agenda.emit('start', self);
        agenda.emit('start:' + self.attrs.name, self);
        debug('[%s:%s] starting job', self.attrs.name, self.attrs._id);
        if (!definition) {
          debug('[%s:%s] has no definition, can not run', self.attrs.name, self.attrs._id);
          throw new Error('Undefined job');
        }
        if (definition.fn.length === 2) {
          debug('[%s:%s] process function being called', self.attrs.name, self.attrs._id);
          definition.fn(self, jobCallback);
        } else {
          debug('[%s:%s] process function being called', self.attrs.name, self.attrs._id);
          definition.fn(self);
          jobCallback();
        }
      } catch (err) {
        debug('[%s:%s] unknown error occurred', self.attrs.name, self.attrs._id);
        jobCallback(err);
      }
    });
  });
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A job is running if:
 * (lastRunAt exists AND lastFinishedAt does not exist)
 * OR
 * (lastRunAt exists AND lastFinishedAt exists but the lastRunAt is newer [in time] than lastFinishedAt)
 * @returns {boolean} whether or not job is running at the moment (true for running)
 */
module.exports = function() {
  if (!this.attrs.lastRunAt) {
    return false;
  }
  if (!this.attrs.lastFinishedAt) {
    return true;
  }
  if (this.attrs.lockedAt && this.attrs.lastRunAt.getTime() > this.attrs.lastFinishedAt.getTime()) {
    return true;
  }
  return false;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Saves a job into the MongoDB
 * @param {Function} cb called after job is saved or errors
 * @returns {exports} instance of Job
 */
module.exports = function(cb) {
  this.agenda.saveJob(this, cb);
  return this;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Remove the job from MongoDB
 * @param {Function} cb called when job removal fails or passes
 * @returns {undefined}
 */
module.exports = function(cb) {
  this.agenda.cancel({_id: this.attrs._id}, cb);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Updates "lockedAt" time so the job does not get picked up again
 * @param {Function} cb called when job "touch" fails or passes
 * @returns {undefined}
 */
module.exports = function(cb) {
  this.attrs.lockedAt = new Date();
  this.save(cb);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const utils = __webpack_require__(4);

const createJob = utils.createJob;

/**
 * Finds all jobs matching 'query'
 * @param {Object} query object for MongoDB
 * @param {Function} cb called when fails or passes
 * @returns {undefined}
 */
module.exports = function(query, cb) {
  const self = this;
  this._collection.find(query).toArray((error, result) => {
    let jobs;
    if (!error) {
      jobs = result.map(createJob.bind(null, self));
    }
    cb(error, jobs);
  });
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// @TODO: What should we use for internal util functions?
//        Maybe we should use agenda:util:processJobs which would move agenda:* to agenda:agenda;*
const debug = __webpack_require__(0)('agenda:internal:processJobs');
const createJob = __webpack_require__(17);

/**
 * Process methods for jobs
 * @param {module.Job} extraJob job to run immediately
 * @returns {undefined}
 */
module.exports = function(extraJob) {
  debug('starting to process jobs');
  // Make sure an interval has actually been set
  // Prevents race condition with 'Agenda.stop' and already scheduled run
  if (!this._processInterval) {
    debug('no _processInterval set when calling processJobs, returning');
    return;
  }

  const self = this;
  const definitions = this._definitions;
  const jobQueue = this._jobQueue;
  let jobName;

  // Determine whether or not we have a direct process call!
  if (!extraJob) {
    // Go through each jobName set in 'Agenda.process' and fill the queue with the next jobs
    for (jobName in definitions) {
      if ({}.hasOwnProperty.call(definitions, jobName)) {
        debug('queuing up job to process: [%s]', jobName);
        jobQueueFilling(jobName);
      }
    }
  } else if (definitions[extraJob.attrs.name]) {
    // Add the job to list of jobs to lock and then lock it immediately!
    debug('job [%s] was passed directly to processJobs(), locking and running immediately', extraJob.attrs.name);
    self._jobsToLock.push(extraJob);
    lockOnTheFly();
  }

  /**
   * Returns true if a job of the specified name can be locked.
   * Considers maximum locked jobs at any time if self._lockLimit is > 0
   * Considers maximum locked jobs of the specified name at any time if jobDefinition.lockLimit is > 0
   * @param {String} name name of job to check if we should lock or not
   * @returns {boolean} whether or not you should lock job
   */
  function shouldLock(name) {
    const jobDefinition = definitions[name];
    let shouldLock = true;
    if (self._lockLimit && self._lockLimit <= self._lockedJobs.length) {
      shouldLock = false;
    }
    if (jobDefinition.lockLimit && jobDefinition.lockLimit <= jobDefinition.locked) {
      shouldLock = false;
    }
    debug('job [%s] lock status: shouldLock = %s', name, shouldLock);
    return shouldLock;
  }

  /**
   * Internal method that adds jobs to be processed to the local queue
   * @param {*} jobs Jobs to queue
   * @param {boolean} inFront puts the job in front of queue if true
   * @returns {undefined}
   */
  function enqueueJobs(jobs, inFront) {
    if (!Array.isArray(jobs)) {
      jobs = [jobs];
    }

    jobs.forEach(job => {
      let jobIndex;
      let start;
      let loopCondition;
      let endCondition;
      let inc;

      if (inFront) {
        start = jobQueue.length ? jobQueue.length - 1 : 0;
        inc = -1;
        loopCondition = function() {
          return jobIndex >= 0;
        };
        endCondition = function(queuedJob) {
          return !queuedJob || queuedJob.attrs.priority < job.attrs.priority;
        };
      } else {
        start = 0;
        inc = 1;
        loopCondition = function() {
          return jobIndex < jobQueue.length;
        };
        endCondition = function(queuedJob) {
          return queuedJob.attrs.priority >= job.attrs.priority;
        };
      }

      for (jobIndex = start; loopCondition(); jobIndex += inc) {
        if (endCondition(jobQueue[jobIndex])) {
          break;
        }
      }

      // Insert the job to the queue at its prioritized position for processing
      jobQueue.splice(jobIndex, 0, job);
    });
  }

  /**
   * Internal method that will lock a job and store it on MongoDB
   * This method is called when we immediately start to process a job without using the process interval
   * We do this because sometimes jobs are scheduled but will be run before the next process time
   * @returns {undefined}
   */
  function lockOnTheFly() {
    // Already running this? Return
    if (self._isLockingOnTheFly) {
      debug('lockOnTheFly() already running, returning');
      return;
    }

    // Don't have any jobs to run? Return
    if (self._jobsToLock.length === 0) {
      debug('no jobs to current lock on the fly, returning');
      self._isLockingOnTheFly = false;
      return;
    }

    // Set that we are running this
    self._isLockingOnTheFly = true;

    // Grab a job that needs to be locked
    const now = new Date();
    const job = self._jobsToLock.pop();

    // If locking limits have been hit, stop locking on the fly.
    // Jobs that were waiting to be locked will be picked up during a
    // future locking interval.
    if (!shouldLock(job.attrs.name)) {
      debug('lock limit hit for: [%s]', job.attrs.name);
      self._jobsToLock = [];
      self._isLockingOnTheFly = false;
      return;
    }

    // Query to run against collection to see if we need to lock it
    const criteria = {
      _id: job.attrs._id,
      lockedAt: null,
      nextRunAt: job.attrs.nextRunAt,
      disabled: {$ne: true}
    };

    // Update / options for the MongoDB query
    const update = {$set: {lockedAt: now}};
    const options = {returnOriginal: false};

    // Lock the job in MongoDB!
    self._collection.findOneAndUpdate(criteria, update, options, (err, resp) => {
      if (err) {
        throw err;
      }
      // Did the "job" get locked? Create a job object and run
      if (resp.value) {
        const job = createJob(self, resp.value);
        debug('found job [%s] that can be locked on the fly', job.attrs.name);
        self._lockedJobs.push(job);
        definitions[job.attrs.name].locked++;
        enqueueJobs(job);
        jobProcessing();
      }

      // Mark lock on fly is done for now
      self._isLockingOnTheFly = false;

      // Re-run in case anything is in the queue
      lockOnTheFly();
    });
  }

  /**
   * Internal method used to fill a queue with jobs that can be run
   * @param {String} name fill a queue with specific job name
   * @returns {undefined}
   */
  function jobQueueFilling(name) {
    // Don't lock because of a limit we have set (lockLimit, etc)
    if (!shouldLock(name)) {
      debug('lock limit reached in queue filling for [%s]', name);
      return;
    }

    // Set the date of the next time we are going to run _processEvery function
    const now = new Date();
    self._nextScanAt = new Date(now.valueOf() + self._processEvery);

    // For this job name, find the next job to run and lock it!
    self._findAndLockNextJob(name, definitions[name], (err, job) => {
      if (err) {
        debug('[%s] job lock failed while filling queue', name);
        throw err;
      }

      // Still have the job?
      // 1. Add it to lock list
      // 2. Add count of locked jobs
      // 3. Queue the job to actually be run now that it is locked
      // 4. Recursively run this same method we are in to check for more available jobs of same type!
      if (job) {
        debug('[%s:%s] job locked while filling queue', name, job.attrs._id);
        self._lockedJobs.push(job);
        definitions[job.attrs.name].locked++;
        enqueueJobs(job);
        jobQueueFilling(name);
        jobProcessing();
      }
    });
  }

  /**
   * Internal method that processes any jobs in the local queue (array)
   * @returns {undefined}
   */
  function jobProcessing() {
    // Ensure we have jobs
    if (jobQueue.length === 0) {
      return;
    }

    // Store for all sorts of things
    const now = new Date();

    // Get the next job that is not blocked by concurrency
    let next;
    for (next = jobQueue.length - 1; next > 0; next -= 1) {
      const def = definitions[jobQueue[next].attrs.name];
      if (def.concurrency > def.running) {
        break;
      }
    }

    // We now have the job we are going to process and its definition
    const job = jobQueue.splice(next, 1)[0];
    const jobDefinition = definitions[job.attrs.name];

    debug('[%s:%s] about to process job', job.attrs.name, job.attrs._id);

    // If the 'nextRunAt' time is older than the current time, run the job
    // Otherwise, setTimeout that gets called at the time of 'nextRunAt'
    if (job.attrs.nextRunAt < now) {
      debug('[%s:%s] nextRunAt is in the past, run the job immediately', job.attrs.name, job.attrs._id);
      runOrRetry();
    } else {
      const runIn = job.attrs.nextRunAt - now;
      debug('[%s:%s] nextRunAt is in the future, calling setTimeout(%d)', job.attrs.name, job.attrs._id, runIn);
      setTimeout(runOrRetry, runIn);
    }

    /**
     * Internal method that tries to run a job and if it fails, retries again!
     * @returns {undefined}
     */
    function runOrRetry() {
      if (self._processInterval) {
        if (jobDefinition.concurrency > jobDefinition.running && self._runningJobs.length < self._maxConcurrency) {
          // Get the deadline of when the job is not supposed to go past for locking
          const lockDeadline = new Date(Date.now() - jobDefinition.lockLifetime);

          // This means a job has "expired", as in it has not been "touched" within the lockoutTime
          // Remove from local lock
          // NOTE: Shouldn't we update the 'lockedAt' value in MongoDB so it can be picked up on restart?
          if (job.attrs.lockedAt < lockDeadline) {
            debug('[%s:%s] job lock has expired, freeing it up', job.attrs.name, job.attrs._id);
            self._lockedJobs.splice(self._lockedJobs.indexOf(job), 1);
            jobDefinition.locked--;
            jobProcessing();
            return;
          }

          // Add to local "running" queue
          self._runningJobs.push(job);
          jobDefinition.running++;

          // CALL THE ACTUAL METHOD TO PROCESS THE JOB!!!
          debug('[%s:%s] processing job', job.attrs.name, job.attrs._id);
          job.run(processJobResult);

          // Re-run the loop to check for more jobs to process (locally)
          jobProcessing();
        } else {
          // Run the job immediately by putting it on the top of the queue
          debug('[%s:%s] concurrency preventing immediate run, pushing job to top of queue', job.attrs.name, job.attrs._id);
          enqueueJobs(job, true);
        }
      }
    }
  }

  /**
   * Internal method used to run the job definition
   * @param {Error} err thrown if can't process job
   * @param {module.Job} job job to process
   * @returns {undefined}
   */
  function processJobResult(err, job) {
    if (err && !job) {
      throw (err);
    }
    const name = job.attrs.name;

    // Job isn't in running jobs so throw an error
    if (self._runningJobs.indexOf(job) === -1) {
      debug('[%s] callback was called, job must have been marked as complete already', job.attrs._id);
      throw new Error('callback already called - job ' + name + ' already marked complete');
    }

    // Remove the job from the running queue
    self._runningJobs.splice(self._runningJobs.indexOf(job), 1);
    if (definitions[name].running > 0) {
      definitions[name].running--;
    }

    // Remove the job from the locked queue
    self._lockedJobs.splice(self._lockedJobs.indexOf(job), 1);
    if (definitions[name].locked > 0) {
      definitions[name].locked--;
    }

    // Re-process jobs now that one has finished
    jobProcessing();
  }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:purge');

/**
 * Removes all jobs from queue
 * NOTE: Only use after defining your jobs
 * @param {Function} cb called when fails or passes
 * @returns {undefined}
 */
module.exports = function(cb) {
  const definedNames = Object.keys(this._definitions);
  debug('Agenda.purge(%o)');
  this.cancel({name: {$not: {$in: definedNames}}}, cb);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:define');

/**
 * Setup definition for job
 * Method is used by consumers of lib to setup their functions
 * @param {String} name name of job
 * @param {Object} options options for job to run
 * @param {Function} processor function to be called to run actual job
 * @returns {undefined}
 */
module.exports = function(name, options, processor) {
  if (!processor) {
    processor = options;
    options = {};
  }
  this._definitions[name] = {
    fn: processor,
    concurrency: options.concurrency || this._defaultConcurrency,
    lockLimit: options.lockLimit || this._defaultLockLimit,
    priority: options.priority || 0,
    lockLifetime: options.lockLifetime || this._defaultLockLifetime,
    running: 0,
    locked: 0
  };
  debug('job [%s] defined with following options: \n%O', name, this._definitions[name]);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:every');

/**
 * Creates a scheduled job with given interval and name/names of the job to run
 * @param {Number} interval run every X interval
 * @param {*} names String or strings of jobs to schedule
 * @param {Object} data data to run for job
 * @param {Object} options options to run job for
 * @param {Function} cb called when schedule fails or passes
 * @returns {*} Job or jobs created
 */
module.exports = function(interval, names, data, options, cb) {
  const self = this;

  if (cb === undefined && typeof data === 'function') {
    cb = data;
    data = undefined;
  } else if (cb === undefined && typeof options === 'function') {
    cb = options;
    options = undefined;
  }

  /**
   * Internal method to setup job that gets run every interval
   * @param {Number} interval run every X interval
   * @param {*} name String job to schedule
   * @param {Object} data data to run for job
   * @param {Object} options options to run job for
   * @param {Function} cb called when schedule fails or passes
   * @returns {module.Job} instance of job
   */
  const createJob = (interval, name, data, options, cb) => {
    const job = self.create(name, data);
    job.attrs.type = 'single';
    job.repeatEvery(interval, options);
    job.computeNextRunAt();
    job.save(cb);
    return job;
  };

  /**
   * Internal helper method that uses createJob to create jobs for an array of names
   * @param {Number} interval run every X interval
   * @param {*} names Strings of jobs to schedule
   * @param {Object} data data to run for job
   * @param {Object} options options to run job for
   * @param {Function} cb called when schedule fails or passes
   * @returns {*} array of jobs created
   */
  const createJobs = (interval, names, data, options, cb) => {
    const results = [];
    let pending = names.length;
    let errored = false;
    return names.map((name, i) => {
      return createJob(interval, name, data, options, (err, result) => {
        if (err) {
          if (!errored) {
            cb(err);
          }
          errored = true;
          return;
        }
        results[i] = result;
        if (--pending === 0 && cb) {
          debug('every() -> all jobs created successfully');
          cb(null, results);
        } else {
          debug('every() -> error creating one or more of the jobs');
        }
      });
    });
  };

  if (typeof names === 'string' || names instanceof String) {
    debug('Agenda.every(%s, %O, [Object], %O, cb)', interval, names, options);
    return createJob(interval, names, data, options, cb);
  } else if (Array.isArray(names)) {
    debug('Agenda.every(%s, %s, [Object], %O, cb)', interval, names, options);
    return createJobs(interval, names, data, options, cb);
  }
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:schedule');

/**
 * Schedule a job or jobs at a specific time
 * @param {String} when when the job gets run
 * @param {*} names array of job names to run
 * @param {Object} data data to send to job
 * @param {Function} cb called when schedule fails or passes
 * @returns {*} job or jobs created
 */
module.exports = function(when, names, data, cb) {
  const self = this;

  if (cb === undefined && typeof data === 'function') {
    cb = data;
    data = undefined;
  }

  /**
   * Internal method that creates a job with given date
   * @param {String} when when the job gets run
   * @param {String} name of job to run
   * @param {Object} data data to send to job
   * @param {Function} cb called when job persistence in MongoDB fails or passes
   * @returns {module.Job} instance of new job
   */
  const createJob = (when, name, data, cb) => {
    const job = self.create(name, data);
    job.schedule(when);
    job.save(cb);
    return job;
  };

  /**
   * Internal helper method that calls createJob on a names array
   * @param {String} when when the job gets run
   * @param {*} names of jobs to run
   * @param {Object} data data to send to job
   * @param {Function} cb called when job(s) persistence in MongoDB fails or passes
   * @returns {*} jobs that were created
   */
  const createJobs = (when, names, data, cb) => {
    const results = [];
    let pending = names.length;
    let errored = false;
    return names.map((name, i) => {
      return createJob(when, name, data, (err, result) => {
        if (err) {
          if (!errored) {
            cb(err);
          }
          errored = true;
          return;
        }
        results[i] = result;
        if (--pending === 0 && cb) {
          debug('Agenda.schedule()::createJobs() -> all jobs created successfully');
          cb(null, results);
        } else {
          debug('Agenda.schedule()::createJobs() -> error creating one or more of the jobs');
        }
      });
    });
  };

  if (typeof names === 'string' || names instanceof String) {
    debug('Agenda.schedule(%s, %O, [Object], cb)', when, names);
    return createJob(when, names, data, cb);
  } else if (Array.isArray(names)) {
    debug('Agenda.schedule(%s, %O, [Object], cb)', when, names);
    return createJobs(when, names, data, cb);
  }
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:now');

/**
 * Create a job for this exact moment
 * @param {String} name name of job to schedule
 * @param {Object} data data to pass to job
 * @param {Function} cb called when job scheduling fails or passes
 * @returns {module.Job} new job instance created
 */
module.exports = function(name, data, cb) {
  if (!cb && typeof data === 'function') {
    cb = data;
    data = undefined;
  }
  debug('Agenda.now(%s, [Object])', name);
  const job = this.create(name, data);
  job.schedule(new Date());
  job.save(cb);
  return job;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:cancel');

/**
 * Cancels any jobs matching the passed MongoDB query, and removes them from the database.
 *  @param {Object} query MongoDB query to use when cancelling
 *  @param {Function} cb callback(error, numRemoved) when cancellation fails or passes
 *  @caller client code, Agenda.purge(), Job.remove()
 *  @returns {undefined}
 */
module.exports = function(query, cb) {
  debug('attempting to cancel all Agenda jobs', query);
  this._collection.deleteMany(query, (error, result) => {
    if (cb) {
      if (error) {
        debug('error trying to delete jobs from MongoDB');
      } else {
        debug('jobs cancelled');
      }
      cb(error, result && result.result ? result.result.n : undefined);
    }
  });
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:saveJob');
const utils = __webpack_require__(4);

const processJobs = utils.processJobs;

/**
 * Save the properties on a job to MongoDB
 * @param {module.Job} job job to save into MongoDB
 * @param {Function} cb called when job is saved or errors
 * @returns {undefined}
 */
module.exports = function(job, cb) {
  debug('attempting to save a job into Agenda instance');

  // Grab information needed to save job but that we don't want to persist in MongoDB
  const fn = cb;
  const self = this;
  const id = job.attrs._id;
  const unique = job.attrs.unique;
  const uniqueOpts = job.attrs.uniqueOpts;

  // Store job as JSON and remove props we don't want to store from object
  const props = job.toJSON();
  delete props._id;
  delete props.unique;
  delete props.uniqueOpts;

  // Store name of agenda queue as last modifier in job data
  props.lastModifiedBy = this._name;
  debug('set job props: \n%O', props);

  // Grab current time and set default query options for MongoDB
  const now = new Date();
  const protect = {};
  let update = {$set: props};
  debug('current time stored as %s', now.toISOString());

  // If the job already had an ID, then update the properties of the job
  // i.e, who last modified it, etc
  if (id) {
    // Update the job and process the resulting data'
    debug('job already has _id, calling findOneAndUpdate() using _id as query');
    this._collection.findOneAndUpdate({
      _id: id
    },
    update, {
      returnOriginal: false
    },
    processDbResult);
  } else if (props.type === 'single') {
    // Job type set to 'single' so...
    // NOTE: Again, not sure about difference between 'single' here and 'once' in job.js
    debug('job with type of "single" found');

    // If the nextRunAt time is older than the current time, "protect" that property, meaning, don't change
    // a scheduled job's next run time!
    if (props.nextRunAt && props.nextRunAt <= now) {
      debug('job has a scheduled nextRunAt time, protecting that field from upsert');
      protect.nextRunAt = props.nextRunAt;
      delete props.nextRunAt;
    }

    // If we have things to protect, set them in MongoDB using $setOnInsert
    if (Object.keys(protect).length > 0) {
      update.$setOnInsert = protect;
    }

    // Try an upsert
    // NOTE: 'single' again, not exactly sure what it means
    debug('calling findOneAndUpdate() with job name and type of "single" as query');
    this._collection.findOneAndUpdate({
      name: props.name,
      type: 'single'
    },
    update, {
      upsert: true,
      returnOriginal: false
    },
    processDbResult);
  } else if (unique) {
    // If we want the job to be unique, then we can upsert based on the 'unique' query object that was passed in
    const query = job.attrs.unique;
    query.name = props.name;
    if (uniqueOpts && uniqueOpts.insertOnly) {
      update = {$setOnInsert: props};
    }

    // Use the 'unique' query object to find an existing job or create a new one
    debug('calling findOneAndUpdate() with unique object as query: \n%O', query);
    this._collection.findOneAndUpdate(query, update, {upsert: true, returnOriginal: false}, processDbResult);
  } else {
    // If all else fails, the job does not exist yet so we just insert it into MongoDB
    debug('using default behavior, inserting new job via insertOne() with props that were set: \n%O', props);
    this._collection.insertOne(props, processDbResult);
  }

  /**
   * Given a result for findOneAndUpdate() or insert() above, determine whether to process
   * the job immediately or to let the processJobs() interval pick it up later
   * @param {Error} err error passed in via MongoDB call as to whether modify call failed or passed
   * @param {*} result the data returned from the findOneAndUpdate() call or insertOne() call
   * @access private
   * @returns {undefined}
   */
  function processDbResult(err, result) {
    // Check if there is an error and either cb(error) or throw if there is no callback
    if (err) {
      debug('processDbResult() received an error, job was not updated/created');
      if (fn) {
        return fn(err);
      }
      throw err;
    } else if (result) {
      debug('processDbResult() called with success, checking whether to process job immediately or not');

      // We have a result from the above calls
      // findAndModify() returns different results than insertOne() so check for that
      let res = result.ops ? result.ops : result.value;
      if (res) {
        // If it is an array, grab the first job
        if (Array.isArray(res)) {
          res = res[0];
        }

        // Grab ID and nextRunAt from MongoDB and store it as an attribute on Job
        job.attrs._id = res._id;
        job.attrs.nextRunAt = res.nextRunAt;

        // If the current job would have been processed in an older scan, process the job immediately
        if (job.attrs.nextRunAt && job.attrs.nextRunAt < self._nextScanAt) {
          debug('[%s:%s] job would have ran by nextScanAt, processing the job immediately', job.attrs.name, res._id);
          processJobs.call(self, job);
        }
      }
    }

    // If we have a callback, return the Job instance
    if (fn) {
      fn(null, job);
    }
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:start');
const utils = __webpack_require__(4);

const processJobs = utils.processJobs;

/**
 * Starts processing jobs using processJobs() methods, storing an interval ID
 * @returns {undefined}
 */
module.exports = function() {
  if (this._processInterval) {
    debug('Agenda.start was already called, ignoring');
  } else {
    debug('Agenda.start called, creating interval to call processJobs every [%dms]', this._processEvery);
    this._processInterval = setInterval(processJobs.bind(this), this._processEvery);
    process.nextTick(processJobs.bind(this));
  }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:stop');

/**
 * Clear the interval that processes the jobs
 * @param {Function} cb called when job unlocking fails or passes
 * @returns {undefined}
 */
module.exports = function(cb) {
  const self = this;
  /**
   * Internal method to unlock jobs so that they can be re-run
   * NOTE: May need to update what properties get set here, since job unlocking seems to fail
   * @param {Function} done callback called when job unlocking fails or passes
   * @access private
   * @returns {undefined}
   */
  const _unlockJobs = function(done) {
    debug('Agenda._unlockJobs()');
    const jobIds = self._lockedJobs.map(job => job.attrs._id);

    if (jobIds.length === 0) {
      debug('no jobs to unlock');
      return done();
    }

    debug('about to unlock jobs with ids: %O', jobIds);
    self._collection.updateMany({_id: {$in: jobIds}}, {$set: {lockedAt: null}}, err => {
      if (err) {
        return done(err);
      }

      self._lockedJobs = [];
      return done();
    });
  };

  debug('Agenda.stop called, clearing interval for processJobs()');
  cb = cb || function() {};
  clearInterval(this._processInterval);
  this._processInterval = undefined;
  _unlockJobs(cb);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:_findAndLockNextJob');
const utils = __webpack_require__(4);

const createJob = utils.createJob;

/**
 * Find and lock jobs
 * @param {String} jobName name of job to try to lock
 * @param {Object} definition definition used to tell how job is run
 * @param {Function} cb called when job lock fails or passes
 * @access protected
 * @caller jobQueueFilling() only
 * @returns {undefined}
 */
module.exports = function(jobName, definition, cb) {
  const self = this;
  const now = new Date();
  const lockDeadline = new Date(Date.now().valueOf() - definition.lockLifetime);
  debug('_findAndLockNextJob(%s, [Function], cb)', jobName);

  // Don't try and access MongoDB if we've lost connection to it.
  // Trying to resolve crash on Dev PC when it resumes from sleep. NOTE: Does this still happen?
  const s = this._mdb.s || this._mdb.db.s;
  if (s.topology.connections().length === 0) {
    if (s.topology.autoReconnect && !s.topology.isDestroyed()) {
      // Continue processing but notify that Agenda has lost the connection
      debug('Missing MongoDB connection, not attempting to find and lock a job');
      self.emit('error', new Error('Lost MongoDB connection'));
      cb();
    } else {
      // No longer recoverable
      debug('topology.autoReconnect: %s, topology.isDestroyed(): %s', s.topology.autoReconnect, s.topology.isDestroyed());
      cb(new Error('MongoDB connection is not recoverable, application restart required'));
    }
  } else {
    /**
    * Query used to find job to run
    * @type {{$or: [*]}}
    */
    const JOB_PROCESS_WHERE_QUERY = {
      $or: [{
        name: jobName,
        lockedAt: null,
        nextRunAt: {$lte: this._nextScanAt},
        disabled: {$ne: true}
      }, {
        name: jobName,
        lockedAt: {$exists: false},
        nextRunAt: {$lte: this._nextScanAt},
        disabled: {$ne: true}
      }, {
        name: jobName,
        lockedAt: {$lte: lockDeadline},
        disabled: {$ne: true}
      }]
    };

    /**
    * Query used to set a job as locked
    * @type {{$set: {lockedAt: Date}}}
    */
    const JOB_PROCESS_SET_QUERY = {$set: {lockedAt: now}};

    /**
    * Query used to affect what gets returned
    * @type {{returnOriginal: boolean, sort: object}}
    */
    const JOB_RETURN_QUERY = {returnOriginal: false, sort: this._sort};

    // Find ONE and ONLY ONE job and set the 'lockedAt' time so that job begins to be processed
    this._collection.findOneAndUpdate(JOB_PROCESS_WHERE_QUERY, JOB_PROCESS_SET_QUERY, JOB_RETURN_QUERY, (err, result) => {
      let job;
      if (!err && result.value) {
        debug('found a job available to lock, creating a new job on Agenda with id [%s]', result.value._id);
        job = createJob(self, result.value);
      }
      if (err) {
        debug('error occurred when running query to find and lock job');
      }
      cb(err, job);
    });
  }
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("another-mongoose-statemachine");

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(9);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(78);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = __webpack_require__(79);

var _api2 = _interopRequireDefault(_api);

var _ssr = __webpack_require__(81);

var _ssr2 = _interopRequireDefault(_ssr);

var _agenda = __webpack_require__(101);

var _agenda2 = _interopRequireDefault(_agenda);

var _agendash = __webpack_require__(102);

var _agendash2 = _interopRequireDefault(_agendash);

var _expressSession = __webpack_require__(103);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = __webpack_require__(104);

var _connectMongo2 = _interopRequireDefault(_connectMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var agenda = new _agenda2.default({ db: { address: process.env.MONGODB_URI || process.env.MONGO_URL } });

app.use((0, _expressSession2.default)({
    secret: 'qVaNxeu5VVEAtkyFJ/62EKcp7Lw=',
    saveUninitialized: true, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new ((0, _connectMongo2.default)(_expressSession2.default))({ url: process.env.MONGODB_URI || process.env.MONGO_URL }),
    cookie: { expires: new Date(253402300000000) }
}));

app.use('/jobs', (0, _agendash2.default)(agenda));

app.set('view engine', 'ejs');
app.set('views', _path2.default.join(__dirname, '../views'));
app.use(_bodyParser2.default.json());

app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'public')));

app.use('/api', _api2.default);
app.use('/*', _ssr2.default);

app.listen(process.env.PORT || 5000, function () {
    console.log('Hello World listening on port 5000!');
});

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = __webpack_require__(13);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(9);

var _express2 = _interopRequireDefault(_express);

var _opentok = __webpack_require__(18);

var _opentok2 = _interopRequireDefault(_opentok);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _journey_space = __webpack_require__(19);

var _journey_space2 = _interopRequireDefault(_journey_space);

var _journey_participant = __webpack_require__(80);

var _journey_participant2 = _interopRequireDefault(_journey_participant);

var _journey_rsvp = __webpack_require__(20);

var _journey_rsvp2 = _interopRequireDefault(_journey_rsvp);

var _journey_content = __webpack_require__(21);

var _journey_content2 = _interopRequireDefault(_journey_content);

var _dotenv = __webpack_require__(12);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

__webpack_require__(22);

_dotenv2.default.config();

_mongoose2.default.connect(process.env.MONGODB_URI || process.env.MONGO_URL);

function promisify(fn) {
  /**
   * @param {...Any} params The params to pass into *fn*
   * @return {Promise<Any|Any[]>}
   */
  return function promisified() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      return fn.apply(undefined, _toConsumableArray(params.concat([function (err) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return err ? reject(err) : resolve(args.length < 2 ? args[0] : args);
      }])));
    });
  };
}

var opentok = new _opentok2.default(process.env.OPENTOK_KEY, process.env.OPENTOK_SECRET);
var router = _express2.default.Router();

function generateToken(sessionId) {
  var tokenOptions = {};
  tokenOptions.role = "publisher";
  // Generate a token.
  var token = opentok.generateToken(sessionId, tokenOptions);
  return token;
}

// TODO: switch to POST, just using GET for easier testing
router.get('/sessions/:room', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var room, existingSession, session, participants, rsvps, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            room = req.params.room;
            _context3.next = 3;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 3:
            existingSession = _context3.sent;

            if (!existingSession) {
              _context3.next = 24;
              break;
            }

            if (existingSession.sessionId) {
              _context3.next = 12;
              break;
            }

            _context3.next = 8;
            return new Promise(function (resolve, reject) {
              opentok.createSession(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, session) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (err) reject(err);
                          resolve(session);

                        case 2:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());
            });

          case 8:
            session = _context3.sent;

            existingSession.sessionId = session.sessionId;
            _context3.next = 12;
            return existingSession.save();

          case 12:
            _context3.next = 14;
            return _journey_participant2.default.find({ session: existingSession, present: true }).lean().exec();

          case 14:
            participants = _context3.sent;
            _context3.next = 17;
            return _journey_rsvp2.default.find({ journey: existingSession }).lean().exec();

          case 17:
            rsvps = _context3.sent;
            response = existingSession.toJSON();

            response.participants = participants;
            response.rsvps = rsvps;
            res.json(_extends({}, response, {
              token: generateToken(existingSession.sessionId)
            }));
            _context3.next = 25;
            break;

          case 24:
            opentok.createSession(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, session) {
                var newSession, response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!err) {
                          _context2.next = 2;
                          break;
                        }

                        throw err;

                      case 2:
                        // save the sessionId
                        newSession = new _journey_space2.default({ room: room, sessionId: session.sessionId });
                        _context2.next = 5;
                        return newSession.save();

                      case 5:
                        response = newSession.toJSON();

                        response.participants = [];
                        response.rsvps = [];
                        res.json(_extends({}, response, {
                          token: generateToken(session.sessionId)
                        }));

                      case 9:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 25:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/sessions/:room/joined', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var room, connectionId, existingSession, participantExists, participant;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            room = req.params.room;
            connectionId = req.body.id;

            req.session.connections = req.session.connections || {};
            req.session.connections[room] = connectionId;
            _context4.next = 6;
            return _journey_space2.default.findOne({ room: room }).lean().exec();

          case 6:
            existingSession = _context4.sent;

            if (!existingSession) {
              _context4.next = 16;
              break;
            }

            _context4.next = 10;
            return _journey_participant2.default.count({ session: existingSession, connectionId: connectionId });

          case 10:
            _context4.t0 = _context4.sent;
            participantExists = _context4.t0 > 0;

            if (participantExists) {
              _context4.next = 16;
              break;
            }

            participant = new _journey_participant2.default({ session: existingSession, connectionId: connectionId, user: req.session.user });
            _context4.next = 16;
            return participant.save();

          case 16:
            res.sendStatus(200);

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

router.get('/sessions/:room/:connectionId', function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$params, room, connectionId, existingSession, participant;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params = req.params, room = _req$params.room, connectionId = _req$params.connectionId;
            _context5.next = 3;
            return _journey_space2.default.findOne({ room: room }).lean().exec();

          case 3:
            existingSession = _context5.sent;

            if (!existingSession) {
              _context5.next = 10;
              break;
            }

            _context5.next = 7;
            return _journey_participant2.default.findOne({ session: existingSession, connectionId: connectionId }).exec();

          case 7:
            participant = _context5.sent;

            res.json(participant);
            return _context5.abrupt('return');

          case 10:
            res.sendStatus(500);

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

router.get('/active_journeys', function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var journeys;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _journey_space2.default.aggregate([{
              $match: {
                state: { $in: ['created', 'joined'] }, startAt: { $gte: new Date() }, room: { $ne: 'temp-home-location' }
              }
            }, {
              $lookup: {
                from: 'journeyrsvps',
                localField: '_id',
                foreignField: 'journey',
                as: 'rsvps'
              }
            }, {
              $sort: { startAt: 1 }
            }]);

          case 2:
            journeys = _context6.sent;


            res.json(journeys);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

router.post('/journeys/:id/rsvp', function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var journey, rsvp, globalSpace;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _journey_space2.default.findById(req.params.id).exec();

          case 2:
            journey = _context7.sent;
            _context7.prev = 3;
            _context7.next = 6;
            return journey.joined();

          case 6:
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](3);

            console.log(_context7.t0);

          case 11:
            rsvp = new _journey_rsvp2.default({ journey: journey, user: req.session.id });
            _context7.next = 14;
            return rsvp.save();

          case 14:
            _context7.next = 16;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 16:
            globalSpace = _context7.sent;

            if (globalSpace) {
              opentok.signal(globalSpace.sessionId, null, { 'type': 'newRSVP', 'data': JSON.stringify(rsvp) }, function () {});
            }
            res.sendStatus(200);

          case 19:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[3, 8]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

router.post('/journeys/:id/completed', function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var journey, globalSpace;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _journey_space2.default.findById(req.params.id).exec();

          case 2:
            journey = _context8.sent;
            _context8.next = 5;
            return journey.complete();

          case 5:
            _context8.next = 7;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 7:
            globalSpace = _context8.sent;

            if (globalSpace) {
              opentok.signal(globalSpace.sessionId, null, { 'type': 'completed', 'data': JSON.stringify(journey.toJSON()) }, function () {});
            }
            res.sendStatus(200);

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

router.put('/journeys/:room/progress', function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var currentTime, journey;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            currentTime = req.body.currentTime;
            _context9.next = 3;
            return _journey_space2.default.findOne({ room: req.params.room }).exec();

          case 3:
            journey = _context9.sent;

            journey.currentTime = currentTime;
            _context9.next = 7;
            return journey.save();

          case 7:
            res.sendStatus(200);

          case 8:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());

// TEMP: Use get for convenience. hardcode temp-home-location for the room
// Trigger a general announcement to everyone
router.get('/sessions/test/temp-home-location', function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var existingSession, messageData;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 2:
            existingSession = _context10.sent;

            if (!existingSession) {
              _context10.next = 8;
              break;
            }

            console.log("**** SENDING SIGNAL");
            messageData = {
              userName: "Bob",
              description: "some text",
              url: "http://www.news.google.com"
            };


            signal(existingSession.sessionId, { type: 'displayJourneyRequest', data: JSON.stringify(messageData) });
            return _context10.abrupt('return', res.sendStatus(200));

          case 8:
            res.sendStatus(200);

          case 9:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());

router.get('/sessions/:room/connections/:connection/ready', function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var _req$params2, room, connection, existingSession, participant, allReady;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _req$params2 = req.params, room = _req$params2.room, connection = _req$params2.connection;
            _context11.next = 3;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 3:
            existingSession = _context11.sent;

            if (!existingSession) {
              _context11.next = 18;
              break;
            }

            _context11.next = 7;
            return _journey_participant2.default.findOne({ session: existingSession, connectionId: connection });

          case 7:
            participant = _context11.sent;

            participant.ready = true;
            _context11.next = 11;
            return participant.save();

          case 11:
            signal(existingSession.sessionId, { type: 'ready', data: 'foo' });
            _context11.next = 14;
            return _journey_participant2.default.count({ session: existingSession, ready: false, present: true });

          case 14:
            _context11.t0 = _context11.sent;
            allReady = _context11.t0 === 0;

            if (allReady) {
              // signal(existingSession.sessionId, {type: 'startJourney', data: 'foo'});
            }
            return _context11.abrupt('return', res.sendStatus(200));

          case 18:
            res.sendStatus(200);

          case 19:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());

router.get('/journeys', function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var journeys;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _journey_content2.default.find().exec();

          case 2:
            journeys = _context12.sent;

            res.json(journeys);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());

router.put('/sessions/:room/journey', function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    var journey, room, existingSession, journeyContent;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            journey = req.body.journey;
            room = req.params.room;
            _context13.next = 4;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 4:
            existingSession = _context13.sent;
            _context13.next = 7;
            return _journey_content2.default.findOne({ filePath: journey }).exec();

          case 7:
            journeyContent = _context13.sent;

            if (!existingSession) {
              _context13.next = 14;
              break;
            }

            existingSession.journey = journey;
            existingSession['name'] = journeyContent.get('name');
            _context13.next = 13;
            return existingSession.save();

          case 13:
            signal(existingSession.sessionId, { type: 'updatedJourney', data: journey });

          case 14:
            res.sendStatus(200);

          case 15:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());

// TODO: this should really verify that the user hitting this endpoint is authorized to do so (e.g. that they are the journey's host)
router.post('/sessions/:room/start', function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
    var room, existingSession;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            room = req.params.room;
            _context14.next = 3;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 3:
            existingSession = _context14.sent;

            if (!existingSession) {
              _context14.next = 8;
              break;
            }

            _context14.next = 7;
            return existingSession.start();

          case 7:
            signal(existingSession.sessionId, { type: 'startJourney', data: '' });

          case 8:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());

router.post('/sessions/:room/flag', function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
    var room, userId, existingSession, participants;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            room = req.params.room;
            userId = req.sessionID; // using sessionId as representation of user for now

            _context15.next = 4;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 4:
            existingSession = _context15.sent;

            if (!existingSession) {
              _context15.next = 13;
              break;
            }

            existingSession.flags.push({ user: userId });
            _context15.next = 9;
            return existingSession.save();

          case 9:
            _context15.next = 11;
            return _journey_participant2.default.find({ session: existingSession, present: true }).lean().exec();

          case 11:
            participants = _context15.sent;
            return _context15.abrupt('return', res.json(_extends({}, existingSession.toJSON(), { participants: participants })));

          case 13:
            res.sendStatus(404);

          case 14:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());

router.post('/event', function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
    var _req$body, sessionId, connection, session, participantExists, participant, _participant;

    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            console.log('GOT EVENT', req.body);
            res.sendStatus(200);
            _req$body = req.body, sessionId = _req$body.sessionId, connection = _req$body.connection;
            _context16.next = 5;
            return _journey_space2.default.findOne({ sessionId: sessionId }).exec();

          case 5:
            session = _context16.sent;


            console.log("*******" + req.body);

            _context16.t0 = req.body.event;
            _context16.next = _context16.t0 === 'connectionCreated' ? 10 : _context16.t0 === 'connectionDestroyed' ? 20 : 29;
            break;

          case 10:
            if (!session) {
              _context16.next = 19;
              break;
            }

            _context16.next = 13;
            return _journey_participant2.default.count({ session: session, connectionId: connection.id });

          case 13:
            _context16.t1 = _context16.sent;
            participantExists = _context16.t1 > 0;

            if (participantExists) {
              _context16.next = 19;
              break;
            }

            participant = new _journey_participant2.default({ session: session, connectionId: connection.id });
            _context16.next = 19;
            return participant.save();

          case 19:
            return _context16.abrupt('break', 29);

          case 20:
            if (!session) {
              _context16.next = 28;
              break;
            }

            _context16.next = 23;
            return _journey_participant2.default.findOne({ session: session, connectionId: connection.id });

          case 23:
            _participant = _context16.sent;

            if (!_participant) {
              _context16.next = 28;
              break;
            }

            _participant.present = false;
            _context16.next = 28;
            return _participant.save();

          case 28:
            return _context16.abrupt('break', 29);

          case 29:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());

router.post('/login', function (req, res) {
  req.session.loggedIn = true;
  req.session.user = {
    name: req.body.name
  };
  res.json({ loggedIn: true, user: { name: req.body.name } });
});

router.get('/logout', function (req, res) {
  req.session.destroy(function () {
    res.clearCookie('connect.sid').redirect('/login');
  });
});

function signal(sessionId, data) {
  fetch('https://api.opentok.com/v2/project/' + process.env.OPENTOK_KEY + '/session/' + sessionId + '/signal', {
    headers: {
      'X-TB-PARTNER-AUTH': process.env.OPENTOK_KEY + ':' + process.env.OPENTOK_SECRET
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data)
  }).then(function (response) {
    return console.log(response);
  });
}

exports.default = router;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyParticipantSchema = new _mongoose.Schema({
  "connectionId": { type: String, index: true },
  "session": { type: _mongoose.Schema.Types.ObjectId, ref: 'JourneySpace' },
  "ready": { type: Boolean, default: false },
  "present": { type: Boolean, default: true },
  user: new _mongoose.Schema({ name: String })
});

var JourneyParticipant = _mongoose2.default.model('JourneyParticipant', JourneyParticipantSchema);

exports.default = JourneyParticipant;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(9);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(82);

var _server2 = _interopRequireDefault(_server);

var _redux = __webpack_require__(83);

var _reactRedux = __webpack_require__(84);

var _reactRouter = __webpack_require__(23);

var _app = __webpack_require__(85);

var _app2 = _interopRequireDefault(_app);

var _state = __webpack_require__(3);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  var context = {};

  _state2.default.loggedIn = req.session.loggedIn;
  _state2.default.user = req.session.user;
  console.log('GOT SESSION', req.session, req.originalUrl);

  var html = _server2.default.renderToString(_react2.default.createElement(
    _reactRouter.StaticRouter,
    {
      location: req.originalUrl,
      context: context
    },
    _react2.default.createElement(_app2.default, null)
  ));

  console.log('GOT HTML', html, context.url);
  if (context.url) {
    console.log('REDIRECT');
    if (req.originalUrl != '/favicon.ico') {
      res.writeHead(301, {
        Location: context.url
      });
    }
    res.end();
  } else {
    res.status(200).render(process.env.NODE_ENV === 'production' ? 'index.ejs' : 'index.dev.ejs', {
      html: html,
      script: JSON.stringify({ openTokKey: process.env.OPENTOK_KEY, loggedIn: req.session.loggedIn, user: req.session.user, sessionId: req.sessionID })
    });
  }
});

exports.default = router;

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(24);

var _reactRouter = __webpack_require__(23);

var _reactEasyState = __webpack_require__(5);

var _propTypes = __webpack_require__(25);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = __webpack_require__(8);

var _moment2 = _interopRequireDefault(_moment);

var _header = __webpack_require__(86);

var _header2 = _interopRequireDefault(_header);

var _home = __webpack_require__(88);

var _home2 = _interopRequireDefault(_home);

var _Room = __webpack_require__(95);

var _Room2 = _interopRequireDefault(_Room);

var _state = __webpack_require__(3);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _ref = {},
    OTSession = _ref.OTSession,
    OTPublisher = _ref.OTPublisher,
    OTStreams = _ref.OTStreams,
    OTSubscriber = _ref.OTSubscriber,
    createSession = _ref.createSession;


if (__CLIENT__) {
  var _require = __webpack_require__(10),
      OTSession = _require.OTSession,
      OTPublisher = _require.OTPublisher,
      OTStreams = _require.OTStreams,
      OTSubscriber = _require.OTSubscriber,
      createSession = _require.createSession;

  var OT = __webpack_require__(11);
}

var RequireLoginRoute = function RequireLoginRoute(_ref2) {
  var Component = _ref2.component,
      rest = _objectWithoutProperties(_ref2, ['component']);

  return _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, { render: function render(renderProps) {
      return _state2.default.loggedIn ? _react2.default.createElement(Component, renderProps) : _react2.default.createElement(_reactRouterDom.Redirect, { to: {
          pathname: '/login'
        } });
    } }));
};

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.login = function (e) {
      e.preventDefault();
      fetch('/api/login', {
        body: JSON.stringify({ name: _this.state.name }), // must match 'Content-Type' header
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        _state2.default.loggedIn = json.loggedIn;
        _state2.default.user = json.user;
        _this.props.history.push('/');
      });
    };

    _this.state = {
      name: ''
    };
    return _this;
  }

  _createClass(Login, [{
    key: 'onChange',
    value: function onChange(field) {
      var _this2 = this;

      return function (e) {
        _this2.setState(_defineProperty({}, field, e.target.value));
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { padding: '20px', width: '50%' } },
        _react2.default.createElement(
          'form',
          { onSubmit: this.login },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'name' },
              'Name'
            ),
            _react2.default.createElement('input', { type: 'text', onChange: this.onChange('name'), value: this.state.name, className: 'form-control', id: 'name', 'aria-describedby': 'nameHelp', placeholder: 'Enter name' })
          ),
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-primary' },
            'Submit'
          )
        )
      );
    }
  }]);

  return Login;
}(_react.Component);

Login.propTypes = {
  match: _propTypes2.default.object.isRequired,
  location: _propTypes2.default.object.isRequired,
  history: _propTypes2.default.object.isRequired
};

var JoinableJourneyCard = function (_Component2) {
  _inherits(JoinableJourneyCard, _Component2);

  function JoinableJourneyCard() {
    var _ref3;

    var _temp, _this3, _ret;

    _classCallCheck(this, JoinableJourneyCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref3 = JoinableJourneyCard.__proto__ || Object.getPrototypeOf(JoinableJourneyCard)).call.apply(_ref3, [this].concat(args))), _this3), _this3.onJoin = function (e) {
      e.preventDefault();
      fetch('/api/journeys/' + _this3.props.journey._id + '/rsvp', {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      });
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(JoinableJourneyCard, [{
    key: 'render',
    value: function render() {
      var journey = this.props.journey;

      var currentUserHasRSVP = (journey.rsvps || []).find(function (rsvp) {
        return rsvp.user === _state2.default.sessionId;
      }) != null;
      return _react2.default.createElement(
        'div',
        { className: 'joinable-journey-card' },
        _react2.default.createElement(
          'div',
          { className: 'image' },
          _react2.default.createElement('img', { src: journey.image })
        ),
        _react2.default.createElement(
          'div',
          { className: 'content' },
          _react2.default.createElement(
            'h4',
            null,
            journey.name
          ),
          _react2.default.createElement(
            'p',
            null,
            'Starts at: ',
            (0, _moment2.default)(journey.startAt).format('LT')
          ),
          _react2.default.createElement(
            'p',
            null,
            journey.rsvps.length,
            ' / 3'
          ),
          journey.rsvps.length < 3 && !currentUserHasRSVP && _react2.default.createElement(
            'a',
            { href: '/' + journey.room, onClick: this.onJoin, className: 'btn btn-primary' },
            'Join'
          ),
          currentUserHasRSVP && _react2.default.createElement(
            'a',
            { href: '/' + journey.room, className: 'btn btn-primary' },
            'Go there now'
          )
        )
      );
    }
  }]);

  return JoinableJourneyCard;
}(_react.Component);

var AutoCreatedJourneysQueue = function (_Component3) {
  _inherits(AutoCreatedJourneysQueue, _Component3);

  function AutoCreatedJourneysQueue() {
    _classCallCheck(this, AutoCreatedJourneysQueue);

    return _possibleConstructorReturn(this, (AutoCreatedJourneysQueue.__proto__ || Object.getPrototypeOf(AutoCreatedJourneysQueue)).apply(this, arguments));
  }

  _createClass(AutoCreatedJourneysQueue, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this5 = this;

      var roomUrl = 'temp-home-location';

      // subscribe to global events
      fetch('/api/sessions/' + roomUrl).then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.session = json;
        _this5.sessionHelper = createSession({
          apiKey: _state2.default.openTokKey,
          sessionId: _state2.default.session.sessionId,
          token: _state2.default.session.token,
          onConnect: function onConnect() {}
        });

        _this5.sessionHelper.session.on("signal:createdNewJourney", function (event) {
          _state2.default.joinableJourneys.push(JSON.parse(event.data));
        });

        _this5.sessionHelper.session.on("signal:expiredJourney", function (event) {
          var journey = JSON.parse(event.data);
          var idx = _state2.default.joinableJourneys.findIndex(function (j) {
            return j._id === journey._id;
          });
          _state2.default.joinableJourneys = [].concat(_toConsumableArray(_state2.default.joinableJourneys.slice(0, idx)), _toConsumableArray(_state2.default.joinableJourneys.slice(idx + 1)));
        });

        _this5.sessionHelper.session.on('signal:newRSVP', function (event) {
          var rsvp = JSON.parse(event.data);
          var journey = _state2.default.joinableJourneys.find(function (j) {
            return j._id == rsvp.journey._id;
          });
          var idx = _state2.default.joinableJourneys.findIndex(function (j) {
            return j._id === journey._id;
          });
          journey.rsvps.push(rsvp);
          _state2.default.joinableJourneys = [].concat(_toConsumableArray(_state2.default.joinableJourneys.slice(0, idx)), [journey], _toConsumableArray(_state2.default.joinableJourneys.slice(idx + 1)));
        });
      });

      // fetch currently active journeys
      fetch('/api/active_journeys').then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.joinableJourneys = json;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'joinable-journeys' },
        _state2.default.joinableJourneys.map(function (journey) {
          return _react2.default.createElement(JoinableJourneyCard, { key: journey._id, journey: journey });
        })
      );
    }
  }]);

  return AutoCreatedJourneysQueue;
}(_react.Component);

var App = function (_Component4) {
  _inherits(App, _Component4);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_header2.default, null),
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', component: (0, _reactRouter.withRouter)(Login) }),
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/join', component: (0, _reactEasyState.view)(AutoCreatedJourneysQueue) }),
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _home2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:room', component: _Room2.default })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = (0, _reactRouter.withRouter)((0, _reactEasyState.view)(App));

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactEasyState = __webpack_require__(5);

var _state = __webpack_require__(3);

var _state2 = _interopRequireDefault(_state);

var _CuriousLiveLogo = __webpack_require__(87);

var _CuriousLiveLogo2 = _interopRequireDefault(_CuriousLiveLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header() {
  return _react2.default.createElement(
    'div',
    { className: 'header' },
    _react2.default.createElement(
      'h1',
      { className: 'logo' },
      _react2.default.createElement('img', { src: _CuriousLiveLogo2.default })
    ),
    false && _state2.default.loggedIn && _state2.default.user && _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        { className: 'mr-2 text-secondary' },
        'logged in as ',
        _state2.default.user.name
      ),
      _react2.default.createElement(
        'a',
        { href: '/api/logout' },
        'Logout'
      )
    )
  );
};

exports.default = (0, _reactEasyState.view)(Header);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f8a62333255a9846821aec2c092c395e.png";

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _user_list = __webpack_require__(89);

var _user_list2 = _interopRequireDefault(_user_list);

var _generator_form = __webpack_require__(90);

var _generator_form2 = _interopRequireDefault(_generator_form);

var _event_message = __webpack_require__(91);

var _event_message2 = _interopRequireDefault(_event_message);

var _journey_space_form = __webpack_require__(92);

var _journey_space_form2 = _interopRequireDefault(_journey_space_form);

var _state = __webpack_require__(3);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = {},
    OTSession = _ref.OTSession,
    OTPublisher = _ref.OTPublisher,
    OTStreams = _ref.OTStreams,
    OTSubscriber = _ref.OTSubscriber,
    createSession = _ref.createSession;


if (__CLIENT__) {
  var _require = __webpack_require__(10),
      OTSession = _require.OTSession,
      OTPublisher = _require.OTPublisher,
      OTStreams = _require.OTStreams,
      OTSubscriber = _require.OTSubscriber,
      createSession = _require.createSession;

  var OT = __webpack_require__(11);
}

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.state = {
      streams: [],
      publisherId: '',
      session: null,
      totalConnectionsCreated: 0,
      connectedUsers: []
    };
    _this.publisher = {};
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var roomUrl = 'temp-home-location';

      fetch('/api/sessions/' + roomUrl).then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.session = json;
        _this2.sessionHelper = createSession({
          apiKey: _state2.default.openTokKey,
          sessionId: _state2.default.session.sessionId,
          token: _state2.default.session.token,
          onConnect: function onConnect() {
            setTimeout(_this2.refreshSession, 1000);
            fetch('/api/sessions/' + roomUrl + '/joined', {
              body: JSON.stringify({ id: _this2.sessionHelper.session.connection.id }),
              credentials: 'same-origin', // include, same-origin, *omit
              headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
              },
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, cors, *same-origin
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer' // *client, no-referrer
            });
          },
          onStreamsUpdated: function onStreamsUpdated(streams) {
            _this2.setState({ streams: streams });
          }
        });
        window.sh = _this2.sessionHelper;
        _this2.sessionHelper.session.on("connectionDestroyed", function (event) {
          var data = {
            sessionId: _this2.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionDestroyed'

          };

          var updatedConnectionCount = _this2.state.totalConnectionsCreated - 1;
          _this2.setState({ totalConnectionsCreated: updatedConnectionCount });

          var newData = [].concat(_toConsumableArray(_this2.state.connectedUsers));
          var index = newData.map(function (d) {
            return d.connectionId;
          }).indexOf(event.connection.id);
          newData.splice(index, 1);
          _this2.setState({ connectedUsers: newData });
        });

        _this2.sessionHelper.session.on("connectionCreated", function (event) {
          var updatedConnectionCount = _this2.state.totalConnectionsCreated + 1;
          _this2.setState({ totalConnectionsCreated: updatedConnectionCount });

          var data = {
            sessionId: _this2.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionCreated'
          };

          var tries = 10;
          var fetchRetry = function fetchRetry() {
            fetch('/api/sessions/' + roomUrl + '/' + event.connection.id).then(function (res) {
              return res.json();
            }).then(function (json) {
              if (!json && tries-- > 0) {
                setTimeout(fetchRetry, 500);
              } else {
                _this2.setState({
                  connectedUsers: [].concat(_toConsumableArray(_this2.state.connectedUsers), [json])
                });
              }
            });
          };
          fetchRetry();
        });

        _this2.sessionHelper.session.on("signal", function (event) {
          if (event.type === 'signal:displayJourneyRequest') {
            _this2.setState({
              displayMessageVisible: true,
              displayMessageText: "George has created a session 'Daily Jetsons Meditation'.", //TEMP hard coded
              sessionUrl: '/another-jetsons-url'
            });
          }
        });

        _this2.setState({
          session: _this2.sessionHelper.session
        });
      });

      fetch('/api/journeys').then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.journeys = json;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'home container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(_user_list2.default, { userCount: this.state.totalConnectionsCreated, connections: this.state.connectedUsers }),
          _react2.default.createElement(
            'div',
            { className: 'col-sm' },
            _react2.default.createElement(_journey_space_form2.default, null),
            _react2.default.createElement(_event_message2.default, { journeys: _state2.default.journeys })
          )
        )
      );
    }
  }]);

  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserList = function (_Component) {
  _inherits(UserList, _Component);

  function UserList(props) {
    _classCallCheck(this, UserList);

    return _possibleConstructorReturn(this, (UserList.__proto__ || Object.getPrototypeOf(UserList)).call(this, props));
  }

  _createClass(UserList, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "col-sm" },
        _react2.default.createElement(
          "h4",
          null,
          "Current Users (",
          this.props.userCount,
          ")"
        ),
        _react2.default.createElement(
          "ul",
          null,
          this.props.connections.map(function (connection) {
            return _react2.default.createElement(
              "li",
              { key: connection.user.name },
              connection.user.name
            );
          })
        )
      );
    }
  }]);

  return UserList;
}(_react.Component);

exports.default = UserList;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _state = __webpack_require__(3);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GeneratorForm = function (_Component) {
  _inherits(GeneratorForm, _Component);

  function GeneratorForm(props) {
    _classCallCheck(this, GeneratorForm);

    var _this = _possibleConstructorReturn(this, (GeneratorForm.__proto__ || Object.getPrototypeOf(GeneratorForm)).call(this, props));

    _this.state = {
      sessionLinkName: '',
      sessionLinkUrl: '',
      activeJourneys: []
    };

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.urlFriendlyName = _this.urlFriendlyName.bind(_this);
    _this.createSessionLink = _this.createSessionLink.bind(_this);

    return _this;
  }

  _createClass(GeneratorForm, [{
    key: 'createSessionLink',
    value: function createSessionLink() {
      this.setState({ sessionLinkUrl: this.urlFriendlyName(this.state.sessionLinkName) });
      fetch('/api/sessions/test/temp-home-location');

      fetch('/api/active_journeys').then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.activeJourneys = json;
      });
    }
  }, {
    key: 'sendNotifications',
    value: function sendNotifications() {}
  }, {
    key: 'handleNameChange',
    value: function handleNameChange(event) {
      this.setState({ sessionLinkName: event.target.value });
    }
  }, {
    key: 'urlFriendlyName',
    value: function urlFriendlyName(name) {
      return name.replace(/\s+/g, '-').toLowerCase();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Hello'
      );
    }
  }]);

  return GeneratorForm;
}(_react.Component);

exports.default = GeneratorForm;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventMessage = function EventMessage(props) {
  return _react2.default.createElement(
    'div',
    { className: 'col-sm' },
    props.journeys.map(function (journey, index) {
      return _react2.default.createElement(
        'p',
        { key: index,
          style: { backgroundColor: '#fc9', padding: '7px' } },
        'A journey space has been created.',
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'a',
          { href: "/" + journey.room, target: '_blank' },
          'Join'
        ),
        '\xA0\xA0',
        _react2.default.createElement(
          'a',
          { href: '#' },
          'Share'
        )
      );
    })
  );
};

exports.default = EventMessage;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _journey_detail_entry = __webpack_require__(93);

var _journey_detail_entry2 = _interopRequireDefault(_journey_detail_entry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JourneySpaceForm = function (_Component) {
  _inherits(JourneySpaceForm, _Component);

  function JourneySpaceForm(props) {
    _classCallCheck(this, JourneySpaceForm);

    var _this = _possibleConstructorReturn(this, (JourneySpaceForm.__proto__ || Object.getPrototypeOf(JourneySpaceForm)).call(this, props));

    _this.state = {
      visible: false
    };

    _this.toggleVisibility = _this.toggleVisibility.bind(_this);
    return _this;
  }

  _createClass(JourneySpaceForm, [{
    key: 'toggleVisibility',
    value: function toggleVisibility() {
      this.setState({ visible: !this.state.visible });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'col-sm' },
        _react2.default.createElement(
          'div',
          { className: 'container', style: { border: '1px solid #e6e6e6', padding: '10px' } },
          _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-outline-primary btn-block', onClick: this.toggleVisibility },
              _react2.default.createElement('i', { className: 'fa fa-plus' }),
              '\xA0\xA0Create a new Journey Space'
            ),
            _react2.default.createElement(_journey_detail_entry2.default, { detailVisibility: this.state.visible })
          )
        )
      );
    }
  }]);

  return JourneySpaceForm;
}(_react.Component);

exports.default = JourneySpaceForm;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _session_info = __webpack_require__(94);

var _session_info2 = _interopRequireDefault(_session_info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JourneyDetailEntry = function (_Component) {
  _inherits(JourneyDetailEntry, _Component);

  function JourneyDetailEntry(props) {
    _classCallCheck(this, JourneyDetailEntry);

    var _this = _possibleConstructorReturn(this, (JourneyDetailEntry.__proto__ || Object.getPrototypeOf(JourneyDetailEntry)).call(this, props));

    _this.state = {
      visible: false,
      sessionVisible: false,
      sessionLinkName: '',
      sessionLinkUrl: '',
      activeJourneys: []
    };

    _this.handleNameChange = _this.handleNameChange.bind(_this);
    _this.urlFriendlyName = _this.urlFriendlyName.bind(_this);
    _this.createSessionLink = _this.createSessionLink.bind(_this);

    return _this;
  }

  _createClass(JourneyDetailEntry, [{
    key: 'createSessionLink',
    value: function createSessionLink() {
      var _this2 = this;

      this.setState({ sessionLinkUrl: this.urlFriendlyName(this.state.sessionLinkName) });
      fetch('/api/sessions/test/temp-home-location');

      fetch('/api/active_journeys').then(function (res) {
        return res.json();
      }).then(function (json) {
        state.activeJourneys = json;
        _this2.setState({ sessionVisible: true });
      });
    }
  }, {
    key: 'handleNameChange',
    value: function handleNameChange(event) {
      this.setState({ sessionLinkName: event.target.value });
    }
  }, {
    key: 'urlFriendlyName',
    value: function urlFriendlyName(name) {
      return name.replace(/\s+/g, '-').toLowerCase();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ visible: nextProps.detailVisibility });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.visible === true) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h3',
            null,
            'Enter Journey Details'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Give your room a name:',
            _react2.default.createElement('br', null),
            _react2.default.createElement('input', { type: 'text', id: 'session_link', onChange: this.handleNameChange })
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement('input', { type: 'button', className: 'btn btn-primary', value: 'Create a journey space', onClick: this.createSessionLink })
          ),
          _react2.default.createElement(_session_info2.default, { sessionVisibility: this.state.sessionVisible, sessionLink: this.state.sessionLinkUrl })
        );
      } else {
        return _react2.default.createElement('div', null);
      }
    }
  }]);

  return JourneyDetailEntry;
}(_react.Component);

exports.default = JourneyDetailEntry;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionInfo = function (_Component) {
  _inherits(SessionInfo, _Component);

  function SessionInfo(props) {
    _classCallCheck(this, SessionInfo);

    var _this = _possibleConstructorReturn(this, (SessionInfo.__proto__ || Object.getPrototypeOf(SessionInfo)).call(this, props));

    _this.state = {
      visible: false,
      sessionLinkUrl: ''
    };

    _this.jumpToSession = _this.jumpToSession.bind(_this);
    return _this;
  }

  _createClass(SessionInfo, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ sessionLinkUrl: nextProps.sessionLink });
      this.setState({ visible: nextProps.sessionVisibility });
    }
  }, {
    key: 'jumpToSession',
    value: function jumpToSession() {
      window.open(this.state.sessionLinkUrl, "_blank");
    }

    // TODO: npm install --save react@^16.2.0 react-dom@^16.2.0 for getDerivedstateFromProps

  }, {
    key: 'render',
    value: function render() {
      if (this.state.visible === true) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'strong',
            null,
            'You created journey space!'
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'span',
              { style: { fontWeight: 'bold', backgroundColor: '#ccc', padding: '7px' } },
              'www.wacuri.com/',
              this.state.sessionLinkUrl
            ),
            '\xA0',
            _react2.default.createElement('input', { className: 'btn btn-primary', type: 'button', value: 'Jump to the session', onClick: this.jumpToSession })
          )
        );
      } else {
        return _react2.default.createElement('div', null);
      }
    }
  }]);

  return SessionInfo;
}(_react.Component);

exports.default = SessionInfo;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(14);

var _events2 = _interopRequireDefault(_events);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactEasyState = __webpack_require__(5);

var _reactRouterDom = __webpack_require__(24);

var _signature_pad = __webpack_require__(96);

var _signature_pad2 = _interopRequireDefault(_signature_pad);

var _state = __webpack_require__(3);

var _state2 = _interopRequireDefault(_state);

var _propTypes = __webpack_require__(25);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid = __webpack_require__(97);

var _uuid2 = _interopRequireDefault(_uuid);

var _opentokLayoutJs = __webpack_require__(98);

__webpack_require__(99);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(100).polyfill();
__webpack_require__(22);

var _ref = {},
    OTSession = _ref.OTSession,
    OTPublisher = _ref.OTPublisher,
    OTStreams = _ref.OTStreams,
    OTSubscriber = _ref.OTSubscriber,
    createSession = _ref.createSession;


if (__CLIENT__) {
  var _require = __webpack_require__(10),
      OTSession = _require.OTSession,
      OTPublisher = _require.OTPublisher,
      OTStreams = _require.OTStreams,
      OTSubscriber = _require.OTSubscriber,
      createSession = _require.createSession;

  var OT = __webpack_require__(11);
  window.state = _state2.default;
  window.signpad = _signature_pad2.default;
}

var AbstractTimerEmitter = function (_EventEmitter) {
  _inherits(AbstractTimerEmitter, _EventEmitter);

  function AbstractTimerEmitter() {
    _classCallCheck(this, AbstractTimerEmitter);

    return _possibleConstructorReturn(this, (AbstractTimerEmitter.__proto__ || Object.getPrototypeOf(AbstractTimerEmitter)).apply(this, arguments));
  }

  _createClass(AbstractTimerEmitter, [{
    key: '_displayTime',
    value: function _displayTime(millisec) {
      if (millisec < 0) {
        return '0:00';
      }
      var normalizeTime = function normalizeTime(time) {
        return time.length === 1 ? time.padStart(2, '0') : time;
      };

      var seconds = (millisec / 1000).toFixed(0);
      var minutes = Math.floor(parseInt(seconds) / 60).toString();
      var hours = '';

      if (parseInt(minutes) > 59) {
        hours = normalizeTime(Math.floor(parseInt(minutes) / 60).toString());
        minutes = normalizeTime((parseInt(minutes) - parseInt(hours) * 60).toString());
      }
      seconds = normalizeTime(Math.floor(parseInt(seconds) % 60).toString());

      if (hours !== '') {
        return hours + ':' + minutes + ':' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }]);

  return AbstractTimerEmitter;
}(_events2.default);

var SecondsTimerEmitter = function (_AbstractTimerEmitter) {
  _inherits(SecondsTimerEmitter, _AbstractTimerEmitter);

  function SecondsTimerEmitter(createdAt, startAt) {
    _classCallCheck(this, SecondsTimerEmitter);

    var _this3 = _possibleConstructorReturn(this, (SecondsTimerEmitter.__proto__ || Object.getPrototypeOf(SecondsTimerEmitter)).call(this));

    _this3.start = createdAt.getTime();
    _this3.total = startAt.getTime() - _this3.start;
    _this3.passed = new Date().getTime() - _this3.start;
    _this3.interval = setInterval(function () {
      _this3.passed = new Date().getTime() - _this3.start;
      if (_this3.passed >= _this3.total) {
        clearInterval(_this3.interval);
      }
      _this3.emit('tick', _this3.passed);
    }, 100);
    return _this3;
  }

  _createClass(SecondsTimerEmitter, [{
    key: 'displayTime',
    value: function displayTime() {
      return this._displayTime(this.total - this.passed);
    }
  }]);

  return SecondsTimerEmitter;
}(AbstractTimerEmitter);

var AudioPlayTickEmitter = function (_AbstractTimerEmitter2) {
  _inherits(AudioPlayTickEmitter, _AbstractTimerEmitter2);

  function AudioPlayTickEmitter(audioElement) {
    _classCallCheck(this, AudioPlayTickEmitter);

    var _this4 = _possibleConstructorReturn(this, (AudioPlayTickEmitter.__proto__ || Object.getPrototypeOf(AudioPlayTickEmitter)).call(this));

    _this4.onTimeUpdate = function (e) {
      _this4.currentTime = e.target.currentTime;
      _this4.emit('tick', e.target.currentTime);
    };

    _this4.currentTime = audioElement.currentTime || 0;
    _this4.total = audioElement.duration;
    audioElement.addEventListener('timeupdate', _this4.onTimeUpdate);
    return _this4;
  }

  _createClass(AudioPlayTickEmitter, [{
    key: 'displayTime',
    value: function displayTime() {
      return this._displayTime((this.total - this.currentTime) * 1000);
    }
  }]);

  return AudioPlayTickEmitter;
}(AbstractTimerEmitter);

var FlagControl = function FlagControl(_ref2) {
  var currentUserHasFlaggedJourney = _ref2.currentUserHasFlaggedJourney,
      onFlag = _ref2.onFlag,
      children = _ref2.children;

  return _react2.default.createElement(
    'button',
    {
      className: 'btn btn-flag-session',
      disabled: currentUserHasFlaggedJourney,
      onClick: onFlag },
    children
  );
};

var Waiting = function (_Component) {
  _inherits(Waiting, _Component);

  function Waiting(props) {
    _classCallCheck(this, Waiting);

    var _this5 = _possibleConstructorReturn(this, (Waiting.__proto__ || Object.getPrototypeOf(Waiting)).call(this, props));

    _this5.onToggle = function (e) {
      _this5.setState({
        open: !_this5.state.open
      });
    };

    _this5.state = {
      open: true
    };
    return _this5;
  }

  _createClass(Waiting, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.canvas) {
        var _fadeOut = function _fadeOut() {
          var ctx = _this.canvas.getContext('2d');
          ctx.fillStyle = "rgba(0,0,0,0.01)";
          ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
          setTimeout(_fadeOut, 100);
        };

        var signaturePad = new _signature_pad2.default(this.canvas, {
          backgroundColor: 'rgb(255, 255, 255)',
          penColor: '#666',
          minWidth: 1,
          maxWidth: 10
        });

        var _this = this;


        var ctx = _this.canvas.getContext('2d');
        ctx.fillStyle = "rgba(42,42,42,1)";
        ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height);

        _fadeOut();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        'div',
        { style: { overflow: 'hidden', position: 'relative' } },
        !this.state.open && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            'Chill out, draw something:'
          ),
          _react2.default.createElement(
            'div',
            { className: 'wrapper' },
            _react2.default.createElement('canvas', { className: 'signature-pad', ref: function ref(el) {
                return _this6.canvas = el;
              }, width: 400, height: 400 })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'waiting', style: { transform: 'translateY(' + (this.state.open ? '0' : '94%') + ')', position: '' + (this.state.open ? 'relative' : 'absolute') } },
          _react2.default.createElement(
            'a',
            { className: 'text-right mr-3', style: { display: 'block', color: 'white' }, href: '#', onClick: this.onToggle },
            this.state.open ? 'Close X' : 'Open ^'
          ),
          _react2.default.createElement('iframe', { height: '100%', width: '100%', style: { width: '100%', height: '400px', border: 'none' }, src: '/pdf.html' })
        )
      );
    }
  }]);

  return Waiting;
}(_react.Component);

var JourneyStateProgressBar = function (_Component2) {
  _inherits(JourneyStateProgressBar, _Component2);

  function JourneyStateProgressBar(props) {
    _classCallCheck(this, JourneyStateProgressBar);

    var _this7 = _possibleConstructorReturn(this, (JourneyStateProgressBar.__proto__ || Object.getPrototypeOf(JourneyStateProgressBar)).call(this, props));

    props.timer.on('tick', function (current) {
      _this7.setState({
        timerValue: current
      });
    });
    _this7.state = {
      timerValue: 0,
      total: props.timer.total
    };
    return _this7;
  }

  _createClass(JourneyStateProgressBar, [{
    key: 'formatState',
    value: function formatState(state) {
      switch (this.props.journey.state) {
        case 'joined':
          return 'Waiting';
        case 'started':
          return 'The Journey';
        case 'ended':
          return 'The Sharing';
        case 'failed':
          return 'No one joined';
        default:
          return 'Waiting';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'journeyspace-progress pl-3 pr-3' },
        _react2.default.createElement(
          'small',
          null,
          'Current Section'
        ),
        _react2.default.createElement('progress', { max: this.props.timer.total, value: this.state.timerValue, style: { width: '100%' } }),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex' } },
          _react2.default.createElement(
            'p',
            null,
            this.formatState(this.props.journey.state)
          ),
          _react2.default.createElement(
            'p',
            { style: { marginLeft: 'auto' } },
            '-',
            this.props.timer.displayTime()
          )
        )
      );
    }
  }]);

  return JourneyStateProgressBar;
}(_react.Component);

var Room = function (_Component3) {
  _inherits(Room, _Component3);

  function Room(props) {
    _classCallCheck(this, Room);

    var _this8 = _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this, props));

    _this8.refreshSession = function () {
      fetch('/api/sessions/' + _this8.props.match.params.room).then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.session = json;
      });
    };

    _this8.onInitPublisher = function () {
      console.log('initialized publisher');
    };

    _this8.onConfirmReady = function (e) {
      fetch('/api/sessions/' + _this8.props.match.params.room + '/connections/' + _this8.sessionHelper.session.connection.id + '/ready');
    };

    _this8.onChangeJourney = function (e) {
      fetch('/api/sessions/' + _this8.props.match.params.room + '/journey', {
        body: JSON.stringify({ journey: e.target.value }), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      });
    };

    _this8.onStartSession = function (e) {
      fetch('/api/sessions/' + _this8.props.match.params.room + '/start', {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors'
      });
    };

    _this8.onLoadedMetadata = function (e) {
      _this8.setState({
        journeyDuration: e.target.duration
      });
      _this8.audioTag.removeEventListener('timeupdate', _this8.onTimeUpdate);
      _this8.audioTag.addEventListener('timeupdate', _this8.onTimeUpdate);
    };

    _this8.onTimeUpdate = function (e) {
      _this8.setState({
        playerProgress: e.target.currentTime / e.target.duration * 100,
        playerProgressMS: e.target.currentTime
      });
      if (_this8.isHostUser) {
        fetch('/api/journeys/' + _this8.props.match.params.room + '/progress', {
          body: JSON.stringify({ currentTime: e.target.currentTime }),
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
          },
          method: 'PUT',
          mode: 'cors'
        });
      }
    };

    _this8.onFlag = function (e) {
      e.preventDefault();
      fetch('/api/sessions/' + _this8.props.match.params.room + '/flag', {
        cache: 'no-cache',
        body: JSON.stringify({ connectionId: _this8.state.session.connection.id }),
        credentials: 'same-origin',
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors'
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        return _state2.default.session = json;
      });
    };

    _this8.onShare = function (e) {
      navigator.share({
        title: 'Take a Journey With Me!',
        text: 'Join me on ' + _state2.default.session.name,
        url: window.location.protocol + '//' + window.location.host + '/' + _state2.default.session.room
      });
    };

    _this8.state = {
      streams: [],
      publisherId: '',
      session: null,
      playerState: 'waiting',
      playerProgress: 0,
      playerProgressMS: 0,
      journeyDuration: 0,
      currentlyActivePublisher: null
    };
    _this8.publisher = {};
    _this8.audioTag = {};
    return _this8;
  }

  _createClass(Room, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this9 = this;

      this.audioTag.addEventListener('ended', function (event) {
        if (_this9.publisher && _this9.publisher.state && _this9.publisher.state.publisher) {
          _this9.publisher.state.publisher.publishAudio(true);
        }
        _this9.setState({
          playerState: 'ended'
        });

        fetch('/api/journeys/' + _this9.props.match.params.room + '/completed', {
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer' // *client, no-referrer
        });
      });

      fetch('/api/sessions/' + this.props.match.params.room).then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.session = json;
        _this9.sessionHelper = createSession({
          apiKey: _state2.default.openTokKey,
          sessionId: _state2.default.session.sessionId,
          token: _state2.default.session.token,
          onConnect: function onConnect() {
            console.log('assigned connection to publisher', _this9.sessionHelper.session.connection);
            setTimeout(_this9.refreshSession, 1000);
          },
          onStreamsUpdated: function onStreamsUpdated(streams) {
            console.log('Current subscriber streams:', streams);
            _this9.setState({ streams: streams });
            if (!_this9.state.currentlyActivePublisher) {
              _this9.setState({
                currentlyActivePublisher: streams[0]
              });
            }
          }
        });
        _this9.sessionHelper.session.on("connectionDestroyed", function (event) {
          var data = {
            sessionId: _this9.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionDestroyed'
          };
          _this9.refreshSession();
        });
        _this9.sessionHelper.session.on("connectionCreated", function (event) {
          console.log('CREATED', event);
          var data = {
            sessionId: _this9.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionCreated'
          };
          _this9.refreshSession();
        });
        _this9.sessionHelper.session.on('signal', function (event) {
          console.log("Signal sent from connection ", event);
          _this9.refreshSession();
        });

        _this9.sessionHelper.session.on("signal:startJourney", function (event) {
          _this9.publisher.state.publisher.publishAudio(false);
          _this9.audioTag.play();
          _this9.setState({
            playerState: 'playing'
          });
        });

        _this9.sessionHelper.session.on("signal:fail", function (event) {
          _state2.default.session.state = 'failed';
        });

        _this9.setState({
          session: _this9.sessionHelper.session
        });

        var onAudioCanPlay = function onAudioCanPlay(event) {
          if (_state2.default.session.state === 'started') {
            _this9.audioTag.play();
            if (!isNaN(_state2.default.session.currentTime)) {
              _this9.audioTag.currentTime = _state2.default.session.currentTime;
            }
          }
          _this9.audioTag.removeEventListener('canplaythrough', onAudioCanPlay);
        };

        _this9.audioTag.addEventListener('canplaythrough', onAudioCanPlay, false);
        _this9.audioTag.load();
      });
      fetch('/api/journeys').then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.journeys = json;
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.sessionHelper) {
        this.sessionHelper.disconnect();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this10 = this;

      var currentParticipant = this.state.session && this.state.session.connection && _state2.default.session && _state2.default.session.participants.find(function (participant) {
        return participant.connectionId === _this10.state.session.connection.id;
      });
      var currentUserHasFlaggedJourney = _state2.default.session && _state2.default.session.flags.map(function (flag) {
        return flag.user;
      }).indexOf(_state2.default.sessionId) > -1;
      return _react2.default.createElement(
        'div',
        { className: 'journeyspace' },
        _react2.default.createElement(
          'div',
          { className: 'journeyspace-content' },
          _react2.default.createElement(
            'audio',
            { style: { display: 'none' }, onLoadedMetadata: this.onLoadedMetadata, key: _state2.default.session && _state2.default.session.journey, controls: 'true', ref: function ref(audioTag) {
                _this10.audioTag = audioTag;
              } },
            _react2.default.createElement('source', { src: _state2.default.session && _state2.default.session.journey, type: 'audio/mpeg' })
          ),
          this.state.session && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'journeyspace-meta pr-3 pl-3 pt-3' },
              _react2.default.createElement(
                'div',
                { style: { display: 'flex' } },
                _react2.default.createElement(
                  'h2',
                  { style: { flex: 5 }, className: 'journeyspace-title' },
                  _state2.default.session.name
                ),
                _react2.default.createElement(
                  'div',
                  _defineProperty({ className: 'journeyspace-attendeeCount', style: { flex: 1 } }, 'className', 'journeyspace-attendeeCount'),
                  _react2.default.createElement(
                    'h4',
                    { className: 'journeyspace-attendeeCountLabel' },
                    'Attendees'
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'journeyspace-attendeeCountCount' },
                    _state2.default.session.rsvps.length,
                    ' of 3'
                  )
                )
              ),
              this.isHostUser && _react2.default.createElement(
                'div',
                null,
                false && _state2.default.session.state === 'created' || _state2.default.session.state === 'joined' && _react2.default.createElement(
                  'select',
                  { onChange: this.onChangeJourney, value: _state2.default.session && _state2.default.session.journey },
                  _state2.default.journeys.map(function (journey) {
                    return _react2.default.createElement(
                      'option',
                      { value: journey.filePath },
                      journey.name
                    );
                  })
                ),
                _state2.default.session.state === 'created' && _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'button',
                    { onClick: this.onStartSession, className: 'btn btn-primary' },
                    'Start session ',
                    _react2.default.createElement('i', { className: 'fa fa-play' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'journeyspace-share text-right' },
                _react2.default.createElement(
                  'a',
                  { href: '#', onClick: this.onShare },
                  'Share ',
                  _react2.default.createElement('i', { className: 'fa fa-share-square-o' })
                )
              ),
              _react2.default.createElement(
                'div',
                { style: { display: 'none' } },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement('progress', { max: '100', value: this.state.playerProgress, style: { width: '100%' } }),
                  _react2.default.createElement(
                    'p',
                    { style: { display: 'flex' } },
                    _react2.default.createElement(
                      'strong',
                      { style: { flex: 1 } },
                      'Time remaining:'
                    ),
                    _react2.default.createElement(
                      'span',
                      null,
                      this.timeRemaining
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(JourneyStateProgressBar, { journey: _state2.default.session, timer: this.journeyStateTimer }),
            _state2.default.session.state === 'failed' && _react2.default.createElement(
              'p',
              { className: 'p-3' },
              ':( No one else joined this journey with you. \xA0',
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/join' },
                'Go Back to the list'
              ),
              ' and pick a different one, or \xA0 ',
              _react2.default.createElement(
                'button',
                { className: 'btn', onClick: this.onStartSession },
                'Start the journey'
              )
            ),
            _state2.default.session.state === 'joined' && _react2.default.createElement(Waiting, null),
            _state2.default.session.state === 'started' && _react2.default.createElement(
              'div',
              { className: 'journeyspace-container journeyspace-streams-count-' + (this.state.streams.length + 1) + ' ' + (this.state.streams.length >= 2 ? 'journeyspace-grid-layout' : '') },
              this.state.streams.map(function (stream) {
                var participant = _state2.default.session.participants.find(function (participant) {
                  return participant.connectionId === stream.connection.id;
                });
                return _react2.default.createElement(
                  'div',
                  { className: 'journeyspace-stream ' + (_this10.state.currentlyActivePublisher ? 'journeyspace-active-stream' : '') },
                  _react2.default.createElement(OTSubscriber, {
                    key: stream.id,
                    session: _this10.sessionHelper.session,
                    stream: stream,
                    properties: {
                      width: '100%',
                      height: '100%'
                    }
                  })
                );
              }),
              _react2.default.createElement(
                'div',
                { className: 'journeyspace-stream journeyspace-me' },
                _react2.default.createElement(OTPublisher, {
                  properties: { width: '100%', height: '100%' },
                  session: this.sessionHelper.session,
                  onInit: this.onInitPublisher,
                  ref: function ref(publisher) {
                    _this10.publisher = publisher;
                  }
                })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'journeyspace-footer', style: { display: 'flex' } },
          _react2.default.createElement(
            'div',
            { style: { flex: 1 } },
            _react2.default.createElement(
              FlagControl,
              { currentUserHasFlaggedJourney: currentUserHasFlaggedJourney, onFlag: this.onFlag },
              currentUserHasFlaggedJourney ? "Reported" : "Report"
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { marginLeft: 'auto', marginRight: '10px', alignSelf: 'center' } },
            _react2.default.createElement(
              'a',
              { className: 'mr-2' },
              _react2.default.createElement('i', { className: 'fa fa-camera', ariaHidden: 'true' })
            ),
            _react2.default.createElement(
              'a',
              { className: '' },
              _react2.default.createElement('i', { className: 'fa fa-microphone', ariaHidden: 'true' })
            )
          )
        )
      );
    }
  }, {
    key: 'timeRemaining',
    get: function get() {
      var seconds = this.state.journeyDuration - this.state.playerProgressMS;
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = (seconds % 60).toFixed(0);
      return minutes + ":" + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    }
  }, {
    key: 'isHostUser',
    get: function get() {
      var _this11 = this;

      var currentParticipant = this.state.session && this.state.session.connection && _state2.default.session && _state2.default.session.participants.find(function (participant) {
        return participant.connectionId === _this11.state.session.connection.id;
      });
      return currentParticipant && _state2.default.session.participants.indexOf(currentParticipant) === 0;
    }
  }, {
    key: 'journeyStateTimer',
    get: function get() {
      switch (_state2.default.session.state) {
        case 'started':
          return new AudioPlayTickEmitter(this.audioTag);
        default:
          return new SecondsTimerEmitter(new Date(_state2.default.session.createdAt), new Date(_state2.default.session.startAt));
      }
    }
  }]);

  return Room;
}(_react.Component);

exports.default = (0, _reactEasyState.view)(Room);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Signature Pad v3.0.0-beta.2 | https://github.com/szimek/signature_pad
 * (c) 2018 Szymon Nowak | Released under the MIT license
 */

(function (global, factory) {
    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.SignaturePad = factory();
})(undefined, function () {
    'use strict';

    var Point = function () {
        function Point(x, y, time) {
            this.x = x;
            this.y = y;
            this.time = time || Date.now();
        }
        Point.prototype.distanceTo = function (start) {
            return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
        };
        Point.prototype.equals = function (other) {
            return this.x === other.x && this.y === other.y && this.time === other.time;
        };
        Point.prototype.velocityFrom = function (start) {
            return this.time !== start.time ? this.distanceTo(start) / (this.time - start.time) : 0;
        };
        return Point;
    }();

    var Bezier = function () {
        function Bezier(startPoint, control2, control1, endPoint, startWidth, endWidth) {
            this.startPoint = startPoint;
            this.control2 = control2;
            this.control1 = control1;
            this.endPoint = endPoint;
            this.startWidth = startWidth;
            this.endWidth = endWidth;
        }
        Bezier.fromPoints = function (points, widths) {
            var c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
            var c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
            return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
        };
        Bezier.calculateControlPoints = function (s1, s2, s3) {
            var dx1 = s1.x - s2.x;
            var dy1 = s1.y - s2.y;
            var dx2 = s2.x - s3.x;
            var dy2 = s2.y - s3.y;
            var m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
            var m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };
            var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            var dxm = m1.x - m2.x;
            var dym = m1.y - m2.y;
            var k = l2 / (l1 + l2);
            var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
            var tx = s2.x - cm.x;
            var ty = s2.y - cm.y;
            return {
                c1: new Point(m1.x + tx, m1.y + ty),
                c2: new Point(m2.x + tx, m2.y + ty)
            };
        };
        Bezier.prototype.length = function () {
            var steps = 10;
            var length = 0;
            var px;
            var py;
            for (var i = 0; i <= steps; i += 1) {
                var t = i / steps;
                var cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
                var cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
                if (i > 0) {
                    var xdiff = cx - px;
                    var ydiff = cy - py;
                    length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
                }
                px = cx;
                py = cy;
            }
            return length;
        };
        Bezier.prototype.point = function (t, start, c1, c2, end) {
            return start * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * c1 * (1.0 - t) * (1.0 - t) * t + 3.0 * c2 * (1.0 - t) * t * t + end * t * t * t;
        };
        return Bezier;
    }();

    function throttle(fn, wait) {
        if (wait === void 0) {
            wait = 250;
        }
        var previous = 0;
        var timeout = null;
        var result;
        var storedContext;
        var storedArgs;
        var later = function later() {
            previous = Date.now();
            timeout = null;
            result = fn.apply(storedContext, storedArgs);
            if (!timeout) {
                storedContext = null;
                storedArgs = [];
            }
        };
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var now = Date.now();
            var remaining = wait - (now - previous);
            storedContext = this;
            storedArgs = args;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = fn.apply(storedContext, storedArgs);
                if (!timeout) {
                    storedContext = null;
                    storedArgs = [];
                }
            } else if (!timeout) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    }

    var SignaturePad = function () {
        function SignaturePad(canvas, options) {
            if (options === void 0) {
                options = {};
            }
            var _this = this;
            this.canvas = canvas;
            this.options = options;
            this._handleMouseDown = function (event) {
                if (event.which === 1) {
                    _this._mouseButtonDown = true;
                    _this._strokeBegin(event);
                }
            };
            this._handleMouseMove = function (event) {
                if (_this._mouseButtonDown) {
                    _this._strokeMoveUpdate(event);
                }
            };
            this._handleMouseUp = function (event) {
                if (event.which === 1 && _this._mouseButtonDown) {
                    _this._mouseButtonDown = false;
                    _this._strokeEnd(event);
                }
            };
            this._handleTouchStart = function (event) {
                event.preventDefault();
                if (event.targetTouches.length === 1) {
                    var touch = event.changedTouches[0];
                    _this._strokeBegin(touch);
                }
            };
            this._handleTouchMove = function (event) {
                event.preventDefault();
                var touch = event.targetTouches[0];
                _this._strokeMoveUpdate(touch);
            };
            this._handleTouchEnd = function (event) {
                var wasCanvasTouched = event.target === _this.canvas;
                if (wasCanvasTouched) {
                    event.preventDefault();
                    var touch = event.changedTouches[0];
                    _this._strokeEnd(touch);
                }
            };
            this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
            this.minWidth = options.minWidth || 0.5;
            this.maxWidth = options.maxWidth || 2.5;
            this.throttle = "throttle" in options ? options.throttle : 16;
            this.minDistance = "minDistance" in options ? options.minDistance : 5;
            if (this.throttle) {
                this._strokeMoveUpdate = throttle(SignaturePad.prototype._strokeUpdate, this.throttle);
            } else {
                this._strokeMoveUpdate = SignaturePad.prototype._strokeUpdate;
            }
            this.dotSize = options.dotSize || function () {
                return (this.minWidth + this.maxWidth) / 2;
            };
            this.penColor = options.penColor || "black";
            this.backgroundColor = options.backgroundColor || "rgba(0,0,0,0)";
            this.onBegin = options.onBegin;
            this.onEnd = options.onEnd;
            this._ctx = canvas.getContext("2d");
            this.clear();
            this.on();
        }
        SignaturePad.prototype.clear = function () {
            var ctx = this._ctx;
            var canvas = this.canvas;
            ctx.fillStyle = this.backgroundColor;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this._data = [];
            this._reset();
            this._isEmpty = true;
        };
        SignaturePad.prototype.fromDataURL = function (dataUrl, options, callback) {
            var _this = this;
            if (options === void 0) {
                options = {};
            }
            var image = new Image();
            var ratio = options.ratio || window.devicePixelRatio || 1;
            var width = options.width || this.canvas.width / ratio;
            var height = options.height || this.canvas.height / ratio;
            this._reset();
            image.onload = function () {
                _this._ctx.drawImage(image, 0, 0, width, height);
                if (callback) {
                    callback();
                }
            };
            image.onerror = function (error) {
                if (callback) {
                    callback(error);
                }
            };
            image.src = dataUrl;
            this._isEmpty = false;
        };
        SignaturePad.prototype.toDataURL = function (type, encoderOptions) {
            if (type === void 0) {
                type = "image/png";
            }
            switch (type) {
                case "image/svg+xml":
                    return this._toSVG();
                default:
                    return this.canvas.toDataURL(type, encoderOptions);
            }
        };
        SignaturePad.prototype.on = function () {
            this._handleMouseEvents();
            if ("ontouchstart" in window) {
                this._handleTouchEvents();
            }
        };
        SignaturePad.prototype.off = function () {
            this.canvas.style.msTouchAction = "auto";
            this.canvas.style.touchAction = "auto";
            this.canvas.removeEventListener("mousedown", this._handleMouseDown);
            this.canvas.removeEventListener("mousemove", this._handleMouseMove);
            document.removeEventListener("mouseup", this._handleMouseUp);
            this.canvas.removeEventListener("touchstart", this._handleTouchStart);
            this.canvas.removeEventListener("touchmove", this._handleTouchMove);
            this.canvas.removeEventListener("touchend", this._handleTouchEnd);
        };
        SignaturePad.prototype.isEmpty = function () {
            return this._isEmpty;
        };
        SignaturePad.prototype.fromData = function (pointGroups) {
            var _this = this;
            this.clear();
            this._fromData(pointGroups, function (_a) {
                var color = _a.color,
                    curve = _a.curve;
                return _this._drawCurve({ color: color, curve: curve });
            }, function (_a) {
                var color = _a.color,
                    point = _a.point;
                return _this._drawDot({ color: color, point: point });
            });
            this._data = pointGroups;
        };
        SignaturePad.prototype.toData = function () {
            return this._data;
        };
        SignaturePad.prototype._strokeBegin = function (event) {
            var newPointGroup = {
                color: this.penColor,
                points: []
            };
            this._data.push(newPointGroup);
            this._reset();
            this._strokeUpdate(event);
            if (typeof this.onBegin === "function") {
                this.onBegin(event);
            }
        };
        SignaturePad.prototype._strokeUpdate = function (event) {
            var x = event.clientX;
            var y = event.clientY;
            var point = this._createPoint(x, y);
            var lastPointGroup = this._data[this._data.length - 1];
            var lastPoints = lastPointGroup.points;
            var lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
            var isLastPointTooClose = lastPoint ? point.distanceTo(lastPoint) <= this.minDistance : false;
            var color = lastPointGroup.color;
            if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
                var curve = this._addPoint(point);
                if (!lastPoint) {
                    this._drawDot({ color: color, point: point });
                } else if (curve) {
                    this._drawCurve({ color: color, curve: curve });
                }
                lastPoints.push({
                    time: point.time,
                    x: point.x,
                    y: point.y
                });
            }
        };
        SignaturePad.prototype._strokeEnd = function (event) {
            this._strokeUpdate(event);
            if (typeof this.onEnd === "function") {
                this.onEnd(event);
            }
        };
        SignaturePad.prototype._handleMouseEvents = function () {
            this._mouseButtonDown = false;
            this.canvas.addEventListener("mousedown", this._handleMouseDown);
            this.canvas.addEventListener("mousemove", this._handleMouseMove);
            document.addEventListener("mouseup", this._handleMouseUp);
        };
        SignaturePad.prototype._handleTouchEvents = function () {
            this.canvas.style.msTouchAction = "none";
            this.canvas.style.touchAction = "none";
            this.canvas.addEventListener("touchstart", this._handleTouchStart);
            this.canvas.addEventListener("touchmove", this._handleTouchMove);
            this.canvas.addEventListener("touchend", this._handleTouchEnd);
        };
        SignaturePad.prototype._reset = function () {
            this._points = [];
            this._lastVelocity = 0;
            this._lastWidth = (this.minWidth + this.maxWidth) / 2;
            this._ctx.fillStyle = this.penColor;
        };
        SignaturePad.prototype._createPoint = function (x, y) {
            var rect = this.canvas.getBoundingClientRect();
            return new Point(x - rect.left, y - rect.top, new Date().getTime());
        };
        SignaturePad.prototype._addPoint = function (point) {
            var _points = this._points;
            _points.push(point);
            if (_points.length > 2) {
                if (_points.length === 3) {
                    _points.unshift(_points[0]);
                }
                var widths = this._calculateCurveWidths(_points[1], _points[2]);
                var curve = Bezier.fromPoints(_points, widths);
                _points.shift();
                return curve;
            }
            return null;
        };
        SignaturePad.prototype._calculateCurveWidths = function (startPoint, endPoint) {
            var velocity = this.velocityFilterWeight * endPoint.velocityFrom(startPoint) + (1 - this.velocityFilterWeight) * this._lastVelocity;
            var newWidth = this._strokeWidth(velocity);
            var widths = {
                end: newWidth,
                start: this._lastWidth
            };
            this._lastVelocity = velocity;
            this._lastWidth = newWidth;
            return widths;
        };
        SignaturePad.prototype._strokeWidth = function (velocity) {
            return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
        };
        SignaturePad.prototype._drawCurveSegment = function (x, y, width) {
            var ctx = this._ctx;
            ctx.moveTo(x, y);
            ctx.arc(x, y, width, 0, 2 * Math.PI, false);
            this._isEmpty = false;
        };
        SignaturePad.prototype._drawCurve = function (_a) {
            var color = _a.color,
                curve = _a.curve;
            var ctx = this._ctx;
            var widthDelta = curve.endWidth - curve.startWidth;
            var drawSteps = Math.floor(curve.length()) * 2;
            ctx.beginPath();
            ctx.fillStyle = color;
            for (var i = 0; i < drawSteps; i += 1) {
                var t = i / drawSteps;
                var tt = t * t;
                var ttt = tt * t;
                var u = 1 - t;
                var uu = u * u;
                var uuu = uu * u;
                var x = uuu * curve.startPoint.x;
                x += 3 * uu * t * curve.control1.x;
                x += 3 * u * tt * curve.control2.x;
                x += ttt * curve.endPoint.x;
                var y = uuu * curve.startPoint.y;
                y += 3 * uu * t * curve.control1.y;
                y += 3 * u * tt * curve.control2.y;
                y += ttt * curve.endPoint.y;
                var width = curve.startWidth + ttt * widthDelta;
                this._drawCurveSegment(x, y, width);
            }
            ctx.closePath();
            ctx.fill();
        };
        SignaturePad.prototype._drawDot = function (_a) {
            var color = _a.color,
                point = _a.point;
            var ctx = this._ctx;
            var width = typeof this.dotSize === "function" ? this.dotSize() : this.dotSize;
            ctx.beginPath();
            this._drawCurveSegment(point.x, point.y, width);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        };
        SignaturePad.prototype._fromData = function (pointGroups, drawCurve, drawDot) {
            for (var _i = 0, pointGroups_1 = pointGroups; _i < pointGroups_1.length; _i++) {
                var group = pointGroups_1[_i];
                var color = group.color,
                    points = group.points;
                if (points.length > 1) {
                    for (var j = 0; j < points.length; j += 1) {
                        var basicPoint = points[j];
                        var point = new Point(basicPoint.x, basicPoint.y, basicPoint.time);
                        this.penColor = color;
                        if (j === 0) {
                            this._reset();
                        }
                        var curve = this._addPoint(point);
                        if (curve) {
                            drawCurve({ color: color, curve: curve });
                        }
                    }
                } else {
                    this._reset();
                    drawDot({
                        color: color,
                        point: points[0]
                    });
                }
            }
        };
        SignaturePad.prototype._toSVG = function () {
            var _this = this;
            var pointGroups = this._data;
            var ratio = Math.max(window.devicePixelRatio || 1, 1);
            var minX = 0;
            var minY = 0;
            var maxX = this.canvas.width / ratio;
            var maxY = this.canvas.height / ratio;
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", this.canvas.width.toString());
            svg.setAttribute("height", this.canvas.height.toString());
            this._fromData(pointGroups, function (_a) {
                var color = _a.color,
                    curve = _a.curve;
                var path = document.createElement("path");
                if (!isNaN(curve.control1.x) && !isNaN(curve.control1.y) && !isNaN(curve.control2.x) && !isNaN(curve.control2.y)) {
                    var attr = "M " + curve.startPoint.x.toFixed(3) + "," + curve.startPoint.y.toFixed(3) + " " + ("C " + curve.control1.x.toFixed(3) + "," + curve.control1.y.toFixed(3) + " ") + (curve.control2.x.toFixed(3) + "," + curve.control2.y.toFixed(3) + " ") + (curve.endPoint.x.toFixed(3) + "," + curve.endPoint.y.toFixed(3));
                    path.setAttribute("d", attr);
                    path.setAttribute("stroke-width", (curve.endWidth * 2.25).toFixed(3));
                    path.setAttribute("stroke", color);
                    path.setAttribute("fill", "none");
                    path.setAttribute("stroke-linecap", "round");
                    svg.appendChild(path);
                }
            }, function (_a) {
                var color = _a.color,
                    point = _a.point;
                var circle = document.createElement("circle");
                var dotSize = typeof _this.dotSize === "function" ? _this.dotSize() : _this.dotSize;
                circle.setAttribute("r", dotSize.toString());
                circle.setAttribute("cx", point.x.toString());
                circle.setAttribute("cy", point.y.toString());
                circle.setAttribute("fill", color);
                svg.appendChild(circle);
            });
            var prefix = "data:image/svg+xml;base64,";
            var header = "<svg" + " xmlns=\"http://www.w3.org/2000/svg\"" + " xmlns:xlink=\"http://www.w3.org/1999/xlink\"" + (" viewBox=\"" + minX + " " + minY + " " + maxX + " " + maxY + "\"") + (" width=\"" + maxX + "\"") + (" height=\"" + maxY + "\"") + ">";
            var body = svg.innerHTML;
            if (body === undefined) {
                var dummy = document.createElement("dummy");
                var nodes = svg.childNodes;
                dummy.innerHTML = "";
                for (var i = 0; i < nodes.length; i += 1) {
                    dummy.appendChild(nodes[i].cloneNode(true));
                }
                body = dummy.innerHTML;
            }
            var footer = "</svg>";
            var data = header + body + footer;
            return prefix + btoa(data);
        };
        return SignaturePad;
    }();

    return SignaturePad;
});

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = require("opentok-layout-js");

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (__CLIENT__) {
  navigator.share = navigator.share || function () {
    if (navigator.share) {
      return navigator.share;
    }

    var android = navigator.userAgent.match(/Android/i);
    var ios = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    var isDesktop = !(ios || android); // on those two support "mobile deep links", so HTTP based fallback for all others.

    // sms on ios 'sms:;body='+payload, on Android 'sms:?body='+payload
    var shareUrls = {
      whatsapp: function whatsapp(payload) {
        return (isDesktop ? 'https://api.whatsapp.com/send?text=' : 'whatsapp://send?text=') + payload;
      },
      telegram: function telegram(payload) {
        return (isDesktop ? 'https://telegram.me/share/msg?url=' + location.host + '&text=' : 'tg://msg?text=') + payload;
      },
      facebook: function facebook(payload, fbid, url) {
        return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
      },
      email: function email(payload, title) {
        return 'mailto:?subject=' + title + '&body=' + payload;
      },
      sms: function sms(payload) {
        return 'sms:?body=' + payload;
      }
    };

    var WebShareUI = function () {
      function WebShareUI() {
        _classCallCheck(this, WebShareUI);
      }

      _createClass(WebShareUI, [{
        key: '_init',

        /*async*/
        value: function _init() {
          var _this = this;

          if (this._initialized) return Promise.resolve();
          this._initialized = true;

          var template = '\n        <div class="web-share" style="display: none">\n          <div class="web-share-container web-share-grid">\n              <div class="web-share-title">SHARE VIA</div>\n            <a target=\'_blank\' class="web-share-item web-share-facebook">\n                  <div class="fa fa-facebook-official fa-3x"></div>\n                  <div class="web-share-item-desc">Facebook</div>\n              </a>\n              <a class="web-share-item web-share-email">\n              <div class="fa fa-envelope fa-3x"></div>\n              <div class="web-share-item-desc">Email</div>\n            </a>\n              <a class="web-share-item web-share-sms">\n              <div class="fa fa-commenting fa-3x"></div>\n              <div class="web-share-item-desc">SMS</div>\n            </a>\n            <a class="web-share-item web-share-copy">\n                  <div class="fa fa-clone fa-3x"></div>\n                  <div class="web-share-item-desc">Copy</div>\n              </a>\n          </div>\n          <div class="web-share-container web-share-cancel">Cancel</div>\n        </div>\n        ';

          var el = document.createElement('div');
          el.innerHTML = template;

          this.$root = el.querySelector('.web-share');
          this.$whatsapp = el.querySelector('.web-share-whatsapp');
          this.$facebook = el.querySelector('.web-share-facebook');
          this.$telegram = el.querySelector('.web-share-telegram');
          this.$email = el.querySelector('.web-share-email');
          this.$sms = el.querySelector('.web-share-sms');
          this.$copy = el.querySelector('.web-share-copy');
          this.$copy.onclick = function () {
            return _this._copy();
          };
          this.$root.onclick = function () {
            return _this._hide();
          };
          this.$root.classList.toggle('desktop', isDesktop);

          document.body.appendChild(el);
        }
      }, {
        key: '_setPayload',
        value: function _setPayload(payloadObj) {
          var payload = payloadObj.text + ' ' + payloadObj.url;
          var title = payloadObj.title;
          var facebookId = payloadObj.facebookId || '158651941570418';
          this.url = payloadObj.url;
          payload = encodeURIComponent(payload);
          title = encodeURIComponent(title);
          this.$whatsapp && (this.$whatsapp.href = shareUrls.whatsapp(payload));
          this.$facebook.href = shareUrls.facebook(payload, facebookId, payloadObj.url);
          this.$telegram && (this.$telegram.href = shareUrls.telegram(payload));
          this.$email.href = shareUrls.email(payload, title);
          this.$sms.href = shareUrls.sms(payload);
        }
      }, {
        key: '_copy',
        value: function _copy() {
          // A <span> contains the text to copy
          var span = document.createElement('span');
          span.textContent = this.url;
          span.style.whiteSpace = 'pre'; // Preserve consecutive spaces and newlines

          // Paint the span outside the viewport
          span.style.position = 'absolute';
          span.style.left = '-9999px';
          span.style.top = '-9999px';

          var win = window;
          var selection = win.getSelection();
          win.document.body.appendChild(span);

          var range = win.document.createRange();
          selection.removeAllRanges();
          range.selectNode(span);
          selection.addRange(range);

          var success = false;
          try {
            success = win.document.execCommand('copy');
          } catch (err) {}

          selection.removeAllRanges();
          span.remove();

          return success;
        }

        /*async*/

      }, {
        key: 'show',
        value: function show(payloadObj) {
          this._init();
          clearTimeout(this._hideTimer);
          this._setPayload(payloadObj);
          this.$root.style.display = 'flex';
          this.$root.offsetWidth; // style update
          this.$root.style.background = 'rgba(0,0,0,.4)';
          document.querySelectorAll('.web-share-container').forEach(function (el) {
            el.style.transform = 'translateY(0)';
            el.style.opacity = 1;
          });
        }
      }, {
        key: '_hide',
        value: function _hide() {
          var _this2 = this;

          this.$root.style.background = null;
          document.querySelectorAll('.web-share-container').forEach(function (el) {
            el.style.transform = null;
            el.style.opacity = null;
          });
          this._hideTimer = setTimeout(function () {
            return _this2.$root.style.display = null;
          }, 400);
        }
      }]);

      return WebShareUI;
    }();

    var shareUi = new WebShareUI();

    /* async */
    return function (data) {
      return shareUi.show(data);
    };
  }();
}

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("agenda");

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = require("agendash");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map