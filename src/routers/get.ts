import { route } from "./user.route";
import { userController } from "../users/users.controller";
import type { ServerMethodHandler } from "../types/app.types";

export const get: ServerMethodHandler = async (request, response) => {
  try {
    if (route("/api/users", request)) {
      const result = await userController.getAll(request, response);
      return result;
    }
    if (route("/api/users/:id", request)) {
      const result = await userController.getById(request, response);
      return result;
    }

    response.statusCode = 404;
    response.write(`NOT FOUND ${request.query}`);
    response.end();
    return;
  } catch (error) {
    console.log("error", error);
    response.statusCode = 500;
    response.write("500: Server Error");
    response.end();
    return;
  }
};
