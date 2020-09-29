"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommentSchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  commentContent: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  article: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Blogs"
  }
});

var commentsModel = _mongoose["default"].model("BlogComments", CommentSchema);

var _default = commentsModel;
exports["default"] = _default;
//# sourceMappingURL=CommentsModel.js.map