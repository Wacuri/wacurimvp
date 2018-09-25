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
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactEasyState = __webpack_require__(4);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deferred = function Deferred() {
  var _this = this;

  _classCallCheck(this, Deferred);

  this.promise = new Promise(function (resolve, reject) {
    _this.reject = reject;
    _this.resolve = resolve;
  });
};

var AudioQueue = function () {
  function AudioQueue(file) {
    var _this2 = this;

    _classCallCheck(this, AudioQueue);

    this.file = file;
    this.player = new Audio(file);
    this.queue = [];
    this.track = 0;
    this.player.addEventListener('ended', function (e) {
      _this2.track++;
      if (_this2.queue.length > _this2.track) {
        _this2.player.src = _this2.queue[_this2.track];
        _this2.play();
      } else {
        _this2.track = 0;
        _this2.queueCompletionPromise.resolve();
      }
    });
    this.queueCompletionPromise = new Deferred();
  }

  _createClass(AudioQueue, [{
    key: 'play',
    value: function play() {
      if (!this.src) {
        this.track = 0;
        this.player.src = this.queue[this.track];
      }
      return this.player.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      return this.player.pause();
    }
  }, {
    key: 'enqueue',
    value: function enqueue(files) {
      this.queue = [].concat(_toConsumableArray(files));
      this.queueCompletionPromise = new Deferred();
      if (this.paused) {
        this.track = 0;
        this.player.src = this.queue[0];
      }
      return this.queueCompletionPromise.promise;
    }
  }, {
    key: 'load',
    value: function load() {
      return this.player.load();
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(event, listener) {
      return this.player.addEventListener(event, listener);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(event, listener) {
      return this.player.removeEventListener(event, listener);
    }
  }, {
    key: 'src',
    set: function set(file) {
      this.queue = [file];
      this.player.src = file;
    },
    get: function get() {
      return this.player.src;
    }
  }, {
    key: 'currentTime',
    set: function set(time) {
      this.player.currentTime = time;
    },
    get: function get() {
      return this.player.currentTime;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this.player.duration;
    }
  }, {
    key: 'paused',
    get: function get() {
      return this.player.paused;
    }
  }, {
    key: 'readyState',
    get: function get() {
      return this.player.readyState;
    }
  }]);

  return AudioQueue;
}();

var state = (0, _reactEasyState.store)(_extends({
  journey: null,
  sessionId: null,
  journeys: [],
  joinableJourneys: [],
  loggedIn: false,
  user: null,
  location: '/',
  audioTag: __CLIENT__ ? new AudioQueue('/journeys/Journey to The Magnetic Field of the Earth+Music.mp3') : null
}, global.__INITIAL_STATE__ || {}));

exports.default = state;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-easy-state");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const createJob = __webpack_require__(20);
const processJobs = __webpack_require__(71);

module.exports = {
  createJob,
  processJobs
};


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

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("human-interval");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 18 */
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

Job.prototype.toJSON = __webpack_require__(53);
Job.prototype.computeNextRunAt = __webpack_require__(54);
Job.prototype.repeatEvery = __webpack_require__(57);
Job.prototype.repeatAt = __webpack_require__(58);
Job.prototype.disable = __webpack_require__(59);
Job.prototype.enable = __webpack_require__(60);
Job.prototype.unique = __webpack_require__(61);
Job.prototype.schedule = __webpack_require__(62);
Job.prototype.priority = __webpack_require__(63);
Job.prototype.fail = __webpack_require__(64);
Job.prototype.run = __webpack_require__(65);
Job.prototype.isRunning = __webpack_require__(66);
Job.prototype.save = __webpack_require__(67);
Job.prototype.remove = __webpack_require__(68);
Job.prototype.touch = __webpack_require__(69);

module.exports = Job;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("date.js");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Job = __webpack_require__(18);

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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("opentok");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _anotherMongooseStatemachine = __webpack_require__(83);

var _anotherMongooseStatemachine2 = _interopRequireDefault(_anotherMongooseStatemachine);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // journey_space.js -- The main state machine representing what is going on
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

var FlagSchema = new _mongoose.Schema({
  user: { type: String },
  reason: { type: String },
  flagged: { type: String }
});

var JourneySpaceSchema = new _mongoose.Schema({
  room: { type: String, index: true },
  name: { type: String, index: true },
  image: { type: String },
  currentTime: { type: Number },
  sessionId: { type: String, index: true },
  journey: { type: String, default: '/journeys/Journey to A Spiderweb+Music.mp3' },
  startAt: { type: Date },
  owner: { type: String }, // a user session id, for now
  flags: { type: [FlagSchema], default: [] }
}, {
  timestamps: true
});

JourneySpaceSchema.plugin(_anotherMongooseStatemachine2.default, {
  states: {
    created: { default: true },
    joined: {},
    started: {},
    paused: {},
    completed: {},
    ended: {},
    expired: {},
    failed: {}
  },
  transitions: {
    joined: { from: 'created', to: 'joined' },
    start: { from: ['joined', 'created', 'failed', 'paused'], to: 'started' },
    pause: { from: ['started'], to: 'paused' },
    fail: { from: ['joined', 'created'], to: 'failed' },
    complete: { from: ['started', 'created'], to: 'completed' },
    end: { from: '*', to: 'ended' },
    expire: { from: '*', to: 'expired' },
    reset: { from: '*', to: 'created' }
  }
});

JourneySpaceSchema.methods.skip = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = this.state;
          _context.next = _context.t0 === 'joined' ? 3 : _context.t0 === 'started' ? 6 : _context.t0 === 'completed' ? 9 : _context.t0 === 'ended' ? 12 : 15;
          break;

        case 3:
          _context.next = 5;
          return this.start();

        case 5:
          return _context.abrupt('break', 15);

        case 6:
          _context.next = 8;
          return this.complete();

        case 8:
          return _context.abrupt('break', 15);

        case 9:
          _context.next = 11;
          return this.end();

        case 11:
          return _context.abrupt('break', 15);

        case 12:
          _context.next = 14;
          return this.expire();

        case 14:
          return _context.abrupt('break', 15);

        case 15:
          return _context.abrupt('return');

        case 16:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

var JourneySpace = _mongoose2.default.model('JourneySpace', JourneySpaceSchema);

exports.default = JourneySpace;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyParticipantSchema = new _mongoose.Schema({
  "connectionId": { type: String, index: true },
  "journeySpace": { type: _mongoose.Schema.Types.ObjectId, ref: 'JourneySpace' },
  "ready": { type: Boolean, default: false },
  "present": { type: Boolean, default: true },
  user: { type: String }
}); // journey_participant.js -- A mongodb schema
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

var JourneyParticipant = _mongoose2.default.model('JourneyParticipant', JourneyParticipantSchema);

exports.default = JourneyParticipant;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyRSVPSchema = new _mongoose.Schema({
  journey: { type: _mongoose.Schema.Types.ObjectId, ref: 'JourneySpace' },
  user: { type: String }
});

var JourneyRSVP = _mongoose2.default.model('JourneyRSVP', JourneyRSVPSchema);

exports.default = JourneyRSVP;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JourneyContentSchema = new _mongoose.Schema({
  filePath: { type: String },
  name: { type: String },
  image: { type: String }
}, {
  timestamps: true
}); // journey_content.js -- A schema for Journey Content
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

var JourneyContent = _mongoose2.default.model('JourneyContent', JourneyContentSchema);

exports.default = JourneyContent;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactEasyState = __webpack_require__(4);

var _state = __webpack_require__(2);

var _state2 = _interopRequireDefault(_state);

var _CuriousLiveLogo = __webpack_require__(93);

var _CuriousLiveLogo2 = _interopRequireDefault(_CuriousLiveLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // header.js -- Handle title bar and so forth.
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.


// import logo from 'file-loader!isomorphic-loader!../../res/images/CuriousLiveLogoMark-150-300.png';


var LeaveRoomButton = function (_Component) {
  _inherits(LeaveRoomButton, _Component);

  function LeaveRoomButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LeaveRoomButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LeaveRoomButton.__proto__ || Object.getPrototypeOf(LeaveRoomButton)).call.apply(_ref, [this].concat(args))), _this), _this.onLeave = function (e) {
      e.preventDefault();
      if (!_state2.default.audioTag.paused) {
        _state2.default.audioTag.pause();
      }
      _this.props.history.push('/');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LeaveRoomButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        { onClick: this.onLeave,
          style: { backgroundColor: 'rgb(250,188,91)', borderStyle: 'none' }
        },
        _react2.default.createElement('i', { className: 'fa fa-home', style: { color: 'white', backgroundColor: 'rgb(75,176,88)', borderRadius: '50%', padding: '8px', fontSize: '24px' } })
      );
    }
  }]);

  return LeaveRoomButton;
}(_react.Component);

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'header' },
        _react2.default.createElement('div', { style: { padding: '10px' } }),
        this.props.showLeave && _react2.default.createElement(LeaveRoomButton, { history: this.props.history }),
        _react2.default.createElement('img', { className: 'logo', src: _CuriousLiveLogo2.default }),
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
    }
  }]);

  return Header;
}(_react2.default.Component);

exports.default = (0, _reactEasyState.view)(Header);

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("react-swipeable-views");

/***/ }),
/* 30 */
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

var JourneyStartsIn = function (_Component) {
  _inherits(JourneyStartsIn, _Component);

  function JourneyStartsIn(props) {
    _classCallCheck(this, JourneyStartsIn);

    var _this = _possibleConstructorReturn(this, (JourneyStartsIn.__proto__ || Object.getPrototypeOf(JourneyStartsIn)).call(this, props));

    if (props.timer) {
      props.timer.on('tick', function (current) {
        _this.setState({
          timerValue: current
        });
      });
    }
    return _this;
  }

  _createClass(JourneyStartsIn, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _this2 = this;

      if (newProps.timer) {
        newProps.timer.on('tick', function (current) {
          _this2.setState({
            timerValue: current
          });
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.timer) {
        this.props.timer.clear();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var journey = this.props.journey;

      return _react2.default.createElement(
        'div',
        { className: 'journey-starts-in', style: { padding: '10px 10px 10px', borderBottom: '1px solid rgb(88, 88, 88)' } },
        this.props.timer && _react2.default.createElement(
          'div',
          { style: { display: 'flex' } },
          _react2.default.createElement(
            'span',
            { className: 'label' },
            'Journey starts in:'
          ),
          _react2.default.createElement(
            'span',
            { className: 'time', style: { marginLeft: 'auto' } },
            this.props.timer.displayTime()
          )
        )
      );
    }
  }]);

  return JourneyStartsIn;
}(_react.Component);

exports.default = JourneyStartsIn;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(13);

var _reactRouter = __webpack_require__(12);

var _reactEasyState = __webpack_require__(4);

var _reactSwipeableViews = __webpack_require__(29);

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _jsCookie = __webpack_require__(14);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _state = __webpack_require__(2);

var _state2 = _interopRequireDefault(_state);

var _journey_starts_in = __webpack_require__(30);

var _journey_starts_in2 = _interopRequireDefault(_journey_starts_in);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  window.state = _state2.default;
}

var Intro = function (_Component) {
  _inherits(Intro, _Component);

  function Intro(props) {
    _classCallCheck(this, Intro);

    var _this = _possibleConstructorReturn(this, (Intro.__proto__ || Object.getPrototypeOf(Intro)).call(this, props));

    _this.goTo = function (index) {
      _this.setState({
        index: index
      });
    };

    _this.onChangeIndex = function (index, last, _ref2) {
      var reason = _ref2.reason;

      _this.setState({
        index: index
      });
    };

    _this.onSkip = function (e) {
      e.preventDefault();
      _this.props.onClose();
    };

    _this.state = {
      streams: [],
      views: [_react2.default.createElement(
        'div',
        { className: 'intro-screen' },
        _react2.default.createElement(
          'h3',
          null,
          '1. Welcome to CuriousLive\u2026 A five-minute guided journey \u2013 plus sharing \u2013 with others.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'You are now in the JourneySpace and the journey will begin shortly when the timer above elapses and you hear the chime.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'If more spots are available for this journey, we invite you to invite a friend to two\u2026 use the INVITE FRIENDS button.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Then we\u2019ll mute your microphones and for five minutes and you\u2019ll hear your Journey Guide taking you on the journey.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The goal is relaxation and joy, so settle in by breathing slowly and deeply and adjust your posture to be comfortable.'
        )
      ), _react2.default.createElement(
        'div',
        { className: 'intro-screen' },
        _react2.default.createElement(
          'h3',
          null,
          '2. Next comes the Journey\u2026'
        ),
        _react2.default.createElement(
          'p',
          null,
          'The CuriousLive\u2122 experience is intentionally short so busy people can find the time to do it regularly. That\'s when you get the real benefits.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'CuriousLive Journeys are captured Live and Unplugged, never scripted. Your Journey Guide will help you relax into the JourneySpace and go deep into the Journey.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Your microphone will be automatically muted.',
          _react2.default.createElement('br', null),
          'Some people like to leave their cameras on during the journey to increase the feeling of a shared experience. It is up to you.'
        )
      ), _react2.default.createElement(
        'div',
        { className: 'intro-screen' },
        _react2.default.createElement(
          'h3',
          null,
          '3. After the Journey comes the Sharing and Connecting.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Now you\u2019ll have the opportunity to briefly share with others your insights and experience. Each person takes 1 or 2 minutes.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'When you\u2019re ready, click on the \u201CShare\u201D button to start your Share. Go deep. Drop in to your insights and intuitions and o!er the others something special about your experience.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'And when others are sharing, please listen deeply, and in turn they will listen more deeply to you.'
        )
      ), _react2.default.createElement(
        'div',
        { className: 'intro-screen' },
        _react2.default.createElement(
          'h3',
          null,
          '4. How was your experience? We Love Feedback from Our Community.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'We welcome your feedback about the process and the Wacuri Method even after the group experience. Please take a moment to rate your experience and give us your valuable feedback.'
        )
      )],
      index: 0
    };
    return _this;
  }

  _createClass(Intro, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _jsCookie2.default.set('saw intro', true, { expires: 365 });

      if (this.props.match.params.room) {
        fetch('/api/journeys/' + this.props.match.params.room + window.location.search, { credentials: 'include' }).then(function (res) {
          return res.json();
        }).then(function (json) {
          _state2.default.journey = json;
          _this2.sessionHelper = createSession({
            apiKey: _state2.default.openTokKey,
            sessionId: _state2.default.journey.sessionId,
            token: _state2.default.journey.token,
            onConnect: function onConnect() {},
            onStreamsUpdated: function onStreamsUpdated(streams) {
              _this2.setState({ streams: streams });
            }
          });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'intro-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'intro', style: { minHeight: 'calc(100vh - 46px)', position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(81, 148, 220)', padding: '20px' } },
          _state2.default.journey && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', alignItems: 'baseline' } },
              _react2.default.createElement(
                'h2',
                { style: { margin: 0 } },
                _state2.default.journey.name
              ),
              _react2.default.createElement(
                'div',
                { style: { marginLeft: 'auto', display: 'flex' } },
                _react2.default.createElement(_journey_starts_in2.default, { journey: this.props.journey, timer: this.props.timer })
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { justifyContent: 'center', display: 'flex' } },
              _react2.default.createElement('img', { style: { height: '150px' }, src: _state2.default.journey.image }),
              this.sessionHelper && this.journeySpaceOwnerVideoStream && _react2.default.createElement(OTSubscriber, {
                session: this.sessionHelper.session,
                stream: this.journeySpaceOwnerVideoStream,
                properties: {
                  width: '150px',
                  height: '150px'
                }
              })
            )
          ),
          _react2.default.createElement(
            _reactSwipeableViews2.default,
            { onChangeIndex: this.onChangeIndex, index: this.state.index, enableMouseEvents: true, ref: function ref(swipeable) {
                return _this3.swipeable = swipeable;
              } },
            this.state.views
          ),
          _react2.default.createElement(
            'ul',
            { className: 'dots', style: { alignSelf: 'center', listStyle: 'none', padding: 0, margin: 'auto 0 0 0', display: 'flex' } },
            this.state.views.map(function (view, i) {
              return _react2.default.createElement(
                'li',
                { style: { marginRight: '10px', cursor: 'pointer' }, onClick: function onClick() {
                    return _this3.goTo(i);
                  }, className: _this3.state.index === i ? 'active' : '' },
                _react2.default.createElement('span', { className: 'dot' })
              );
            })
          ),
          _react2.default.createElement(
            'a',
            { href: '#', className: 'intro-skip', onClick: this.onSkip },
            this.state.index === this.state.views.length - 1 ? 'Begin Journey!' : 'skip'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'intro-next' },
          this.props.children
        )
      );
    }
  }, {
    key: 'journeySpaceOwnerVideoStream',
    get: function get() {
      if (_state2.default.journey) {
        var owner = _state2.default.journey.owner;
        var participant = _state2.default.journey.participants.find(function (p) {
          return p.user === owner;
        });
        if (_state2.default.sessionId === owner) {
          return null;
        } else {
          var stream = this.state.streams.find(function (s) {
            return s.connection.id === participant.connectionId;
          });
          return stream;
        }
      }
      return null;
    }
  }]);

  return Intro;
}(_react.Component);

