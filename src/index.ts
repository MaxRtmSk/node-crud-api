import http from "http";
import dotenv from "dotenv";
import { getBody } from "./middleware/getBody";
import { get, post, put, deletet } from "./routers/index";
import cluster from "cluster";
import { cpus } from "os";
import { writeFile } from "fs/promises";
import path from "path";

const users_file_path = path.join(__dirname, "./memory-db.json");

const totalCPUs = process.env.MULTI ? cpus().length : 1;

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const server = http.createServer();

server.on("request", (request: any, response) => {
  //   const urlparse = request.url ? url.parse(request.url, true) : null;
  request.query = new URL(request.url, `http://${request.headers.host}`);

  try {
    switch (request.method) {
      case "GET":
        console.log(`Get in ${process.pid} worker`);
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
    console.log("error", error);
    response.statusCode = 500;
    response.write("Server error");
    response.end();
  }
});

if (cluster.isPrimary) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // cluster.on("exit", (worker) => {
  //   console.log(`worker ${worker.process.pid} died`);
  //   console.log("Let's fork another worker!");
  //   cluster.fork();
  // });

  process.on("SIGINT", async () => {
    const jsonString = JSON.stringify([]);
    const buffer = Buffer.from(jsonString);

    await writeFile(users_file_path, buffer);

    process.exit();
  });
} else {
  console.log(`Worker ${process.pid} started`);

  server.listen(PORT, () => {
    console.log(`Server start no ${PORT}`);
  });
}
