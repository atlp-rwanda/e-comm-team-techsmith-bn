import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

chai.should();
chai.use(chaiHttp);

// USER LOGIN
const loginUser = {
  email: "logouttest@gmail.com",
  password: "Password@00",
};
// COOKIE
let cookie = "";

// LOGGIN IN A USER
describe("Login user", () => {
  it("Should return a success code 200 after successful authentication", (done) => {
    chai
      .request(app)
      .post("/api/users/login")
      .send(loginUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        cookie = res.header["set-cookie"][0];
        done();
      });
  });
});

describe("Logout Test", () => {
  // WHEN A USER IS LOGGED IN
  describe("Given a user is logged in", () => {
    it("Should return a success status with code 200", (done) => {
      chai
        .request(app)
        .post("/api/users/logout")
        .set("cookie", cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // WHEN A USER IS NOT LOGGED IN
  describe("Given a user is not logged in", () => {
    it("Should return error 401 of Unauthorized", (done) => {
      chai
        .request(app)
        .post("/api/users/logout")
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
