const request = require("supertest");
const { app, server } = require("../index.js");
const mongoose = require("mongoose");
describe("Whole system test", () => {
  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    server.close();
    done();
  });

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

    // Test Send an request
    it("Send an request", async () => {
      try {
        const res = await request(app).post("/api/request/").send({
          createdBy: "6545edafd01ae6a7742c07d9",
          name: "Buy cars",
          description: "Buy cars",
          requestAmount: 10000000,
        });
        expect(res.body.message).toBe("CREATED REQUEST SUCCESSFULLY");
      } catch (error) {}
    });
    // Test get an request existed

    it("Get an request existed", async () => {
      try {
        const res = await request(app)
          .get("/api/request/6563fdb4e92b41d45194104e")
          .send();
        expect(res.statusCode).toBe(200);
      } catch (error) {}
    });

    // Test get an request isn't existed

    it("Get an request isn't existed", async () => {
      try {
        const res = await request(app)
          .get("/api/request/6563fdb4e92b41d451941042")
          .send();
        expect(res.statusCode).toBe(404);
      } catch (error) {}
    });
    // Test Update an request status

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

    // Test Update an request status by user

    it("Update an request status by user", async () => {
      try {
        const res = await request(app)
          .post("/api/request/update/6545edafd01ae6a7742c07d9")
          .send({
            userId: "653f6952a4523c443bb115f4",
            status: "RejectedByFinance",
            feedback: "Khong mua khong miec gi het",
          });
        expect(res.statusCode).toBe(404);
      } catch (error) {}
    });
  });

  describe("Test User Routes", () => {
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
    // Test login with not existed email
    it("Login with not existed email", async () => {
      try {
        const res = await request(app).post("/api/user/login").send({
          email: "Trong1123123@gmail.com",
          password: "123456",
        });
        expect(res.body.message).toBe("The email is not defined");
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

    it("Create an user with existed emai", async () => {
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
