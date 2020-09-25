import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1050,
  },
  isAdmin: Boolean,
});

const adminModel = mongoose.model("Admin", adminSchema);
export default adminModel;
