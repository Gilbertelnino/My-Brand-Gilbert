"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var profileValidation = function profileValidation(data) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(3).required(),
    lastName: _joi["default"].string().min(3).required(),
    email: _joi["default"].string().min(3).required().email(),
    password: _joi["default"].string().min(6).required(),
    gender: _joi["default"].string().min(4).required(),
    jobRole: _joi["default"].string().min(3).required(),
    department: _joi["default"].string().min(3).required(),
    address: _joi["default"].string().min(3).required()
  });

  return schema.validate(data);
};

exports.profileValidation = profileValidation;
//# sourceMappingURL=profileValidation.js.map