import { checkIfValidUUID } from "../helpers/checkIfValidUUID";
import { userService } from "../service/user.service";

class UserController {
  getAll(_: any, response: any) {
    try {
      const result = userService.getAll();
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      response.end();
    } catch (error) {
      console.log("errror", error);
      throw new Error();
    }
  }

  getById(request: any, response: any) {
    try {
      const id = request.url.split("/")[3];

      if (!checkIfValidUUID(id)) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("UUID not true"));
        response.end();
        return;
      }
      const result = userService.getById(id);

      if (result === undefined) {
        response.statusCode = 404;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("Not found"));
        response.end();
        return;
      } else {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result));
        response.end();
        return;
      }
    } catch (error) {
      throw new Error();
    }
  }

  create(request: any, response: any) {
    try {
      const { username, age, hobbies } = request.body;

      if (
        username === undefined ||
        typeof username !== "string" ||
        age === undefined ||
        typeof age !== "number" ||
        hobbies === undefined
      ) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("Does not contain required fields"));
        response.end();
        return;
      }

      const data = {
        username,
        age,
        hobbies,
      };

      const result = userService.create(data);

      response.statusCode = 201;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      response.end();
      return;
    } catch (error) {
      throw new Error();
    }
  }

  update(request: any, response: any) {
    try {
      const id = request.url.split("/")[3];
      if (!checkIfValidUUID(id)) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("UUID not true"));
        response.end();
        return;
      }
      const { username, age, hobbies } = request.body;

      const data = {
        username,
        age,
        hobbies,
      };

      const result = userService.update(id, data);
      if (result === false) {
        response.statusCode = 404;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("Not found"));
        response.end();
        return;
      }

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      response.end();
      return;
    } catch (error) {
      throw new Error();
    }
  }

  remove(request: any, response: any) {
    try {
      const id = request.url.split("/")[3];
      if (!checkIfValidUUID(id)) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("UUID not true"));
        response.end();
        return;
      }

      const result = userService.remove(id);
      if (result) {
        response.statusCode = 204;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify(result));
        response.end();
        return;
      } else {
        response.statusCode = 404;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("Not found"));
        response.end();
      }
    } catch (error) {
      throw new Error();
    }
  }
}

export const userController = new UserController();
