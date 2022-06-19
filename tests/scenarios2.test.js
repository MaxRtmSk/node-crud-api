const dotenv = require("dotenv");
const supertest = require("supertest");
const { routes } = require("./routes");

dotenv.config();

const NOT_VALID_USER_DATA = {
  age: "18",
  hobbies: "tennis",
};

const host = process.env.PORT
  ? `localhost:${process.env.PORT}`
  : "localhost:3000";

const request = supertest(host);

describe("2 scenarios: Handling ERROR MESSAGE", () => {
  it(`NOT FOUND http://${host}/rwekrlwklrwkekrw`, async () => {
    const usersResponse = await request.get("/rwekrlwklrwkekrw");

    expect(usersResponse.status).toBe(404);
    expect(usersResponse.text).toBe(
      `NOT FOUND http://${host}/rwekrlwklrwkekrw`
    );
  });

  it("Does not contain required fields", async () => {
    await request
      .post(routes.create)
      .set("Accept", "application/json")
      .send(NOT_VALID_USER_DATA)
      .expect(400)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toBe("Does not contain required fields");
      });
  });

  it("Not valid UUID", async () => {
    const userId = "34bf9e5140bcd8b";

    const usersResponse = await request
      .get(routes.getById(userId))
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", /json/);

    expect(usersResponse.body).toBe("Not valid UUID");
  });

  it("Not found", async () => {
    const userId = "34bf9e51-5094-48df-99b1-9faee40bcd8b";

    const usersResponse = await request
      .delete(routes.delete(userId))
      .set("Accept", "application/json");

    expect(usersResponse.status).toBe(404);
    expect(usersResponse.body).toBe("Not found");
  });
});
