"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queriesValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var queriesValidation = function queriesValidation(data) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().min(3).required(),
    email: _joi["default"].string().min(3).required().email(),
    message: _joi["default"].string().min(6).required()
  });

  return schema.validate(data);
};

exports.queriesValidation = queriesValidation;
//# sourceMappingURL=queryValidator.js.map