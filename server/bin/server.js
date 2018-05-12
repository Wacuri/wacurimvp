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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("opentok-react");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@opentok/client");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-easy-state");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(10);
module.exports = __webpack_require__(11);


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill/lib/index");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dotenv = __webpack_require__(3);

dotenv.config();
global.__CLIENT__ = false;
global.__SERVER__ = true;

var routes = __webpack_require__(12);

exports = routes;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(13);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = __webpack_require__(14);

var _api2 = _interopRequireDefault(_api);

var _ssr = __webpack_require__(20);

var _ssr2 = _interopRequireDefault(_ssr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = __webpack_require__(15);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _opentok = __webpack_require__(16);

var _opentok2 = _interopRequireDefault(_opentok);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _tok_session = __webpack_require__(17);

var _tok_session2 = _interopRequireDefault(_tok_session);

var _tok_session_participant = __webpack_require__(19);

var _tok_session_participant2 = _interopRequireDefault(_tok_session_participant);

var _dotenv = __webpack_require__(3);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

__webpack_require__(5);

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
  console.log('return token', token);
  return token;
}

// TODO: switch to POST, just using GET for easier testing
router.get('/sessions/:room', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var room, existingSession, participants;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            room = req.params.room;
            _context2.next = 3;
            return _tok_session2.default.findOne({ room: room }).lean().exec();

          case 3:
            existingSession = _context2.sent;

            if (!existingSession) {
              _context2.next = 12;
              break;
            }

            _context2.next = 7;
            return _tok_session_participant2.default.find({ session: existingSession, present: true }).lean().exec();

          case 7:
            participants = _context2.sent;

            existingSession.participants = participants;
            res.json(_extends({}, existingSession, {
              token: generateToken(existingSession.sessionId)
            }));
            _context2.next = 13;
            break;

          case 12:
            opentok.createSession(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, session) {
                var newSession;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 2;
                          break;
                        }

                        throw err;

                      case 2:
                        // save the sessionId
                        newSession = new _tok_session2.default({ room: room, sessionId: session.sessionId });
                        _context.next = 5;
                        return newSession.save();

                      case 5:
                        res.json(_extends({}, newSession.toJSON(), {
                          token: generateToken(session.sessionId)
                        }));

                      case 6:
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

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// TEMP: Use get for convenience. hardcode temp-home-location for the room
// Trigger a general announcement to everyone
router.get('/sessions/test/temp-home-location', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var existingSession;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _tok_session2.default.findOne({ room: 'temp-home-location' }).exec();

          case 2:
            existingSession = _context3.sent;

            if (!existingSession) {
              _context3.next = 7;
              break;
            }

            console.log("**** SENDING SIGNAL");
            signal(existingSession.sessionId, { type: 'displayJourneyRequest', data: 'Rob has started a session. Join him (link)' });
            return _context3.abrupt('return', res.sendStatus(200));

          case 7:
            res.sendStatus(200);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

router.get('/sessions/:room/connections/:connection/ready', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$params, room, connection, existingSession, participant, allReady;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$params = req.params, room = _req$params.room, connection = _req$params.connection;
            _context4.next = 3;
            return _tok_session2.default.findOne({ room: room }).exec();

          case 3:
            existingSession = _context4.sent;

            if (!existingSession) {
              _context4.next = 18;
              break;
            }

            _context4.next = 7;
            return _tok_session_participant2.default.findOne({ session: existingSession, connectionId: connection });

          case 7:
            participant = _context4.sent;

            participant.ready = true;
            _context4.next = 11;
            return participant.save();

          case 11:
            signal(existingSession.sessionId, { type: 'ready', data: 'foo' });
            _context4.next = 14;
            return _tok_session_participant2.default.count({ session: existingSession, ready: false, present: true });

          case 14:
            _context4.t0 = _context4.sent;
            allReady = _context4.t0 === 0;

            if (allReady) {
              // signal(existingSession.sessionId, {type: 'startJourney', data: 'foo'});
            }
            return _context4.abrupt('return', res.sendStatus(200));

          case 18:
            res.sendStatus(200);

          case 19:
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

router.get('/journeys', function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var readdirAsync, journeyFiles;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            readdirAsync = promisify(_fs2.default.readdir);
            _context5.next = 3;
            return readdirAsync(_path2.default.join(__dirname, '..', 'public/journeys'));

          case 3:
            _context5.t0 = function (file) {
              return _path2.default.extname(file) === '.mp3';
            };

            _context5.t1 = function (file) {
              return '/journeys/' + file;
            };

            journeyFiles = _context5.sent.filter(_context5.t0).map(_context5.t1);

            res.json(journeyFiles);

          case 7:
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

router.put('/sessions/:room/journey', function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var journey, room, existingSession;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('UPDATE JOURNEY');
            journey = req.body.journey;
            room = req.params.room;
            _context6.next = 5;
            return _tok_session2.default.findOne({ room: room }).exec();

          case 5:
            existingSession = _context6.sent;

            if (!existingSession) {
              _context6.next = 11;
              break;
            }

            existingSession.journey = journey;
            _context6.next = 10;
            return existingSession.save();

          case 10:
            signal(existingSession.sessionId, { type: 'updatedJourney', data: journey });

          case 11:
            res.sendStatus(200);

          case 12:
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

// TODO: this should really verify that the user hitting this endpoint is authorized to do so (e.g. that they are the journey's host)
router.post('/sessions/:room/start', function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var room, existingSession;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            room = req.params.room;
            _context7.next = 3;
            return _tok_session2.default.findOne({ room: room }).exec();

          case 3:
            existingSession = _context7.sent;

            if (!existingSession) {
              _context7.next = 8;
              break;
            }

            _context7.next = 7;
            return existingSession.start();

          case 7:
            signal(existingSession.sessionId, { type: 'startJourney', data: '' });

          case 8:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

router.post('/sessions/:room/flag', function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var room, connectionId, existingSession, participants;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            room = req.params.room;
            connectionId = req.body.connectionId;
            _context8.next = 4;
            return _tok_session2.default.findOne({ room: room }).exec();

          case 4:
            existingSession = _context8.sent;

            if (!existingSession) {
              _context8.next = 13;
              break;
            }

            existingSession.flags.push({ user: connectionId });
            _context8.next = 9;
            return existingSession.save();

          case 9:
            _context8.next = 11;
            return _tok_session_participant2.default.find({ session: existingSession, present: true }).lean().exec();

          case 11:
            participants = _context8.sent;
            return _context8.abrupt('return', res.json(_extends({}, existingSession.toJSON(), { participants: participants })));

          case 13:
            res.sendStatus(404);

          case 14:
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

router.post('/event', function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var _req$body, sessionId, connection, session, participantExists, participant, _participant;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log('GOT EVENT', req.body);
            res.sendStatus(200);
            _req$body = req.body, sessionId = _req$body.sessionId, connection = _req$body.connection;
            _context9.next = 5;
            return _tok_session2.default.findOne({ sessionId: sessionId }).exec();

          case 5:
            session = _context9.sent;


            console.log("*******" + req.body);

            _context9.t0 = req.body.event;
            _context9.next = _context9.t0 === 'connectionCreated' ? 10 : _context9.t0 === 'connectionDestroyed' ? 20 : 29;
            break;

          case 10:
            if (!session) {
              _context9.next = 19;
              break;
            }

            _context9.next = 13;
            return _tok_session_participant2.default.count({ session: session, connectionId: connection.id });

          case 13:
            _context9.t1 = _context9.sent;
            participantExists = _context9.t1 > 0;

            if (participantExists) {
              _context9.next = 19;
              break;
            }

            participant = new _tok_session_participant2.default({ session: session, connectionId: connection.id });
            _context9.next = 19;
            return participant.save();

          case 19:
            return _context9.abrupt('break', 29);

          case 20:
            if (!session) {
              _context9.next = 28;
              break;
            }

            _context9.next = 23;
            return _tok_session_participant2.default.findOne({ session: session, connectionId: connection.id });

          case 23:
            _participant = _context9.sent;

            if (!_participant) {
              _context9.next = 28;
              break;
            }

            _participant.present = false;
            _context9.next = 28;
            return _participant.save();

          case 28:
            return _context9.abrupt('break', 29);

          case 29:
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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("opentok");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _anotherMongooseStatemachine = __webpack_require__(18);

var _anotherMongooseStatemachine2 = _interopRequireDefault(_anotherMongooseStatemachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlagSchema = new _mongoose.Schema({
  user: { type: String },
  reason: { type: String }
});

var TokSessionSchema = new _mongoose.Schema({
  room: { type: String, index: true },
  sessionId: { type: String, index: true },
  journey: { type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3' },
  flags: { type: [FlagSchema], default: [] }
});

TokSessionSchema.plugin(_anotherMongooseStatemachine2.default, {
  states: {
    created: { default: true },
    started: {},
    completed: {}
  },
  transitions: {
    start: { from: 'created', to: 'started' },
    end: { from: '*', to: 'completed' }
  }
});

var TokSession = _mongoose2.default.model('TokSession', TokSessionSchema);

exports.default = TokSession;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("another-mongoose-statemachine");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokSessionParticipantSchema = new _mongoose.Schema({
  "connectionId": { type: String, index: true },
  "session": { type: _mongoose.Schema.Types.ObjectId, ref: 'TokSession' },
  "ready": { type: Boolean, default: false },
  "present": { type: Boolean, default: true }
});

var TokSessionParticipant = _mongoose2.default.model('TokSessionParticipant', TokSessionParticipantSchema);

exports.default = TokSessionParticipant;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(21);

var _server2 = _interopRequireDefault(_server);

var _redux = __webpack_require__(22);

var _reactRedux = __webpack_require__(23);

var _reactRouter = __webpack_require__(24);

var _app = __webpack_require__(25);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(process.env);

var router = _express2.default.Router();

router.get('/', function (req, res) {
  var context = {};

  var html = _server2.default.renderToString(_react2.default.createElement(
    _reactRouter.StaticRouter,
    {
      location: req.originalUrl,
      context: context
    },
    _react2.default.createElement(_app2.default, null)
  ));

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.status(200).render(process.env.NODE_ENV === 'production' ? 'index.ejs' : 'index.dev.ejs', {
      html: html,
      script: JSON.stringify({ openTokKey: process.env.OPENTOK_KEY })
    });
  }
});

exports.default = router;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(26);

var _header = __webpack_require__(27);

var _header2 = _interopRequireDefault(_header);

var _home = __webpack_require__(28);

var _home2 = _interopRequireDefault(_home);

var _Room = __webpack_require__(32);

var _Room2 = _interopRequireDefault(_Room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_header2.default, null),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _home2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:room', component: _Room2.default })
  );
};

exports.default = App;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header() {
  return _react2.default.createElement(
    "div",
    { className: "header pl-4" },
    _react2.default.createElement(
      "h1",
      null,
      "Get started with Wacuri!"
    )
  );
};

exports.default = Header;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _generator_form = __webpack_require__(29);

var _generator_form2 = _interopRequireDefault(_generator_form);

var _event_message = __webpack_require__(31);

var _event_message2 = _interopRequireDefault(_event_message);

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
  var _require = __webpack_require__(6),
      OTSession = _require.OTSession,
      OTPublisher = _require.OTPublisher,
      OTStreams = _require.OTStreams,
      OTSubscriber = _require.OTSubscriber,
      createSession = _require.createSession;

  var OT = __webpack_require__(7);
  window.state = state;
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
        state.session = json;
        _this2.sessionHelper = createSession({
          apiKey: state.openTokKey,
          sessionId: state.session.sessionId,
          token: state.session.token,
          onConnect: function onConnect() {
            console.log('assigned connection to publisher', _this2.sessionHelper.session.connection);
            setTimeout(_this2.refreshSession, 1000);
          },
          onStreamsUpdated: function onStreamsUpdated(streams) {
            console.log('Current subscriber streams:', streams);
            _this2.setState({ streams: streams });
          }
        });
        window.sh = _this2.sessionHelper;
        _this2.sessionHelper.session.on("connectionDestroyed", function (event) {
          console.log('DESTROYED', event);
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
          var index = newData.indexOf(event.connection.id);
          newData.splice(index, 1);
          _this2.setState({ connectedUsers: newData });

          console.log('data is', data);
          // fetch(`/api/event`, {
          //   body: JSON.stringify(data), // must match 'Content-Type' header
          //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //   credentials: 'same-origin', // include, same-origin, *omit
          //   headers: {
          //     'user-agent': 'Mozilla/4.0 MDN Example',
          //     'content-type': 'application/json'
          //   },
          //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //   mode: 'cors', // no-cors, cors, *same-origin
          //   redirect: 'follow', // manual, *follow, error
          //   referrer: 'no-referrer', // *client, no-referrer
          // });
          // this.refreshSession();
        });

        _this2.sessionHelper.session.on("connectionCreated", function (event) {
          console.log('CREATED', event);
          var updatedConnectionCount = _this2.state.totalConnectionsCreated + 1;
          _this2.setState({ totalConnectionsCreated: updatedConnectionCount });
          console.log('**** Total connections: ' + _this2.state.totalConnectionsCreated);
          var data = {
            sessionId: _this2.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionCreated'
          };

          _this2.setState({ connectedUsers: [].concat(_toConsumableArray(_this2.state.connectedUsers), [event.connection.id]) });
          console.log('data is', data);
          // fetch(`/api/event`, {
          //   body: JSON.stringify(data), // must match 'Content-Type' header
          //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //   credentials: 'same-origin', // include, same-origin, *omit
          //   headers: {
          //     'user-agent': 'Mozilla/4.0 MDN Example',
          //     'content-type': 'application/json'
          //   },
          //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //   mode: 'cors', // no-cors, cors, *same-origin
          //   redirect: 'follow', // manual, *follow, error
          //   referrer: 'no-referrer', // *client, no-referrer
          // });
          // this.refreshSession();
        });

        _this2.sessionHelper.session.on("signal", function (event) {
          console.log("Signal sent from connection ", event);
          console.log("Signal type", event.type);
          // this.refreshSession(); // FIXME Error: home.js:110 Uncaught TypeError: _this2.refreshSession is not a function

          if (event.type === 'signal:displayJourneyRequest') {
            console.log("**** CAPTURED the journey request !! ");
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
        state.journeys = json;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'home' },
        _react2.default.createElement(UserList, { userCount: this.state.totalConnectionsCreated, userIds: this.state.connectedUsers }),
        _react2.default.createElement(_event_message2.default, { message: this.state.displayMessageText, sessionUrl: this.state.sessionUrl }),
        _react2.default.createElement(_generator_form2.default, null)
      );
    }
  }]);

  return Home;
}(Component);

exports.default = Home;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _session_info = __webpack_require__(30);

var _session_info2 = _interopRequireDefault(_session_info);

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
      sessionLinkUrl: ''
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
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'h3',
            null,
            'Enter Session Details'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Give your room a name:',
            _react2.default.createElement('br', null),
            _react2.default.createElement('input', { type: 'text', id: 'session_link', onChange: this.handleNameChange }),
            ' \xA0 or ',
            _react2.default.createElement(
              'a',
              { href: '#' },
              'Generate a name'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            'Description (optional):',
            _react2.default.createElement('br', null),
            _react2.default.createElement('textarea', { id: 'session_description', rows: '2', cols: '25' })
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement('input', { type: 'button', value: 'Create a session', onClick: this.createSessionLink })
          )
        ),
        _react2.default.createElement(_session_info2.default, { sessionLink: this.state.sessionLinkUrl })
      );
    }
  }]);

  return GeneratorForm;
}(_react.Component);

