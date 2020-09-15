import express from "express";

import { PostController } from "../controllers/PostControllers";
import { UserController } from "../controllers/UserControllers";

import verify from "../middlewares/verifyToken";
const router = express.Router();

// Retrieve a list of all articles
router.get("/articles", PostController.retriveArticles);

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);
// create an article
router.post("/articles/create", verify, PostController.createPost);
// Retrieve a single article
router.get("/articles/:id", verify, PostController.retrieveOnePost);
// create comments
router.post("/articles/:id/comments", PostController.comments);

// Update an existing article
router.patch("/articles/:id", verify, PostController.updateArticle);
// Delete an existing article
router.delete("/articles/:id", verify, PostController.deleteArticle);

export default router;
