"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _mocha = require("mocha");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _article = _interopRequireDefault(require("../asset/article"));

var _Article = _interopRequireDefault(require("../../models/Article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var createArticle = function createArticle() {
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
  it("should return 401 status if client is not logged in", function (done) {
    _chai["default"].request(_index["default"]).post("/api/articles/create").send({
      title: "first title",
      subtitle: "first subtitle ever",
      image: "images/og-default.jpg",
      content: "this is content for testing article api",
      author: "gilbert"
    }).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(401);
      expect(res.body).to.have.property("message", "access denied");
      done();
    });
  });
  it("should return 400 status if blog required field is not provided correctly", function (done) {
    _chai["default"].request(_index["default"]).post("/api/articles/create").set(_article["default"].validToken).send({
      title: "",
      subtitle: "first subtitle ever",
      image: "images/og-default.jpg",
      content: "this is content for testing article api",
      author: "gilbert"
    }).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(400);
      done();
    });
  });
  it("should return 400 status if blog title and subtitle length is less than 8 characters", function (done) {
    _chai["default"].request(_index["default"]).post("/api/articles/create").set(_article["default"].validToken).send({
      title: "title 1",
      subtitle: "subtitl",
      image: "images/og-default.jpg",
      content: "this is content for testing article api",
      author: "gilbert"
    }).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(400);
      done();
    });
  });
  it("should return 400 status if blog title length is greater than 25 characters and subtitle length is greater than 50 charachers", function (done) {
    var title = new Array(27).join("a");
    var subtitle = new Array(52).join("a");

    _chai["default"].request(_index["default"]).post("/api/articles/create").set(_article["default"].validToken).send({
      title: title,
      subtitle: subtitle,
      image: "images/og-default.jpg",
      content: "this is content for testing article api",
      author: "gilbert"
    }).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(400);
      done();
    });
  });
  it("should save article in the database if it is valid", function (done) {
    _chai["default"].request(_index["default"]).post("/api/articles/create").set(_article["default"].validToken).send(_article["default"].validArticle);

    var blog = _Article["default"].find(_article["default"].validArticle);

    expect(blog).not.to.be["null"];
    done();
  }); // it("should return article if it is valid and return 201 status", (done) => {
  //   chai
  //     .request(server)
  //     .post("/api/articles/create")
  //     .set(ArticleValues.validToken)
  //     .send(ArticleValues.validArticle)
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(201);
  //       expect(res.body).to.have.a.property("data");
  //       expect(res.body).to.have.a.property(
  //         "message",
  //         "Post created successfully"
  //       );
  //       done();
  //     });
  // });
};

var _default = createArticle;
exports["default"] = _default;
//# sourceMappingURL=createArticle.spec.js.map