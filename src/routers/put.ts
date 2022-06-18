import { route } from "./user.route";
import { userController } from "../controllers/user.controller";

export const put = (request: any, response: any) => {
  try {
    if (route("/api/users/:id", request))
      return userController.update(request, response);

    response.statusCode = 404;
    response.write(`NOT FOUND ${request.query}`);
    response.end();
  } catch (error) {
    response.statusCode = 500;
    response.write("500: Server Error");
    response.end();
  }
};
