import chai from "chai";
import { beforeEach, afterEach } from "mocha";
import chaiHttp from "chai-http";
import server from "../../index";
import Profile from "../../models/Profile";
import VerifyToken from "../asset/article";
import ProfileValues from "../asset/userData";

const { expect } = chai;
chai.use(chaiHttp);

const deleteProfile = () => {
  // beforeEach(async () => {
  //   await Profile.deleteMany({});
  // });
  afterEach(async () => {
    await Profile.deleteMany({});
  });
  it("should not able to delete profile if there is no token provided", (done) => {
    const profile = new Profile(ProfileValues.validProfile);
    profile.save();
    chai
      .request(server)
      .delete("/api/profile/delete/" + profile._id)
      .set(VerifyToken.noTokenProvided)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "access denied");
        done();
      });
  });
  it("should not be able to delete profile if id is invalid", (done) => {
    chai
      .request(server)
      .delete("/api/profile/delete/1")
      .set(VerifyToken.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "Not Found");
        done();
      });
  });
  it("should be able to delete profile if it is found", (done) => {
    const profile = new Profile(ProfileValues.validProfile);
    profile.save();
    chai
      .request(server)
      .delete("/api/profile/delete/" + profile._id)
      .set(VerifyToken.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "profile deleted successfully"
        );
        done();
      });
  });
};

export default deleteProfile;
