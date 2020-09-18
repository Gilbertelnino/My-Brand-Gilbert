import express from "express";

import { PostController } from "../controllers/PostControllers";
import { UserController } from "../controllers/UserControllers";
import { QueriesControllers } from "../controllers/QueriesControllers";
import { ProfileControllers } from "../controllers/ProfileControllers";
import upload from "../middlewares/uploadImage";

import verify from "../middlewares/verifyToken";
const router = express.Router();

// Retrieve a list of all articles
router.get("/articles", PostController.retriveArticles);

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);
// create an article
router.post(
  "/articles/create",
  verify,
  upload.single("image"),
  PostController.createPost
);
// Retrieve a single article
router.get("/articles/:id", verify, PostController.retrieveOnePost);
// create comments
router.post("/articles/:id/comments", PostController.comments);
// add likes
router.patch("/likes/:id", PostController.likes);

// Update an existing article
router.patch(
  "/articles/:id",
  upload.single("image"),
  verify,
  PostController.updateArticle
);
// Delete an existing article
router.delete("/articles/:id", verify, PostController.deleteArticle);

// Queries routes
// get all queries
router.get("/queries", verify, QueriesControllers.readQueries);
// Create queries
router.post("/query/create", QueriesControllers.createQuery);
// delete query
router.delete("/queries/:id", verify, QueriesControllers.deleteQuery);

// PROFILE INFORMATION
// create profile
router.post("/profile/create", verify, ProfileControllers.createProfile);
// get profile
router.get("/profile", ProfileControllers.getProfile);

// update profile
router.patch("/profile/:id/edit", verify, ProfileControllers.updateProfile);

// delete profile
router.delete("/profile/:id/delete", verify, ProfileControllers.deleteProfile);
export default router;