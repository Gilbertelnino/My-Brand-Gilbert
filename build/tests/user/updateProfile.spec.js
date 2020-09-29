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

var _userData = _interopRequireDefault(require("../asset/userData"));

var _article = _interopRequireDefault(require("../asset/article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var updateProfile = function updateProfile() {
  (0, _mocha.beforeEach)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Profile["default"].deleteMany({});

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
            return _Profile["default"].deleteMany({});

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("should not able to update profile if there is no token provided", function (done) {
    var profile = new _Profile["default"](_userData["default"].validProfile);
    profile.save();

    _chai["default"].request(_index["default"]).patch("/api/profile/edit/".concat(profile._id)).set(_article["default"].noTokenProvided).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(401);
      expect(res.body).to.have.property("message", "access denied");
      done();
    });
  });
  it("should not be able to update profile if id is invalid", function (done) {
    _chai["default"].request(_index["default"]).patch("/api/profile/edit/1").set(_article["default"].validToken).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(404);
      done();
    });
  }); // it("should be able to update profile if it is found", (done) => {
  //   const profile = new Profile(ProfileValues.validProfile);
  //   profile.save();
  //   chai
  //     .request(server)
  //     .patch(`/api/profile/edit/${profile._id}`)
  //     .set(VerifiedToken.validToken)
  //     .send({ firstName: "Robert" })
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.have.property(
  //         "message",
  //         "profile updated successfully"
  //       );
  //       done();
  //     });
  // });
};

var _default = updateProfile;
exports["default"] = _default;
//# sourceMappingURL=updateProfile.spec.js.map