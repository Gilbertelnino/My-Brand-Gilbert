"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _mocha = require("mocha");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _Article = _interopRequireDefault(require("../../models/Article"));

var _article = _interopRequireDefault(require("../asset/article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var addComment = function addComment() {
  (0, _mocha.beforeEach)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Article["default"].deleteMany({});

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _mocha.afterEach)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Article["default"].deleteMany({});

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("should return 400 if comment form input is invalid", function (done) {
    var article = new _Article["default"](_article["default"].validArticle);
    article.save();

    _chai["default"].request(_index["default"]).post("/api/articles/comments/" + article._id).send(_article["default"].invalidComment).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(400);
      done();
    });
  });
  it("should not be able to add comment to the article if article id is invalid", function (done) {
    _chai["default"].request(_index["default"]).post("/api/articles/comments/1").end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error", "Not Found");
      done();
    });
  });
  it("should be able to add comment if it is valid", function (done) {
    var article = new _Article["default"](_article["default"].validArticle);
    article.save();

    _chai["default"].request(_index["default"]).post("/api/articles/comments/".concat(article._id, " ")).send(_article["default"].validComment).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("message", "comment created successfully");
      done();
    });
  });
};

var _default = addComment;
exports["default"] = _default;
//# sourceMappingURL=comment.spec.js.map