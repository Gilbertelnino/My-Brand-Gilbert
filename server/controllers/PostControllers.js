import Post from "../models/Posts";
import { postValidation, commentValidation } from "../validator/validation";
import { onSuccess, onError } from "../utils/response";

export class PostController {
  //  Retrieve a list of all articles
  static async retriveArticles(req, res) {
    try {
      const posts = await Post.find();
      if (!posts) {
        return onError(res, 404, "No articles Yet!");
      } else {
        return onSuccess(res, 200, "post fetched successfully", posts);
      }
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
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
      return onError(res, 500, "internal server error");
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
      return onError(res, 500, "internal server error");
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
      return onError(res, 500, "internal server error");
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
        post.subtitle = req.body.subtile;
        post.content = req.body.content;
        post.author = req.body.author;
        const update = await post.save();
        return onSuccess(res, 200, "post updated successfully", update);
      }
    } catch (error) {
      return onError(res, 500, "internal server error");
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
      return onError(res, 500, "Internal Server Error");
    }
  }
}
