import chai from "chai";
import { after } from "mocha";
import chaiHttp from "chai-http";
import server from "../../index";
import Article from "../../models/Article";
import ArticleValues from "../asset/article";

const { expect } = chai;
chai.use(chaiHttp);

const deleteArticle = () => {
  afterEach(async () => {
    await Article.deleteMany({});
    server.close();
  });
  it("should not able to delete article if there is no token provided", (done) => {
    const article = new Article(ArticleValues.validArticle);
    article.save();
    chai
      .request(server)
      .delete("/api/articles/" + article._id)
      .set(ArticleValues.noTokenProvided)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "access denied");
        done();
      });
  });
  it("should not be able to delete article if id is invalid or id not found", (done) => {
    chai
      .request(server)
      .delete("/api/articles/1")
      .set(ArticleValues.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "Not Found");
        done();
      });
  });
  it("should be able to delete article if it is found", (done) => {
    const article = new Article(ArticleValues.validArticle);
    article.save();
    chai
      .request(server)
      .delete("/api/articles/" + article._id)
      .set(ArticleValues.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "post deleted successfully"
        );
        done();
      });
  });
};

export default deleteArticle;
