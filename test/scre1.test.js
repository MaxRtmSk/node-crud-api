const dotenv = require("dotenv");
const supertest = require("supertest");
const { routes } = require("./routes");

dotenv.config();

const host = process.env.PORT
  ? `localhost:${process.env.PORT}`
  : "localhost:3000";

const request = supertest(host);

describe("CRUD", () => {
  describe("GET", () => {
    it("should get all users", async () => {
      const usersResponse = await request
        .get(routes.getAll)
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body).toEqual([]);
    });
  });
});
