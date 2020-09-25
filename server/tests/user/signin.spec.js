import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../index";
import userValue from "../asset/userData";
import User from "../../models/User";

const { expect } = chai;
chai.use(chaiHttp);

const signin = () => {
  it("User Should not be able to logged in if there is no email or password provided", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .send(userValue.missingSigninField)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);

        done();
      });
  });
  it("User should not be able to login if it is not registered", (done) => {
    chai
      .request(server)
      .post("/api/login")
      .send(userValue.invalidUser)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("error", "Invalid Email or Password");
        done();
      });
  });
  // it("User should be able to Logged in if email and password exist", (done) => {
  //   const user = new User(userValue.allowedSignin);
  //   user.save();
  //   chai
  //     .request(server)
  //     .post("/api/login")
  //     .send(user)
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.have.property(
  //         "message",
  //         "User Logged in successfully"
  //       );
  //       expect(res.header).to.have.property("auth-token");
  //       done();
  //     });
  // });
};

export default signin;
