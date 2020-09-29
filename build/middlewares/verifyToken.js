"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyToken = function verifyToken(req, res, next) {
  var token = req.header("auth-token");
  if (!token) return res.status(401).json({
    message: "access denied"
  });

  try {
    var verified = _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET_KEY);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      error: "invalid token"
    });
  }
};

var _default = verifyToken;
exports["default"] = _default;
//# sourceMappingURL=verifyToken.js.map