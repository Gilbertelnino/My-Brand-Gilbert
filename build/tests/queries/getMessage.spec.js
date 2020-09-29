"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _Message = _interopRequireDefault(require("../../models/Message"));

var _article = _interopRequireDefault(require("../asset/article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var getMessage = function getMessage() {
  it("should return 404 status if there is no message", function (done) {
    _chai["default"].request(_index["default"]).get("/api/queries").set(_article["default"].validToken).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error", "No message Yet!");
      done();
    });
  });
  it("should return 401 status if there is no Token provided", function (done) {
    _chai["default"].request(_index["default"]).get("/api/queries").end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(401);
      done();
    });
  });
  it("should return message if there is verified token", function (done) {
    _Message["default"].collection.insertMany([{
      name: "gibert",
      email: "gil@gmail.com",
      message: "this is a message for testing"
    }, {
      name: "elnino",
      email: "elni@gmail.com",
      message: "this is a second message for testing"
    }]);

    _chai["default"].request(_index["default"]).get("/api/queries").set(_article["default"].validToken).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(200);
      done();
    });
  });
};

var _default = getMessage;
exports["default"] = _default;
//# sourceMappingURL=getMessage.spec.js.map