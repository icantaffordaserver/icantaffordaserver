module.exports =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(44);

var _assert = __webpack_require__(39);

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-03.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0OTE4NDI3NTMsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMjdlZmU5MDAtMzNkOS00ZjQ3LThlMmQtZGJlZGY4NTA0ZjZmIn0.d3u0P0qTyd4LhSnETR3guDGLKPMhV7cpjTmGHe_hCyI';
var SCAPHOLD_URL = 'https://us-west-2.api.scaphold.io/graphql/toktumi';

/**
 * create a graphql-fetch bound to a specific graphql url
 * @param  {String} graphqlUrl
 * @return {Function} graphqlFetch
 */
function graphqlFetch(graphqlUrl) {
  var _this = this;

  /**
   * graphql fetch - fetch w/ smart defaults for graphql requests
   * @param  {Query} query graphql query
   * @param  {Object} vars  graphql query args
   * @param  {Object} opts  fetch options
   * @return {FetchPromise} fetch promise
   */
  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(query, vars, opts) {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _assert2.default)(query, 'query is required');
              vars = vars || {};
              opts = opts || {};
              opts.method = 'POST';
              opts.headers = {
                Authorization: 'Bearer ' + ADMIN_TOKEN,
                'content-type': 'application/json'
              };
              opts.body = JSON.stringify({
                query: query,
                variables: vars
              });

              _context.next = 8;
              return fetch(graphqlUrl, opts);

            case 8:
              res = _context.sent;
              _context.next = 11;
              return res.json();

            case 11:
              res = _context.sent;

              if (!res.errors) {
                _context.next = 14;
                break;
              }

              throw new Error(res);

            case 14:
              return _context.abrupt('return', res);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

exports.default = graphqlFetch(SCAPHOLD_URL);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mailer");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUniqueToken = generateUniqueToken;

var _crypto = __webpack_require__(43);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate a unique token
 * @returns {Promise.<void>}
 */
function generateUniqueToken() {
  return new Promise(function (resolve, reject) {
    _crypto2.default.randomBytes(48, function (err, buf) {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
} /**
   * Created by alexandermann on 2017-04-21.
   */

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lokka = __webpack_require__(45);

var _lokka2 = _interopRequireDefault(_lokka);

var _lokkaTransportHttp = __webpack_require__(46);

var _lokkaTransportHttp2 = _interopRequireDefault(_lokkaTransportHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// outdated
/**
 * Created by alexandermann on 2017-03-05.
 */
var ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0ODg1NzgzNDYsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMjdlZmU5MDAtMzNkOS00ZjQ3LThlMmQtZGJlZGY4NTA0ZjZmIn0.Rt8sUyF4vF8_Ya21fbzDC22RU8NJ5cLrWjI6KAtaPbg';

// outdated
exports.default = new _lokka2.default({
  transport: new _lokkaTransportHttp2.default('https://us-west-2.api.scaphold.io/graphql/shift-beta', {
    headers: { Authorization: 'Bearer ' + ADMIN_TOKEN }
  })
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by alexandermann on 2017-04-03.
 */

exports.default = "\n  mutation deleteVerifyEmail($id: ID!) {\n    deleteVerifyEmail(input: {id: $id}) {\n      clientMutationId\n    }\n  }\n";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by alexandermann on 2017-04-11.
 */
exports.default = "\n  query getInvite($inviteId: ID!) {\n    getInvites(id: $inviteId) {\n      firstName\n      lastName\n      email\n      token\n      isAccepted\n    }\n  }\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by alexandermann on 2017-04-03.
 */

exports.default = "\n  query getUser($email: String){\n    viewer {\n      allUsers(where: {username: {eq: $email}}) {\n        edges {\n          node {\n            id\n            firstName\n            username\n            emailVerified\n            verifyEmail {\n              id\n              emailToVerify\n              token\n              tokenExpiry\n            }\n          }\n        }\n      }\n    }\n  }\n";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateEmailVerificationUrl = generateEmailVerificationUrl;
/**
 * Created by alexandermann on 2017-04-21.
 */
function generateEmailVerificationUrl(token) {
  return "https://shiftwithus.ngrok.io/verify/" + token;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateInviteEmailUrl = generateInviteEmailUrl;
/**
 * Created by alexandermann on 2017-04-21.
 */
function generateInviteEmailUrl(inviteId, token) {
  return "https://beta.toktumi.io/signup/" + inviteId + "/" + token;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by alexandermann on 2017-05-04.
 */
// Catch all unhandled exceptions and print their stack trace.
// Required if the hanlder function is async, as promises
// can swallow error messages.

process.on('uncaughtException', function (err) {
  return console.error('uncaught exception:', err);
});
process.on('unhandledRejection', function (error) {
  return console.error('unhandled rejection:', error);
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsServerlessExpress = __webpack_require__(40);

var _awsServerlessExpress2 = _interopRequireDefault(_awsServerlessExpress);

var _app = __webpack_require__(13);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Vanilla Lambda function.
var server = _awsServerlessExpress2.default.createServer(_app2.default);

exports.default = function (event, context) {
  return _awsServerlessExpress2.default.proxy(server, event, context);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(41);

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(42);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = __webpack_require__(38);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by alexandermann on 2017-04-22.
 */
// note that if this were a library/tool we should use transform runtime so that we don't pollute
// the global object/scope
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// set base url to 'scaphold' here as this is the base route we use in the serverless.yml config
app.use('/scaphold', _routes2.default);

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'dev') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

exports.default = app;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by alexandermann on 2017-04-12.
 */

exports.default = "\n  mutation setInviteToAccepted($inviteId: ID!) {\n    updateInvites(input: {id: $inviteId, status: accepted, isAccepted: true}) {\n      clientMutationId\n    }\n  }\n";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlFetch = __webpack_require__(1);

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _getInviteByIdQuery = __webpack_require__(7);

var _getInviteByIdQuery2 = _interopRequireDefault(_getInviteByIdQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(inviteId, email, token) {
    var response, _response$data$getInv, storedEmail, storedToken, isAccepted;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            response = void 0;
            _context.prev = 1;
            _context.next = 4;
            return (0, _graphqlFetch2.default)(_getInviteByIdQuery2.default, { inviteId: inviteId });

          case 4:
            response = _context.sent;
            _response$data$getInv = response.data.getInvites, storedEmail = _response$data$getInv.email, storedToken = _response$data$getInv.token, isAccepted = _response$data$getInv.isAccepted;

            if (!(email === storedEmail && token === storedToken && !isAccepted)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', true);

          case 8:
            return _context.abrupt('return', false);

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](1);

            console.log(_context.t0);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlFetch = __webpack_require__(1);

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _setInviteToAcceptedMutation = __webpack_require__(14);

var _setInviteToAcceptedMutation2 = _interopRequireDefault(_setInviteToAcceptedMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(inviteId) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _graphqlFetch2.default)(_setInviteToAcceptedMutation2.default, { inviteId: inviteId }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = __webpack_require__(47);

var _moment2 = _interopRequireDefault(_moment);

var _mailer = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-18.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, connectionTime, conversationTime;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.user.email, connectionTime = _req$body.connections.connectionTime;

            // convert the ISO8601 string a human readable date, ex - "Sunday, February 14th @ 3:25 pm"

            conversationTime = (0, _moment2.default)(connectionTime).format('dddd, MMMM Do @ h:mm a');

            (0, _mailer.sendConversationScheduledEmail)(email, conversationTime);

            res.sendStatus(200);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _addUserToConnection = __webpack_require__(17);

var _addUserToConnection2 = _interopRequireDefault(_addUserToConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by alexandermann on 2017-04-22.
 */
var routes = (0, _express.Router)();

routes.post('/async/addUserToConnection', _addUserToConnection2.default);

exports.default = routes;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailer = __webpack_require__(2);

var _generateInviteEmailUrl = __webpack_require__(10);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-05.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body$payload$cha, inviteId, firstName, email, token, inviteRequest, actionUrl;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body$payload$cha = req.body.payload.changedInvites, inviteId = _req$body$payload$cha.id, firstName = _req$body$payload$cha.firstName, email = _req$body$payload$cha.email, token = _req$body$payload$cha.token, inviteRequest = _req$body$payload$cha.inviteRequest;
            actionUrl = (0, _generateInviteEmailUrl.generateInviteEmailUrl)(inviteId, token);

            if (!inviteRequest) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return (0, _mailer.sendInviteAcceptedEmail)({
              firstName: firstName,
              recipientEmail: email,
              actionUrl: actionUrl
            });

          case 5:
            _context.next = 9;
            break;

          case 7:
            _context.next = 9;
            return (0, _mailer.sendInviteEmail)({
              firstName: firstName,
              recipientEmail: email,
              actionUrl: actionUrl
            });

          case 9:

            res.status(200).send('Message sent successfully');

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _validateInviteAndCreateInviteToken = __webpack_require__(21);

var _validateInviteAndCreateInviteToken2 = _interopRequireDefault(_validateInviteAndCreateInviteToken);

var _sendInviteEmail = __webpack_require__(19);

var _sendInviteEmail2 = _interopRequireDefault(_sendInviteEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express.Router)(); /**
                                      * Created by alexandermann on 2017-04-22.
                                      */


routes.post('/pre/validateInviteAndCreateInviteToken', _validateInviteAndCreateInviteToken2.default);
routes.post('/async/sendInviteEmail', _sendInviteEmail2.default);

exports.default = routes;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _validator = __webpack_require__(4);

var _graphqlFetch = __webpack_require__(1);

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _generateUniqueToken = __webpack_require__(3);

var _getUserByEmailQuery = __webpack_require__(8);

var _getUserByEmailQuery2 = _interopRequireDefault(_getUserByEmailQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-04.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
    var email, normalizedEmail, query, emailExists, token, responseBody;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.input.email;
            // check if email is valid format

            if ((0, _validator.isEmail)(email)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', next(new Error('Please enter a valid email')));

          case 3:

            // check if inviteRequestsId is present to determine what email to send


            // Normalize email
            normalizedEmail = (0, _validator.normalizeEmail)(email);

            // query the submitted email

            _context.next = 6;
            return (0, _graphqlFetch2.default)(_getUserByEmailQuery2.default, { email: normalizedEmail });

          case 6:
            query = _context.sent;
            emailExists = query.data.viewer.allUsers.edges.length !== 0;

            if (!emailExists) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', next(new Error('User already exists for this email')));

          case 10:
            _context.next = 12;
            return (0, _generateUniqueToken.generateUniqueToken)();

          case 12:
            token = _context.sent;


            // send the data along the "logic" flow in the expected format to update the store
            responseBody = {
              input: _extends({}, req.body.input, {
                email: email,
                token: token
              })
            };

            res.send(responseBody);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailer = __webpack_require__(2);

var _lokkaClient = __webpack_require__(5);

var _lokkaClient2 = _interopRequireDefault(_lokkaClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-03-27.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var getPasswordResetQuery = '\n  query getPwId($passwordResetId: ID!) {\n    getPasswordReset(id: $passwordResetId) {\n      email\n      resetToken\n      resetExpires\n      securityInfo\n      user {\n        firstName\n      }\n    }\n  }\n';

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var id, passwordResetResponse, _passwordResetRespons, email, firstName, securityInfo, resetToken, actionUrl;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = req.body.payload.changedPasswordReset.id;
            // have to fetch the data from scaphold because permissions don't pass this to async
            // function, probably a better way to structure the permissions but will optimize later, TODO

            _context.next = 4;
            return _lokkaClient2.default.query(getPasswordResetQuery, {
              passwordResetId: id
            });

          case 4:
            passwordResetResponse = _context.sent;
            _passwordResetRespons = passwordResetResponse.getPasswordReset, email = _passwordResetRespons.email, firstName = _passwordResetRespons.user.firstName, securityInfo = _passwordResetRespons.securityInfo, resetToken = _passwordResetRespons.resetToken;
            actionUrl = 'localhost:3000/reset/' + id + '/' + resetToken;
            _context.next = 9;
            return (0, _mailer.sendPasswordResetEmail)({
              firstName: firstName,
              recipientEmail: email,
              actionUrl: actionUrl,
              operatingSystem: securityInfo.os,
              browserName: securityInfo.browser
            });

          case 9:
            // send the data along the "logic" flow in the expected format to update the store
            res.sendStatus(200);
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', res.status(400).send(_context.t0));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _createPasswordReset = __webpack_require__(24);

var _createPasswordReset2 = _interopRequireDefault(_createPasswordReset);

var _sendPasswordResetEmail = __webpack_require__(22);

var _sendPasswordResetEmail2 = _interopRequireDefault(_sendPasswordResetEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express.Router)(); /**
                                      * Created by alexandermann on 2017-04-22.
                                      */


routes.post('/pre/createPasswordReset', _createPasswordReset2.default);
routes.post('/async/sendPasswordResetEmail', _sendPasswordResetEmail2.default);

exports.default = routes;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = __webpack_require__(4);

var _lokkaClient = __webpack_require__(5);

var _lokkaClient2 = _interopRequireDefault(_lokkaClient);

var _generateUniqueToken = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-03-03.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


var getUserIdQuery = '\nquery getUser($email: String){\n    viewer {\n      allUsers(where: {username: {eq: $email}}) {\n        edges {\n          node {\n            id\n            email\n            passwordReset {\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n';
// note that lokka uses a different syntax for mutations than apollo, doesn't include
// "mutation someNameForMutation" part
var deleteExistingPasswordResetMutation = '\n($id: ID!) {\n  deletePasswordReset(input: {id: $id}) {\n    clientMutationId\n  }\n}';

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body$input, inputEmail, securityInfo, response, _response$viewer$allU, userId, email, resetToken, resetExpires, id2Delete;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body$input = req.body.input, inputEmail = _req$body$input.email, securityInfo = _req$body$input.securityInfo;

            // check if email is valid format

            if ((0, _validator.isEmail)(inputEmail)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', res.status(400).send('Please enter a valid email.'));

          case 4:

            // Save the email sent from forgot password page and normalize it
            inputEmail = (0, _validator.normalizeEmail)(inputEmail);

            // Query graphql server with email submitted to get userId
            _context.next = 7;
            return _lokkaClient2.default.query(getUserIdQuery, { email: inputEmail });

          case 7:
            response = _context.sent;

            if (!(response.viewer.allUsers.edges.length === 0)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', res.status(400).send('The email entered does not exist.'));

          case 10:

            // pull relevant fields, generate the reset token and expiry
            _response$viewer$allU = response.viewer.allUsers.edges[0].node, userId = _response$viewer$allU.id, email = _response$viewer$allU.email;
            _context.next = 13;
            return (0, _generateUniqueToken.generateUniqueToken)();

          case 13:
            resetToken = _context.sent;
            resetExpires = Date.now() + 86400000; // 24hrs before expiry

            // check if password reset token exists already for requested user, if it does delete it

            if (!(response.viewer.allUsers.edges[0].node && response.viewer.allUsers.edges[0].node.passwordReset)) {
              _context.next = 19;
              break;
            }

            // pull the existing password reset id
            id2Delete = response.viewer.allUsers.edges[0].node.passwordReset.id;
            _context.next = 19;
            return _lokkaClient2.default.mutate(deleteExistingPasswordResetMutation, { id: id2Delete });

          case 19:
            return _context.abrupt('return', res.send({
              input: {
                email: email,
                userId: userId,
                resetToken: resetToken,
                resetExpires: resetExpires,
                securityInfo: securityInfo
              }
            }));

          case 22:
            _context.prev = 22;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', res.status(400).send(_context.t0));

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 22]]);
  }));

  function passwordReset(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return passwordReset;
}();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailer = __webpack_require__(2);

var _generateEmailVerificationUrl = __webpack_require__(9);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-03-26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body$payload$cha, firstName, _req$body$payload$cha2, emailToVerify, token, actionUrl;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.body.payload.changedUser.emailVerified) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', res.sendStatus(200));

          case 2:
            _context.prev = 2;
            _req$body$payload$cha = req.body.payload.changedUser, firstName = _req$body$payload$cha.firstName, _req$body$payload$cha2 = _req$body$payload$cha.verifyEmail, emailToVerify = _req$body$payload$cha2.emailToVerify, token = _req$body$payload$cha2.token;
            actionUrl = (0, _generateEmailVerificationUrl.generateEmailVerificationUrl)(token);
            _context.next = 7;
            return (0, _mailer.sendVerificationEmail)({
              firstName: firstName,
              recipientEmail: emailToVerify,
              emailVerifiedToken: token,
              actionUrl: actionUrl
            });

          case 7:
            return _context.abrupt('return', res.sendStatus(200));

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](2);

            console.log(_context.t0);
            return _context.abrupt('return', res.status(400).send(_context.t0));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _validateInputAndCreateEmailVerifyToken = __webpack_require__(28);

var _validateInputAndCreateEmailVerifyToken2 = _interopRequireDefault(_validateInputAndCreateEmailVerifyToken);

var _isInviteApproved = __webpack_require__(27);

var _isInviteApproved2 = _interopRequireDefault(_isInviteApproved);

var _sendVerificationEmailAfterCreateUser = __webpack_require__(25);

var _sendVerificationEmailAfterCreateUser2 = _interopRequireDefault(_sendVerificationEmailAfterCreateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by alexandermann on 2017-04-22.
 */
var routes = (0, _express.Router)();

routes.post('/pre/validateInputAndCreateEmailVerifyToken', _validateInputAndCreateEmailVerifyToken2.default);
routes.post('/post/isInviteApproved', _isInviteApproved2.default);
routes.post('/async/sendVerificationEmailAfterCreateUser', _sendVerificationEmailAfterCreateUser2.default);

exports.default = routes;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setInviteToAccepted = __webpack_require__(16);

var _setInviteToAccepted2 = _interopRequireDefault(_setInviteToAccepted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body$changedUser, id, isAccepted, status, email;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.changedUser.invite) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', res.sendStatus(200));

          case 2:
            _req$body$changedUser = req.body.changedUser.invite, id = _req$body$changedUser.id, isAccepted = _req$body$changedUser.isAccepted, status = _req$body$changedUser.status, email = _req$body$changedUser.email;
            _context.prev = 3;
            _context.next = 6;
            return (0, _setInviteToAccepted2.default)(id);

          case 6:
            return _context.abrupt('return', res.sendStatus(200));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);

            console.log(_context.t0);
            return _context.abrupt('return', res.sendStatus(400));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _validator = __webpack_require__(4);

var _generateUniqueToken = __webpack_require__(3);

var _isInviteEmailAndTokenValid = __webpack_require__(15);

var _isInviteEmailAndTokenValid2 = _interopRequireDefault(_isInviteEmailAndTokenValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-03-26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body$input, email, _req$body$input$reque, inviteId, inviteToken, validInvite, normalizedEmail;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            // pull input data off the request
            _req$body$input = req.body.input, email = _req$body$input.email, _req$body$input$reque = _req$body$input.requestVars, inviteId = _req$body$input$reque.inviteId, inviteToken = _req$body$input$reque.token;
            // we have odd behaviour here - for some reason the inviteId appears as a number from
            // req.body.input and not the string we are expecting, therefore we pass the id through the
            // requestVars object make sure the request has a token and invite id

            if (!(!inviteId || !inviteToken)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', res.status(400).send('Sorry you need a valid invite to sign up at this time.'));

          case 4:
            _context.next = 6;
            return (0, _isInviteEmailAndTokenValid2.default)(inviteId, email, inviteToken);

          case 6:
            validInvite = _context.sent;

            if (validInvite) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', res.status(400).send(new Error('Sorry you need a valid invite to sign up at this time.')));

          case 9:
            if ((0, _validator.isEmail)(email)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', res.status(400).send('Please enter a valid email.'));

          case 11:

            // Normalize email
            normalizedEmail = (0, _validator.normalizeEmail)(email);

            // normally we would check to see if the email is taken, but scaphold will do this for us via
            // the "unique" constraint in the control panel

            //  ************************** DISABLED FOR BETA ****************************
            // generate a unique token set to expire in 1 day, UTC
            // const token = await generateUniqueToken();
            // const tokenExpiry = Date.now() + 86400000;

            // send the data along the "logic" flow in the expected format to update the store

            return _context.abrupt('return', res.send({
              input: _extends({}, req.body.input, { // destructure the current input, then overwrite anything we want to modify
                username: normalizedEmail, // this is the "unique id" part for the user, always include it
                email: normalizedEmail,
                emailVerified: true,
                inviteId: inviteId,
                // verifyEmail: {
                //   emailToVerify: normalizedEmail,
                //   token,
                //   tokenExpiry,
                // },
                requestVars: null })
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', res.status(400).send(_context.t0));

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailer = __webpack_require__(2);

var _generateEmailVerificationUrl = __webpack_require__(9);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-02.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
/**
 * Created by alexandermann on 2017-03-26.
 */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body$payload$cha, emailToVerify, token, firstName, actionUrl;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body$payload$cha = req.body.payload.changedVerifyEmail, emailToVerify = _req$body$payload$cha.emailToVerify, token = _req$body$payload$cha.token, firstName = _req$body$payload$cha.user.firstName;
            actionUrl = (0, _generateEmailVerificationUrl.generateEmailVerificationUrl)(token);
            _context.next = 5;
            return (0, _mailer.sendVerificationEmail)({
              firstName: firstName,
              recipientEmail: emailToVerify,
              emailVerifiedToken: token,
              actionUrl: actionUrl
            });

          case 5:
            return _context.abrupt('return', res.sendStatus(200));

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', res.status(400).send(_context.t0));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _generateToken = __webpack_require__(31);

var _generateToken2 = _interopRequireDefault(_generateToken);

var _sendVerificationEmailAfterCreateVerifyEmail = __webpack_require__(29);

var _sendVerificationEmailAfterCreateVerifyEmail2 = _interopRequireDefault(_sendVerificationEmailAfterCreateVerifyEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express.Router)(); /**
                                      * Created by alexandermann on 2017-04-22.
                                      */


routes.post('/pre/generateToken', _generateToken2.default);
routes.post('/async/sendVerificationEmailAfterCreateVerifyEmail', _sendVerificationEmailAfterCreateVerifyEmail2.default);

exports.default = routes;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = __webpack_require__(4);

var _graphqlFetch = __webpack_require__(1);

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _getUserByEmailQuery = __webpack_require__(8);

var _getUserByEmailQuery2 = _interopRequireDefault(_getUserByEmailQuery);

var _deleteVerifyEmailMutation = __webpack_require__(6);

var _deleteVerifyEmailMutation2 = _interopRequireDefault(_deleteVerifyEmailMutation);

var _generateUniqueToken = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-02.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
/**
 * Created by alexandermann on 2017-03-26.
 */

// import isEmail from 'validator/lib/isEmail';


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body$input, emailToVerify, userId, normalizedEmail, response, emailExists, _ref2, emailVerified, id, token, tokenExpiry;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            // pull off relevant data from the incoming request
            _req$body$input = req.body.input, emailToVerify = _req$body$input.emailToVerify, userId = _req$body$input.userId;

            // check if email is valid format

            if ((0, _validator.isEmail)(emailToVerify)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', res.status(400).send('Please enter a valid email.'));

          case 4:

            // Normalize email
            normalizedEmail = (0, _validator.normalizeEmail)(emailToVerify);

            // query the submitted email

            _context.next = 7;
            return (0, _graphqlFetch2.default)(_getUserByEmailQuery2.default, { email: normalizedEmail });

          case 7:
            response = _context.sent;
            emailExists = response.data.viewer.allUsers.edges.length !== 0;
            _ref2 = emailExists ? response.data.viewer.allUsers.edges[0].node : false, emailVerified = _ref2.emailVerified;

            if (!(emailExists && emailVerified)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', res.status(400).send('Email is taken, please choose another.'));

          case 12:
            if (!(emailExists && response.data.viewer.allUsers.edges[0].node.verifyEmail)) {
              _context.next = 16;
              break;
            }

            id = response.data.viewer.allUsers.edges[0].node.verifyEmail.id;
            _context.next = 16;
            return (0, _graphqlFetch2.default)(_deleteVerifyEmailMutation2.default, { id: id });

          case 16:
            _context.next = 18;
            return (0, _generateUniqueToken.generateUniqueToken)();

          case 18:
            token = _context.sent;
            tokenExpiry = Date.now() + 86400000; // time now in milliseconds, UTC plus 1 day

            // send the data along the "logic" flow in the expected format to update the store

            return _context.abrupt('return', res.send({
              input: {
                emailToVerify: normalizedEmail,
                token: token,
                tokenExpiry: tokenExpiry,
                userId: userId
              }
            }));

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);
            return _context.abrupt('return', res.status(400).send(_context.t0));

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _isResendingInvite = __webpack_require__(33);

var _isResendingInvite2 = _interopRequireDefault(_isResendingInvite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by alexandermann on 2017-04-22.
 */
var routes = (0, _express.Router)();

routes.post('/pre/isResendingInvite', _isResendingInvite2.default);

exports.default = routes;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mailer = __webpack_require__(2);

var _getInviteByIdQuery = __webpack_require__(7);

var _getInviteByIdQuery2 = _interopRequireDefault(_getInviteByIdQuery);

var _graphqlFetch = __webpack_require__(1);

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _generateInviteEmailUrl = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var id, response, _response$data$getInv, email, token, isAccepted, firstName;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.body.input.requestVars && req.body.input.requestVars.resendInvite)) {
              _context.next = 20;
              break;
            }

            _context.prev = 1;
            id = req.body.input.id;

            // fetch the invite to get the data from the db

            _context.next = 5;
            return (0, _graphqlFetch2.default)(_getInviteByIdQuery2.default, { inviteId: id });

          case 5:
            response = _context.sent;
            _response$data$getInv = response.data.getInvites, email = _response$data$getInv.email, token = _response$data$getInv.token, isAccepted = _response$data$getInv.isAccepted, firstName = _response$data$getInv.firstName;

            if (!isAccepted) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', res.status(400).send(new Error('Invite is already accepted, cannot resend')));

          case 9:
            _context.next = 11;
            return (0, _mailer.sendInviteEmail)({
              firstName: firstName,
              recipientEmail: email,
              emailVerifiedToken: token,
              actionUrl: (0, _generateInviteEmailUrl.generateInviteEmailUrl)(id, token)
            });

          case 11:

            res.send({ input: _extends({}, req.body.input, { requestVars: null }) }); // TODO: remove request vars here, refactor into own func.
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](1);

            console.log(_context.t0);
            return _context.abrupt('return', res.status(400).send(_context.t0));

          case 18:
            _context.next = 21;
            break;

          case 20:
            res.send({ input: _extends({}, req.body.input, { requestVars: null }) }); // TODO: remove request vars here, refactor into own func.

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 14]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _updatePasswordReset = __webpack_require__(35);

var _updatePasswordReset2 = _interopRequireDefault(_updatePasswordReset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by alexandermann on 2017-04-22.
 */
var routes = (0, _express.Router)();

routes.post('/pre/updatePasswordReset', _updatePasswordReset2.default);

exports.default = routes;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lokkaClient = __webpack_require__(5);

var _lokkaClient2 = _interopRequireDefault(_lokkaClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-03-03.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var passwordResetQuery, passwordResetMutation, _req$body$input, id, resetToken, newPassword, passwordResetQueryResponse, _passwordResetQueryRe, dbToken, userId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // check the token matches the one currently stored, if not return error
            passwordResetQuery = '\n    query passwordReset($id: ID!) {\n      getPasswordReset(id: $id) {\n        resetToken\n        user {\n          id\n        }\n      }\n    }\n  ';
            passwordResetMutation = '\n    ($userId: ID!, $newPassword: Secret!){\n      updateUser(input:{id:$userId, password: $newPassword}){\n        clientMutationId\n      }\n    }\n  ';
            _context.prev = 2;

            // pull off relevant data from the submission
            _req$body$input = req.body.input, id = _req$body$input.id, resetToken = _req$body$input.resetToken, newPassword = _req$body$input.newPassword;

            // query the server to check submission with data store

            _context.next = 6;
            return _lokkaClient2.default.query(passwordResetQuery, { id: id });

          case 6:
            passwordResetQueryResponse = _context.sent;

            if (passwordResetQueryResponse.getPasswordReset) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', res.status(400).send(new Error('An error occurred while processing this request. Please try again.')));

          case 9:

            // pull relevant data from the query
            _passwordResetQueryRe = passwordResetQueryResponse.getPasswordReset, dbToken = _passwordResetQueryRe.resetToken, userId = _passwordResetQueryRe.user.id;

            // check if the token in the db matches the token provided

            if (!(dbToken !== resetToken)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', res.status(400).send(new Error('An error occurred while processing this request. Please try again.')));

          case 12:
            _context.next = 14;
            return _lokkaClient2.default.mutate(passwordResetMutation, { userId: userId, newPassword: newPassword });

          case 14:
            return _context.abrupt('return', res.send(_extends({}, req.body)));

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](2);

            console.log(_context.t0);
            return _context.abrupt('return', res.sendStatus(400));

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 17]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _verifyEmail = __webpack_require__(37);

var _verifyEmail2 = _interopRequireDefault(_verifyEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by alexandermann on 2017-04-22.
 */
var routes = (0, _express.Router)();

routes.post('/pre/verifyEmail', _verifyEmail2.default);

exports.default = routes;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphqlFetch = __webpack_require__(1);

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _deleteVerifyEmailMutation = __webpack_require__(6);

var _deleteVerifyEmailMutation2 = _interopRequireDefault(_deleteVerifyEmailMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-03-27.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var checkEmailVerifiedTokenQuery, setEmailVerifiedMutation, _req$body$input, id, checkToken, response, _response$data$getUse, emailToVerify, storedUserToken, tokenExpiry;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // check the token matches the one currently stored, if not return error
            checkEmailVerifiedTokenQuery = '\n    query checkEmailVerifiedToken($userId: ID!) {\n      getUser(id: $userId) {\n        id\n        verifyEmail {\n          id\n          emailToVerify\n          token\n          tokenExpiry\n        }\n      }\n    }\n  ';
            setEmailVerifiedMutation = '\n    mutation setEmailVerified($userId: ID!){\n      updateUser(input:{id:$userId, emailVerified: true}){\n        clientMutationId\n      }\n    }\n  ';
            _context.prev = 2;

            console.log(req.body);
            // if requestVars don't contain a checkToken, then user is not trying to verify email

            if (!(!req.body.input.requestVars || !req.body.input.requestVars.checkToken)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', res.send(_extends({}, req.body)));

          case 6:

            // pull off relevant data from the submission
            _req$body$input = req.body.input, id = _req$body$input.id, checkToken = _req$body$input.requestVars.checkToken;

            // query the server to compare input token vs token in db

            _context.next = 9;
            return (0, _graphqlFetch2.default)(checkEmailVerifiedTokenQuery, { userId: id });

          case 9:
            response = _context.sent;

            if (response.data.getUser) {
              _context.next = 13;
              break;
            }

            console.log('error: getUser doesnt exist');
            return _context.abrupt('return', res.status(400).send(new Error('An error occurred while processing this request. Please try again.')));

          case 13:

            // pull relevant data from the query
            _response$data$getUse = response.data.getUser.verifyEmail, emailToVerify = _response$data$getUse.emailToVerify, storedUserToken = _response$data$getUse.token, tokenExpiry = _response$data$getUse.tokenExpiry;

            // convert date to milliseconds and compare to make sure token not expired

            if (!(new Date(tokenExpiry).valueOf() < Date.now())) {
              _context.next = 17;
              break;
            }

            console.log('error: token is expired');
            return _context.abrupt('return', res.status(400).send(new Error('Token is expired, please request a new one.')));

          case 17:
            if (!(checkToken !== storedUserToken)) {
              _context.next = 20;
              break;
            }

            console.log('error: token doesnt match stored token');
            return _context.abrupt('return', res.status(400).send(new Error('An error occurred while processing this request. Please try again.')));

          case 20:
            _context.next = 22;
            return (0, _graphqlFetch2.default)(setEmailVerifiedMutation, { userId: id });

          case 22:
            _context.next = 24;
            return (0, _graphqlFetch2.default)(_deleteVerifyEmailMutation2.default, { id: response.data.getUser.verifyEmail.id });

          case 24:
            return _context.abrupt('return', res.send({
              input: {
                id: id,
                username: emailToVerify,
                email: emailToVerify
              }
            }));

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](2);

            console.log(_context.t0);
            return _context.abrupt('return', res.sendStatus(400).send(_context.t0));

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 27]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _index = __webpack_require__(26);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(36);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(20);

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(32);

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(23);

var _index10 = _interopRequireDefault(_index9);

var _index11 = __webpack_require__(34);

var _index12 = _interopRequireDefault(_index11);

var _index13 = __webpack_require__(30);

var _index14 = _interopRequireDefault(_index13);

var _index15 = __webpack_require__(18);

var _index16 = _interopRequireDefault(_index15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express.Router)();

// All microservice functions related to users type
/**
 * Created by alexandermann on 2017-04-26.
 */
routes.use('/createUser', _index2.default);
routes.use('/updateUser', _index4.default);

// All microservice functions related to invites type
routes.use('/createInvites', _index6.default);
routes.use('/updateInvites', _index8.default);

// All microservice functions related to PasswordReset type
routes.use('/createPasswordReset', _index10.default);
routes.use('/updatePasswordReset', _index12.default);

// All microservice functions related to VerifyEmail type
routes.use('/createVerifyEmail', _index14.default);

// All microservice functions related to Connection type
routes.use('/addToUsersConnectionsConnection', _index16.default);

exports.default = routes;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("aws-serverless-express");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("lokka");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("lokka-transport-http");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11);
module.exports = __webpack_require__(12);


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map