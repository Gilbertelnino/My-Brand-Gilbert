import chai from "chai";
import { afterEach } from "mocha";
import chaiHttp from "chai-http";
import server from "../../index";
import ArticleValues from "../asset/article";
import Article from "../../models/Article";

const { expect } = chai;
chai.use(chaiHttp);

const TokenValidationTest = () => {
  it("should return 401 if no token is provided", (done) => {
    afterEach(async () => {
      await Article.deleteMany({});
      server.close();
    });
    chai
      .request(server)
      .post("/api/articles/create")
      .set(ArticleValues.noTokenProvided)
      .send(ArticleValues.validArticle)
      .end((err, res) => {
        expect(err).to.be.null, expect(res).to.have.status(401);
        done();
      });
  });
  it("should return 400 if token it invalid", (done) => {
    chai
      .request(server)
      .post("/api/articles/create")
      .set(ArticleValues.invalidToken)
      .send(ArticleValues.validArticle)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  // it("should return 200 if token it valid", (done) => {
  //   chai
  //     .request(server)
  //     .post("/api/articles/create")
  //     .set(ArticleValues.validToken)
  //     .send(ArticleValues.validArticle)
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res.header).to.have.property("auth-token");
  //       done();
  //     });
  // });
};
export default TokenValidationTest;
