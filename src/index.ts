import http from "http";
import dotenv from "dotenv";
import url from "url";

import { users } from "./memory-db";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

console.log();

const server = http.createServer();

server.on("request", (request, response) => {
  const urlparse = request.url ? url.parse(request.url, true) : null;

  try {
    if (urlparse?.pathname === "/api/users" && request.method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(users, null, 2));
      return;
    }

    response.statusCode = 500;
    response.write("500: Server Error");
    response.end();
  } catch (error) {
    console.log(error);
  }
});

server.listen(PORT, () => {
  console.log(`Server start no ${PORT}`);
});
