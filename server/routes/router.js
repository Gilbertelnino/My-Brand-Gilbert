import express from "express";

import { PostController, UserController } from "../controllers/Controllers";

import verify from "../middlewares/verifyToken";
const router = express.Router();

// Retrieve a list of all articles
router.get("/posts", PostController.retriveArticles);

router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);
// create an article
router.post("/posts/create", verify, PostController.createPost);
// Retrieve a single article
router.get("/posts/:id", verify, PostController.retrieveOnePost);
// create comments
router.post("/posts/:id/comments", PostController.comments);

// Update an existing article
router.patch("/posts/:id", verify, PostController.updateArticle);
// Delete an existing article
router.delete("/posts/:id", verify, PostController.deleteArticle);

export default router;
