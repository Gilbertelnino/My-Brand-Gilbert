import chai from "chai";
import { afterEach } from "mocha";
import chaiHttp from "chai-http";
import server from "../../index";
import Article from "../../models/Article";

const { expect } = chai;
chai.use(chaiHttp);

const getArticles = () => {
  beforeEach(async () => {
    await Article.deleteMany({});
  });
  afterEach(async () => {
    await Article.deleteMany({});
  });
  it("shoult return 200 status if article fetched successfully ", (done) => {
    Article.collection.insertMany([
      {
        title: "first title",
        subtitle: "first subtitle ever",
        image: "images/og-default.jpg",
        content: "this is content for testing article api",
        author: "gilbert",
      },
      {
        title: "second title",
        subtitle: "second subtitle ever",
        image: "images/og-default.jpg",
        content: "this is content for testing article api",
        author: "elnino",
      },
    ]);
    chai
      .request(server)
      .get("/api/articles")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "post fetched successfully"
        );
        expect(res.body).to.have.property("data");
        done();
      });
  });
};

export default getArticles;