exports.default = (0, _reactEasyState.view)(Intro);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.setSizes = setSizes;
// utility.js -- This is needed to do some reposition in javascript
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.


var ONE_SQUARE_WIDTH = exports.ONE_SQUARE_WIDTH = 0;
var LANDSCAPE_NOT_PORTRAIT = exports.LANDSCAPE_NOT_PORTRAIT = true;
// Our basic design is to make sure that two sqares fit in
// the view port (not counting the header), arranged either
// vertically for portrait mode or horiontally for landscape.
function setSizes() {

   var tb_and_h = document.getElementById("topbar_and_header");
   if (!tb_and_h) {
      // if we can't find an element, we are on the wrong page
      return;
   }

   var debug = 0;

   var w = window.innerWidth;
   var h = window.innerHeight;
   if (debug) console.log(w, h);
   // TODO: this should actually be pulled from the header height
   var headerHeight = tb_and_h.offsetHeight;
   var h = h - headerHeight;

   // one square width...
   var osw = Math.min(Math.max(w, h) / 2, Math.min(w, h));

   var LANDSCAPE_NOT_PORTRAIT = w > h;
   exports.ONE_SQUARE_WIDTH = ONE_SQUARE_WIDTH = osw;

   if (debug) console.log(osw);

   var osw_h = osw / 2;

   // The square frame
   var sf = document.getElementById("bigsquares");
   sf.style.display = "flex";
   sf.style.flexFlow = w >= h ? "row wrap" : "column wrap";
   if (debug) console.log("flex flow", sf.style.flexFlow);

   var square2 = document.getElementById("secondsquare");
   square2.style.width = osw + "px";
   square2.style.maxWidth = osw + "px";

   // video-square0 is the Thumbnail
   // video-square4 is the empty one
   var s0 = document.getElementById("video-square0");
   var s1 = document.getElementById("video-square1");
   var s2 = document.getElementById("video-square2");
   var s3 = document.getElementById("video-square3");
   var s4 = document.getElementById("video-square4");
   var jt = document.getElementById("journey-timeline0");

   s0.style.height = osw + "px";
   s0.style.width = osw + "px";

   s1.style.height = osw_h + "px";
   s2.style.height = osw_h + "px";
   s3.style.height = osw_h + "px";
   s4.style.height = osw_h + "px";

   s1.style.width = osw_h + "px";
   s2.style.width = osw_h + "px";
   s3.style.width = osw_h + "px";
   s4.style.width = osw_h + "px";

   // This is fragile and stupid, i need to do better.
   jt.style.width = osw - 40 + "px";

   var tb = document.getElementById("titlebar");

   console.log("landsacpeNotPortrait", LANDSCAPE_NOT_PORTRAIT);
   tb.style.maxWidth = (LANDSCAPE_NOT_PORTRAIT ? osw * 2 : osw) + "px";
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
module.exports = __webpack_require__(35);


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill/lib/index");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dotenv = __webpack_require__(15);

dotenv.config();
global.__CLIENT__ = false;
global.__SERVER__ = true;

var extendRequire = __webpack_require__(36);

__webpack_require__(37);

extendRequire().then(function () {
    __webpack_require__(84);
}).catch(function (err) {
    console.log(err);
});

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-loader/lib/extend-require");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fs = __webpack_require__(16);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(8);

var _path2 = _interopRequireDefault(_path);

var _Agenda = __webpack_require__(38);

var _Agenda2 = _interopRequireDefault(_Agenda);

var _lodash = __webpack_require__(82);

var _lodash2 = _interopRequireDefault(_lodash);

var _opentok = __webpack_require__(21);

var _opentok2 = _interopRequireDefault(_opentok);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _journey_space = __webpack_require__(22);

var _journey_space2 = _interopRequireDefault(_journey_space);

var _journey_participant = __webpack_require__(23);

var _journey_participant2 = _interopRequireDefault(_journey_participant);

var _journey_rsvp = __webpack_require__(24);

var _journey_rsvp2 = _interopRequireDefault(_journey_rsvp);

var _journey_content = __webpack_require__(25);

var _journey_content2 = _interopRequireDefault(_journey_content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var agenda = new _Agenda2.default({ db: { address: process.env.MONGODB_URI || process.env.MONGO_URL } });
var opentok = new _opentok2.default(process.env.OPENTOK_KEY, process.env.OPENTOK_SECRET);
var db = _mongoose2.default.connection;

var offset = 0;
agenda.define('create journey space', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(job, done) {
    var total, randomJourney, journeySpace, globalSpace, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.collection('journeycontents').countDocuments();

          case 3:
            total = _context.sent;
            _context.next = 6;
            return db.collection('journeycontents').find().skip(offset++ % total).limit(1).toArray();

          case 6:
            randomJourney = _context.sent[0];
            journeySpace = new _journey_space2.default({
              journey: randomJourney.filePath,
              name: randomJourney.name,
              image: randomJourney.image,
              room: randomJourney.name.toLowerCase().replace(/[^a-z]/ig, '-') + '-' + new Date().getTime(),
              startAt: (0, _moment2.default)().add(10, 'minutes').toDate()
            });
            _context.next = 10;
            return journeySpace.save();

          case 10:
            _context.next = 12;
            return agenda.schedule(journeySpace.startAt, 'start journey', { journey: journeySpace._id });

          case 12:
            _context.next = 14;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 14:
            globalSpace = _context.sent;

            if (globalSpace) {
              response = journeySpace.toJSON();

              response.participants = [];
              opentok.signal(globalSpace.sessionId, null, { 'type': 'createdNewJourney', 'data': JSON.stringify(response) }, done);
            } else {
              done();
            }
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            done(_context.t0);

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 18]]);
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
    var journey, journeySpace, globalSpace, participants;
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
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 7:
            globalSpace = _context3.sent;
            _context3.next = 10;
            return _journey_participant2.default.find({ journeySpace: journeySpace._id, present: true }).exec();

          case 10:
            participants = _context3.sent;

            if (!(participants.length > 1)) {
              _context3.next = 17;
              break;
            }

            _context3.next = 14;
            return journeySpace.start();

          case 14:
            opentok.signal(journeySpace.sessionId, null, { 'type': 'startJourney', 'data': JSON.stringify({ journey: journey }) }, function () {});
            _context3.next = 21;
            break;

          case 17:
            _context3.next = 19;
            return journeySpace.fail();

          case 19:
            opentok.signal(journeySpace.sessionId, null, { 'type': 'failJourney', 'data': JSON.stringify({ journey: journey }) }, function () {});
            opentok.signal(globalSpace.sessionId, null, { 'type': 'failJourney', 'data': JSON.stringify(journeySpace.toJSON()) }, function () {});

          case 21:
            done();
            _context3.next = 27;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3['catch'](0);

            done(_context3.t0);

          case 27:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 24]]);
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

const Agenda = __webpack_require__(39);

module.exports = Agenda;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * General Notes:
 * - Refactor remaining deprecated MongoDB Native Driver methods: findAndModify()
 */

const Emitter = __webpack_require__(17).EventEmitter;
const humanInterval = __webpack_require__(9);

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

Agenda.prototype.mongo = __webpack_require__(40);
Agenda.prototype.database = __webpack_require__(41);
Agenda.prototype.db_init = __webpack_require__(43); // eslint-disable-line camelcase
Agenda.prototype.name = __webpack_require__(44);
Agenda.prototype.processEvery = __webpack_require__(45);
Agenda.prototype.maxConcurrency = __webpack_require__(46);
Agenda.prototype.defaultConcurrency = __webpack_require__(47);
Agenda.prototype.lockLimit = __webpack_require__(48);
Agenda.prototype.defaultLockLimit = __webpack_require__(49);
Agenda.prototype.defaultLockLifetime = __webpack_require__(50);
Agenda.prototype.sort = __webpack_require__(51);
Agenda.prototype.create = __webpack_require__(52);
Agenda.prototype.jobs = __webpack_require__(70);
Agenda.prototype.purge = __webpack_require__(72);
Agenda.prototype.define = __webpack_require__(73);
Agenda.prototype.every = __webpack_require__(74);
Agenda.prototype.schedule = __webpack_require__(75);
Agenda.prototype.now = __webpack_require__(76);
Agenda.prototype.cancel = __webpack_require__(77);
Agenda.prototype.saveJob = __webpack_require__(78);
Agenda.prototype.start = __webpack_require__(79);
Agenda.prototype.stop = __webpack_require__(80);
Agenda.prototype._findAndLockNextJob = __webpack_require__(81);

module.exports = Agenda;


