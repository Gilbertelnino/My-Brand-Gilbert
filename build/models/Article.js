"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var articleSchema = _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  likes: {
    type: Number,
    "default": 0
  },
  comments_total: {
    type: Number,
    "default": 0
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectID,
    ref: "BlogComments"
  }]
});

var postModel = _mongoose["default"].model("Blogs", articleSchema);

var _default = postModel;
exports["default"] = _default;
//# sourceMappingURL=Article.js.map