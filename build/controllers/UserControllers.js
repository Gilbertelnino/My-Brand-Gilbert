"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _validation = require("../validator/validation");

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "createUser",
    // create user
    value: function () {
      var _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _loginValidation, error, emailExist, salt, hashedPassword, admin, saveAdmin;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // validate signup
                _loginValidation = (0, _validation.loginValidation)(req.body), error = _loginValidation.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", (0, _response.onError)(res, 400, error.details[0].message));

              case 3:
                _context.next = 5;
                return _User["default"].findOne({
                  email: req.body.email
                });

              case 5:
                emailExist = _context.sent;

                if (!emailExist) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", (0, _response.onError)(res, 400, "Email already exist"));

              case 8:
                _context.next = 10;
                return _bcryptjs["default"].genSalt(10);

              case 10:
                salt = _context.sent;
                _context.next = 13;
                return _bcryptjs["default"].hash(req.body.password, salt);

              case 13:
                hashedPassword = _context.sent;
                admin = new _User["default"]({
                  email: req.body.email,
                  password: hashedPassword
                });
                _context.prev = 15;
                _context.next = 18;
                return admin.save();

              case 18:
                saveAdmin = _context.sent;
                return _context.abrupt("return", (0, _response.onSuccess)(res, 201, "Admin Signup successfully", saveAdmin));

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](15);
                return _context.abrupt("return", (0, _response.onError)(res, 500, "Internal Server error"));

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[15, 22]]);
      }));

      function createUser(_x, _x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _loginValidation2, error, user, validPassword, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _loginValidation2 = (0, _validation.loginValidation)(req.body), error = _loginValidation2.error;

                if (!error) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", (0, _response.onError)(res, 400, error.details[0].message));

              case 3:
                _context2.next = 5;
                return _User["default"].findOne({
                  email: req.body.email
                });

              case 5:
                user = _context2.sent;

                if (user) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", (0, _response.onError)(res, 401, "Invalid Email or Password"));

              case 8:
                _context2.next = 10;
                return _bcryptjs["default"].compare(req.body.password, user.password);

              case 10:
                validPassword = _context2.sent;

                if (validPassword) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", (0, _response.onError)(res, 401, "Invalid Email or Password"));

              case 13:
                // create a token
                token = _jsonwebtoken["default"].sign({
                  user: user
                }, process.env.TOKEN_SECRET_KEY);
                res.header("auth-token", token).json({
                  token: token,
                  message: "User Logged in successfully"
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function loginUser(_x3, _x4) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }]);

  return UserController;
}();

exports.UserController = UserController;
//# sourceMappingURL=UserControllers.js.map