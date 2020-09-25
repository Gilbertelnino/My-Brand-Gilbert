import chai from "chai";
import { afterEach } from "mocha";

import chaiHttp from "chai-http";
import server from "../../index";
import ProfileValues from "../asset/userData";
import Profile from "../../models/Profile";
import VerifiedToken from "../asset/article";

const { expect } = chai;
chai.use(chaiHttp);

const createProfile = () => {
  beforeEach(async () => {
    await Profile.deleteMany({});
  });
  afterEach(async () => {
    await Profile.deleteMany({});
  });
  it("should return 401 status if admin is not logged in", (done) => {
    chai
      .request(server)
      .post("/api/profile/create")
      .send(ProfileValues.validProfile)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "access denied");
        done();
      });
  });
  it("should return 400 status if profile form is not filled correctly", (done) => {
    chai
      .request(server)
      .post("/api/profile/create")
      .send(ProfileValues.invalidProfile)
      .set(VerifiedToken.validToken)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should return 400 status if profile value is less than 3 characters", (done) => {
    chai
      .request(server)
      .post("/api/profile/create")
      .set(VerifiedToken.validToken)
      .send(ProfileValues.invalidProfileValue)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should save profile in the database if it is valid", (done) => {
    chai
      .request(server)
      .post("/api/profile/create")
      .set(VerifiedToken.validToken)
      .send(ProfileValues.validProfile);

    const profile = Profile.find(ProfileValues.validProfile);
    expect(profile).not.to.be.null;

    done();
  });
};

export default createProfile;
