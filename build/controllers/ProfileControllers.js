"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileControllers = void 0;

var _Profile = _interopRequireDefault(require("../models/Profile"));

var _profileValidation2 = require("../validator/profileValidation");

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProfileControllers = /*#__PURE__*/function () {
  function ProfileControllers() {
    _classCallCheck(this, ProfileControllers);
  }

  _createClass(ProfileControllers, null, [{
    key: "getProfile",
    // get profile
    value: function () {
      var _getProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var profile;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Profile["default"].find();

              case 3:
                profile = _context.sent;

                if (!(profile.length === 0)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", (0, _response.onError)(res, 404, "No profile Yet!"));

              case 8:
                return _context.abrupt("return", (0, _response.onSuccess)(res, 200, "Profile fetched successfully", profile));

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _response.onError)(res, 500, "Internal Server Error"));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      function getProfile(_x, _x2) {
        return _getProfile.apply(this, arguments);
      }

      return getProfile;
    }() // create a profile

  }, {
    key: "createProfile",
    value: function () {
      var _createProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _profileValidation, error, profile, saveProfile;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _profileValidation = (0, _profileValidation2.profileValidation)(req.body), error = _profileValidation.error;

                if (!error) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", (0, _response.onError)(res, 400, error.details[0].message));

              case 3:
                profile = new _Profile["default"]({
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  password: req.body.password,
                  gender: req.body.gender,
                  jobRole: req.body.jobRole,
                  department: req.body.department,
                  address: req.body.address
                });
                _context2.prev = 4;
                _context2.next = 7;
                return profile.save();

              case 7:
                saveProfile = _context2.sent;
                return _context2.abrupt("return", (0, _response.onSuccess)(res, 201, "Profile created successfully", saveProfile));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](4);
                return _context2.abrupt("return", (0, _response.onError)(res, 500, "internal server error"));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 11]]);
      }));

      function createProfile(_x3, _x4) {
        return _createProfile.apply(this, arguments);
      }

      return createProfile;
    }() // update profile

  }, {
    key: "updateProfile",
    value: function () {
      var _updateProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var profile, updatedProfile;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Profile["default"].findOne({
                  _id: req.params.id
                });

              case 3:
                profile = _context3.sent;

                if (profile) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", (0, _response.onError)(res, 404, "profile you are trying to update doesn't exists"));

              case 8:
                profile.firstName = req.body.firstName;
                profile.lastName = req.body.lastName;
                profile.email = req.body.email;
                profile.password = req.body.password;
                profile.gender = req.body.gender;
                profile.jobRole = req.body.jobRole;
                profile.department = req.body.department;
                profile.address = req.body.address;
                _context3.next = 18;
                return profile.save();

              case 18:
                updatedProfile = _context3.sent;
                return _context3.abrupt("return", (0, _response.onSuccess)(res, 200, "profile updated successfully", updatedProfile));

              case 20:
                _context3.next = 25;
                break;

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", (0, _response.onError)(res, 500, "internal server error"));

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 22]]);
      }));

      function updateProfile(_x5, _x6) {
        return _updateProfile.apply(this, arguments);
      }

      return updateProfile;
    }() // delete profile

  }, {
    key: "deleteProfile",
    value: function () {
      var _deleteProfile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var profile, oneProfile;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Profile["default"].findOne({
                  _id: req.params.id
                });

              case 3:
                profile = _context4.sent;

                if (profile) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", (0, _response.onError)(res, 404, "profile you are trying to delete doesn't exist"));

              case 8:
                _context4.next = 10;
                return _Profile["default"].deleteOne({
                  _id: req.params.id
                });

              case 10:
                oneProfile = _context4.sent;
                return _context4.abrupt("return", (0, _response.onSuccess)(res, 200, "profile deleted successfully", oneProfile));

              case 12:
                _context4.next = 17;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", (0, _response.onError)(res, 500, "Internal Server Error"));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 14]]);
      }));

      function deleteProfile(_x7, _x8) {
        return _deleteProfile.apply(this, arguments);
      }

      return deleteProfile;
    }()
  }]);

  return ProfileControllers;
}();

exports.ProfileControllers = ProfileControllers;
//# sourceMappingURL=ProfileControllers.js.map