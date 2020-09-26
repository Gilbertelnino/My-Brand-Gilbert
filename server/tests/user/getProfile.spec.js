import chai from "chai";
import { beforeEach, afterEach } from "mocha";

import chaiHttp from "chai-http";
import server from "../../index";
import Profile from "../../models/Profile";

const { expect } = chai;
chai.use(chaiHttp);

const getProfile = () => {
  // beforeEach(async () => {
  //   await Profile.deleteMany({});
  // });
  afterEach(async () => {
    await Profile.deleteMany({});
  });
  it("should return 404 status if there is no profile", (done) => {
    chai
      .request(server)
      .get("/api/profile")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "No profile Yet!");
        done();
      });
  });

  it("should return profile if it is available", (done) => {
    Profile.collection.insertOne({
      firstName: "Ndatimana",
      lastName: "Gilbert",
      email: "gilbeltelnino@gmail.com",
      password: "1234567",
      gender: "male",
      jobRole: "full stack software developer",
      department: "software developer",
      address: "KN 76 St",
    });
    chai
      .request(server)
      .get("/api/profile")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "Profile fetched successfully"
        );
        done();
      });
  });
};

export default getProfile;
