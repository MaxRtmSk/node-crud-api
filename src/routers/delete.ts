import { route } from "./user.route";
import { userController } from "../controllers/user.controller";

export const deletet = (request: any, response: any): any => {
  try {
    if (route("/api/users/:id", request))
      return userController.remove(request, response);

    response.statusCode = 404;
    response.write(`NOT FOUND ${request.query}`);
    response.end();
  } catch (error) {
    response.statusCode = 500;
    response.write("500: Server Error");
    response.end();
  }
};
