"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var adminSchema = _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1050
  },
  isAdmin: Boolean
});

var adminModel = _mongoose["default"].model("Admin", adminSchema);

var _default = adminModel;
exports["default"] = _default;
//# sourceMappingURL=User.js.map