import chai from "chai";
import { beforeEach, afterEach } from "mocha";

import chaiHttp from "chai-http";
import server from "../../index";
import ArticleValues from "../asset/article";
import Article from "../../models/Article";

const { expect } = chai;
chai.use(chaiHttp);

const createArticle = () => {
  beforeEach(async () => {
    await Article.deleteMany({});
  });
  afterEach(async () => {
    await Article.deleteMany({});
  });
  it("should return 401 status if client is not logged in", (done) => {
    chai
      .request(server)
      .post("/api/articles/create")
      .send({
        title: "first title",
        subtitle: "first subtitle ever",
        image: "images/og-default.jpg",
        content: "this is content for testing article api",
        author: "gilbert",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "access denied");
        done();
      });
  });
  it("should return 400 status if blog required field is not provided correctly", (done) => {
    chai
      .request(server)
      .post("/api/articles/create")
      .set(ArticleValues.validToken)
      .send({
        title: "",
        subtitle: "first subtitle ever",
        image: "images/og-default.jpg",
        content: "this is content for testing article api",
        author: "gilbert",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return 400 status if blog title and subtitle length is less than 8 characters", (done) => {
    chai
      .request(server)
      .post("/api/articles/create")
      .set(ArticleValues.validToken)
      .send({
        title: "title 1",
        subtitle: "subtitl",
        image: "images/og-default.jpg",
        content: "this is content for testing article api",
        author: "gilbert",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return 400 status if blog title length is greater than 25 characters and subtitle length is greater than 50 charachers", (done) => {
    const title = new Array(27).join("a");
    const subtitle = new Array(52).join("a");
    chai
      .request(server)
      .post("/api/articles/create")
      .set(ArticleValues.validToken)
      .send({
        title,
        subtitle,
        image: "images/og-default.jpg",
        content: "this is content for testing article api",
        author: "gilbert",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should save article in the database if it is valid", (done) => {
    chai
      .request(server)
      .post("/api/articles/create")
      .set(ArticleValues.validToken)
      .send(ArticleValues.validArticle);

    const blog = Article.find(ArticleValues.validArticle);
    expect(blog).not.to.be.null;

    done();
  });
  // it("should return article if it is valid and return 201 status", (done) => {
  //   chai
  //     .request(server)
  //     .post("/api/articles/create")
  //     .set(ArticleValues.validToken)
  //     .send(ArticleValues.validArticle)
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(201);
  //       expect(res.body).to.have.a.property("data");
  //       expect(res.body).to.have.a.property(
  //         "message",
  //         "Post created successfully"
  //       );
  //       done();
  //     });
  // });
};

export default createArticle;