exports.default = GeneratorForm;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

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
      sessionLinkName: 'Reasonable Default',
      sessionLinkUrl: 'reasonable-default'
    };

    _this.jumpToSession = _this.jumpToSession.bind(_this);
    return _this;
  }

  _createClass(SessionInfo, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ sessionLinkUrl: nextProps.sessionLink });
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
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'Session Created'
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
          ' ',
          _react2.default.createElement(
            'a',
            { href: '#' },
            'Copy link to share'
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement('input', { type: 'button', value: 'Jump to the session', onClick: this.jumpToSession })
        )
      );
    }
  }]);

  return SessionInfo;
}(_react.Component);

exports.default = SessionInfo;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventMessage = function (_Component) {
  _inherits(EventMessage, _Component);

  function EventMessage(props) {
    _classCallCheck(this, EventMessage);

    return _possibleConstructorReturn(this, (EventMessage.__proto__ || Object.getPrototypeOf(EventMessage)).call(this, props));
  }

  _createClass(EventMessage, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { backgroundColor: '#fc9' } },
        this.props.message,
        ' ',
        this.props.message === undefined ? "" : _react2.default.createElement(
          'a',
          { href: this.props.sessionUrl, target: '_blank' },
          'Join Now'
        )
      );
    }
  }]);

  return EventMessage;
}(_react.Component);

