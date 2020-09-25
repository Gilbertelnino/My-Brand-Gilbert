import chai from "chai";
import { beforeEach, afterEach } from "mocha";
import chaiHttp from "chai-http";
import server from "../../index";
import Profile from "../../models/Profile";
import ProfileValues from "../asset/userData";
import VerifiedToken from "../asset/article";

const { expect } = chai;
chai.use(chaiHttp);

const updateProfile = () => {
  beforeEach(async () => {
    await Profile.deleteMany({});
  });
  afterEach(async () => {
    await Profile.deleteMany({});
  });
  it("should not able to update profile if there is no token provided", (done) => {
    const profile = new Profile(ProfileValues.validProfile);
    profile.save();
    chai
      .request(server)
      .patch(`/api/profile/edit/${profile._id}`)
      .set(VerifiedToken.noTokenProvided)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "access denied");
        done();
      });
  });
  it("should not be able to update profile if id is invalid", (done) => {
    chai
      .request(server)
      .patch("/api/profile/edit/1")
      .set(VerifiedToken.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
  // it("should be able to update profile if it is found", (done) => {
  //   const profile = new Profile(ProfileValues.validProfile);
  //   profile.save();
  //   chai
  //     .request(server)
  //     .patch(`/api/profile/edit/${profile._id}`)
  //     .set(VerifiedToken.validToken)
  //     .send({ firstName: "Robert" })
  //     .end((err, res) => {
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.have.property(
  //         "message",
  //         "profile updated successfully"
  //       );
  //       done();
  //     });
  // });
};

export default updateProfile;
