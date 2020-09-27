import chai from "chai";
import { beforeEach, afterEach } from "mocha";
import chaiHttp from "chai-http";
import server from "../../index";
import Article from "../../models/Article";
import ArticleValues from "../asset/article";

const { expect } = chai;
chai.use(chaiHttp);

const addLike = () => {
  // beforeEach(async () => {
  //   await Article.deleteMany({});
  // });
  afterEach(async () => {
    await Article.deleteMany({});
  });

  it("should not be able to add like if id is invalid", (done) => {
    chai
      .request(server)
      .patch("/api/likes/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "Not Found");
        done();
      });
  });
  it("should be able to like article if it is found", (done) => {
    const article = new Article(ArticleValues.validArticle);
    article.save();
    chai
      .request(server)
      .patch(`/api/likes/${article._id} `)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "Like added successfully!"
        );
        done();
      });
  });
};

export default addLike;
