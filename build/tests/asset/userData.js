"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userData = {
  // SIGNUP
  allowedSignup: {
    email: "gibertelnino@gmail.com",
    password: "1234567"
  },
  missingSignupField: {
    email: "",
    password: "1234567"
  },
  emailTaken: {
    email: "gilb@gmail.com",
    password: "123456"
  },
  // Login
  missingSigninField: {
    email: "",
    password: "123456"
  },
  invalidUser: {
    email: "elnino@yahoo.fr",
    password: "123456"
  },
  allowedSignin: {
    email: "gilb@gmail.com",
    password: "123456"
  },
  signin: {
    email: "gilb@gmail.com",
    password: "123456"
  },
  // ADMIN PROFILE
  validProfile: {
    firstName: "Ndatimana",
    lastName: "Gilbert",
    email: "gilbeltelnino@gmail.com",
    password: "1234567",
    gender: "male",
    jobRole: "full stack software developer",
    department: "software developer",
    address: "KN 76 St"
  },
  invalidProfileValue: {
    firstName: "Nd",
    lastName: "Gilbert",
    email: "gilbeltelnino@gmail.com",
    password: "1234567",
    gender: "male",
    jobRole: "f",
    department: "software developer",
    address: "KN 76 St"
  },
  invalidProfile: {
    firstName: "",
    lastName: "Gilbert",
    email: "",
    password: "1234567",
    gender: "male",
    jobRole: "full stack software developer",
    department: "",
    address: "KN 76 St"
  }
};
var _default = userData;
exports["default"] = _default;
//# sourceMappingURL=userData.js.map