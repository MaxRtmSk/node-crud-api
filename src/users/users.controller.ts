import { userService } from "./users.service";
import { validate as uuidValidate } from "uuid";
import type { ServerController } from "../types/app.types";
import type { CreateUserDto } from "./dto/create-user.dto";

class UserController {
  getAll: ServerController = async (_, response) => {
    try {
      const result = await userService.getAll();
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      response.end();
    } catch (error) {
      console.log("errror", error);
      throw new Error();
    }
  };

  getById: ServerController = async (request, response) => {
    try {
      const id = request.url ? request.url.split("/")[3] : null;

      if ((id && !uuidValidate(id)) || !id) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("UUID not true"));
        response.end();
        return;
      }
      const result = await userService.getById(id);

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
  };

  create: ServerController = async (request, response) => {
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

      const data: CreateUserDto = {
        username,
        age,
        hobbies,
      };

      const result = await userService.create(data);

      response.statusCode = 201;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      response.end();
      return;
    } catch (error) {
      throw new Error();
    }
  };

  update: ServerController = async (request, response) => {
    try {
      const id = request.url ? request.url.split("/")[3] : null;

      if ((id && !uuidValidate(id)) || !id) {
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

      const result = await userService.update(id, data);
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
  };

  remove: ServerController = async (request, response) => {
    try {
      const id = request.url ? request.url.split("/")[3] : null;

      if ((id && !uuidValidate(id)) || !id) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json");
        response.write(JSON.stringify("UUID not true"));
        response.end();
        return;
      }

      const result = await userService.remove(id);
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
  };
}

export const userController = new UserController();
