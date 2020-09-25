import chai from "chai";
import chaiHttp from "chai-http";
import { afterEach } from "mocha";
import server from "../../index";
import Article from "../../models/Article";
import ArticleValues from "../asset/article";

const { expect } = chai;
chai.use(chaiHttp);

const getSingleBlog = () => {
  afterEach(async () => {
    await Article.deleteMany({});
    server.close();
  });
  it("should return an article and 200 status if valid id is passed", (done) => {
    const article = new Article(ArticleValues.validArticle);
    article.save();
    chai
      .request(server)
      .get("/api/articles/" + article._id)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "post fetched successfully"
        );
        expect(res.body).to.have.a.property("data");
        done();
      });
  });
  it("should return 404 if no article found in the database or invalid id passed", (done) => {
    chai
      .request(server)
      .get("/api/articles/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "Not Found");
        done();
      });
  });
};

export default getSingleBlog;
