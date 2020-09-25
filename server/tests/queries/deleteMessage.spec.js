import chai from "chai";
import { afterEach, beforeEach } from "mocha";

import chaiHttp from "chai-http";
import server from "../../index";
import Message from "../../models/Message";
import VerifiedToken from "../asset/article";
import MessagesValues from "../asset/queries";

const { expect } = chai;
chai.use(chaiHttp);

const deleteMessage = () => {
  beforeEach(async () => {
    await Message.deleteMany({});
  });
  afterEach(async () => {
    await Message.deleteMany({});
  });
  it("should not able to delete message if there is no token provided", (done) => {
    const message = new Message(MessagesValues.validMessage);
    message.save();
    chai
      .request(server)
      .delete("/api/queries/" + message._id)
      .set(VerifiedToken.noTokenProvided)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "access denied");
        done();
      });
  });
  it("should not be able to delete message if id is invalid or id not found", (done) => {
    chai
      .request(server)
      .delete("/api/queries/1")
      .set(VerifiedToken.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "Not Found");
        done();
      });
  });
  it("should be able to delete message if it is found", (done) => {
    const message = new Message(MessagesValues.validMessage);
    message.save();
    chai
      .request(server)
      .delete(`/api/queries/${message._id} `)
      .set(VerifiedToken.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "message deleted successfully"
        );
        done();
      });
  });
};

export default deleteMessage;
