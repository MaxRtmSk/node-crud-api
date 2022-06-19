import { getBody } from "./middleware/getBody";
import { get, post, put, deletet } from "./routers/index";
import type { IServerRequest, IServerResponse } from "./types/app.types";

export const requestHandler = async (
  request: IServerRequest,
  response: IServerResponse
) => {
  // const urlparse = request.url ? url.parse(request.url, true) : null;
  request.query = request.url
    ? new URL(request.url, `http://${request.headers.host}`)
    : null;

  try {
    switch (request.method) {
      case "GET":
        console.log(`Get in ${process.pid} worker`);
        await getBody(request, response, get);
        break;

      case "POST":
        await getBody(request, response, post);
        break;

      case "PUT":
        await getBody(request, response, put);
        break;

      case "DELETE":
        await getBody(request, response, deletet);
        break;

      default:
        response.statusCode = 404;
        response.write("NOT FOUND");
        response.end();
    }
  } catch (error) {
    console.log("error", error);
    response.statusCode = 500;
    response.write("Server error");
    response.end();
  }
};
