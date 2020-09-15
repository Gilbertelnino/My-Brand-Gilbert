import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Post from "../models/Posts";
import {
  postValidation,
  loginValidation,
  commentValidation,
} from "../validator/validation";
import { onSuccess, onError } from "../utils/response";
import Admin from "../models/User";

export class PostController {
  //  Retrieve a list of all articles
  static async retriveArticles(req, res) {
    const posts = await Post.find();
    return onSuccess(res, 200, "post fetched successfully", posts);
  }

  // create an article
  static async createPost(req, res) {
    const { error } = postValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    const post = new Post({
      title: req.body.title,
      subtitle: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });

    try {
      const savePost = await post.save();
      return onSuccess(res, 201, "Post created successfull", savePost);
    } catch (err) {
      console.log(err);
      return onError(res, 400, "something went wrong");
    }
  }
  // Retrieve a single article
  static async retrieveOnePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });

      if (!post) {
        return onError(res, 404, "Post you are trying to fetch doesn't exists");
      } else {
        return onSuccess(res, 200, "post fetched successfully", post);
      }
    } catch (error) {
      console.log(error);
      return onError(res, 400, "something went wrong");
    }
  }

  // Create comment!
  static async comments(req, res) {
    const { error } = commentValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    const comments = new Post({
      name: req.body.name,
      email: req.body.email,
      content: req.body.content,
    });

    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (!post) return onError(res, 404, "post not found");
      else {
        const comment = await comments.save();
        return onSuccess(res, 201, "comment created successfull", comment);
      }
    } catch (err) {
      console.log(err);
      return onError(res, 400, "something went wrong");
    }
  }
  //// Update an existing article
  static async updateArticle(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (!post) {
        return onError(
          res,
          404,
          "posts you are trying to update doesn't exists"
        );
      } else {
        post.title = req.body.title;
        post.subtitle = req.body.title;
        post.content = req.body.content;
        post.author = req.body.author;
        const update = await post.save();
        return onSuccess(res, 200, "post updated successfully", update);
      }
    } catch (error) {
      console.log(error);
      return onError(res, 400, "something went wrong");
    }
  }
  // Delete an existing article
  static async deleteArticle(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (!post)
        return onError(res, 404, "post you are trying to delete doesn't exist");
      else {
        const onePost = await Post.deleteOne({ _id: req.params.id });
        return onSuccess(res, 204, "post deleted successfully", onePost);
      }
    } catch (error) {
      console.log(error);
      return onError(res, 400, "something went wrong");
    }
  }
}

export class UserController {
  // create user
  static async createUser(req, res) {
    // validate signup
    const { error } = loginValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    // check user if is already an admin

    const emailExist = await Admin.findOne({ email: req.body.email });
    if (emailExist) return onError(res, 400, "Email already exist");

    // Hash passwords

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const admin = new Admin({
      email: req.body.email,
      password: hashedPassword,
    });

    try {
      const saveAdmin = await admin.save();
      return onSuccess(res, 201, "Admin Signup successfully", saveAdmin);
    } catch (err) {
      return onError(res, 400, err);
    }
  }
  static async loginUser(req, res) {
    const { error } = loginValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    // check if is exists

    const user = await Admin.findOne({ email: req.body.email });
    if (!user) return onError(res, 401, "Email Not Found");

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return onError(res, 401, "Password do not match");

    // create a token

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY);
    res.header("auth-token", token).json({
      token,
      message: "User Logged in successfully",
    });
  }
}
