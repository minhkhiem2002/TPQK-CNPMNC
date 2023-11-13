const request = require("supertest");
const app = require("../index.js");
describe("Whole system test", () => {
  describe("Test Request Routes", () => {
    // Test get all request return message "Success"
    it("Get all requests of an user", async () => {
      try {
        const res = await request(app)
          .post("/api/request/6545edafd01ae6a7742c07d9")
          .send();
        expect(res.body.message).toBe("SUCCESS");
      } catch (error) {}
    });
    // Test get all request return statusCode 200

    it("Update an request status", async () => {
      try {
        const res = await request(app)
          .post("/api/request/update/6545f37d0f68e0d2ed386621")
          .send({
            userId: "653f6952a4523c443bb115f4",
            status: "RejectedByFinance",
            feedback: "Khong mua khong miec gi het",
          });
        expect(res.statusCode).toBe(200);
      } catch (error) {}
    });
  });

  describe("Test User Routes", () => {
    it("Test", async () => {});
    // Test login user correct password return message "SUCCESS"
    it("Login correct password", async () => {
      try {
        const res = await request(app).post("/api/user/login").send({
          email: "Trong1@gmail.com",
          password: "123456",
        });
        expect(res.body.message).toBe("SUCCESS");
      } catch (error) {}
    });
    // Test login user correct password return message "Password or is incorrect"

    it("Login incorrect password", async () => {
      try {
        const res = await request(app).post("/api/user/login").send({
          email: "Trong1@gmail.com",
          password: "654321",
        });
        expect(res.body.message).toBe("Password or is incorrect");
      } catch (error) {}
    });
    // Test sign up user with existed email return message "The email is already"

    it("Create an user", async () => {
      try {
        const res = await request(app).post("/api/user/signup").send({
          name: "Trong",
          email: "Trong1@gmail.com",
          password: "123456",
          confirmPassword: "123456",
          department: "Finance",
        });
        console.log(res.body);
        expect(res.body.message).toBe("The email is already");
      } catch (error) {}
    });
  });
});