/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const MongoClient = __webpack_require__(42).MongoClient;
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
/* 42 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 43 */
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
/* 44 */
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const humanInterval = __webpack_require__(9);
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:create');
const Job = __webpack_require__(18);

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
/* 53 */
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const humanInterval = __webpack_require__(9);
const CronTime = __webpack_require__(55).CronTime;
const moment = __webpack_require__(56);
const date = __webpack_require__(19);
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
/* 55 */
/***/ (function(module, exports) {

module.exports = require("cron");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 57 */
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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const date = __webpack_require__(19);

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
/* 63 */
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
/* 64 */
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
/* 65 */
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const utils = __webpack_require__(5);

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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// @TODO: What should we use for internal util functions?
//        Maybe we should use agenda:util:processJobs which would move agenda:* to agenda:agenda;*
const debug = __webpack_require__(0)('agenda:internal:processJobs');
const createJob = __webpack_require__(20);

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
/* 72 */
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:saveJob');
const utils = __webpack_require__(5);

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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:start');
const utils = __webpack_require__(5);

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
/* 80 */
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const debug = __webpack_require__(0)('agenda:_findAndLockNextJob');
const utils = __webpack_require__(5);

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
/* 82 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("another-mongoose-statemachine");

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(8);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(11);

var _express2 = _interopRequireDefault(_express);

var _sslExpressWww = __webpack_require__(85);

var _sslExpressWww2 = _interopRequireDefault(_sslExpressWww);

var _bodyParser = __webpack_require__(86);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = __webpack_require__(87);

var _api2 = _interopRequireDefault(_api);

var _ssr = __webpack_require__(88);

var _ssr2 = _interopRequireDefault(_ssr);

var _agenda = __webpack_require__(110);

var _agenda2 = _interopRequireDefault(_agenda);

var _agendash = __webpack_require__(111);

var _agendash2 = _interopRequireDefault(_agendash);

var _expressSession = __webpack_require__(112);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = __webpack_require__(113);

var _connectMongo2 = _interopRequireDefault(_connectMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_sslExpressWww2.default);
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

// This is a test to see if this shows up in the Heroku log..
console.log("HELLO WORLD");
// This is a test to see if this shows up in the Heroku log..
console.log("assigned port", process.env.PORT);
app.listen(process.env.PORT || 5000, function () {
    console.log('Hello World listening on port 5000!');
});

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("ssl-express-www");

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = __webpack_require__(16);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(8);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(11);

var _express2 = _interopRequireDefault(_express);

var _opentok = __webpack_require__(21);

var _opentok2 = _interopRequireDefault(_opentok);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _journey_space = __webpack_require__(22);

var _journey_space2 = _interopRequireDefault(_journey_space);

var _journey_participant = __webpack_require__(23);

var _journey_participant2 = _interopRequireDefault(_journey_participant);

var _journey_rsvp = __webpack_require__(24);

var _journey_rsvp2 = _interopRequireDefault(_journey_rsvp);

var _journey_content = __webpack_require__(25);

var _journey_content2 = _interopRequireDefault(_journey_content);

var _dotenv = __webpack_require__(15);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // api.js -- The main endpoint for communications.
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

__webpack_require__(26);

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
router.get('/journeys/:room', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var room, journeySpace, session, participants, currentUserParticipant, newParticipant, globalSpace, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            room = req.params.room;
            _context3.next = 3;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 3:
            journeySpace = _context3.sent;

            if (!journeySpace) {
              _context3.next = 44;
              break;
            }

            _context3.prev = 5;
            _context3.next = 8;
            return journeySpace.joined();

          case 8:
            _context3.next = 12;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](5);

          case 12:
            if (journeySpace.sessionId) {
              _context3.next = 19;
              break;
            }

            _context3.next = 15;
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

          case 15:
            session = _context3.sent;

            journeySpace.sessionId = session.sessionId;
            _context3.next = 19;
            return journeySpace.save();

          case 19:
            _context3.next = 21;
            return _journey_participant2.default.find({ journeySpace: journeySpace, present: true }).lean().exec();

          case 21:
            participants = _context3.sent;
            _context3.next = 24;
            return _journey_participant2.default.findOne({ journeySpace: journeySpace, user: req.session.id }).exec();

          case 24:
            currentUserParticipant = _context3.sent;

            if (currentUserParticipant) {
              _context3.next = 36;
              break;
            }

            newParticipant = new _journey_participant2.default({ journeySpace: journeySpace, user: req.session.id, present: true });
            _context3.next = 29;
            return newParticipant.save();

          case 29:
            participants.push(newParticipant);
            _context3.next = 32;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 32:
            globalSpace = _context3.sent;

            if (globalSpace) {
              opentok.signal(globalSpace.sessionId, null, { 'type': 'newJoin', 'data': JSON.stringify(newParticipant.toJSON()) }, function () {});
            }
            _context3.next = 39;
            break;

          case 36:
            currentUserParticipant.present = true;
            _context3.next = 39;
            return currentUserParticipant.save();

          case 39:
            response = journeySpace.toJSON();

            response.participants = participants;
            res.json(_extends({}, response, {
              token: generateToken(journeySpace.sessionId)
            }));
            _context3.next = 45;
            break;

          case 44:
            opentok.createSession(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, session) {
                var db, selectedJourney, randomJourney, newJourneySpace, response;
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
                        // create new journey space, save tok session id
                        db = _mongoose2.default.connection;
                        selectedJourney = void 0;

                        if (!req.query.journey) {
                          _context2.next = 8;
                          break;
                        }

                        _context2.next = 7;
                        return _journey_content2.default.findOne({ name: req.query.journey }).lean().exec();

                      case 7:
                        selectedJourney = _context2.sent;

                      case 8:
                        if (selectedJourney) {
                          _context2.next = 13;
                          break;
                        }

                        _context2.next = 11;
                        return db.collection('journeycontents').aggregate([{ $sample: { size: 1 } }]).toArray();

                      case 11:
                        randomJourney = _context2.sent[0];

                        selectedJourney = randomJourney;

                      case 13:
                        newJourneySpace = new _journey_space2.default({
                          room: room,
                          sessionId: session.sessionId,
                          journey: selectedJourney.filePath,
                          name: req.query.name || selectedJourney.name,
                          image: selectedJourney.image,
                          owner: req.session.id
                        });
                        _context2.next = 16;
                        return newJourneySpace.save();

                      case 16:
                        response = newJourneySpace.toJSON();

                        response.participants = [];
                        response.rsvps = [];
                        res.json(_extends({}, response, {
                          token: generateToken(session.sessionId)
                        }));

                      case 20:
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

          case 45:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[5, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/journeys/:room/joined', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var room, connectionId, journeySpace, participant, globalSpace;
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
            journeySpace = _context4.sent;

            if (!journeySpace) {
              _context4.next = 28;
              break;
            }

            _context4.next = 10;
            return _journey_participant2.default.findOne({ journeySpace: journeySpace, user: req.session.id }).exec();

          case 10:
            participant = _context4.sent;

            if (!participant) {
              _context4.next = 18;
              break;
            }

            participant.connectionId = connectionId;
            participant.present = true;
            _context4.next = 16;
            return participant.save();

          case 16:
            _context4.next = 21;
            break;

          case 18:
            participant = new _journey_participant2.default({ journeySpace: journeySpace, user: req.session.id, connectionId: connectionId });
            _context4.next = 21;
            return participant.save();

          case 21:
            _context4.next = 23;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 23:
            globalSpace = _context4.sent;

            if (globalSpace) {
              opentok.signal(globalSpace.sessionId, null, { 'type': 'journeyerJoined', 'data': JSON.stringify(participant.toJSON()) }, function () {});
            }
            res.json(participant.toJSON());
            _context4.next = 29;
            break;

          case 28:
            res.sendStatus(404);

          case 29:
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

router.get('/journeys/:room/:connectionId', function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$params, room, connectionId, journeySpace, participant;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params = req.params, room = _req$params.room, connectionId = _req$params.connectionId;
            _context5.next = 3;
            return _journey_space2.default.findOne({ room: room }).lean().exec();

          case 3:
            journeySpace = _context5.sent;

            if (!journeySpace) {
              _context5.next = 10;
              break;
            }

            _context5.next = 7;
            return _journey_participant2.default.findOne({ session: journeySpace, connectionId: connectionId }).exec();

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
                from: 'journeyparticipants',
                localField: '_id',
                foreignField: 'journeySpace',
                as: 'participants'
              }
            }, {
              $project: {
                room: 1,
                name: 1,
                journey: 1,
                image: 1,
                startAt: 1,
                participants: {
                  $filter: {
                    input: "$participants",
                    as: "participants",
                    cond: { $eq: ['$$participants.present', true] }
                  }
                }
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
            res.json(rsvp);

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

router.post('/journeys/:room/completed', function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var journey, response, participants;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _journey_space2.default.findOne({ room: req.params.room }).exec();

          case 2:
            journey = _context8.sent;
            _context8.next = 5;
            return journey.complete();

          case 5:
            response = journey.toJSON();
            _context8.next = 8;
            return _journey_participant2.default.find({ session: journey, present: true }).lean().exec();

          case 8:
            participants = _context8.sent;

            response.participants = participants;
            opentok.signal(journey.sessionId, null, { 'type': 'journeyUpdated', 'data': JSON.stringify(response) }, function () {});
            res.sendStatus(200);

          case 12:
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

router.post('/journeys/:id/skip', function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var journey, response, participants;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _journey_space2.default.findOne({ room: req.params.id }).exec();

          case 2:
            journey = _context10.sent;
            _context10.next = 5;
            return journey.skip();

          case 5:
            response = journey.toJSON();
            _context10.next = 8;
            return _journey_participant2.default.find({ session: journey, present: true }).lean().exec();

          case 8:
            participants = _context10.sent;

            response.participants = participants;
            opentok.signal(journey.sessionId, null, { 'type': 'journeyUpdated', 'data': JSON.stringify(response) }, function () {});

          case 11:
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

// TEMP: Use get for convenience. hardcode temp-home-location for the room
// Trigger a general announcement to everyone
router.get('/sessions/test/temp-home-location', function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var journeySpace, messageData;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 2:
            journeySpace = _context11.sent;

            if (!journeySpace) {
              _context11.next = 8;
              break;
            }

            console.log("**** SENDING SIGNAL");
            messageData = {
              userName: "Bob",
              description: "some text",
              url: "http://www.news.google.com"
            };


            opentok.signal(journeySpace.sessionId, null, { type: 'displayJourneyRequest', data: JSON.stringify(messageData) }, function () {});
            return _context11.abrupt('return', res.sendStatus(200));

          case 8:
            res.sendStatus(200);

          case 9:
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

router.get('/journeys/:room/connections/:connection/ready', function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var _req$params2, room, connection, journeySpace, participant, allReady;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _req$params2 = req.params, room = _req$params2.room, connection = _req$params2.connection;
            _context12.next = 3;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 3:
            journeySpace = _context12.sent;

            if (!journeySpace) {
              _context12.next = 18;
              break;
            }

            _context12.next = 7;
            return _journey_participant2.default.findOne({ session: journeySpace, connectionId: connection });

          case 7:
            participant = _context12.sent;

            participant.ready = true;
            _context12.next = 11;
            return participant.save();

          case 11:
            opentok.signal(journeySpace.sessionId, null, { type: 'ready', data: 'foo' }, function () {});
            _context12.next = 14;
            return _journey_participant2.default.count({ session: journeySpace, ready: false, present: true });

          case 14:
            _context12.t0 = _context12.sent;
            allReady = _context12.t0 === 0;

            if (allReady) {
              // signal(journeySpace.sessionId, {type: 'startJourney', data: 'foo'});
            }
            return _context12.abrupt('return', res.sendStatus(200));

          case 18:
            res.sendStatus(200);

          case 19:
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

router.get('/journeys', function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    var journeys;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _journey_content2.default.find().exec();

          case 2:
            journeys = _context13.sent;

            res.json(journeys);

          case 4:
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

router.put('/journeys/:room/journey', function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
    var journeyFile, room, journey, journeyContent, response, participants;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            journeyFile = req.body.journey;
            room = req.params.room;
            _context14.next = 4;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 4:
            journey = _context14.sent;
            _context14.next = 7;
            return _journey_content2.default.findOne({ filePath: journeyFile }).exec();

          case 7:
            journeyContent = _context14.sent;

            if (!journey) {
              _context14.next = 22;
              break;
            }

            journey.journey = journeyContent.filePath;
            journey.image = journeyContent.image;
            journey['name'] = journeyContent.get('name');
            _context14.next = 14;
            return journey.save();

          case 14:
            _context14.next = 16;
            return journey.reset();

          case 16:
            response = journey.toJSON();
            _context14.next = 19;
            return _journey_participant2.default.find({ session: journey, present: true }).lean().exec();

          case 19:
            participants = _context14.sent;

            response.participants = participants;
            opentok.signal(journey.sessionId, null, { 'type': 'journeyUpdated', 'data': JSON.stringify(response) }, function () {});

          case 22:
            res.sendStatus(200);

          case 23:
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

// TODO: this should really verify that the user hitting this endpoint is authorized to do so (e.g. that they are the journey's host)
router.post('/journeys/:room/start', function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
    var room, journeySpace;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            room = req.params.room;
            _context15.next = 3;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 3:
            journeySpace = _context15.sent;

            if (!journeySpace) {
              _context15.next = 14;
              break;
            }

            _context15.prev = 5;
            _context15.next = 8;
            return journeySpace.start();

          case 8:
            _context15.next = 13;
            break;

          case 10:
            _context15.prev = 10;
            _context15.t0 = _context15['catch'](5);

            console.log('error starting journey', _context15.t0);

          case 13:
            opentok.signal(journeySpace.sessionId, null, { type: 'startJourney', data: '' }, function () {});

          case 14:
            res.sendStatus(200);

          case 15:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[5, 10]]);
  }));

  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());

router.post('/journeys/:room/pause', function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
    var room, journeySpace;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            room = req.params.room;
            _context16.next = 3;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 3:
            journeySpace = _context16.sent;

            if (!journeySpace) {
              _context16.next = 14;
              break;
            }

            _context16.prev = 5;
            _context16.next = 8;
            return journeySpace.pause();

          case 8:
            _context16.next = 13;
            break;

          case 10:
            _context16.prev = 10;
            _context16.t0 = _context16['catch'](5);

            console.log('error pausing journey', _context16.t0);

          case 13:
            opentok.signal(journeySpace.sessionId, null, { type: 'pauseJourney', data: '' }, function () {});

          case 14:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined, [[5, 10]]);
  }));

  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());

router.post('/journeys/:room/flag', function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
    var room, userId, journeySpace, participants;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            room = req.params.room;
            userId = req.sessionID; // using sessionId as representation of user for now

            _context17.next = 4;
            return _journey_space2.default.findOne({ room: room }).exec();

          case 4:
            journeySpace = _context17.sent;

            if (!journeySpace) {
              _context17.next = 13;
              break;
            }

            journeySpace.flags.push({ user: userId, flagged: req.body.stream });
            _context17.next = 9;
            return journeySpace.save();

          case 9:
            _context17.next = 11;
            return _journey_participant2.default.find({ session: journeySpace, present: true }).lean().exec();

          case 11:
            participants = _context17.sent;
            return _context17.abrupt('return', res.json(_extends({}, journeySpace.toJSON(), { participants: participants })));

          case 13:
            res.sendStatus(404);

          case 14:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());

router.post('/event', function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(req, res) {
    var _req$body, sessionId, connection, journeySpace, participant, globalSpace;

    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _req$body = req.body, sessionId = _req$body.sessionId, connection = _req$body.connection;
            _context18.next = 3;
            return _journey_space2.default.findOne({ sessionId: sessionId }).exec();

          case 3:
            journeySpace = _context18.sent;


            console.log(req.body.event, JSON.stringify(req.body, null, 2));

            _context18.t0 = req.body.event;
            _context18.next = _context18.t0 === 'connectionCreated' ? 8 : _context18.t0 === 'connectionDestroyed' ? 9 : 22;
            break;

          case 8:
            return _context18.abrupt('break', 22);

          case 9:
            if (!journeySpace) {
              _context18.next = 21;
              break;
            }

            _context18.next = 12;
            return _journey_participant2.default.findOne({ journeySpace: journeySpace, connectionId: connection.id });

          case 12:
            participant = _context18.sent;

            if (!participant) {
              _context18.next = 21;
              break;
            }

            participant.present = false;
            _context18.next = 17;
            return participant.save();

          case 17:
            _context18.next = 19;
            return _journey_space2.default.findOne({ room: 'temp-home-location' }).exec();

          case 19:
            globalSpace = _context18.sent;

            if (globalSpace) {
              opentok.signal(globalSpace.sessionId, null, { 'type': 'journeyerLeftSpace', 'data': JSON.stringify(participant.toJSON()) }, function () {});
            }

          case 21:
            return _context18.abrupt('break', 22);

          case 22:
            res.sendStatus(200);

          case 23:
          case 'end':
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
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

exports.default = router;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(11);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(89);

var _server2 = _interopRequireDefault(_server);

var _redux = __webpack_require__(90);

var _reactRedux = __webpack_require__(91);

var _reactRouter = __webpack_require__(12);

var _app = __webpack_require__(92);

var _app2 = _interopRequireDefault(_app);

var _state = __webpack_require__(2);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  var context = {};

  _state2.default.loggedIn = req.session.loggedIn;
  _state2.default.user = req.session.user;

  var html = _server2.default.renderToString(_react2.default.createElement(
    _reactRouter.StaticRouter,
    {
      location: req.originalUrl,
      context: context
    },
    _react2.default.createElement(_app2.default, null)
  ));

  if (context.url) {
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
/* 89 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(13);

var _reactRouter = __webpack_require__(12);

var _reactEasyState = __webpack_require__(4);

var _propTypes = __webpack_require__(27);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _jsCookie = __webpack_require__(14);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _header = __webpack_require__(28);

var _header2 = _interopRequireDefault(_header);

var _home = __webpack_require__(94);

var _home2 = _interopRequireDefault(_home);

var _journey_space = __webpack_require__(101);

var _journey_space2 = _interopRequireDefault(_journey_space);

var _intro = __webpack_require__(31);

var _intro2 = _interopRequireDefault(_intro);

var _countdown_message = __webpack_require__(109);

var _countdown_message2 = _interopRequireDefault(_countdown_message);

var _state = __webpack_require__(2);

var _state2 = _interopRequireDefault(_state);

var _utility = __webpack_require__(32);

var someHelper = _interopRequireWildcard(_utility);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // app.js -- The "one-page" client side holder for this react app
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

var _ref = {},
    OTSession = _ref.OTSession,
    OTPublisher = _ref.OTPublisher,
    OTStreams = _ref.OTStreams,
    OTSubscriber = _ref.OTSubscriber,
    createSession = _ref.createSession;

// Note: it may be worth using serve favicon to make this work on our deployed site: https://expressjs.com/en/resources/middleware/serve-favicon.html


if (__CLIENT__) {
  var _require = __webpack_require__(6),
      OTSession = _require.OTSession,
      OTPublisher = _require.OTPublisher,
      OTStreams = _require.OTStreams,
      OTSubscriber = _require.OTSubscriber,
      createSession = _require.createSession;

  var OT = __webpack_require__(7);
  var globalClickCatcher = function globalClickCatcher(e) {
    if (_state2.default.audioTag && _state2.default.audioTag.paused) {
      _state2.default.audioTag.play().then(function () {
        _state2.default.audioTag.pause();
        document.body.removeEventListener('click', globalClickCatcher);
      });
    }
  };

  var resizeEventHandler = function resizeEventHandler(e) {
    someHelper.setSizes();
  };
  document.body.addEventListener('click', globalClickCatcher);
  window.addEventListener('resize', resizeEventHandler);
  window.addEventListener('load', resizeEventHandler);
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

  function JoinableJourneyCard(props) {
    _classCallCheck(this, JoinableJourneyCard);

    var _this3 = _possibleConstructorReturn(this, (JoinableJourneyCard.__proto__ || Object.getPrototypeOf(JoinableJourneyCard)).call(this, props));

    _this3.state = {
      loading: false
    };
    return _this3;
  }

  _createClass(JoinableJourneyCard, [{
    key: 'render',
    value: function render() {
      var journey = this.props.journey;

      var currentUserHasRSVP = (journey.participants || []).find(function (participant) {
        return participant.user === _state2.default.sessionId;
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
          _react2.default.createElement(_countdown_message2.default, { endTime: journey.startAt }),
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
            'ul',
            { className: 'journey-vacant-spots', style: { display: 'flex', listStyle: 'none', margin: 0, padding: 0 } },
            _react2.default.createElement(
              'li',
              { key: 'msg' },
              3 - journey.participants.length,
              ' spot',
              3 - journey.participants.length > 1 ? 's' : '',
              ' available:'
            ),
            Array(3).fill(0).map(function (k, i) {
              return (
                // Rob is changing this to "user" just as a test of my ability to change things...
                // Note: Adding a "key" here seems unneeded but made a confusing waring disappear...
                _react2.default.createElement(
                  'li',
                  { key: "item" + i },
                  _react2.default.createElement('i', { className: 'fa fa-user ' + (journey.participants.length > i ? 'fill' : '') })
                )
              );
            })
          ),
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/' + journey.room, className: 'btn btn-primary' },
            currentUserHasRSVP ? 'Go there now' : 'Join'
          )
        )
      );
    }
  }]);

  return JoinableJourneyCard;
}(_react.Component);

var JourneyBoard = function (_Component3) {
  _inherits(JourneyBoard, _Component3);

  function JourneyBoard() {
    _classCallCheck(this, JourneyBoard);

    return _possibleConstructorReturn(this, (JourneyBoard.__proto__ || Object.getPrototypeOf(JourneyBoard)).apply(this, arguments));
  }

  _createClass(JourneyBoard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this5 = this;

      var roomUrl = 'temp-home-location';

      // subscribe to global events
      fetch('/api/journeys/' + roomUrl, { credentials: 'include' }).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this5.sessionHelper = createSession({
          apiKey: _state2.default.openTokKey,
          sessionId: json.sessionId,
          token: json.token,
          onConnect: function onConnect() {}
        });

        _this5.sessionHelper.session.on("signal:createdNewJourney", function (event) {
          // console.log("joinable Jounerys:");
          // console.log(state.joinableJourneys);
          // console.log([JSON.parse(event.data)]);	      
          //	      state.joinableJourneys = _.unionBy(state.joinableJourneys, [JSON.parse(event.data)], (j) => j._id)	      
          _state2.default.joinableJourneys.push(JSON.parse(event.data));

          console.log(_state2.default.joinableJourneys);
        });

        _this5.sessionHelper.session.on("signal:expiredJourney", function (event) {
          var journey = JSON.parse(event.data);
          var idx = _state2.default.joinableJourneys.findIndex(function (j) {
            return j._id === journey._id;
          });
          _state2.default.joinableJourneys = [].concat(_toConsumableArray(_state2.default.joinableJourneys.slice(0, idx)), _toConsumableArray(_state2.default.joinableJourneys.slice(idx + 1)));
        });

        _this5.sessionHelper.session.on("signal:failJourney", function (event) {
          var journey = JSON.parse(event.data);
          var idx = _state2.default.joinableJourneys.findIndex(function (j) {
            return j._id === journey._id;
          });
          _state2.default.joinableJourneys = [].concat(_toConsumableArray(_state2.default.joinableJourneys.slice(0, idx)), _toConsumableArray(_state2.default.joinableJourneys.slice(idx + 1)));
        });

        _this5.sessionHelper.session.on('signal:journeyerJoined', function (event) {
          var participant = JSON.parse(event.data);
          var journey = _state2.default.joinableJourneys.find(function (j) {
            return j._id === participant.journeySpace;
          });
          if (journey) {
            var idx = _state2.default.joinableJourneys.indexOf(journey);
            if (journey.participants.findIndex(function (_participant) {
              return _participant._id === participant._id;
            }) === -1) {
              journey.participants.push(participant);
            }
            //	      console.log(state.joinableJourneys);
            _state2.default.joinableJourneys = [].concat(_toConsumableArray(_state2.default.joinableJourneys.slice(0, idx)), [journey], _toConsumableArray(_state2.default.joinableJourneys.slice(idx + 1)));
            //	      console.log("journeyer joined done!");
            //	      console.log(state.joinableJourneys);	      
          }
        });

        _this5.sessionHelper.session.on('signal:journeyerLeftSpace', function (event) {
          var participant = JSON.parse(event.data);
          console.log('Event: left space', event.data);
          var journey = _state2.default.joinableJourneys.find(function (j) {
            return j._id === participant.journeySpace;
          });
          var idx = _state2.default.joinableJourneys.indexOf(journey);
          journey.participants = journey.participants.filter(function (p) {
            return p._id !== participant._id;
          });
          //	      console.log(state.joinableJourneys);	    
          _state2.default.joinableJourneys = [].concat(_toConsumableArray(_state2.default.joinableJourneys.slice(0, idx)), [journey], _toConsumableArray(_state2.default.joinableJourneys.slice(idx + 1)));
          //	      console.log("journeyer left space done!");
          //	      console.log(state.joinableJourneys);	      	    
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
      var _this6 = this;

      // Note, if this key is ever read and treated as a id, then we will have a terrible problem.
      // I want to remove the warnings I am getting, but this is a dangerous way to do it.
      // Possibly I should deal with this in a different way.
      var discriminator = 0;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_header2.default, { history: this.props.history, showLeave: false }),
        _react2.default.createElement(
          'div',
          { className: 'joinable-journeys' },
          _state2.default.joinableJourneys.map(function (journey) {
            return _react2.default.createElement(JoinableJourneyCard, { key: journey._id + "_" + discriminator++, journey: journey, audioTag: _this6.audioTag });
          })
        )
      );
    }
  }]);

  return JourneyBoard;
}(_react.Component);

var IntroWrapper = function (_Component4) {
  _inherits(IntroWrapper, _Component4);

  function IntroWrapper(props) {
    _classCallCheck(this, IntroWrapper);

    var _this7 = _possibleConstructorReturn(this, (IntroWrapper.__proto__ || Object.getPrototypeOf(IntroWrapper)).call(this, props));

    _this7.onClose = function () {
      _this7.setState({
        showIntro: false
      });
    };

    _this7.state = {
      showIntro: !_jsCookie2.default.get('saw intro')
    };
    return _this7;
  }

  _createClass(IntroWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      if (this.state.showIntro) {
        return _react2.default.createElement(
          _intro2.default,
          _extends({ onClose: this.onClose }, this.props),
          _react2.default.createElement(this.props.component, this.props)
        );
      } else {
        return _react2.default.createElement(this.props.component, this.props);
      }
    }
  }]);

  return IntroWrapper;
}(_react.Component);

var RouteWithIntro = function RouteWithIntro(_ref3) {
  var Component = _ref3.component,
      rest = _objectWithoutProperties(_ref3, ['component']);

  var showIntro = __CLIENT__ && !_jsCookie2.default.get('saw intro');
  return _react2.default.createElement(
    'div',
    null,
    showIntro && _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, { render: function render(renderProps) {
        return _react2.default.createElement(IntroWrapper, _extends({ component: Component }, renderProps));
      } })),
    !showIntro && _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, { render: function render(renderProps) {
        return _react2.default.createElement(Component, renderProps);
      } }))
  );
};

var App = function (_Component5) {
  _inherits(App, _Component5);

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
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(RouteWithIntro, { exact: true, path: '/login', component: (0, _reactRouter.withRouter)(Login) }),
          _react2.default.createElement(RouteWithIntro, { exact: true, path: '/', component: (0, _reactEasyState.view)(JourneyBoard) }),
          _react2.default.createElement(RouteWithIntro, { exact: true, path: '/old', component: _home2.default }),
          _react2.default.createElement(RouteWithIntro, { exact: true, path: '/:room', component: _journey_space2.default })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = (0, _reactRouter.withRouter)((0, _reactEasyState.view)(App));

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7d7cdc1523d104f06849d7e9c11e45db.png";

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

var _user_list = __webpack_require__(95);

var _user_list2 = _interopRequireDefault(_user_list);

var _generator_form = __webpack_require__(96);

var _generator_form2 = _interopRequireDefault(_generator_form);

var _event_message = __webpack_require__(97);

var _event_message2 = _interopRequireDefault(_event_message);

var _journey_space_form = __webpack_require__(98);

var _journey_space_form2 = _interopRequireDefault(_journey_space_form);

var _state = __webpack_require__(2);

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
  var _require = __webpack_require__(6),
      OTSession = _require.OTSession,
      OTPublisher = _require.OTPublisher,
      OTStreams = _require.OTStreams,
      OTSubscriber = _require.OTSubscriber,
      createSession = _require.createSession;

  var OT = __webpack_require__(7);
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

      fetch('/api/journeys/' + roomUrl).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this2.sessionHelper = createSession({
          apiKey: _state2.default.openTokKey,
          sessionId: json.sessionId,
          token: json.token,
          onConnect: function onConnect() {
            setTimeout(_this2.refreshSession, 1000);
            fetch('/api/journeys/' + roomUrl + '/joined', {
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
            fetch('/api/journeys/' + roomUrl + '/' + event.connection.id).then(function (res) {
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
/* 95 */
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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _state = __webpack_require__(2);

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
/* 97 */
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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _journey_detail_entry = __webpack_require__(99);

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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _session_info = __webpack_require__(100);

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
/* 100 */
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(17);

var _events2 = _interopRequireDefault(_events);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactEasyState = __webpack_require__(4);

var _reactRouterDom = __webpack_require__(13);

var _jsCookie = __webpack_require__(14);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _reactSwipeableViews = __webpack_require__(29);

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _reactSwipeableViewsUtils = __webpack_require__(102);

var _reactSwipeableViewsCore = __webpack_require__(103);

var _state = __webpack_require__(2);

var _state2 = _interopRequireDefault(_state);

var _propTypes = __webpack_require__(27);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid = __webpack_require__(104);

var _uuid2 = _interopRequireDefault(_uuid);

var _opentokLayoutJs = __webpack_require__(105);

__webpack_require__(106);

var _journey_starts_in = __webpack_require__(30);

var _journey_starts_in2 = _interopRequireDefault(_journey_starts_in);

var _header = __webpack_require__(28);

var _header2 = _interopRequireDefault(_header);

var _intro = __webpack_require__(31);

var _intro2 = _interopRequireDefault(_intro);

var _reactRating = __webpack_require__(107);

var _reactRating2 = _interopRequireDefault(_reactRating);

var _utility = __webpack_require__(32);

var someHelper = _interopRequireWildcard(_utility);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // journey_space.js -- The main page where the Curious Live Journeys are experienced.
// Copyright (C) 2018 Robert L. Read <read.robert@gmail.com>

// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

var VirtualizeSwipeableViews = (0, _reactSwipeableViewsUtils.virtualize)(_reactSwipeableViews2.default);

// import SignaturePad from './signature_pad';


// This may not be the right way to do this
// var Rating = require('react-rating');


__webpack_require__(108).polyfill();
__webpack_require__(26);

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

var LeaveRoomButton = function (_Component) {
  _inherits(LeaveRoomButton, _Component);

  function LeaveRoomButton() {
    var _ref2;

    var _temp, _this2, _ret;

    _classCallCheck(this, LeaveRoomButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref2 = LeaveRoomButton.__proto__ || Object.getPrototypeOf(LeaveRoomButton)).call.apply(_ref2, [this].concat(args))), _this2), _this2.onLeave = function (e) {
      e.preventDefault();
      if (!_state2.default.audioTag.paused) {
        _state2.default.audioTag.pause();
      }
      _this2.props.history.push('/');
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(LeaveRoomButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        { onClick: this.onLeave, className: 'btn btn-primary' },
        'Leave'
      );
    }
  }]);

  return LeaveRoomButton;
}(_react.Component);

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

    var _this4 = _possibleConstructorReturn(this, (SecondsTimerEmitter.__proto__ || Object.getPrototypeOf(SecondsTimerEmitter)).call(this));

    _this4.start = createdAt.getTime();
    _this4.total = startAt.getTime() - _this4.start;
    _this4.passed = new Date().getTime() - _this4.start;
    _this4.interval = setInterval(function () {
      _this4.passed = new Date().getTime() - _this4.start;
      if (_this4.passed >= _this4.total) {
        clearInterval(_this4.interval);
      }
      _this4.emit('tick', _this4.passed);
    }, 100);
    return _this4;
  }

  _createClass(SecondsTimerEmitter, [{
    key: 'clear',
    value: function clear() {
      clearInterval(this.interval);
    }
  }, {
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

    var _this5 = _possibleConstructorReturn(this, (AudioPlayTickEmitter.__proto__ || Object.getPrototypeOf(AudioPlayTickEmitter)).call(this));

    _this5.onTimeUpdate = function (e) {
      _this5.currentTime = e.target.currentTime * 1000;
      _this5.emit('tick', _this5.currentTime);
    };

    _this5.currentTime = (audioElement.currentTime || 0) * 1000;
    _this5.total = audioElement.duration * 1000;
    if (audioElement.readyState === 4) {
      audioElement.addEventListener('timeupdate', _this5.onTimeUpdate);
      _this5.emit('tick', audioElement.currentTime * 1000);
    }

    audioElement.addEventListener('loadedmetadata', function (e) {
      audioElement.addEventListener('timeupdate', _this5.onTimeUpdate);
      _this5.total = e.target.duration * 1000;
      _this5.emit('tick', audioElement.currentTime * 1000);
    });
    return _this5;
  }

  _createClass(AudioPlayTickEmitter, [{
    key: 'clear',
    value: function clear() {}
  }, {
    key: 'displayTime',
    value: function displayTime() {
      return this._displayTime(this.total - this.currentTime);
    }
  }]);

  return AudioPlayTickEmitter;
}(AbstractTimerEmitter);

var FlagControl = function FlagControl(_ref3) {
  var currentUserHasFlaggedStream = _ref3.currentUserHasFlaggedStream,
      stream = _ref3.stream,
      onFlag = _ref3.onFlag,
      children = _ref3.children;

  return _react2.default.createElement(
    'button',
    {
      className: 'btn-flag-session',
      disabled: currentUserHasFlaggedStream,
      onClick: function onClick(e) {
        e.preventDefault();onFlag(stream);
      } },
    children
  );
};

var Waiting = function (_Component2) {
  _inherits(Waiting, _Component2);

  function Waiting(props) {
    _classCallCheck(this, Waiting);

    var _this6 = _possibleConstructorReturn(this, (Waiting.__proto__ || Object.getPrototypeOf(Waiting)).call(this, props));

    _this6.onToggle = function (e) {
      _this6.setState({
        open: !_this6.state.open
      });
    };

    _this6.state = {
      open: true
    };
    return _this6;
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

        var signaturePad = new SignaturePad(this.canvas, {
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
      var _this7 = this;

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
                return _this7.canvas = el;
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
          _react2.default.createElement(
            'div',
            { style: { WebkitOverflowScrolling: 'touch', overflowY: 'scroll' } },
            _react2.default.createElement('iframe', { height: '100%', width: '100%', style: { width: '100%', height: '400px', border: 'none' }, src: 'https://docs.google.com/viewer?url=http://wacuri.herokuapp.com/CuriousLive4-Stage%20Orientation.pdf&embedded=true' })
          )
        )
      );
    }
  }]);

  return Waiting;
}(_react.Component);

