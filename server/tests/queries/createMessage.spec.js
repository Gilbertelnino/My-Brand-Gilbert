import chai from "chai";
import { afterEach } from "mocha";

import chaiHttp from "chai-http";
import server from "../../index";
import MessageValues from "../asset/queries";
import Message from "../../models/Message";
import VerifiedToken from "../asset/article";

const { expect } = chai;
chai.use(chaiHttp);

const createMessage = () => {
  afterEach(async () => {
    await Message.deleteMany({});
    server.close();
  });
  it("should return 400 status if contact form required field is not provided correctly", (done) => {
    chai
      .request(server)
      .post("/api/query/create")
      .send(MessageValues.invalidMessage)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return 201 status if message sent successfully", (done) => {
    chai
      .request(server)
      .post("/api/query/create")
      .send(MessageValues.validMessage)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "Message sent successfully"
        );
        done();
      });
  });
};

export default createMessage;
