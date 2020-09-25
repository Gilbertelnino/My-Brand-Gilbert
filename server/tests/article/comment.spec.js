import chai from "chai";
import { beforeEach, afterEach } from "mocha";
import chaiHttp from "chai-http";
import server from "../../index";
import Article from "../../models/Article";
import ArticleValues from "../asset/article";

const { expect } = chai;
chai.use(chaiHttp);

const addComment = () => {
  beforeEach(async () => {
    await Article.deleteMany({});
  });
  afterEach(async () => {
    await Article.deleteMany({});
  });

  it("should return 400 if comment form input is invalid", (done) => {
    const article = new Article(ArticleValues.validArticle);
    article.save();
    chai
      .request(server)
      .post("/api/articles/comments/" + article._id)
      .send(ArticleValues.invalidComment)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should not be able to add comment to the article if article id is invalid", (done) => {
    chai
      .request(server)
      .post("/api/articles/comments/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "Not Found");
        done();
      });
  });
  it("should be able to add comment if it is valid", (done) => {
    const article = new Article(ArticleValues.validArticle);
    article.save();
    chai
      .request(server)
      .post(`/api/articles/comments/${article._id} `)
      .send(ArticleValues.validComment)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "comment created successfully"
        );
        done();
      });
  });
};

export default addComment;
