"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateObjectId = function validateObjectId(req, res, next) {
  if (!_mongoose["default"].Types.ObjectId.isValid(req.params.id)) {
    return (0, _response.onError)(res, 404, "Not Found");
  }

  next();
};

var _default = validateObjectId;
exports["default"] = _default;
//# sourceMappingURL=validateObjectId.js.map