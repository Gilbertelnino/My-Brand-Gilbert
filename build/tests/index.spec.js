"use strict";

var _mocha = require("mocha");

var _getArticleSpec = _interopRequireDefault(require("./article/getArticle.spec.js"));

var _getSingleBlog = _interopRequireDefault(require("./article/getSingleBlog.spec"));

var _createArticle = _interopRequireDefault(require("./article/createArticle.spec"));

var _authToken = _interopRequireDefault(require("./article/authToken.spec"));

var _deleteArticle = _interopRequireDefault(require("./article/deleteArticle.spec"));

var _updateArticle = _interopRequireDefault(require("./article/updateArticle.spec"));

var _likeSpec = _interopRequireDefault(require("./article/like.spec.js"));

var _commentSpec = _interopRequireDefault(require("./article/comment.spec.js"));

var _Message = _interopRequireDefault(require("../models/Message"));

var _Profile = _interopRequireDefault(require("../models/Profile"));

var _getMessage = _interopRequireDefault(require("./queries/getMessage.spec"));

var _createMessage = _interopRequireDefault(require("./queries/createMessage.spec"));

var _deleteMessage = _interopRequireDefault(require("./queries/deleteMessage.spec"));

var _signup = _interopRequireDefault(require("./user/signup.spec"));

var _signin = _interopRequireDefault(require("./user/signin.spec"));

var _getProfileSpec = _interopRequireDefault(require("./user/getProfile.spec.js"));

var _createProfileSpec = _interopRequireDefault(require("./user/createProfile.spec.js"));

var _updateProfileSpec = _interopRequireDefault(require("./user/updateProfile.spec.js"));

var _deleteProfileSpec = _interopRequireDefault(require("./user/deleteProfile.spec.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// BLOG TEST SUIT
(0, _mocha.describe)("My Brand Test Container", function () {
  (0, _mocha.describe)("GET api/article get all article", _getArticleSpec["default"]);
  (0, _mocha.describe)("GET api/article/:id get single article", _getSingleBlog["default"]);
  (0, _mocha.describe)("POST api/articles/create", _createArticle["default"]);
  (0, _mocha.describe)("Auth token middleware", _authToken["default"]);
  (0, _mocha.describe)("DELETE /api/articles/:id", _deleteArticle["default"]);
  (0, _mocha.describe)("PATCH /api/articles/:id", _updateArticle["default"]);
  (0, _mocha.describe)("PATCH /api/likes/:id", _likeSpec["default"]);
  (0, _mocha.describe)("POST /api/articles/comments/:id", _commentSpec["default"]);
}); // QUIRIES TEST SUIT

(0, _mocha.describe)("Queries test container", function () {
  (0, _mocha.afterEach)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Message["default"].deleteMany({});

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _mocha.describe)("GET /api/queries", _getMessage["default"]);
  (0, _mocha.describe)("POST /api/query/create", _createMessage["default"]);
  (0, _mocha.describe)("DELETE /api/queries/:id", _deleteMessage["default"]);
}); // SIGNUP

(0, _mocha.describe)("signup user test", function () {
  (0, _mocha.describe)("POST /api/signup", _signup["default"]);
}); // LOGIN USER

(0, _mocha.describe)("login user test", function () {
  (0, _mocha.describe)("POST /api/login", _signin["default"]);
}); // PROFILE

(0, _mocha.describe)("Profile test suit", function () {
  (0, _mocha.afterEach)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Profile["default"].deleteMany({});

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  (0, _mocha.describe)("GET /api/profile", _getProfileSpec["default"]);
  (0, _mocha.describe)("POST /api/profile/create", _createProfileSpec["default"]);
  (0, _mocha.describe)("PATCH /api/profile/edit/:id", _updateProfileSpec["default"]);
  (0, _mocha.describe)("DELETE /api/profile/delete/:id", _deleteProfileSpec["default"]);
});
//# sourceMappingURL=index.spec.js.map