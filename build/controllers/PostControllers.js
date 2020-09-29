"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostController = void 0;

var _Article = _interopRequireDefault(require("../models/Article"));

var _CommentsModel = _interopRequireDefault(require("../models/CommentsModel"));

var _validation = require("../validator/validation");

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PostController = /*#__PURE__*/function () {
  function PostController() {
    _classCallCheck(this, PostController);
  }

  _createClass(PostController, null, [{
    key: "retriveArticles",
    //  Retrieve a list of all articles
    value: function () {
      var _retriveArticles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var posts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Article["default"].find().populate("comments", "name commentContent -_id");

              case 3:
                posts = _context.sent;

                if (!(posts.length === 0)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", (0, _response.onError)(res, 404, "No articles Yet!"));

              case 8:
                return _context.abrupt("return", (0, _response.onSuccess)(res, 200, "post fetched successfully", posts));

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", (0, _response.onError)(res, 500, "Internal Server Error"));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      function retriveArticles(_x, _x2) {
        return _retriveArticles.apply(this, arguments);
      }

      return retriveArticles;
    }() // create an article

  }, {
    key: "createPost",
    value: function () {
      var _createPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _postValidation, error, post, savePost;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _postValidation = (0, _validation.postValidation)(req.body), error = _postValidation.error;

                if (!error) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", (0, _response.onError)(res, 400, error.details[0].message));

              case 3:
                if (req.file) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", (0, _response.onError)(res, 400, "Image is required"));

              case 5:
                post = new _Article["default"]({
                  title: req.body.title,
                  subtitle: req.body.subtitle,
                  image: req.file.path,
                  content: req.body.content,
                  author: req.body.author
                });
                _context2.prev = 6;
                _context2.next = 9;
                return post.save();

              case 9:
                savePost = _context2.sent;
                return _context2.abrupt("return", (0, _response.onSuccess)(res, 201, "Post created successfully", savePost));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](6);
                return _context2.abrupt("return", (0, _response.onError)(res, 500, "internal server error"));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 13]]);
      }));

      function createPost(_x3, _x4) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }() // Retrieve a single article

  }, {
    key: "retrieveOnePost",
    value: function () {
      var _retrieveOnePost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var post;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Article["default"].findOne({
                  _id: req.params.id
                }).populate("comments", "name commentContent -_id");

              case 3:
                post = _context3.sent;

                if (post) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", (0, _response.onError)(res, 404, "Post you are trying to fetch doesn't exists"));

              case 8:
                return _context3.abrupt("return", (0, _response.onSuccess)(res, 200, "post fetched successfully", post));

              case 9:
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", (0, _response.onError)(res, 500, "internal server error"));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function retrieveOnePost(_x5, _x6) {
        return _retrieveOnePost.apply(this, arguments);
      }

      return retrieveOnePost;
    }() // Create comment!

  }, {
    key: "comments",
    value: function () {
      var _comments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var _commentValidation, error, comments, blog, comment;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _commentValidation = (0, _validation.commentValidation)(req.body), error = _commentValidation.error;

                if (!error) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", (0, _response.onError)(res, 400, error.details[0].message));

              case 3:
                comments = new _CommentsModel["default"]({
                  name: req.body.name,
                  email: req.body.email,
                  commentContent: req.body.commentContent
                });
                _context4.prev = 4;
                _context4.next = 7;
                return _Article["default"].findOne({
                  _id: req.params.id
                });

              case 7:
                blog = _context4.sent;

                if (blog) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", (0, _response.onError)(res, 404, "post not found"));

              case 12:
                _context4.next = 14;
                return comments.save();

              case 14:
                comment = _context4.sent;
                blog.comments.push(comment);
                blog.comments_total++;
                _context4.next = 19;
                return blog.save();

              case 19:
                return _context4.abrupt("return", (0, _response.onSuccess)(res, 201, "comment created successfully", comment));

              case 20:
                _context4.next = 25;
                break;

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](4);
                return _context4.abrupt("return", (0, _response.onError)(res, 500, "internal server error"));

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 22]]);
      }));

      function comments(_x7, _x8) {
        return _comments.apply(this, arguments);
      }

      return comments;
    }() // Add likes

  }, {
    key: "likes",
    value: function () {
      var _likes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var blog, updateLikes;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _Article["default"].findOne({
                  _id: req.params.id
                });

              case 3:
                blog = _context5.sent;

                if (blog) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", (0, _response.onError)(res, 404, "Not article found"));

              case 8:
                _context5.next = 10;
                return _Article["default"].updateOne({
                  _id: req.params.id
                }, {
                  $inc: {
                    likes: 1
                  }
                });

              case 10:
                updateLikes = _context5.sent;
                return _context5.abrupt("return", (0, _response.onSuccess)(res, 201, "Like added successfully!", updateLikes));

              case 12:
                _context5.next = 17;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", (0, _response.onError)(res, 500, "Internal Server Error"));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 14]]);
      }));

      function likes(_x9, _x10) {
        return _likes.apply(this, arguments);
      }

      return likes;
    }() //// Update an existing article

  }, {
    key: "updateArticle",
    value: function () {
      var _updateArticle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var post, update;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _Article["default"].findOne({
                  _id: req.params.id
                });

              case 3:
                post = _context6.sent;

                if (post) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", (0, _response.onError)(res, 404, "posts you are trying to update doesn't exists"));

              case 8:
                post.title = req.body.title;
                post.subtitle = req.body.subtitle;
                post.image = req.file.path;
                post.content = req.body.content;
                post.author = req.body.author;
                _context6.next = 15;
                return post.save();

              case 15:
                update = _context6.sent;
                return _context6.abrupt("return", (0, _response.onSuccess)(res, 200, "post updated successfully", update));

              case 17:
                _context6.next = 22;
                break;

              case 19:
                _context6.prev = 19;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", (0, _response.onError)(res, 500, "internal server error"));

              case 22:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 19]]);
      }));

      function updateArticle(_x11, _x12) {
        return _updateArticle.apply(this, arguments);
      }

      return updateArticle;
    }() // Delete an existing article

  }, {
    key: "deleteArticle",
    value: function () {
      var _deleteArticle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var post, onePost;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _Article["default"].findOne({
                  _id: req.params.id
                });

              case 3:
                post = _context7.sent;

                if (post) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", (0, _response.onError)(res, 404, "post you are trying to delete doesn't exist"));

              case 8:
                _context7.next = 10;
                return _Article["default"].deleteOne({
                  _id: req.params.id
                });

              case 10:
                onePost = _context7.sent;
                return _context7.abrupt("return", (0, _response.onSuccess)(res, 200, "post deleted successfully", onePost));

              case 12:
                _context7.next = 17;
                break;

              case 14:
                _context7.prev = 14;
                _context7.t0 = _context7["catch"](0);
                return _context7.abrupt("return", (0, _response.onError)(res, 500, "Internal Server Error"));

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 14]]);
      }));

      function deleteArticle(_x13, _x14) {
        return _deleteArticle.apply(this, arguments);
      }

      return deleteArticle;
    }()
  }]);

  return PostController;
}();

exports.PostController = PostController;
//# sourceMappingURL=PostControllers.js.map