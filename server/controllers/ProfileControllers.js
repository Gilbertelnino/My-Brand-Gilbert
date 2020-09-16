import Profile from "../models/Profile";
import { profileValidation } from "../validator/profileValidation";
import { onSuccess, onError } from "../utils/response";

export class ProfileControllers {
  // get profile
  static async getProfile(req, res) {
    try {
      const profile = await Profile.find();

      if (!profile) {
        return onError(res, 404, "No profile Yet!");
      } else {
        return onSuccess(res, 200, "Profile fetched successfully", profile);
      }
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }

  // create a profile
  static async createProfile(req, res) {
    const { error } = profileValidation(req.body);
    if (error) return onError(res, 400, error.details[0].message);
    const profile = new Profile({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      jobRole: req.body.jobRole,
      department: req.body.department,
      address: req.body.address,
    });

    try {
      const saveProfile = await profile.save();
      return onSuccess(res, 201, "Profile created successfully", saveProfile);
    } catch (err) {
      return onError(res, 500, "internal server error");
    }
  }

  // update profile
  static async updateProfile(req, res) {
    try {
      const profile = await Profile.findOne({ _id: req.params.id });
      if (!profile) {
        return onError(
          res,
          404,
          "profile you are trying to update doesn't exists"
        );
      } else {
        profile.firstName = req.body.firstName;
        profile.lastName = req.body.lastName;
        profile.email = req.body.email;
        profile.password = req.body.password;
        profile.gender = req.body.gender;
        profile.jobRole = req.body.jobRole;
        profile.department = req.body.department;
        profile.address = req.body.address;
        const updatedProfile = await profile.save();
        return onSuccess(
          res,
          200,
          "profile updated successfully",
          updatedProfile
        );
      }
    } catch (error) {
      return onError(res, 500, "internal server error");
    }
  }
  // delete profile
  static async deleteProfile(req, res) {
    try {
      const profile = await Profile.findOne({ _id: req.params.id });
      if (!profile)
        return onError(
          res,
          404,
          "profile you are trying to delete doesn't exist"
        );
      else {
        const oneProfile = await Profile.deleteOne({ _id: req.params.id });
        return onSuccess(res, 204, "profile deleted successfully", oneProfile);
      }
    } catch (error) {
      return onError(res, 500, "Internal Server Error");
    }
  }
}
