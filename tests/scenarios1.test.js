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

describe("1 scenarios", () => {
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

  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    await request
      .post(routes.create)
      .set("Accept", "application/json")
      .send(USER_DATA)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body.id && typeof res.body.id === "string").toBe(true);
        expect(res.body.username).toBe(USER_DATA.username);
        expect(res.body.age).toBe(USER_DATA.age);
        expect(res.body.hobbies).toStrictEqual(USER_DATA.hobbies);
        userId = res.body.id;
      });
  });

  it("With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const usersResponse = await request
      .get(routes.getById(userId))
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(
      usersResponse.body.id && typeof usersResponse.body.id === "string"
    ).toBe(true);
    expect(usersResponse.body.username).toBe(USER_DATA.username);
    expect(usersResponse.body.age).toBe(USER_DATA.age);
    expect(usersResponse.body.hobbies).toStrictEqual(USER_DATA.hobbies);
  });

  it("We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)", async () => {
    const usersResponse = await request
      .put(routes.update(userId))
      .set("Accept", "application/json")
      .send(NEW_USER_DATE)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(usersResponse.body).toStrictEqual({ id: userId, ...NEW_USER_DATE });
  });

  it("With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const usersResponse = await request
      .delete(routes.delete(userId))
      .set("Accept", "application/json");

    expect(usersResponse.status).toBe(204);
  });

  it("With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)", async () => {
    const usersResponse = await request
      .get(routes.getById(userId))
      .set("Accept", "application/json");

    expect(usersResponse.body).toBe("Not found");
    expect(usersResponse.status).toBe(404);
  });
});
