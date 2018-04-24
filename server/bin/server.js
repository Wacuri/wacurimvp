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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// eslint-disable-next-line
var LIST_ACTIONS = exports.LIST_ACTIONS = {
  ITEM_PREVIEW: 'ITEM_PREVIEW',
  ITEM_VIEW: 'ITEM_VIEW',
  ITEM_ADD: 'ITEM_ADD',
  ITEM_CLEAR: 'ITEM_CLEAR'
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearItem = exports.addItem = exports.viewItem = exports.previewItem = undefined;

var _action_types = __webpack_require__(5);

var previewItem = exports.previewItem = function previewItem(name) {
  return {
    type: _action_types.LIST_ACTIONS.ITEM_PREVIEW,
    name: name // shorthand for name: name
  };
};

var viewItem = exports.viewItem = function viewItem(name) {
  return {
    type: _action_types.LIST_ACTIONS.ITEM_VIEW,
    name: name
  };
};

var addItem = exports.addItem = function addItem(item) {
  return {
    type: _action_types.LIST_ACTIONS.ITEM_ADD,
    item: item // shorthand for item: item
  };
};

var clearItem = exports.clearItem = function clearItem() {
  return {
    type: _action_types.LIST_ACTIONS.ITEM_CLEAR
  };
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-easy-state");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
module.exports = __webpack_require__(15);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill/lib/index");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dotenv = __webpack_require__(7);

console.log('DO CONFIG YO');
dotenv.config();
global.__CLIENT__ = false;
global.__SERVER__ = true;

var routes = __webpack_require__(16);

exports = routes;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(8);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(17);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = __webpack_require__(18);

var _api2 = _interopRequireDefault(_api);

var _ssr = __webpack_require__(23);

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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = __webpack_require__(19);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(8);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _opentok = __webpack_require__(20);

var _opentok2 = _interopRequireDefault(_opentok);

var _mongoose = __webpack_require__(4);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _tok_session = __webpack_require__(21);

var _tok_session2 = _interopRequireDefault(_tok_session);

var _tok_session_participant = __webpack_require__(22);

var _tok_session_participant2 = _interopRequireDefault(_tok_session_participant);

var _dotenv = __webpack_require__(7);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

__webpack_require__(9);

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

router.get('/sessions/:room/connections/:connection/ready', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$params, room, connection, existingSession, participant, allReady;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$params = req.params, room = _req$params.room, connection = _req$params.connection;
            _context3.next = 3;
            return _tok_session2.default.findOne({ room: room }).exec();

          case 3:
            existingSession = _context3.sent;

            if (!existingSession) {
              _context3.next = 18;
              break;
            }

            _context3.next = 7;
            return _tok_session_participant2.default.findOne({ session: existingSession, connectionId: connection });

          case 7:
            participant = _context3.sent;

            participant.ready = true;
            _context3.next = 11;
            return participant.save();

          case 11:
            signal(existingSession.sessionId, { type: 'ready', data: 'foo' });
            _context3.next = 14;
            return _tok_session_participant2.default.count({ session: existingSession, ready: false, present: true });

          case 14:
            _context3.t0 = _context3.sent;
            allReady = _context3.t0 === 0;

            if (allReady) {
              signal(existingSession.sessionId, { type: 'startJourney', data: 'foo' });
            }
            return _context3.abrupt('return', res.sendStatus(200));

          case 18:
            res.sendStsatus(200);

          case 19:
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

router.get('/journeys', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var readdirAsync, journeyFiles;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            readdirAsync = promisify(_fs2.default.readdir);

            console.log('I AM', __dirname);
            console.log('TRY DA READ', _path2.default.join('..', 'public/journeys'));
            _context4.next = 5;
            return readdirAsync(_path2.default.join(__dirname, '..', 'public/journeys'));

          case 5:
            _context4.t0 = function (file) {
              return _path2.default.extname(file) === '.mp3';
            };

            _context4.t1 = function (file) {
              return '/journeys/' + file;
            };

            journeyFiles = _context4.sent.filter(_context4.t0).map(_context4.t1);

            res.json(journeyFiles);

          case 9:
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

router.put('/sessions/:room/journey', function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var journey, room, existingSession;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('UPDATE JOURNEY');
            journey = req.body.journey;
            room = req.params.room;
            _context5.next = 5;
            return _tok_session2.default.findOne({ room: room }).exec();

          case 5:
            existingSession = _context5.sent;

            if (!existingSession) {
              _context5.next = 11;
              break;
            }

            existingSession.journey = journey;
            _context5.next = 10;
            return existingSession.save();

          case 10:
            signal(existingSession.sessionId, { type: 'updatedJourney', data: journey });

          case 11:
            res.sendStatus(200);

          case 12:
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

router.post('/event', function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body, sessionId, connection, session, participantExists, participant, _participant;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('GOT EVENT', req.body);
            res.sendStatus(200);
            _req$body = req.body, sessionId = _req$body.sessionId, connection = _req$body.connection;
            _context6.next = 5;
            return _tok_session2.default.findOne({ sessionId: sessionId }).exec();

          case 5:
            session = _context6.sent;
            _context6.t0 = req.body.event;
            _context6.next = _context6.t0 === 'connectionCreated' ? 9 : _context6.t0 === 'connectionDestroyed' ? 19 : 28;
            break;

          case 9:
            if (!session) {
              _context6.next = 18;
              break;
            }

            _context6.next = 12;
            return _tok_session_participant2.default.count({ session: session, connectionId: connection.id });

          case 12:
            _context6.t1 = _context6.sent;
            participantExists = _context6.t1 > 0;

            if (participantExists) {
              _context6.next = 18;
              break;
            }

            participant = new _tok_session_participant2.default({ session: session, connectionId: connection.id });
            _context6.next = 18;
            return participant.save();

          case 18:
            return _context6.abrupt('break', 28);

          case 19:
            if (!session) {
              _context6.next = 27;
              break;
            }

            _context6.next = 22;
            return _tok_session_participant2.default.findOne({ session: session, connectionId: connection.id });

          case 22:
            _participant = _context6.sent;

            if (!_participant) {
              _context6.next = 27;
              break;
            }

            _participant.present = false;
            _context6.next = 27;
            return _participant.save();

          case 27:
            return _context6.abrupt('break', 28);

          case 28:
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
/* 19 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("opentok");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(4);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokSessionSchema = new _mongoose.Schema({
  room: { type: String, index: true },
  sessionId: { type: String, index: true },
  journey: { type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3' }
});

var TokSession = _mongoose2.default.model('TokSession', TokSessionSchema);

exports.default = TokSession;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(4);

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(24);

var _server2 = _interopRequireDefault(_server);

var _redux = __webpack_require__(10);

var _reactRedux = __webpack_require__(1);

var _reactRouter = __webpack_require__(25);

var _index = __webpack_require__(26);

var _index2 = _interopRequireDefault(_index);

var _action_types = __webpack_require__(5);

var _app = __webpack_require__(30);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  /*
    http://redux.js.org/docs/recipes/ServerRendering.html
  */
  var store = (0, _redux.createStore)(_index2.default);

  /*
      We can dispatch actions from server side as well. This can be very useful if you want
      to inject some initial data into the app. For example, if you have some articles that
      you have fetched from database and you want to load immediately after the user has loaded
      the webpage, you can do so in here.
       Here we are inject an list item into our app. Normally once the user has loaded the webpage
      we would make a request to the server and get the latest item list. But in the server we have
      instant connection to a database (for example, if you have a mongoDB or MySQL database installed
      in the server which contains all you items). So you can quickly fetch and inject it into the webpage.
       This will help SEO as well. If you load the webpage and make a request to the server to get all the
      latest items/articles, by the time Google Search Engine may not see all the updated items/articles.
       But if you inject the latest items/articles before it reaches the user, the Search Engine will see the
      item/article immediately.
       */
  store.dispatch({
    type: _action_types.LIST_ACTIONS.ITEM_ADD,
    item: {
      name: 'middleware',
      description: 'Redux middleware solves different problems than Express or Koa middleware, but in a conceptually similar way.\n      It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.'
    }
  });

  var context = {};

  var html = _server2.default.renderToString(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouter.StaticRouter,
      {
        location: req.originalUrl,
        context: context
      },
      _react2.default.createElement(_app2.default, null)
    )
  ));

  var finalState = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.status(200).render('index.ejs', {
      html: html,
      script: JSON.stringify(finalState)
    });
  }
});

exports.default = router;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(10);

var _list = __webpack_require__(27);

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  list: _list2.default // shorthand for lists: lists
});

