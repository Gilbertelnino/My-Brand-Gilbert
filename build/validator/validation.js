"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentValidation = exports.loginValidation = exports.postValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// validation schema
var postValidation = function postValidation(data) {
  var schema = _joi["default"].object({
    title: _joi["default"].string().min(8).max(25).required(),
    subtitle: _joi["default"].string().min(8).max(50).required(),
    content: _joi["default"].string().min(5).required(),
    author: _joi["default"].string().min(3).required()
  });

  return schema.validate(data);
};

exports.postValidation = postValidation;

var loginValidation = function loginValidation(data) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().min(3).required().email(),
    password: _joi["default"].string().min(6).required()
  });

  return schema.validate(data);
};

exports.loginValidation = loginValidation;

var commentValidation = function commentValidation(data) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().min(3).required(),
    email: _joi["default"].string().min(3).required().email(),
    commentContent: _joi["default"].string().min(6).required()
  });

  return schema.validate(data);
}; // export default { postValidation, loginValidation };


exports.commentValidation = commentValidation;
//# sourceMappingURL=validation.js.map