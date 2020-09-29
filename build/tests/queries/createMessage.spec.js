"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _mocha = require("mocha");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../../index"));

var _queries = _interopRequireDefault(require("../asset/queries"));

var _Message = _interopRequireDefault(require("../../models/Message"));

var _article = _interopRequireDefault(require("../asset/article"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var createMessage = function createMessage() {
  (0, _mocha.afterEach)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Message["default"].deleteMany({});

          case 2:
            _index["default"].close();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("should return 400 status if contact form required field is not provided correctly", function (done) {
    _chai["default"].request(_index["default"]).post("/api/query/create").send(_queries["default"].invalidMessage).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(400);
      done();
    });
  });
  it("should return 201 status if message sent successfully", function (done) {
    _chai["default"].request(_index["default"]).post("/api/query/create").send(_queries["default"].validMessage).end(function (err, res) {
      expect(err).to.be["null"];
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("message", "Message sent successfully");
      done();
    });
  });
};

var _default = createMessage;
exports["default"] = _default;
//# sourceMappingURL=createMessage.spec.js.map