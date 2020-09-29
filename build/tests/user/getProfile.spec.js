"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _mocha = require("mocha");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _Profile = _interopRequireDefault(require("../../models/Profile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var getProfile = function getProfile() {
  it("should return 404 status if there is no profile", function (done) {
    _chai["default"].request(_index["default"]).get("/api/profile").end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error", "No profile Yet!");
      done();
    });
  });
  it("should return profile if it is available", function (done) {
    _Profile["default"].collection.insertOne({
      firstName: "Ndatimana",
      lastName: "Gilbert",
      email: "gilbeltelnino@gmail.com",
      password: "1234567",
      gender: "male",
      jobRole: "full stack software developer",
      department: "software developer",
      address: "KN 76 St"
    });

    _chai["default"].request(_index["default"]).get("/api/profile").end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("message", "Profile fetched successfully");
      done();
    });
  });
};

var _default = getProfile;
exports["default"] = _default;
//# sourceMappingURL=getProfile.spec.js.map