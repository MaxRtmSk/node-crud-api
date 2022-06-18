import http from "http";
import dotenv from "dotenv";
import { getBody } from "./middleware/getBody";
import { get, post, put, deletet } from "./routers/index";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const server = http.createServer();

server.on("request", (request: any, response) => {
  //   const urlparse = request.url ? url.parse(request.url, true) : null;
  request.query = new URL(request.url, `http://${request.headers.host}`);

  try {
    switch (request.method) {
      case "GET":
        getBody(request, response, get);
        break;

      case "POST":
        getBody(request, response, post);
        break;

      case "PUT":
        getBody(request, response, put);
        break;

      case "DELETE":
        getBody(request, response, deletet);
        break;

      default:
        response.statusCode = 404;
        response.write("NOT FOUND");
        response.end();
    }
  } catch (error) {
    console.log(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server start no ${PORT}`);
});
