const dotenv = require("dotenv");
const supertest = require("supertest");
const { routes } = require("./routes");

dotenv.config();

const USER_DATA = {
  username: "Alex",
  age: 18,
  hobbies: ["watch movie", "tennis", "football"],
};

const NEW_USER_DATE = {
  username: "Alex1",
  age: 19,
  hobbies: ["play PC games", "tennis", "football"],
};

const host = process.env.PORT
  ? `localhost:${process.env.PORT}`
  : "localhost:3000";

const request = supertest(host);

describe("3 scenarios", () => {
  let userId = null;

  it("Get all records with a GET api/users request (an empty array is expected)", async () => {
    const usersResponse = await request
      .get(routes.getAll)
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(usersResponse.status).toBe(200);
    expect(usersResponse.body).toEqual([]);
  });
});