var JourneyStateProgressBar = function (_Component3) {
  _inherits(JourneyStateProgressBar, _Component3);

  function JourneyStateProgressBar(props) {
    _classCallCheck(this, JourneyStateProgressBar);

    var _this8 = _possibleConstructorReturn(this, (JourneyStateProgressBar.__proto__ || Object.getPrototypeOf(JourneyStateProgressBar)).call(this, props));

    props.timer.on('tick', function (current) {
      _this8.setState({
        timerValue: current
      });
    });
    _this8.state = {
      timerValue: 0,
      total: props.timer.total
    };
    return _this8;
  }

  _createClass(JourneyStateProgressBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _this9 = this;

      newProps.timer.on('tick', function (current) {
        _this9.setState({
          timerValue: current
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.timer.clear();
    }
  }, {
    key: 'formatState',
    value: function formatState(state) {
      switch (this.props.journey.state) {
        case 'joined':
        case 'created':
          return 'Waiting';
        case 'started':
        case 'paused':
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

// I need to create a new react component here. Possibly this would be releasable on its own.
// The basic idea we need here is a changing piece of text, with bars beneath it to indicate the state.
// Possibly I should develop this component separately, completely outside this project.
// 
// To be done: We need to define an additional state to represent "the completion of the journey"
// We need to implement the state indicator bar as a series of colors. This should be
// easy with background color and CSS

// We need to implement the 


var JourneyPhases = function (_Component4) {
  _inherits(JourneyPhases, _Component4);

  function JourneyPhases(props) {
    _classCallCheck(this, JourneyPhases);

    var _this10 = _possibleConstructorReturn(this, (JourneyPhases.__proto__ || Object.getPrototypeOf(JourneyPhases)).call(this, props));

    props.timer.on('tick', function (current) {
      _this10.setState({
        timerValue: current
      });
    });
    return _this10;
  }

  _createClass(JourneyPhases, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _this11 = this;

      newProps.timer.on('tick', function (current) {
        _this11.setState({
          timerValue: current
        });
      });
    }
  }, {
    key: 'render',

    // Note: setting the backgroudnColor below to orange does not work, but at least gives us a
    // gray that can be seen against the black background

    value: function render() {
      var _this12 = this;

      var journey = this.props.journey;

      var NumPhases = 4;
      var Messages = ["Breathe and center yourself", "Journey in Progess", "Share your Insights", "Provide Feedback"];
      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this12.container = el;
          }, id: 'journey-timeline0', className: 'journey-timeline step-' + this.stepIndex.toString() },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'row' } },
            _react2.default.createElement(
              'span',
              null,
              Messages[this.stepIndex]
            ),
            _state2.default.journey.startAt && this.stepIndex == 0 && _react2.default.createElement(
              'span',
              { className: 'timer', style: { marginLeft: '10px' } },
              this.props.timer.displayTime()
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'phase-bar0' },
          _react2.default.createElement('div', { className: 'phase-bar bar-' + (this.stepIndex == 0 ? 'white' : 'green') }),
          _react2.default.createElement('div', { className: 'phase-bar bar-' + (this.stepIndex == 1 ? 'white' : 'green') }),
          _react2.default.createElement('div', { className: 'phase-bar bar-' + (this.stepIndex == 2 ? 'white' : 'green') }),
          _react2.default.createElement('div', { className: 'phase-bar bar-' + (this.stepIndex == 3 ? 'white' : 'green') })
        )
      );
    }
  }, {
    key: 'stepIndex',
    get: function get() {
      switch (this.props.journey.state) {
        case 'joined':
        case 'created':
          return 0;
        case 'failed':
          return 3;
        case 'started':
        case 'paused':
          return 1;
        case 'completed':
          return 2;
        case 'ended':
          return 2;
        case 'playing':
          return 1;
        case 'paused':
          return 1;
        default:
          return 2;
      }
    }
  }]);

  return JourneyPhases;
}(_react.Component);

