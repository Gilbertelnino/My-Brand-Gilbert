import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments_total: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectID, ref: "BlogComments" }],
});

const postModel = mongoose.model("Blogs", articleSchema);
export default postModel;
