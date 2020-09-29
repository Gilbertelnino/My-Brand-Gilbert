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

var updateArticle = function updateArticle() {
  (0, _mocha.after)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
  it("should not able to update article if there is no token provided", function (done) {
    var article = new _Article["default"](_article["default"].validArticle);
    article.save();

    _chai["default"].request(_index["default"]).patch("/api/articles/" + article._id).set(_article["default"].noTokenProvided).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(401);
      expect(res.body).to.have.property("message", "access denied");
      done();
    });
  });
  it("should not be able to update article if id is invalid or id not found", function (done) {
    _chai["default"].request(_index["default"]).patch("/api/articles/1").set(_article["default"].validToken).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error", "Not Found");
      done();
    });
  }); //   it("should be able to update article if it is found", (done) => {
  //     const article = new Article(ArticleValues.validArticle);
  //     article.save();
  //     chai
  //       .request(server)
  //       .patch(`/api/articles/${article._id} `)
  //       .set(ArticleValues.validToken)
  //       .send(ArticleValues.updatedArticle)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.have.property(
  //           "message",
  //           "post updated successfully"
  //         );
  //         done();
  //       });
  //   });
};

var _default = updateArticle;
exports["default"] = _default;
//# sourceMappingURL=updateArticle.spec.js.map