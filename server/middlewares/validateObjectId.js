import mongoose from "mongoose";
import { onError } from "../utils/response";

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return onError(res, 404, "Not Found");
  }
  next();
};
export default validateObjectId;
