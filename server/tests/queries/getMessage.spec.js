import chai from "chai";
import { beforeEach, afterEach } from "mocha";

import chaiHttp from "chai-http";
import server from "../../index";
import Message from "../../models/Message";
import VerifiedToken from "../asset/article";

const { expect } = chai;
chai.use(chaiHttp);

const getMessage = () => {
  // beforeEach(async () => {
  //   await Message.deleteMany({});
  // });
  afterEach(async () => {
    await Message.deleteMany({});
  });
  it("should return 404 status if there is no message", (done) => {
    chai
      .request(server)
      .get("/api/queries")
      .set(VerifiedToken.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "No message Yet!");
        done();
      });
  });
  it("should return 401 status if there is no Token provided", (done) => {
    chai
      .request(server)
      .get("/api/queries")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });
  it("should return message if there is verified token", (done) => {
    Message.collection.insertMany([
      {
        name: "gibert",
        email: "gil@gmail.com",
        message: "this is a message for testing",
      },
      {
        name: "elnino",
        email: "elni@gmail.com",
        message: "this is a second message for testing",
      },
    ]);
    chai
      .request(server)
      .get("/api/queries")
      .set(VerifiedToken.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
};

export default getMessage;
