import { describe } from "mocha";
import getArticles from "./article/getArticle.spec.js";
import getSingleBlog from "./article/getSingleBlog.spec";
import createArticle from "./article/createArticle.spec";
import TokenValidationTest from "./article/authToken.spec";
import deleteArticle from "./article/deleteArticle.spec";
import updateArticle from "./article/updateArticle.spec";
// quiries import
import getMessage from "./queries/getMessage.spec";
import createMessage from "./queries/createMessage.spec";
import deleteMessage from "./queries/deleteMessage.spec";

// BLOG TEST SUIT

describe("My Brand Test Container", () => {
  describe("GET api/article get all article", getArticles);
  describe("GET api/article/:id get single article", getSingleBlog);
  describe("POST api/articles/create", createArticle);
  describe("Auth token middleware", TokenValidationTest);
  describe("DELETE /api/articles/:id", deleteArticle);
  describe("PATCH /api/articles/:id", updateArticle);
});

// QUIRIES TEST SUIT

describe("Queries test container", () => {
  describe("GET /api/queries", getMessage);
  describe("POST /api/query/create", createMessage);
  describe("DELETE /api/queries/:id", deleteMessage);
});
