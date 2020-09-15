import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("Post", schema);
export default postModel;