exports.default = rootReducer;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _action_types = __webpack_require__(5);

var _default_state = __webpack_require__(28);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _default_state.LISTS;
  var action = arguments[1];

  switch (action.type) {
    case _action_types.LIST_ACTIONS.ITEM_PREVIEW:
      return _extends({}, state, { itemPreview: state.items[action.name.toUpperCase()] });
    case _action_types.LIST_ACTIONS.ITEM_VIEW:
      return _extends({}, state, { itemView: state.items[action.name.toUpperCase()] });
    case _action_types.LIST_ACTIONS.ITEM_CLEAR:
      return _extends({}, state, { itemView: null });
    case _action_types.LIST_ACTIONS.ITEM_ADD:
      {
        var nextItems = _extends({}, state.items);
        var itemToAdd = action.item;
        nextItems[itemToAdd.name.toUpperCase()] = itemToAdd;
        var returnVal = _extends({}, state, { items: nextItems });
        return returnVal;
      }
    default:
      return state;
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LISTS = undefined;

var _list_items = __webpack_require__(29);

var _list_items2 = _interopRequireDefault(_list_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line
var LISTS = exports.LISTS = { items: _list_items2.default, itemPreview: null, itemView: null };

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ACTIONS: {
    name: 'actions',
    description: 'Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.'
  },
  STORE: {
    name: 'store',
    description: 'The state of your whole application is stored in an object tree within a single store.'
  },
  REDUCERS: {
    name: 'reducers',
    description: 'Actions describe the fact that something happened, but don\'t specify how the application\'s state changes in response. This is the job of reducers.'
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

var _header = __webpack_require__(31);

var _header2 = _interopRequireDefault(_header);

var _home = __webpack_require__(32);

var _home2 = _interopRequireDefault(_home);

var _list_item_view = __webpack_require__(37);

var _list_item_view2 = _interopRequireDefault(_list_item_view);

var _Room = __webpack_require__(39);

var _Room2 = _interopRequireDefault(_Room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_header2.default, null),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _home2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/:room', component: _Room2.default }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/view/:name', component: _list_item_view2.default })
  );
};

