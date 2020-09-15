import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Queries = mongoose.model("Queries", schema);
export default Queries;
