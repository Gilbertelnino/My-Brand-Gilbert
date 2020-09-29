"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _router = _interopRequireDefault(require("./routes/router"));

var _db = require("./models/db");

var _swagger = _interopRequireDefault(require("../swagger.json"));

var _prod = _interopRequireDefault(require("./middlewares/prod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); // call connection db function

(0, _db.connectDB)();
app.use(_express["default"].json());
app.use("/images", _express["default"]["static"]("images")); // production middleware

(0, _prod["default"])(app);
app.use("/api", _router["default"]); // swagger

app.use("/", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, console.log("server running  on port ".concat(PORT)));
var _default = server;
exports["default"] = _default;
//# sourceMappingURL=index.js.map