const supertest = require("supertest");
const { routes } = require("./routes");

const request = supertest("http://localhost:3001");

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
