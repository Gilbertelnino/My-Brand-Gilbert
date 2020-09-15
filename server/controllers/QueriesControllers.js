import Queries from "../models/Message";
import { queriesValidation } from "../validator/queryValidator";
import { onSuccess, onError } from "../utils/response";

export class QueriesControllers {
  // create a message
  static async createQuery(req, res) {
    const { error } = queriesValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    const query = new Queries({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    try {
      const saveQuery = await query.save();
      return onSuccess(res, 201, "Message sent successfully", saveQuery);
    } catch (err) {
      return onError(res, 500, "internal server error");
    }
  }

  // read queries/ questions
  static async readQueries(req, res) {
    try {
      const queries = await Queries.find();

      if (!queries) {
        return onError(res, 404, "No message Yet!");
      } else {
        return onSuccess(res, 200, "message fetched successfully", queries);
      }
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }

  // delete queries
  static async deleteQuery(req, res) {
    try {
      const query = await Queries.findOne({ _id: req.params.id });
      if (!query)
        return onError(
          res,
          404,
          "message you are trying to delete doesn't exist"
        );
      else {
        const oneMessage = await Queries.deleteOne({ _id: req.params.id });
        return onSuccess(res, 204, "post deleted successfully", oneMessage);
      }
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }
}
