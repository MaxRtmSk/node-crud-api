import { route } from "./user.route";
import { userController } from "../controllers/user.controller";

export const get = (request: any, response: any) => {
  try {
    if (route("/api/users", request)) {
      return userController.getAll(request, response);
    }
    if (route("/api/users/:id", request)) {
      return userController.getById(request, response);
    }

    response.statusCode = 404;
    response.write(`NOT FOUND ${request.query}`);
    response.end();
  } catch (error) {
    console.log("error", error);
    response.statusCode = 500;
    response.write("500: Server Error");
    response.end();
  }
};