exports.default = App;

/***/ }),
/* 31 */
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
    { style: { marginTop: 20 }, className: "header" },
    _react2.default.createElement(
      "h1",
      null,
      "Wacuri!"
    )
  );
};

exports.default = Header;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _list_items = __webpack_require__(33);

var _list_items2 = _interopRequireDefault(_list_items);

var _list_item_preview = __webpack_require__(35);

var _list_item_preview2 = _interopRequireDefault(_list_item_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return _react2.default.createElement(
    'div',
    { className: 'home' },
    _react2.default.createElement(
      'h3',
      null,
      'Amazing things to come.'
    )
  );
};

exports.default = Home;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _list_actions = __webpack_require__(11);

var _list_items = __webpack_require__(34);

var _list_items2 = _interopRequireDefault(_list_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
This is a redux specific function.
What is does is: It gets the state specified in here from the global redux state.
For example, here we are retrieving the list of items from the redux store.
Whenever this list changes, any component that is using this list of item will re-render.
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    listItems: state.list.items
  };
};

/*
This is a redux specific function.
http://redux.js.org/docs/api/bindActionCreators.html
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    previewItem: function previewItem(name) {
      dispatch((0, _list_actions.previewItem)(name));
    }
  };
};

/*
Here we are creating a Higher order component
https://facebook.github.io/react/docs/higher-order-components.html
 */
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_list_items2.default);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListView = function (_Component) {
  _inherits(ListView, _Component);

  function ListView() {
    _classCallCheck(this, ListView);

    return _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).apply(this, arguments));
  }

  _createClass(ListView, [{
    key: 'renderList',
    value: function renderList() {
      var _props = this.props,
          listItems = _props.listItems,
          previewItem = _props.previewItem;

      return Object.keys(listItems).map(function (key) {
        var item = listItems[key];
        return _react2.default.createElement(
          'li',
          {
            key: item.name
          },
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                return previewItem(item.name);
              } },
            item.name
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'list_items' },
        _react2.default.createElement(
          'ul',
          null,
          this.renderList()
        )
      );
    }
  }]);

  return ListView;
}(_react.Component);

ListView.propTypes = {
  listItems: _propTypes2.default.object.isRequired,
  previewItem: _propTypes2.default.func.isRequired
};

exports.default = ListView;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _list_item_preview = __webpack_require__(36);

var _list_item_preview2 = _interopRequireDefault(_list_item_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 This is a redux specific function.
 What is does is: It gets the state specified in here from the global redux state.
 For example, here we are retrieving the list of items from the redux store.
 Whenever this list changes, any component that is using this list of item will re-render.
 */
function mapStateToProps(state) {
  return {
    item: state.list.itemPreview
  };
}

/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
exports.default = (0, _reactRedux.connect)(mapStateToProps)(_list_item_preview2.default);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItemPreview = function ListItemPreview(_ref) {
  var item = _ref.item;

  if (!item) {
    return _react2.default.createElement(
      'div',
      { className: 'preview' },
      _react2.default.createElement(
        'h3',
        null,
        'Select an item'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Description will appear here'
      )
    );
  }
  return _react2.default.createElement(
    'div',
    { className: 'preview' },
    _react2.default.createElement(
      'h2',
      null,
      ' ',
      item.name,
      ' '
    ),
    _react2.default.createElement(
      'p',
      null,
      item.description
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: 'view/' + item.name },
      _react2.default.createElement(
        'button',
        { type: 'button', className: 'btn btn-primary' },
        'Read More'
      )
    )
  );
};

ListItemPreview.propTypes = {
  item: _propTypes2.default.object
};

ListItemPreview.defaultProps = {
  item: null
};

