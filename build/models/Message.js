"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    min: 3
  },
  email: {
    type: String,
    required: true,
    min: 3
  },
  message: {
    type: String,
    required: true,
    min: 6
  },
  date: {
    type: Date,
    "default": Date.now
  }
});

var Queries = _mongoose["default"].model("Queries", schema);

var _default = Queries;
exports["default"] = _default;
//# sourceMappingURL=Message.js.map