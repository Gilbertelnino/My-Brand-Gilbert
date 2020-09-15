const mongoose = require("mongoose");

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

module.exports = mongoose.model("Post", schema);
