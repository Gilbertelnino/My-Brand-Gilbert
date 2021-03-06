import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/User";
import { loginValidation } from "../validator/validation";
import { onError, onSuccess } from "../utils/response";

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
      return onError(res, 500, "Internal Server error");
    }
  }
  static async loginUser(req, res) {
    const { error } = loginValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    // check if is exists

    const user = await Admin.findOne({ email: req.body.email });
    if (!user) return onError(res, 401, "Invalid Email or Password");

    // check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return onError(res, 401, "Invalid Email or Password");

    // create a token

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET_KEY);
    res.header("auth-token", token).json({
      token,
      message: "User Logged in successfully",
    });
  }
}
