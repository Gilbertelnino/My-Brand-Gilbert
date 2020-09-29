"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validateObjectId = _interopRequireDefault(require("../middlewares/validateObjectId"));

var _PostControllers = require("../controllers/PostControllers");

var _UserControllers = require("../controllers/UserControllers");

var _QueriesControllers = require("../controllers/QueriesControllers");

var _ProfileControllers = require("../controllers/ProfileControllers");

var _uploadImage = _interopRequireDefault(require("../middlewares/uploadImage"));

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Retrieve a list of all articles


router.get("/articles", _PostControllers.PostController.retriveArticles);
router.post("/signup", _UserControllers.UserController.createUser);
router.post("/login", _UserControllers.UserController.loginUser); // create an article

router.post("/articles/create", _verifyToken["default"], _uploadImage["default"].single("image"), _PostControllers.PostController.createPost); // Retrieve a single article

router.get("/articles/:id", _validateObjectId["default"], _PostControllers.PostController.retrieveOnePost); // create comments

router.post("/articles/comments/:id", _validateObjectId["default"], _PostControllers.PostController.comments); // add likes

router.patch("/articles/likes/:id", _validateObjectId["default"], _PostControllers.PostController.likes); // Update an existing article

router.patch("/articles/:id", _validateObjectId["default"], _uploadImage["default"].single("image"), _verifyToken["default"], _PostControllers.PostController.updateArticle); // Delete an existing article

router["delete"]("/articles/:id", _validateObjectId["default"], _verifyToken["default"], _PostControllers.PostController.deleteArticle); // Queries routes
// get all queries

router.get("/queries", _verifyToken["default"], _QueriesControllers.QueriesControllers.readQueries); // Create queries

router.post("/query/create", _QueriesControllers.QueriesControllers.createQuery); // delete query

router["delete"]("/queries/:id", _validateObjectId["default"], _verifyToken["default"], _QueriesControllers.QueriesControllers.deleteQuery); // PROFILE INFORMATION
// create profile

router.post("/profile/create", _verifyToken["default"], _ProfileControllers.ProfileControllers.createProfile); // get profile

router.get("/profile", _ProfileControllers.ProfileControllers.getProfile); // update profile

router.patch("/profile/edit/:id", _validateObjectId["default"], _verifyToken["default"], _ProfileControllers.ProfileControllers.updateProfile); // delete profile

router["delete"]("/profile/delete/:id", _validateObjectId["default"], _verifyToken["default"], _ProfileControllers.ProfileControllers.deleteProfile);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=router.js.map