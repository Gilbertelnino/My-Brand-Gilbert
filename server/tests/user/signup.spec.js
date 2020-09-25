import chai from "chai";
import chaiHttp from "chai-http";
import { afterEach, beforeEach } from "mocha";
import server from "../../index";
import userValue from "../asset/userData";
import User from "../../models/User";

const { expect } = chai;
chai.use(chaiHttp);

const signup = () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
  });
  it("Should not create account if there is missing field", (done) => {
    chai
      .request(server)
      .post("/api/signup")
      .send(userValue.missingSignupField)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  // it("User should not be able to create account if email already registered", (done) => {
  //   chai
  //     .request(server)
  //     .post("/api/signup")
  //     .send(userValue.allowedSignup)
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(400);
  //       expect(res.body).to.have.property("error", "Email already exist");
  //       done();
  //     });
  // });
  it("User should be able to create account if he provide proper info", (done) => {
    chai
      .request(server)
      .post("/api/signup")
      .send(userValue.allowedSignup)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "Admin Signup successfully"
        );
        done();
      });
  });
};

export default signup;