exports.default = ListItemPreview;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(1);

var _list_actions = __webpack_require__(11);

var _list_item_view = __webpack_require__(38);

var _list_item_view2 = _interopRequireDefault(_list_item_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    item: state.list.itemView
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    viewItem: function viewItem(name) {
      dispatch((0, _list_actions.viewItem)(name));
    }
  };
};

/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_list_item_view2.default);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItemView = function (_Component) {
  _inherits(ListItemView, _Component);

  function ListItemView() {
    _classCallCheck(this, ListItemView);

    return _possibleConstructorReturn(this, (ListItemView.__proto__ || Object.getPrototypeOf(ListItemView)).apply(this, arguments));
  }

  _createClass(ListItemView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          viewItem = _props.viewItem,
          match = _props.match;

      viewItem(match.params.name);
    }
  }, {
    key: 'render',
    value: function render() {
      var item = this.props.item;

      if (!item) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'view_item' },
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' },
          _react2.default.createElement(
            'button',
            { type: 'button' },
            'Back'
          )
        ),
        _react2.default.createElement(
          'h2',
          null,
          item.name
        ),
        _react2.default.createElement(
          'p',
          null,
          item.description
        )
      );
    }
  }]);

  return ListItemView;
}(_react.Component);

ListItemView.propTypes = {
  viewItem: _propTypes2.default.func.isRequired,
  match: _propTypes2.default.object.isRequired,
  item: _propTypes2.default.object
};

ListItemView.defaultProps = {
  item: null
};

exports.default = ListItemView;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactEasyState = __webpack_require__(12);

var _state = __webpack_require__(40);

var _state2 = _interopRequireDefault(_state);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid = __webpack_require__(41);

var _uuid2 = _interopRequireDefault(_uuid);

var _opentokLayoutJs = __webpack_require__(42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(43).polyfill();
__webpack_require__(9);

var _ref = {},
    OTSession = _ref.OTSession,
    OTPublisher = _ref.OTPublisher,
    OTStreams = _ref.OTStreams,
    OTSubscriber = _ref.OTSubscriber,
    createSession = _ref.createSession;


if (__CLIENT__) {
  var _require = __webpack_require__(44),
      O5Session = _require.O5Session,
      OTPublisher = _require.OTPublisher,
      OTStreams = _require.OTStreams,
      OTSubscriber = _require.OTSubscriber,
      createSession = _require.createSession;

  var OT = __webpack_require__(45);
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
      console.log('im ready');
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

    _this.state = {
      streams: [],
      publisherId: '',
      session: null,
      playerState: 'waiting'
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
          apiKey: '46102002',
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

      var currentParticipant = _state2.default.session && _state2.default.session.participants.find(function (participant) {
        return participant.connectionId === _this3.state.session.connection.id;
      });
      console.log('GOT CURRENT', currentParticipant);
      return _react2.default.createElement(
        'div',
        { style: { padding: 20 } },
        _react2.default.createElement(
          'p',
          { style: { display: 'none' } },
          JSON.stringify(_state2.default.session, null, 2)
        ),
        currentParticipant && _state2.default.session.participants.indexOf(currentParticipant) === 0 && _react2.default.createElement(
          'select',
          { onChange: this.onChangeJourney, value: _state2.default.session && _state2.default.session.journey },
          _state2.default.journeys.map(function (journey) {
            return _react2.default.createElement(
              'option',
              { value: journey },
              journey.split('/')[journey.split('/').length - 1]
            );
          })
        ),
        _react2.default.createElement(
          'audio',
          { style: { display: 'none' }, key: _state2.default.session && _state2.default.session.journey, controls: 'true', ref: function ref(audioTag) {
              _this3.audioTag = audioTag;
            } },
          _react2.default.createElement('source', { src: _state2.default.session && _state2.default.session.journey, type: 'audio/mpeg' })
        ),
        this.state.session && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h2',
            null,
            _state2.default.session.journey.split('/')[_state2.default.session.journey.split('/').length - 1]
          ),
          _react2.default.createElement(
            'p',
            null,
            'Journey state: ',
            this.state.playerState
          ),
          _react2.default.createElement(
            'div',
            { className: 'tok-container', ref: function ref(container) {
                return _this3.container = container;
              } },
            this.state.streams.length == 0 && _react2.default.createElement(
              'p',
              null,
              'Waiting for others to join this journey...'
            ),
            _react2.default.createElement(
              'div',
              { className: 'row', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', marginRight: '350px' } },
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
      );
    }
  }]);

  return Room;
}(_react.Component);

exports.default = (0, _reactEasyState.view)(Room);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactEasyState = __webpack_require__(12);

exports.default = (0, _reactEasyState.store)({
  session: null,
  journeys: []
});

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("opentok-layout-js");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("opentok-react");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("@opentok/client");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map