/*
class JourneyTimeline extends Component {

  constructor(props) {
    super(props);
    props.timer.on('tick', (current) => {
      this.setState({
        timerValue: current
      });
    });
  }

  componentWillReceiveProps(newProps) {
    newProps.timer.on('tick', (current) => {
      this.setState({
        timerValue: current
      });
    });
  }

  get stepIndex() {
    switch(this.props.journey.state) {
      case 'joined':
      case 'created':
        return 0;
      case 'started':
      case 'paused':
        return 1;
      default:
        return 2;
    }
  }

  get positionForCaret() {
    if (!this.container) { return 0; }
    const idx = this.stepIndex;
    const items = this.container.querySelectorAll('li');
    return Array(idx + 1).fill(0).reduce((memo, i, j) => {
      if (j == 0) {
        return 0;
      } else {
        return memo + items[j - 0].offsetHeight;
      }
    }, 0);
  }
  
  get heightForActive() {
    if (!this.container) { return 0; }
    const idx = this.stepIndex;
    const items = this.container.querySelectorAll('li');
    return items[idx].offsetHeight;
  }

  onSeek = (e) => {
    const percent = e.nativeEvent.offsetX / this.progressBar.offsetWidth;
    this.props.seekTo(percent);
  }

    // Note: setting the backgroudnColor below to orange does not work, but at least gives us a
    // gray that can be seen against the black background
   
  render() {
    const {journey} = this.props;
    return (
	    <div ref={el => {this.container = el}} className={`journey-timeline step-${this.stepIndex.toString()}`}>
	    <div style={{display: 'flex'}}>
        <ul>
          <li key="Prepare" className={journey.state === 'joined' ? 'active' : ''}>
            <h4>Prepare</h4>
            <div style={{display: 'flex'}}>
              <p>Breathe and center yourself</p>
              {journey.state === 'joined' && journey.startAt &&
                <p className='timer' style={{marginLeft: '10px'}}>{this.props.timer.displayTime()}</p>
              }
        </div>
            </li>
	    </ul>
	    <ul>
          <li key="Journey" className={journey.state === 'started' ? 'active' : ''} style={{position: 'relative'}}>
            <h4>Journey</h4>
            <div style={{display: 'flex'}}>
              <p>Listen and imagine</p>
              {(journey.state === 'started' || journey.state === 'paused') &&
                <p className='timer' style={{marginLeft: '10px'}}>{this.props.timer.displayTime()}</p>
              }
              {(journey.state === 'started' || journey.state === 'paused') &&
                <div style={{position: 'absolute', bottom: '-12px', left: '10px', right: '10px'}}>
               <progress ref={(progressBar) => this.progressBar = progressBar} onClick={this.onSeeko} max={this.props.timer.total} value={this.props.timer.currentTime} style={{width: '90%',backgroundColor: 'orange'}}></progress>
                </div>
              }
            </div>
            </li>
	    </ul>
	    <ul>
          <li key="Sharing">
            <h4>Sharing</h4>
            <p>Feelings and thoughts</p>
          </li>
			</ul>
			</div>
	</div>			
    )
  }
}
*/


var SkipButton = function (_Component5) {
  _inherits(SkipButton, _Component5);

  function SkipButton(props) {
    _classCallCheck(this, SkipButton);

    var _this13 = _possibleConstructorReturn(this, (SkipButton.__proto__ || Object.getPrototypeOf(SkipButton)).call(this, props));

    _this13.skipToNext = function (e) {
      console.log("SKIP TO NEXT CALLED");
      e.preventDefault();
      // This seeking to near the end works better than just calling skip, because it allows our natural processes to continue.
      // fetch(`/api/journeys/${this.props.journey.room}/skip`, {
      //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: 'same-origin', // include, same-origin, *omit
      //   headers: {
      //     'content-type': 'application/json'
      //   },
      //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //   mode: 'cors', // no-cors, cors, *same-origin
      //   redirect: 'follow', // manual, *follow, error
      //   referrer: 'no-referrer', // *client, no-referrer
      // });
      // I believe this should change the state to completed, but I am not sure
      // if that happens server side or client side
      console.log("skipToNext event fired");
      var vid = _this13.props.vidid;
      var playerState = _this13.props.playerState;
      var seekTo = _this13.props.seekTo;
      // This is my attempt to seek to the end....
      // It is not clear how the audio really works; I am not sure that "seek" functions.
      seekTo(99 / 100);
      // figure out how to pause, and how to seek correctly....
    };

    return _this13;
  }

  _createClass(SkipButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: 'fa-stack', onClick: this.skipToNext },
        _react2.default.createElement('i', { className: 'fa fa-circle fa-stack-2x',
          style: { color: 'rgb(75,176,88)' }
        }),
        _react2.default.createElement('i', { className: 'fa fa-step-forward fa-stack-1x',
          style: { color: 'white' } })
      );
    }
  }]);

  return SkipButton;
}(_react.Component);

var VideoButton = function (_Component6) {
  _inherits(VideoButton, _Component6);

  function VideoButton(props) {
    _classCallCheck(this, VideoButton);

    var _this14 = _possibleConstructorReturn(this, (VideoButton.__proto__ || Object.getPrototypeOf(VideoButton)).call(this, props));

    _this14.toggle = function (e) {
      e.preventDefault();
      var publisher = _this14.props.publisher;

      if (publisher && publisher.state && publisher.state.publisher) {
        publisher.state.publisher.publishVideo(!_this14.state.publishing);
        _this14.setState({
          publishing: !_this14.state.publishing
        });
      }
    };

    _this14.state = {
      publishing: true
    };
    return _this14;
  }

  _createClass(VideoButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: 'fa-stack', onClick: this.toggle },
        _react2.default.createElement('i', { className: 'fa fa-circle fa-stack-2x',
          style: { color: 'rgb(75,176,88)' }
        }),
        _react2.default.createElement('i', { className: 'fa fa-video-camera fa-stack-1x',
          style: { color: 'white' } })
      );
    }
  }]);

  return VideoButton;
}(_react.Component);

