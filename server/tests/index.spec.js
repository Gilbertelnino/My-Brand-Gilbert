import { describe, afterEach } from "mocha";
import getArticles from "./article/getArticle.spec.js";
import getSingleBlog from "./article/getSingleBlog.spec";
import createArticle from "./article/createArticle.spec";
import TokenValidationTest from "./article/authToken.spec";
import deleteArticle from "./article/deleteArticle.spec";
import updateArticle from "./article/updateArticle.spec";
import addLike from "./article/like.spec.js";
import addComment from "./article/comment.spec.js";

// modekls
import Message from "../models/Message";
import Profile from "../models/Profile";

// quiries import
import getMessage from "./queries/getMessage.spec";
import createMessage from "./queries/createMessage.spec";
import deleteMessage from "./queries/deleteMessage.spec";

// import SIGNUP
import signup from "./user/signup.spec";
// import login
import signin from "./user/signin.spec";

// import profile
import getProfile from "./user/getProfile.spec.js";
import createProfile from "./user/createProfile.spec.js";
import updateProfile from "./user/updateProfile.spec.js";
import deleteProfile from "./user/deleteProfile.spec.js";

// BLOG TEST SUIT

describe("My Brand Test Container", () => {
  describe("GET api/article get all article", getArticles);
  describe("GET api/article/:id get single article", getSingleBlog);
  describe("POST api/articles/create", createArticle);
  describe("Auth token middleware", TokenValidationTest);
  describe("DELETE /api/articles/:id", deleteArticle);
  describe("PATCH /api/articles/:id", updateArticle);
  describe("PATCH /api/likes/:id", addLike);
  describe("POST /api/articles/comments/:id", addComment);
});

// QUIRIES TEST SUIT

describe("Queries test container", () => {
  afterEach(async () => {
    await Message.deleteMany({});
  });
  describe("GET /api/queries", getMessage);
  describe("POST /api/query/create", createMessage);
  describe("DELETE /api/queries/:id", deleteMessage);
});

// SIGNUP
describe("signup user test", () => {
  describe("POST /api/signup", signup);
});
// LOGIN USER

describe("login user test", () => {
  describe("POST /api/login", signin);
});

// PROFILE

describe("Profile test suit", () => {
  afterEach(async () => {
    await Profile.deleteMany({});
  });
  describe("GET /api/profile", getProfile);
  describe("POST /api/profile/create", createProfile);
  describe("PATCH /api/profile/edit/:id", updateProfile);
  describe("DELETE /api/profile/delete/:id", deleteProfile);
});