exports.default = EventMessage;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactEasyState = __webpack_require__(8);

var _state = __webpack_require__(33);

var _state2 = _interopRequireDefault(_state);

var _propTypes = __webpack_require__(34);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid = __webpack_require__(35);

var _uuid2 = _interopRequireDefault(_uuid);

var _opentokLayoutJs = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(37).polyfill();
__webpack_require__(5);

var _ref = {},
    OTSession = _ref.OTSession,
    OTPublisher = _ref.OTPublisher,
    OTStreams = _ref.OTStreams,
    OTSubscriber = _ref.OTSubscriber,
    createSession = _ref.createSession;


if (__CLIENT__) {
  var _require = __webpack_require__(6),
      OTSession = _require.OTSession,
      OTPublisher = _require.OTPublisher,
      OTStreams = _require.OTStreams,
      OTSubscriber = _require.OTSubscriber,
      createSession = _require.createSession;

  var OT = __webpack_require__(7);
  window.state = _state2.default;
}

var Room = function (_Component) {
  _inherits(Room, _Component);

  function Room(props) {
    _classCallCheck(this, Room);

    var _this = _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this, props));

    _this.refreshSession = function () {
      fetch('/api/sessions/' + _this.props.match.params.room).then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.session = json;
      });
    };

    _this.onInitPublisher = function () {
      console.log('initialized publisher');
    };

    _this.onConfirmReady = function (e) {
      fetch('/api/sessions/' + _this.props.match.params.room + '/connections/' + _this.sessionHelper.session.connection.id + '/ready');
    };

    _this.onChangeJourney = function (e) {
      console.log('CHANGE', e.target.value);
      fetch('/api/sessions/' + _this.props.match.params.room + '/journey', {
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

    _this.onStartSession = function (e) {
      fetch('/api/sessions/' + _this.props.match.params.room + '/start', {
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

    _this.onLoadedMetadata = function (e) {
      _this.setState({
        journeyDuration: e.target.duration
      });
      _this.audioTag.removeEventListener('timeupdate', _this.onTimeUpdate);
      _this.audioTag.addEventListener('timeupdate', _this.onTimeUpdate);
    };

    _this.onTimeUpdate = function (e) {
      _this.setState({
        playerProgress: e.target.currentTime / e.target.duration * 100,
        playerProgressMS: e.target.currentTime
      });
    };

    _this.onFlag = function (e) {
      e.preventDefault();
      fetch('/api/sessions/' + _this.props.match.params.room + '/flag', {
        cache: 'no-cache',
        body: JSON.stringify({ connectionId: _this.state.session.connection.id }),
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

    _this.state = {
      streams: [],
      publisherId: '',
      session: null,
      playerState: 'waiting',
      playerProgress: 0,
      playerProgressMS: 0,
      journeyDuration: 0
    };
    _this.publisher = {};
    _this.audioTag = {};
    return _this;
  }

  _createClass(Room, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.audioTag.addEventListener('ended', function (event) {
        _this2.publisher.state.publisher.publishAudio(true);
        _this2.setState({
          playerState: 'ended'
        });
      });

      fetch('/api/sessions/' + this.props.match.params.room).then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.session = json;
        _this2.sessionHelper = createSession({
          apiKey: _state2.default.openTokKey,
          sessionId: _state2.default.session.sessionId,
          token: _state2.default.session.token,
          onConnect: function onConnect() {
            console.log('assigned connection to publisher', _this2.sessionHelper.session.connection);
            setTimeout(_this2.refreshSession, 1000);
          },
          onStreamsUpdated: function onStreamsUpdated(streams) {
            console.log('Current subscriber streams:', streams);
            _this2.setState({ streams: streams });
          }
        });
        _this2.sessionHelper.session.on("connectionDestroyed", function (event) {
          console.log('DESTROYED', event);
          var data = {
            sessionId: _this2.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionDestroyed'
          };
          _this2.refreshSession();
        });
        _this2.sessionHelper.session.on("connectionCreated", function (event) {
          console.log('CREATED', event);
          var data = {
            sessionId: _this2.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionCreated'
          };
          _this2.refreshSession();
        });
        _this2.sessionHelper.session.on("signal", function (event) {
          console.log("Signal sent from connection ", event);
          _this2.refreshSession();
          if (event.type === 'signal:startJourney') {
            _this2.publisher.state.publisher.publishAudio(false);
            _this2.audioTag.play();
            _this2.setState({
              playerState: 'playing'
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.sessionHelper) {
        this.sessionHelper.disconnect();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var currentParticipant = this.state.session && _state2.default.session && _state2.default.session.participants.find(function (participant) {
        return participant.connectionId === _this3.state.session.connection.id;
      });
      var currentUserHasFlaggedJourney = false;
      if (currentParticipant) {
        currentUserHasFlaggedJourney = _state2.default.session.flags.map(function (flag) {
          return flag.user;
        }).indexOf(currentParticipant.connectionId) > -1;
      }
      return _react2.default.createElement(
        'div',
        { className: 'journey-container' },
        _react2.default.createElement(
          'p',
          { style: { display: 'none' } },
          JSON.stringify(_state2.default.session, null, 2)
        ),
        _react2.default.createElement(
          'audio',
          { style: { display: 'none' }, onLoadedMetadata: this.onLoadedMetadata, key: _state2.default.session && _state2.default.session.journey, controls: 'true', ref: function ref(audioTag) {
              _this3.audioTag = audioTag;
            } },
          _react2.default.createElement('source', { src: _state2.default.session && _state2.default.session.journey, type: 'audio/mpeg' })
        ),
        this.state.session && _react2.default.createElement(
          'div',
          { style: { position: 'relative' } },
          _react2.default.createElement(
            'button',
            { style: { position: 'absolute', top: 0, right: 0 }, className: 'btn btn-danger btn-flag-session', disabled: currentUserHasFlaggedJourney, onClick: this.onFlag },
            currentUserHasFlaggedJourney ? "You've flagged this journey" : "Flag this journey"
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-6' },
              _react2.default.createElement(
                'h2',
                null,
                _state2.default.session.journey.split('/')[_state2.default.session.journey.split('/').length - 1]
              ),
              currentParticipant && _state2.default.session.participants.indexOf(currentParticipant) === 0 && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'select',
                  { className: 'mb-3', onChange: this.onChangeJourney, value: _state2.default.session && _state2.default.session.journey },
                  _state2.default.journeys.map(function (journey) {
                    return _react2.default.createElement(
                      'option',
                      { value: journey },
                      journey.split('/')[journey.split('/').length - 1]
                    );
                  })
                ),
                _state2.default.session.state === 'created' && _react2.default.createElement(
                  'div',
                  { className: 'mb-2' },
                  _react2.default.createElement(
                    'button',
                    { onClick: this.onStartSession, className: 'btn btn-primary' },
                    'Start session ',
                    _react2.default.createElement('i', { className: 'fa fa-play', ariaHidden: 'true' })
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-3' },
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
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'tok-container col', ref: function ref(container) {
                  return _this3.container = container;
                } },
              this.state.streams.length == 0 && _react2.default.createElement(
                'p',
                null,
                'Waiting for others to join this journey...'
              ),
              _react2.default.createElement(
                'div',
                { className: 'row no-gutters', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', marginRight: '350px' } },
                this.state.streams.map(function (stream) {
                  var participant = _state2.default.session.participants.find(function (participant) {
                    return participant.connectionId === stream.connection.id;
                  });
                  return _react2.default.createElement(
                    'div',
                    { className: 'subscriber' },
                    _react2.default.createElement(
                      'p',
                      { style: { fontSize: '14px' }, className: participant && participant.ready ? 'text-success' : 'text-warning' },
                      participant && participant.ready ? 'Ready to start!' : 'Not ready yet'
                    ),
                    _react2.default.createElement(OTSubscriber, {
                      key: stream.id,
                      session: _this3.sessionHelper.session,
                      stream: stream
                    })
                  );
                })
              ),
              _react2.default.createElement(
                'div',
                { style: { position: 'fixed', bottom: 0, right: 0 } },
                _react2.default.createElement(OTPublisher, { session: this.sessionHelper.session, onInit: this.onInitPublisher, ref: function ref(publisher) {
                    _this3.publisher = publisher;
                  } }),
                currentParticipant && currentParticipant.ready && _react2.default.createElement(
                  'p',
                  null,
                  'You are ready!'
                ),
                (!currentParticipant || !currentParticipant.ready) && _react2.default.createElement(
                  'a',
                  { className: 'btn btn-primary', href: '#', onClick: this.onConfirmReady },
                  'Ready?'
                )
              )
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
  }]);

  return Room;
}(_react.Component);

exports.default = (0, _reactEasyState.view)(Room);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactEasyState = __webpack_require__(8);

exports.default = (0, _reactEasyState.store)(_extends({}, global.__INITIAL_STATE__ || {}, {
  session: null,
  journeys: []
}));

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("opentok-layout-js");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map