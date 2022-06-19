import { route } from "./user.route";
import { userController } from "../users/users.controller";
import type { ServerMethodHandler } from "../types/app.types";

export const post: ServerMethodHandler = async (request, response) => {
  try {
    if (route("/api/users", request)) {
      const result = await userController.create(request, response);
      return result;
    }

    response.statusCode = 404;
    response.write(`NOT FOUND ${request.query}`);
    response.end();
    return;
  } catch (error) {
    response.statusCode = 500;
    response.write("500: Server Error");
    response.end();
    return;
  }
};
