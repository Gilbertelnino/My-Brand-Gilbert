"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _userData = _interopRequireDefault(require("../asset/userData"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var signin = function signin() {
  it("User Should not be able to logged in if there is no email or password provided", function (done) {
    _chai["default"].request(_index["default"]).post("/api/login").send(_userData["default"].missingSigninField).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(400);
      done();
    });
  });
  it("User should not be able to login if it is not registered", function (done) {
    _chai["default"].request(_index["default"]).post("/api/login").send(_userData["default"].invalidUser).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(401);
      expect(res.body).to.have.property("error", "Invalid Email or Password");
      done();
    });
  }); // it("User should be able to Logged in if email and password exist", (done) => {
  //   const user = new User(userValue.allowedSignin);
  //   user.save();
  //   chai
  //     .request(server)
  //     .post("/api/login")
  //     .send(user)
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.have.property(
  //         "message",
  //         "User Logged in successfully"
  //       );
  //       expect(res.header).to.have.property("auth-token");
  //       done();
  //     });
  // });
};

var _default = signin;
exports["default"] = _default;
//# sourceMappingURL=signin.spec.js.map