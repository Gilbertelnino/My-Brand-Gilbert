"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var prodMiddleware = function prodMiddleware(app) {
  app.use((0, _helmet["default"])());
  app.use((0, _compression["default"])());
};

var _default = prodMiddleware;
exports["default"] = _default;
//# sourceMappingURL=prod.js.map