var AudioButton = function (_Component7) {
  _inherits(AudioButton, _Component7);

  function AudioButton(props) {
    _classCallCheck(this, AudioButton);

    var _this15 = _possibleConstructorReturn(this, (AudioButton.__proto__ || Object.getPrototypeOf(AudioButton)).call(this, props));

    _this15.changeToggleValue = function () {
      _this15.setState(function (prevState) {
        return { publishing: !prevState.publishing };
      });
    };

    _this15.toggleMicrophone = function (e) {
      var DEBUG_MUTE = 1;
      e.preventDefault();
      var publisher = _this15.props.publisher;

      if (DEBUG_MUTE) {
        console.log("Initial Publishing State:", _this15.state.publishing);
        console.log(publisher, publisher.state, publisher.state.publisher);
      }
      // ON SAFARI, this state is never changing!

      if (publisher && publisher.state && publisher.state.publisher) {
        publisher.state.publisher.publishAudio(!_this15.state.publishing);
        _this15.changeToggleValue();
      }
      if (DEBUG_MUTE) {
        console.log("FINAL this.publishing:", _this15.state.publishing);
        console.log("FINAL state:", _this15.state);
      }

      // This is absolutely necessary, but insuffient to make it work properly.
      e.stopPropagation();
    };

    _this15.state = {
      publishing: true

      // This binding is necessary to make `this` work in the callback -- ROB IS TRYING THIS  
    };_this15.toggleMicrophone = _this15.toggleMicrophone.bind(_this15);
    return _this15;
  }

  // NOTE: This seems like a good idea, and it causes no problem on Chrome,
  // but it makes a complete failure on Safari, so I am giving up this feature.

  //   componentWillReceiveProps(nextProps) {
  // 	console.log("WillReceiveProps called");
  // 	const {publisher} = nextProps;

  // 	console.log("WillReceiveProps called",publisher);	
  // 	if (publisher && publisher.state && publisher.state.publisher) {

  // 	    // WARNING: Commneting this out is partially working --- it is controlling things in a one-way direction.
  // 	    // the active drop down on the video image is not correctly tied to this on Safari.
  // 	    // Rob believes this is cauising a bug on Safari...
  // 	    // Note that there is a warning on the log in Chrome about an "unmounted componnets".
  //     publisher.state.publisher.on('audioLevelUpdated', (event) => {
  //       if (event.audioLevel === 0) {
  //         this.setState({
  //           publishing: false
  //         });
  //       } else {
  //         this.setState({
  //           publishing: true
  //         });
  //       }
  //     });
  //   }
  // }


  _createClass(AudioButton, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.userID !== prevProps.userID) {
        this.fetchData(this.props.userID);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (
        /*	    <button id="microphoneButton" style={this.props.style || {}} onClick={this.toggleMicrophone} className={`btn btn-${this.state.publishing ? 'primary' : 'secondary'}`}> 
        
        	    <i className="fa fa-microphone fa-fw" ></i>
        	    </button>
        */
        _react2.default.createElement(
          'span',
          { className: 'fa-stack', onClick: this.toggleMicrophone },
          _react2.default.createElement('i', { className: 'fa fa-circle fa-stack-2x',
            style: { color: 'rgb(75,176,88)' }
          }),
          _react2.default.createElement('i', { className: 'fa fa-microphone fa-stack-1x',
            style: { color: 'white' } })
        )
      );
    }
  }]);

  return AudioButton;
}(_react.Component);

var PlayButton = function (_Component8) {
  _inherits(PlayButton, _Component8);

  function PlayButton(props) {
    _classCallCheck(this, PlayButton);

    var _this16 = _possibleConstructorReturn(this, (PlayButton.__proto__ || Object.getPrototypeOf(PlayButton)).call(this, props));

    _this16.togglePlay = function (e) {
      e.preventDefault();
      setTimeout(function () {
        if (_state2.default.audioTag.paused) {
          fetch('/api/journeys/' + _this16.props.journey.room + '/start', {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
          });
        } else {
          fetch('/api/journeys/' + _this16.props.journey.room + '/pause', {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
          });
        }
      }, 20);
    };

    _this16.state = {
      paused: props.player && props.player.paused || true
    };
    props.player.addEventListener('play', function () {
      _this16.setState({
        paused: false
      });
      // This binding is necessary to make `this` work in the callback -- ROB IS TRYING THIS  
      _this16.togglePlay = _this16.togglePlay.bind(_this16);
    });

    props.player.addEventListener('pause', function () {
      _this16.setState({
        paused: true
      });
    });
    return _this16;
  }

  _createClass(PlayButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: 'fa-stack play-button', onClick: this.togglePlay },
        _react2.default.createElement('i', { className: 'fa fa-circle fa-stack-2x',
          style: { color: 'rgb(74,170,221)' }
        }),
        _react2.default.createElement('i', { className: 'fa fa-' + (_state2.default.audioTag.paused ? 'play' : 'pause') + ' fa-stack-1x',
          style: { color: 'white' } })
      );
    }
  }]);

  return PlayButton;
}(_react.Component);

// This is oddly similar and anti-symmetric to the PlayButton.


var PauseButton = function (_Component9) {
  _inherits(PauseButton, _Component9);

  function PauseButton(props) {
    _classCallCheck(this, PauseButton);

    var _this17 = _possibleConstructorReturn(this, (PauseButton.__proto__ || Object.getPrototypeOf(PauseButton)).call(this, props));

    _this17.togglePlay = function (e) {
      e.preventDefault();
      setTimeout(function () {
        if (_state2.default.audioTag.paused) {
          fetch('/api/journeys/' + _this17.props.journey.room + '/start', {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
          });
        } else {
          fetch('/api/journeys/' + _this17.props.journey.room + '/pause', {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
          });
        }
      }, 20);
    };

    _this17.state = {
      paused: props.player && props.player.paused || true
    };
    props.player.addEventListener('play', function () {
      _this17.setState({
        paused: false
      });
      // This binding is necessary to make `this` work in the callback -- ROB IS TRYING THIS  
      _this17.togglePlay = _this17.togglePlay.bind(_this17);
    });

    props.player.addEventListener('pause', function () {
      _this17.setState({
        paused: true
      });
    });
    return _this17;
  }

  _createClass(PauseButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { className: 'fa-stack', onClick: this.togglePlay },
        _react2.default.createElement('i', { className: 'fa fa-circle fa-stack-2x', onClick: this.togglePlay,
          style: { color: 'rgb(75,176,88)' }
        }),
        _react2.default.createElement('i', { className: 'fa fa-' + (_state2.default.audioTag.paused ? 'pause' : 'play') + ' fa-stack-1x',
          style: { color: 'white' } })
      );
    }
  }]);

  return PauseButton;
}(_react.Component);

var SharePrompt = function (_Component10) {
  _inherits(SharePrompt, _Component10);

  function SharePrompt() {
    _classCallCheck(this, SharePrompt);

    return _possibleConstructorReturn(this, (SharePrompt.__proto__ || Object.getPrototypeOf(SharePrompt)).apply(this, arguments));
  }

  _createClass(SharePrompt, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'journeyspace-sharePrompt', style: { textAlign: 'center' } },
        _react2.default.createElement(
          'p',
          { style: { fontFamily: 'Playfair Display, serif', fontSize: '25px', lineHeight: 0.8 } },
          'If you would like to invite a friend you can make this a permanent JourneySpace:'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: this.props.onInvite },
          'Invite Friends'
        )
      );
    }
  }]);

  return SharePrompt;
}(_react.Component);

var InviteModal = function (_Component11) {
  _inherits(InviteModal, _Component11);

  function InviteModal(props) {
    _classCallCheck(this, InviteModal);

    var _this19 = _possibleConstructorReturn(this, (InviteModal.__proto__ || Object.getPrototypeOf(InviteModal)).call(this, props));

    _this19.onChange = function (e) {
      e.preventDefault();
      _this19.setState({
        journeySpaceName: e.target.value,
        error: _this19.state.error && e.target.value != ''
      });
      e.stopPropagation();
    };

    _this19.onCopy = function (e) {
      e.preventDefault();
      if (_this19.state.journeySpaceName === '') {
        _this19.setState({
          error: 'please enter a name'
        });
      } else {
        _this19.setState({
          error: false
        });
        var name = _this19.state.journeySpaceName;
        var urlFriendlyName = name.replace(/[^\w]/g, '-').toLowerCase();
        var url = window.location.protocol + '//' + window.location.host + '/' + urlFriendlyName;
        var success = _this19._copy(url);
        if (success) {
          _this19.props.onComplete(url, name);
        } else {
          _this19.setState({
            error: 'failed to copy url'
          });
        }
      }
    };

    _this19.state = {
      journeySpaceName: '',
      error: false
    };
    return _this19;
  }

  _createClass(InviteModal, [{
    key: '_copy',
    value: function _copy(url) {
      // A <span> contains the text to copy
      var span = document.createElement('span');
      span.textContent = url;
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
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(89, 153, 222, 0.9)' }, className: 'journeyspace-invite' },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: this.props.onClose, style: { position: 'absolute', right: '20px', top: '20px' } },
          _react2.default.createElement('i', { className: 'fa fa-times', style: { fontSize: '22px', color: 'white' } })
        ),
        _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '0 20px', minWidth: '90%' } },
          _react2.default.createElement(
            'p',
            { style: { fontSize: '26px', lineHeight: 0.8, fontFamily: 'Playfair Display, serif', color: 'white' } },
            'Share your new permanent CuriousLive Space with Friends'
          ),
          _react2.default.createElement('input', { type: 'text', value: this.state.journeySpaceName, onChange: this.onChange, placeholder: 'Name Your Space' }),
          this.state.error && _react2.default.createElement(
            'p',
            { className: 'text-danger' },
            this.state.error
          ),
          _react2.default.createElement(
            'p',
            { style: { margin: '10px 0 10px 0' } },
            'Share Using'
          ),
          _react2.default.createElement(
            'ul',
            { style: { listStyle: 'none', margin: 0, padding: 0 } },
            _react2.default.createElement(
              'li',
              { onClick: this.onCopy, style: { width: '90px', height: '90px', margin: '0 auto', cursor: 'pointer' } },
              _react2.default.createElement('i', { className: 'fa fa-link', style: { display: 'flex', background: 'white', height: '70px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontSize: '38px' } }),
              _react2.default.createElement(
                'p',
                null,
                'Copy Link'
              )
            )
          )
        )
      );
    }
  }]);

  return InviteModal;
}(_react.Component);

var OrientationModal = function (_Component12) {
  _inherits(OrientationModal, _Component12);

  function OrientationModal(props) {
    _classCallCheck(this, OrientationModal);

    var _this20 = _possibleConstructorReturn(this, (OrientationModal.__proto__ || Object.getPrototypeOf(OrientationModal)).call(this, props));

    _this20.onChange = function (e) {
      e.preventDefault();
      _this20.setState({
        journeySpaceName: e.target.value,
        error: _this20.state.error && e.target.value != ''
      });
      e.stopPropagation();
    };

    _this20.left = function () {
      _this20.handleChangeIndex((_this20.state.index - 1) % 3);
    };

    _this20.right = function () {
      _this20.handleChangeIndex((_this20.state.index + 1) % 3);
    };

    _this20.handleChangeIndex = function (index) {
      _this20.setState({ index: index });
    };

    _this20.state = {
      index: 0
    };
    return _this20;
  }

  _createClass(OrientationModal, [{
    key: 'render',
    value: function render() {
      console.log("INDEX:", this.state.index);
      function slideRenderer(params) {
        console.log("params", params);
        var index = params.index,
            key = params.key;


        switch ((0, _reactSwipeableViewsCore.mod)(index, 3)) {
          case 0:
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                { className: 'message-heading' },
                '1.  Welcome to CuriousLive ...',
                _react2.default.createElement('br', null),
                'A five-minute guided journey - plus sharing - with others.'
              ),
              _react2.default.createElement('p', null),
              _react2.default.createElement(
                'p',
                null,
                'The journey will begin when the timer above elapses and you hear the cime.'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Breathe slowly and deeply and ajust your posture to be comfortable.'
              )
            );

          case 1:
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                { className: 'message-heading' },
                '2.  Next comes the Journey...'
              ),
              _react2.default.createElement('p', null),
              _react2.default.createElement(
                'p',
                null,
                'Your microphone will be muted.'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Some people like to leave their cameras on during the journey to increase the feeling of a shared experience. It is up to you.'
              )
            );

          case 2:
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                { className: 'message-heading' },
                '3.  After the Journey comes the Sharing and Connecting.'
              ),
              _react2.default.createElement('p', null),
              _react2.default.createElement(
                'p',
                null,
                'After the journey you will have the opportunity to share your insights. Each person takes 1 or 2 minutes.'
              ),
              _react2.default.createElement(
                'p',
                null,
                'When others are sharing, please listen deeply, and in turn they will listen more deeply to you.'
              )
            );

          default:
            return null;
        }
      }

      var index = this.state.index;
      return _react2.default.createElement(
        'div',
        { style: { position: 'absolute',
            minHeight: someHelper.ONE_SQUARE_WIDTH + 'px',
            maxWidth: someHelper.ONE_SQUARE_WIDTH + 'px',
            maxHeight: someHelper.ONE_SQUARE_WIDTH + 'px',
            minWidth: someHelper.ONE_SQUARE_WIDTH + 'px',
            backgroundColor: 'rgba(74, 170, 221, 1.0)',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center'
          } },
        _react2.default.createElement(
          'div',
          { style: {
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center'
            } },
          _react2.default.createElement(
            'a',
            { href: '#', onClick: this.props.onClose, style: { position: 'absolute', right: '20px', top: '20px', zIndex: 100 } },
            _react2.default.createElement('i', { className: 'fa fa-times fa-2x', style: { color: 'white' } })
          ),
          _react2.default.createElement(VirtualizeSwipeableViews, {
            index: this.state.index,
            onChangeIndex: this.handleChangeIndex,
            slideRenderer: slideRenderer,
            className: 'swipable-message'
          })
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.left, style: { visibility: '' + (index == 0 ? 'hidden' : 'visible'), position: 'absolute', left: '20px', top: '50%', zIndex: 100, backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px' } },
          _react2.default.createElement('i', { className: 'fa fa-caret-left fa-3x' })
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.right, style: { visibility: '' + (index == 2 ? 'hidden' : 'visible'), position: 'absolute', right: '20px', top: '50%', zIndex: 100, backgroundColor: 'rgb(74,170,221)', color: 'white', border: '0px' } },
          _react2.default.createElement('i', { className: 'fa fa-caret-right fa-3x' })
        )
      );
    }
  }]);

  return OrientationModal;
}(_react.Component);

