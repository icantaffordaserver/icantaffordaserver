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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("graphql-fetch");

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(5);

var _axios = __webpack_require__(0);

var _axios2 = _interopRequireDefault(_axios);

var _graphqlFetch = __webpack_require__(1);

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _helpers = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by alexandermann on 2017-04-30.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(event, context, callback) {
    var adminToken, scapholdUrl, typeformAPIKey, formId, requestBody, since, typeformApiURL, apiResponse, response, profileResponses, profileDataStore, graphqlFetch;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            adminToken = process.env.ADMIN_TOKEN;
            scapholdUrl = process.env.SCAPHOLD_URL;
            typeformAPIKey = process.env.TYPEFORM_API_KEY;
            formId = process.env.PROFILE_FORM_ID;
            requestBody = JSON.parse(event.body);
            since = requestBody.created - 1; // subtract 1 second to make sure we get the response

            typeformApiURL = 'https://api.typeform.com/v1/form/' + formId + '?key=' + typeformAPIKey + '&completed=true&since=' + since + '&order_by[]=date_submit,desc';
            _context.prev = 7;
            _context.next = 10;
            return _axios2.default.get(typeformApiURL);

          case 10:
            apiResponse = _context.sent;
            response = (0, _helpers.findResponse)(requestBody, apiResponse.data.responses);
            profileResponses = (0, _helpers.parseProfileResponse)(response, apiResponse.data.questions);
            // the JSON object format

            profileDataStore = {
              userId: response.hidden.user_id,
              responseId: response.hidden.response_id,
              dateLand: response.metadata.date_land,
              dateSubmit: response.metadata.date_submit,
              profileResponses: profileResponses
            };
            graphqlFetch = (0, _graphqlFetch2.default)(scapholdUrl, adminToken); // initialize the graphql fetch client
            // store the profile json to the database

            _context.next = 17;
            return graphqlFetch('\n        mutation addTypeformProfile($id: ID!, $typeformProfile: JSON!) {\n          updateUser(input: {id: $id, typeformProfile: $typeformProfile, typeformProfileComplete: true}) {\n            clientMutationId\n          }\n        }\n      ', {
              id: response.hidden.user_id,
              typeformProfile: _extends({}, profileDataStore)
            });

          case 17:
            context.succeed({ statusCode: 200 });
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](7);

            console.error(_context.t0);
            context.fail(_context.t0);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[7, 20]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findResponse = findResponse;
exports.parseProfileResponse = parseProfileResponse;

var _axios = __webpack_require__(0);

var _axios2 = _interopRequireDefault(_axios);

var _lodash = __webpack_require__(6);

var _lodash2 = _interopRequireDefault(_lodash);

var _graphqlFetch = __webpack_require__(1);

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes in all recent typeform responses and finds the one matching the user submission
 * @param webHookRequest
 * @param typeformDataApiResponses
 * @returns Response
 */
function findResponse(webHookRequest, typeformDataApiResponses) {
  var webHookUserId = webHookRequest.user_id,
      webHookResponseId = webHookRequest.response_id;


  for (var i = 0; i < typeformDataApiResponses.length; i += 1) {
    var _typeformDataApiRespo = typeformDataApiResponses[i].hidden,
        typeformUserId = _typeformDataApiRespo.user_id,
        typeformResponseId = _typeformDataApiRespo.response_id;
    // check that the responseId from the webhook equals the one stored in the typeform database
    // and that the user id also matches

    if (webHookUserId === typeformUserId && webHookResponseId === typeformResponseId) {
      return typeformDataApiResponses[i];
    }
  }
  return Error('No response found');
}

/**
 * Take the form response, find the relating questions and parse a complete object with details
 * the questions into something that is readable and makes sense
 * @param response
 * @param typeformDataApiQuestions
 * @returns {{}}
 */
// Answers object looks like..
// { listimage_42481899_choice: 'Deep',
//   listimage_42483105_choice_53890487: 'Books',
//   listimage_42483105_choice_53890490: 'The meaning of life',
//   list_42487351_choice_53896250: 'An increase in energy',
//   list_42487351_choice_53896252: 'A fresh perspective',
//   textarea_42487449: 'Something cool',
//   textarea_42487463: 'Marshawnnnnn' }
/**
 * Created by alexandermann on 2017-02-10.
 */
function parseProfileResponse(response, typeformDataApiQuestions) {
  var profile = {};
  // loop through the answers object on the response body
  _lodash2.default.forOwn(response.answers, function (value, key) {
    // find the index of the corresponding answer id to the question id
    var questionIndex = _lodash2.default.findIndex(typeformDataApiQuestions, function (question) {
      return key === question.id;
    });
    // build the parsed profile question and answer object
    // check if question key already exists in the profile data structure
    if (_lodash2.default.has(profile, typeformDataApiQuestions[questionIndex].field_id)) {
      // key exists, push answer to answer array
      profile[typeformDataApiQuestions[questionIndex].field_id].answer.push(value);
    } else {
      // key doesn't exist, create new question answer object
      profile[typeformDataApiQuestions[questionIndex].field_id] = {
        questionText: typeformDataApiQuestions[questionIndex].question,
        answer: [value]
      };
    }
  });
  return profile;
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map