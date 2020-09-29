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

var TokenValidationTest = function TokenValidationTest() {
  it("should return 401 if no token is provided", function (done) {
    (0, _mocha.afterEach)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Article["default"].deleteMany({});

            case 2:
              _index["default"].close();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _chai["default"].request(_index["default"]).post("/api/articles/create").set(_article["default"].noTokenProvided).send(_article["default"].validArticle).end(function (err, res) {
      expect(err).to.be["null"], expect(res).to.have.status(401);
      done();
    });
  });
  it("should return 400 if token it invalid", function (done) {
    _chai["default"].request(_index["default"]).post("/api/articles/create").set(_article["default"].invalidToken).send(_article["default"].validArticle).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(400);
      done();
    });
  }); // it("should return 200 if token it valid", (done) => {
  //   chai
  //     .request(server)
  //     .post("/api/articles/create")
  //     .set(ArticleValues.validToken)
  //     .send(ArticleValues.validArticle)
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res.header).to.have.property("auth-token");
  //       done();
  //     });
  // });
};

var _default = TokenValidationTest;
exports["default"] = _default;
//# sourceMappingURL=authToken.spec.js.map