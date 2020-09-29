"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueriesControllers = void 0;

var _Message = _interopRequireDefault(require("../models/Message"));

var _queryValidator = require("../validator/queryValidator");

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QueriesControllers = /*#__PURE__*/function () {
  function QueriesControllers() {
    _classCallCheck(this, QueriesControllers);
  }

  _createClass(QueriesControllers, null, [{
    key: "createQuery",
    // create a message
    value: function () {
      var _createQuery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _queriesValidation, error, query, saveQuery;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _queriesValidation = (0, _queryValidator.queriesValidation)(req.body), error = _queriesValidation.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", (0, _response.onError)(res, 400, error.details[0].message));

              case 3:
                query = new _Message["default"]({
                  name: req.body.name,
                  email: req.body.email,
                  message: req.body.message
                });
                _context.prev = 4;
                _context.next = 7;
                return query.save();

              case 7:
                saveQuery = _context.sent;
                return _context.abrupt("return", (0, _response.onSuccess)(res, 201, "Message sent successfully", saveQuery));

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", (0, _response.onError)(res, 500, "internal server error"));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }));

      function createQuery(_x, _x2) {
        return _createQuery.apply(this, arguments);
      }

      return createQuery;
    }() // read queries/ questions

  }, {
    key: "readQueries",
    value: function () {
      var _readQueries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var queries;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Message["default"].find();

              case 3:
                queries = _context2.sent;

                if (!(queries.length === 0)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", (0, _response.onError)(res, 404, "No message Yet!"));

              case 8:
                return _context2.abrupt("return", (0, _response.onSuccess)(res, 200, "message fetched successfully", queries));

              case 9:
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", (0, _response.onError)(res, 500, "Internal Server Error"));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function readQueries(_x3, _x4) {
        return _readQueries.apply(this, arguments);
      }

      return readQueries;
    }() // delete queries

  }, {
    key: "deleteQuery",
    value: function () {
      var _deleteQuery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var query, oneMessage;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Message["default"].findOne({
                  _id: req.params.id
                });

              case 3:
                query = _context3.sent;

                if (query) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", (0, _response.onError)(res, 404, "message you are trying to delete doesn't exist"));

              case 8:
                _context3.next = 10;
                return _Message["default"].deleteOne({
                  _id: req.params.id
                });

              case 10:
                oneMessage = _context3.sent;
                return _context3.abrupt("return", (0, _response.onSuccess)(res, 200, "message deleted successfully", oneMessage));

              case 12:
                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", (0, _response.onError)(res, 500, "Internal Server Error"));

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 14]]);
      }));

      function deleteQuery(_x5, _x6) {
        return _deleteQuery.apply(this, arguments);
      }

      return deleteQuery;
    }()
  }]);

  return QueriesControllers;
}();

exports.QueriesControllers = QueriesControllers;
//# sourceMappingURL=QueriesControllers.js.map