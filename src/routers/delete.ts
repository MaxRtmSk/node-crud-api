import { route } from "./user.route";
import { userController } from "../users/users.controller";
import type { ServerMethodHandler } from "../types/app.types";

export const deletet: ServerMethodHandler = async (request, response) => {
  try {
    if (route("/api/users/:id", request))
      return userController.remove(request, response);

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