var FeedbackModal = function (_Component13) {
  _inherits(FeedbackModal, _Component13);

  function FeedbackModal(props) {
    _classCallCheck(this, FeedbackModal);

    var _this21 = _possibleConstructorReturn(this, (FeedbackModal.__proto__ || Object.getPrototypeOf(FeedbackModal)).call(this, props));

    _this21.onChange = function (e) {
      e.preventDefault();
      _this21.setState({
        journeySpaceName: e.target.value,
        error: _this21.state.error && e.target.value != ''
      });
      e.stopPropagation();
    };

    _this21.onSubmit = function (e) {
      console.log("onSubmit clicked!");
    };

    _this21.onInvite = function (e) {
      console.log("onInvite clicked!");
    };

    _this21.state = {
      journeySpaceName: '',
      error: false
    };
    return _this21;
  }

  _createClass(FeedbackModal, [{
    key: 'render',
    value: function render() {
      console.log('FEEDBACK_MODAL', someHelper.ONE_SQUARE_WIDTH);
      return _react2.default.createElement(
        'div',
        { style: { position: 'absolute',
            minHeight: someHelper.ONE_SQUARE_WIDTH + 'px',
            maxWidth: someHelper.ONE_SQUARE_WIDTH + 'px',
            width: someHelper.ONE_SQUARE_WIDTH + 'px',
            backgroundColor: 'rgba(89, 153, 222, 0.9)',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'space-between'
          } },
        _react2.default.createElement(
          'div',
          { className: 'feedback-message' },
          _react2.default.createElement(
            'a',
            { href: '#', onClick: this.props.onClose, style: { position: 'absolute', right: '20px', top: '20px', zIndex: 100 } },
            _react2.default.createElement('i', { className: 'fa fa-times', style: { fontSize: '22px', color: 'white' } })
          ),
          _react2.default.createElement(
            'p',
            null,
            ' Please rate your experience for: '
          ),
          _react2.default.createElement(_reactRating2.default, { start: 0, stop: 10, className: 'feedback-rating',
            emptySymbol: 'fa fa-circle fa-2x feedback-empty',
            fullSymbol: 'fa fa-circle fa-2x feedback-full' }),
          _react2.default.createElement(
            'p',
            null,
            ' How do you Feel?'
          ),
          _react2.default.createElement(_reactRating2.default, { start: 0, stop: 10, className: 'feedback-rating',
            emptySymbol: 'fa fa-circle fa-2x feedback-empty',
            fullSymbol: 'fa fa-circle fa-2x feedback-full' }),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement('textarea', { className: 'form-control rounded-0', id: 'exampleFormControlTextarea2', rows: '3' })
          ),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary', onClick: this.onSubmit,
              style: { margin: '0 auto', marginTop: '0.5em', borderRadius: '15px' }
            },
            'Submit Feedback'
          ),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary', onClick: this.onInvite,
              style: { margin: '0 auto', marginTop: '0.5em', borderRadius: '15px' }
            },
            'Invite Friends to a New Journey'
          )
        )
      );
    }
  }]);

  return FeedbackModal;
}(_react.Component);

var UnfilledVideoSquare = function (_React$Component) {
  _inherits(UnfilledVideoSquare, _React$Component);

  function UnfilledVideoSquare(props) {
    _classCallCheck(this, UnfilledVideoSquare);

    return _possibleConstructorReturn(this, (UnfilledVideoSquare.__proto__ || Object.getPrototypeOf(UnfilledVideoSquare)).call(this, props));
  }
  // TODO: onFlag must be moved here


  _createClass(UnfilledVideoSquare, [{
    key: 'render',
    value: function render() {
      var vid = this.props.vidid;
      var slength = this.props.streamlength;
      var stream = this.props.stream;
      var session = this.props.session;
      var localkey = this.props.localkey;
      var limit = this.props.limit;
      var state = this.props.state;
      var journey = this.props.journey;
      var sessionId = this.props.sessionId;
      var hasFlagged = stream ? !!journey.flags.find(function (flag) {
        return flag.user === sessionId && flag.flagged === stream.id;
      }) : false;
      var visible = this.props.visible;
      var hide_control = !visible || !(state.playerState == "waiting" || state.playerState == "failed");

      console.log("visible", visible);

      return slength < limit ? _react2.default.createElement(
        'div',
        { key: localkey, id: vid, className: 'video-placeholder' },
        _react2.default.createElement(
          'div',
          { className: 'invite-indicator' },
          _react2.default.createElement(
            'div',
            { style: { visibility: '' + (hide_control ? 'hidden' : 'visible') } },
            _react2.default.createElement('i', { className: 'fa fa-smile-o fa-2x' }),
            _react2.default.createElement(
              'p',
              { style: { color: 'white', maxWidth: '80%', margin: '0 auto', fontSize: '1rem' } },
              'Waiting...'
            ),
            _react2.default.createElement(
              'button',
              { className: 'invite-button invite-friends-button', onClick: this.props.onInvite },
              'Invite Friends'
            )
          )
        )
      ) : _react2.default.createElement(
        'div',
        { key: localkey, id: vid, className: 'PartnerStream'
        },
        _react2.default.createElement(OTSubscriber, {
          key: stream.id,
          session: session,
          stream: stream,
          properties: {
            width: '100%',
            height: '100%'
          }
        }),
        _react2.default.createElement(
          'div',
          { className: 'journeyspace-stream-controls' },
          _react2.default.createElement(
            FlagControl,
            { currentUserHasFlaggedStream: hasFlagged,
              onFlag: this.onFlag, stream: stream.id },
            _react2.default.createElement('i', { style: { color: hasFlagged ? 'red' : 'white' },
              className: 'fa fa-flag' })
          )
        )
      );
    }
  }]);

  return UnfilledVideoSquare;
}(_react2.default.Component);

var NoVideoSquare = function (_React$Component2) {
  _inherits(NoVideoSquare, _React$Component2);

  function NoVideoSquare(props) {
    _classCallCheck(this, NoVideoSquare);

    return _possibleConstructorReturn(this, (NoVideoSquare.__proto__ || Object.getPrototypeOf(NoVideoSquare)).call(this, props));
  }

  _createClass(NoVideoSquare, [{
    key: 'render',
    value: function render() {
      var localkey = this.props.localkey;
      var vid = this.props.vidid;
      var feedbackNotOrientation = this.props.playerState == 'ended' || this.props.playerState == 'completed';
      var msg = feedbackNotOrientation ? "Leave and Give Feedback" : "Orientation";
      var topmsg = feedbackNotOrientation ? "When all sharing is done..." : "nothing";
      var topmsgvis = feedbackNotOrientation ? "visible" : "hidden";
      var fnc = feedbackNotOrientation ? this.props.onFeedback : this.props.onOrientation;
      return _react2.default.createElement(
        'div',
        { key: localkey, id: vid, className: 'video-placeholder' },
        _react2.default.createElement(
          'div',
          { className: 'invite-indicator' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('i', { className: 'fa fa-smile-o fa-2x', style: { visibility: 'hidden' } }),
            _react2.default.createElement(
              'p',
              { style: { visibility: '' + topmsgvis, color: 'white', maxWidth: '80%', margin: '0 auto', fontSize: '1rem' } },
              topmsg
            ),
            _react2.default.createElement(
              'button',
              { className: 'invite-button invite-orientation-button', onClick: fnc
              },
              msg
            )
          )
        )
      );
    }
  }]);

  return NoVideoSquare;
}(_react2.default.Component);

