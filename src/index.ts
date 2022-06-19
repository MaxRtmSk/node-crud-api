import http from "http";
import cluster from "cluster";
import { cpus } from "os";

import { clearDB } from "./helpers/clearDB";
import { requestHandler } from "./app";
import { PORT } from "./config";

const totalCPUs = process.env.MULTI ? cpus().length : 1;

const server = http.createServer();
server.on("request", requestHandler);

if (cluster.isPrimary) {
  process.env.MULTI && console.log(`Number of CPUs is ${totalCPUs}`);
  process.env.MULTI && console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // cluster.on("exit", (worker) => {
  //   console.log(`worker ${worker.process.pid} died`);
  //   console.log("Let's fork another worker!");
  //   cluster.fork();
  // });

  process.on("SIGINT", async () => {
    await clearDB();
    process.exit();
  });
} else {
  server.listen(PORT, () => {
    process.env.MULTI
      ? console.log(`[${process.pid}] Server start no ${PORT}`)
      : console.log(`Server start no ${PORT}`);
  });
}
