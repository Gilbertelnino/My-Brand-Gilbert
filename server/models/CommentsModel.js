import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  commentContent: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
});

const commentsModel = mongoose.model("BlogComments", CommentSchema);
export default commentsModel;