var JourneySpace = function (_Component14) {
  _inherits(JourneySpace, _Component14);

  function JourneySpace(props) {
    _classCallCheck(this, JourneySpace);

    var _this24 = _possibleConstructorReturn(this, (JourneySpace.__proto__ || Object.getPrototypeOf(JourneySpace)).call(this, props));

    _this24.refreshSession = function () {
      fetch('/api/journeys/' + _this24.props.match.params.room, { credentials: 'include' }).then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.journey = json;
      });
      setTimeout(someHelper.setSizes, 1000);
    };

    _this24.onInitPublisher = function () {
      console.log('initialized publisher');
    };

    _this24.onConfirmReady = function (e) {
      fetch('/api/journeys/' + _this24.props.match.params.room + '/connections/' + _this24.sessionHelper.session.connection.id + '/ready');
    };

    _this24.onChangeJourney = function (e) {
      fetch('/api/journeys/' + _this24.props.match.params.room + '/journey', {
        body: JSON.stringify({ journey: e.target.value }), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'content-type': 'application/json'
        },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
      });
    };

    _this24.onStartSession = function (e) {
      fetch('/api/journeys/' + _this24.props.match.params.room + '/start', {
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors'
      });
    };

    _this24.onLoadedMetadata = function (e) {
      _this24.setState({
        journeyDuration: e.target.duration
      });
      _state2.default.audioTag.removeEventListener('timeupdate', _this24.onTimeUpdate);
      _state2.default.audioTag.addEventListener('timeupdate', _this24.onTimeUpdate);
    };

    _this24.onTimeUpdate = function (e) {
      console.log("onTimeUpdate", e);
      console.log("onTimeUpdate", e.target.currentTime);
      _this24.setState({
        playerProgress: e.target.currentTime / e.target.duration * 100,
        playerProgressMS: e.target.currentTime
      });
      if (_this24.isHostUser) {
        fetch('/api/journeys/' + _this24.props.match.params.room + '/progress', {
          body: JSON.stringify({ currentTime: e.target.currentTime }),
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json'
          },
          method: 'PUT',
          mode: 'cors'
        });
      }
    };

    _this24.onFlag = function (stream) {
      fetch('/api/journeys/' + _this24.props.match.params.room + '/flag', {
        cache: 'no-cache',
        body: JSON.stringify({ connectionId: _this24.state.session.connection.id, stream: stream }),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors'
      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        return _state2.default.journey = json;
      });
    };

    _this24.onShare = function (e) {
      navigator.share({
        title: 'Take a Journey With Me!',
        text: 'Join me on ' + _state2.default.journey.name,
        url: window.location.protocol + '//' + window.location.host + '/' + _state2.default.journey.room
      });
    };

    _this24.onInvite = function (e) {
      e.preventDefault();
      _this24.setState({
        showInviteModal: true
      });
    };

    _this24.onCloseShareModal = function (e) {
      e.preventDefault();
      _this24.setState({
        showInviteModal: false
      });
    };

    _this24.onCompleteShare = function (url, name) {
      _this24.setState({
        showInviteModal: false
      });
      window.location = url + ('?journey=' + _state2.default.journey.name + '&name=' + name);
    };

    _this24.onOrientation = function (e) {
      console.log("onOrientation called");
      e.preventDefault();
      _this24.setState({
        showOrientationModal: true
      });
      e.stopPropagation();
    };

    _this24.onCloseOrientationModal = function (e) {
      e.preventDefault();
      _this24.setState({
        showOrientationModal: false
      });
    };

    _this24.onCompleteOrienetation = function (url, name) {
      _this24.setState({
        showOrientationModal: false
      });
      window.location = url + ('?journey=' + _state2.default.journey.name + '&name=' + name);
    };

    _this24.onFeedback = function (e) {
      console.log("onFeedback called!");
      e.preventDefault();
      _this24.setState({
        showFeedbackModal: true
      });
      e.stopPropagation();
    };

    _this24.onCloseFeedbackModal = function (e) {
      e.preventDefault();
      _this24.setState({
        showFeedbackModal: false
      });
    };

    _this24.onCompleteFeedback = function (url, name) {
      _this24.setState({
        showFeedbackModal: false
      });
      window.location = url + ('?journey=' + _state2.default.journey.name + '&name=' + name);
    };

    _this24.seekTo = function (fraction) {
      console.log("duration", _state2.default.audioTag.duration);
      console.log("audioTag", _state2.default.audioTag.currentTime);
      _state2.default.audioTag.play();

      _state2.default.audioTag.currentTime = _state2.default.audioTag.duration * fraction;

      console.log("SEEK called with:", fraction);
      console.log("audioTag", _state2.default.audioTag.currentTime);
      // This only needs a target...must determine what time that is..
      // I think iit is the audioTag
      var e = { target: { currentTime: _state2.default.audioTag.currentTime } };
      _this24.onTimeUpdate(e);
    };

    _this24.togglePlayState = function (e) {
      e.preventDefault();
      setTimeout(function () {
        if (_state2.default.audioTag.paused) {
          fetch('/api/journeys/' + _state2.default.journey.room + '/start', {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
          });
        } else {
          fetch('/api/journeys/' + _state2.default.journey.room + '/pause', {
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
          });
        }
      }, 20);
    };

    _this24.state = {
      streams: [],
      publisherId: '',
      session: null,
      playerState: 'waiting',
      playerProgress: 0,
      playerProgressMS: 0,
      journeyDuration: 0,
      currentlyActivePublisher: null,
      showInviteModal: false,
      showOrientationModal: false,
      showFeedbackModal: false,
      showIntro: true
    };
    _this24.publisher = {};
    _this24.audioTag = {};
    return _this24;
  }

  _createClass(JourneySpace, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this25 = this;

      _state2.default.audioTag.addEventListener('ended', function (event) {
        console.log("CHANGING STATE TO ENDED!");
        if (_this25.publisher && _this25.publisher.state && _this25.publisher.state.publisher) {
          _this25.publisher.state.publisher.publishAudio(true);
        }
        _this25.setState({
          playerState: 'ended'
        });

        console.log("DOING /completed fetch");
        fetch('/api/journeys/' + _this25.props.match.params.room + '/completed', {
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer' // *client, no-referrer
        });

        if (decodeURIComponent(_state2.default.audioTag.src) === '' + window.location.origin + _state2.default.journey.journey) {
          _state2.default.audioTag.enqueue(['/chime.mp3', '/sharing.mp3']).then(function () {
            // sharing audio ended
            if (_this25.publisher && _this25.publisher.state && _this25.publisher.state.publisher) {
              _this25.publisher.state.publisher.publishAudio(true);
            }
          });
          _state2.default.audioTag.play();
        }
      });

      fetch('/api/journeys/' + this.props.match.params.room + window.location.search, { credentials: 'include' }).then(function (res) {
        return res.json();
      }).then(function (json) {
        _state2.default.journey = json;

        _state2.default.audioTag.src = _state2.default.journey.journey;
        _state2.default.audioTag.currentTime = 0;

        _this25.sessionHelper = createSession({
          apiKey: _state2.default.openTokKey,
          sessionId: _state2.default.journey.sessionId,
          token: _state2.default.journey.token,
          onConnect: function onConnect() {
            console.log('assigned connection to publisher', _this25.sessionHelper.session.connection);
            fetch('/api/journeys/' + _this25.props.match.params.room + '/joined', {
              body: JSON.stringify({ id: _this25.sessionHelper.session.connection.id }),
              credentials: 'same-origin', // include, same-origin, *omit
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, cors, *same-origin
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer' // *client, no-referrer
            });
          },
          onStreamsUpdated: function onStreamsUpdated(streams) {
            console.log('Current subscriber streams:', streams);
            _this25.setState({ streams: streams });
            if (!_this25.state.currentlyActivePublisher) {
              _this25.setState({
                currentlyActivePublisher: streams[0]
              });
            }
          }
        });
        _this25.sessionHelper.session.on("connectionDestroyed", function (event) {
          var data = {
            sessionId: _this25.sessionHelper.session.sessionId,
            connection: {
              id: event.connection.id
            },
            event: 'connectionDestroyed'
          };
          _this25.refreshSession();
        });
        _this25.sessionHelper.session.on("connectionCreated", function (event) {
          _this25.refreshSession();
        });
        _this25.sessionHelper.session.on('signal', function (event) {
          console.log("Signal sent from connection ", event);
          _this25.refreshSession();
        });

        _this25.sessionHelper.session.on("signal:startJourney", function (event) {
          if (_this25.publisher && _this25.publisher.state && _this25.publisher.state.publisher) {
            _this25.publisher.state.publisher.publishAudio(false);
          }
          var playPromise = _state2.default.audioTag.play();
          if (playPromise !== undefined) {
            playPromise.then(function () {
              console.log('audio promise resolve');
            })
            // Safety first!
            .catch(function (e) {
              console.error(e);
            });
          }
          _this25.setState({
            playerState: 'playing'
          });
        });

        _this25.sessionHelper.session.on("signal:pauseJourney", function (event) {
          if (_this25.publisher && _this25.publisher.state && _this25.publisher.state.publisher) {
            _this25.publisher.state.publisher.publishAudio(true);
          }
          _state2.default.audioTag.pause();
          _this25.setState({
            playerState: 'paused'
          });
        });

        _this25.sessionHelper.session.on("signal:journeyUpdated", function (event) {
          var journey = JSON.parse(event.data);
          _state2.default.journey = journey;
          console.log(" Got signal:journeyUpdated ", event);

          if (_state2.default.journey.state != 'completed') {
            // if we are in completed state, then audio may be playing the sharing prompt
            _state2.default.audioTag.src = _state2.default.journey.journey;
            _state2.default.audioTag.currentTime = 0;
          }

          if (_state2.default.journey.state === 'started') {

            if (_this25.publisher && _this25.publisher.state && _this25.publisher.state.publisher) {
              _this25.publisher.state.publisher.publishAudio(false);
            }
            _state2.default.audioTag.play();
            _this25.setState({
              playerState: 'playing'
            });
          }
        });

        _this25.sessionHelper.session.on("signal:fail", function (event) {
          _state2.default.journey.state = 'failed';
        });

        _this25.setState({
          session: _this25.sessionHelper.session
        });

        var onAudioCanPlay = function onAudioCanPlay(event) {
          if (_state2.default.journey.state === 'started') {
            _state2.default.audioTag.play();
            if (!isNaN(_state2.default.journey.currentTime)) {
              _state2.default.audioTag.currentTime = _state2.default.journey.currentTime;
            }
          }
          _state2.default.audioTag.removeEventListener('canplaythrough', onAudioCanPlay);
        };

        _state2.default.audioTag.addEventListener('canplaythrough', onAudioCanPlay, false);
        _state2.default.audioTag.load();
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
      var _this26 = this;

      var currentParticipant = this.state.session && this.state.session.connection && _state2.default.journey && _state2.default.journey.participants.find(function (participant) {
        return participant.connectionId === _this26.state.session.connection.id;
      });
      var local_key_counter_to_avoid_warning = 0;
      var currentUserHasFlaggedJourney = _state2.default.journey && _state2.default.journey.flags.map(function (flag) {
        return flag.user;
      }).indexOf(_state2.default.sessionId) > -1;
      var stream0 = this.state.streams[0];
      return _react2.default.createElement(
        'div',
        { className: 'journeyspace', style: { position: 'relative' } },
        this.state.session && /* AAA */
        _react2.default.createElement(
          'div',
          { className: 'journeyspace-content' },
          _react2.default.createElement(
            'div',
            { id: 'topbar_and_header' },
            _react2.default.createElement(_header2.default, { history: this.props.history, showLeave: true }),
            _react2.default.createElement(
              'div',
              { id: 'titlebar', className: 'flexiblerow space-between-added',
                style: { marginLeft: '20px', marginRight: '20px', backgroundColor: 'black', color: 'white' } },
              _state2.default.journey.startAt && _react2.default.createElement(
                'span',
                { style: { color: 'white' } },
                _state2.default.journey.name
              ),
              !_state2.default.journey.startAt && (_state2.default.journey.state === 'created' || _state2.default.journey.state === 'joined' || _state2.default.journey.state === 'completed') && _react2.default.createElement(
                'div',
                { style: { padding: '10px' } },
                _react2.default.createElement(
                  'select',
                  { style: { width: '100%' }, onChange: this.onChangeJourney, value: _state2.default.journeys && _state2.default.journey.journey },
                  _state2.default.journeys.map(function (journey) {
                    return _react2.default.createElement(
                      'option',
                      { value: journey.filePath },
                      journey.name
                    );
                  })
                )
              ),
              _react2.default.createElement(JourneyPhases, { journey: _state2.default.journey, timer: this.journeyStateTimer, seekTo: this.seekTo })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'flex-squares' },
            _react2.default.createElement(
              'div',
              { id: 'bigsquares' },
              _react2.default.createElement(
                'span',
                { key: 'name' },
                _react2.default.createElement('img', { id: 'video-square0', className: 'journey-image', src: _state2.default.journey.image, onClick: this.togglePlayState })
              ),
              _react2.default.createElement(
                'div',
                { id: 'secondsquare', className: 'flexiblecol' },
                this.state.showOrientationModal && _react2.default.createElement(OrientationModal, { force: true, onComplete: this.onCompleteOrientation, onClose: this.onCloseOrientationModal }),
                this.state.showFeedbackModal && _react2.default.createElement(FeedbackModal, { journey: this.state.session, onComplete: this.onCompleteFeedback, onClose: this.onCloseFeedbackModal }),
                _react2.default.createElement(
                  'div',
                  { style: { display: 'flex', flexDirection: 'row', visibility: '' + (this.state.showOrientationModal || this.state.showFeedbackModal ? "hidden" : "visible") } },
                  _react2.default.createElement(
                    'span',
                    { key: 'stream', id: 'video-square1', className: 'journeyspace-stream journeyspace-me' },
                    _react2.default.createElement(OTPublisher, {
                      session: this.sessionHelper.session,
                      onInit: this.onInitPublisher,
                      ref: function ref(publisher) {
                        _this26.publisher = publisher;
                      },
                      properties: {
                        width: '100%',
                        height: '100%'
                      }
                    })
                  ),
                  _react2.default.createElement(UnfilledVideoSquare, { vidid: 'video-square2',
                    limit: 1,
                    onInvite: this.onInvite,
                    streamlength: this.state.streams.length,
                    stream: this.state.streams[0],
                    session: this.sessionHelper.session,
                    localkey: local_key_counter_to_avoid_warning++,
                    state: this.state,
                    journey: _state2.default.journey,
                    sessionId: _state2.default.sessionId,
                    visible: !this.state.showOrientationModal
                  })
                ),
                _react2.default.createElement(
                  'div',
                  { id: 'central_control_panel_id',
                    style: { visibility: '' + (!(this.state.showInviteModal || this.state.showOrientationModal || this.state.showFeedbackModal) ? "visible" : "hidden") }
                  },
                  _react2.default.createElement(VideoButton, {
                    publisher: this.publisher }),
                  _react2.default.createElement(AudioButton, {
                    publisher: this.publisher }),
                  _react2.default.createElement(PlayButton, { style: { color: 'rgb(74,170,221)', backgroundColor: 'rgb(75,176,88)', borderRadius: '50%' },
                    journey: _state2.default.journey, player: _state2.default.audioTag }),
                  _react2.default.createElement(PauseButton, { style: { color: 'rgb(74,170,221)', backgroundColor: 'rgb(75,176,88)', borderRadius: '50%' },
                    journey: _state2.default.journey, player: _state2.default.audioTag }),
                  _react2.default.createElement(SkipButton, { style: { color: 'white', backgroundColor: 'rgb(75,176,88)', borderRadius: '50%' }, journey: _state2.default.journey,
                    playerState: _state2.default.playerState,
                    seekTo: this.seekTo
                  })
                ),
                _react2.default.createElement(
                  'div',
                  { style: { display: 'flex', flexDirection: 'row', visibility: '' + (this.state.showOrientationModal ? "hidden" : "visible") } },
                  _react2.default.createElement(UnfilledVideoSquare, { vidid: 'video-square3',
                    limit: 2,
                    onInvite: this.onInvite,
                    streamlength: this.state.streams.length,
                    stream: this.state.streams[1],
                    session: this.sessionHelper.session,
                    localkey: local_key_counter_to_avoid_warning++,
                    state: this.state,
                    visible: !this.state.showOrientationModal
                  }),
                  _react2.default.createElement(NoVideoSquare, { vidid: 'video-square4',
                    localkey: local_key_counter_to_avoid_warning++,
                    onOrientation: this.onOrientation,
                    onFeedback: this.onFeedback,
                    playerState: this.state.playerState
                  })
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'journeyspace-footer', style: { display: 'flex' } },
            _react2.default.createElement('div', { style: { flex: 1 } }),
            _react2.default.createElement('div', { style: { marginLeft: 'auto', marginRight: '10px', alignSelf: 'center' } })
          ),
          this.state.showInviteModal && _react2.default.createElement(InviteModal, { journey: this.state.session, onComplete: this.onCompleteShare, onClose: this.onCloseShareModal })
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
      var _this27 = this;

      var currentParticipant = this.state.session && this.state.session.connection && _state2.default.journey && _state2.default.journey.participants.find(function (participant) {
        return participant.connectionId === _this27.state.session.connection.id;
      });
      return currentParticipant && _state2.default.journey.participants.indexOf(currentParticipant) === 0;
    }
  }, {
    key: 'journeyStateTimer',
    get: function get() {
      switch (_state2.default.journey.state) {
        case 'started':
        case 'paused':
          if (!this.playerTimeEmitter) {
            this.playerTimeEmitter = new AudioPlayTickEmitter(_state2.default.audioTag);
          }
          return this.playerTimeEmitter;
        default:
          if (!this.secondsEmitter) {
            this.secondsEmitter = new SecondsTimerEmitter(new Date(_state2.default.journey.createdAt), new Date(_state2.default.journey.startAt));
          }
          return this.secondsEmitter;
      }
    }
  }]);

  return JourneySpace;
}(_react.Component);

exports.default = (0, _reactEasyState.view)(JourneySpace);

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = require("react-swipeable-views-utils");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("react-swipeable-views-core");

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = require("opentok-layout-js");

/***/ }),
/* 106 */
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
        return 'sms:/&body=' + payload;
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
/* 107 */
/***/ (function(module, exports) {

module.exports = require("react-rating");

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 109 */
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

var CountdownMessage = function (_Component) {
  _inherits(CountdownMessage, _Component);

  function CountdownMessage(props) {
    _classCallCheck(this, CountdownMessage);

    var _this = _possibleConstructorReturn(this, (CountdownMessage.__proto__ || Object.getPrototypeOf(CountdownMessage)).call(this, props));

    _this.state = {
      currentCount: 10,
      total: '',
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    };

    _this.countdown = _this.countdown.bind(_this);
    return _this;
  }

  _createClass(CountdownMessage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.intervalId = setInterval(this.countdown, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.intervalId);
    }
  }, {
    key: 'countdown',
    value: function countdown() {
      var deadline = Date.parse(this.props.endTime);
      var now = Date.parse(new Date());
      var timeRemaining = deadline - now;

      var seconds = Math.floor(timeRemaining / 1000 % 60);
      var minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
      var hours = Math.floor(timeRemaining / (1000 * 60 * 60) % 24);
      var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

      this.setState({ total: timeRemaining, minutes: minutes, seconds: seconds });
    }
  }, {
    key: 'render',
    value: function render() {
      var totalTimeInMinutes = this.state.total / 1000 / 60;
      if (totalTimeInMinutes > 0 && totalTimeInMinutes < 5) {
        var message = 'Starting in: ' + (this.state.minutes > 0 ? this.state.minutes + "min" : "") + ' ' + this.state.seconds + 'sec';
      } else {
        var message = "Started";
      }

      if (totalTimeInMinutes < 5) {
        return _react2.default.createElement(
          'div',
          { id: 'countdown-time', className: 'btn btn-info', ref: 'countdown_ref' },
          message
        );
      } else {
        return _react2.default.createElement('div', null);
      }
    }
  }]);

  return CountdownMessage;
}(_react.Component);

exports.default = CountdownMessage;

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = require("agenda");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = require("agendash");

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map