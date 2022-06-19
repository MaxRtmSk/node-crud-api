import type {
  IServerRequest,
  ServerMethodHandler,
  IServerResponse,
} from "../types/app.types";

export const getBody = async (
  request: IServerRequest,
  response: IServerResponse,
  next: ServerMethodHandler
) => {
  try {
    let data: any = [];

    request.on("data", (dataChunk: any) => {
      data.push(dataChunk);
    });

    request.on("end", async () => {
      request.body = Buffer.concat(data).toString();
      if (request.headers["content-type"] === "application/json") {
        request.body = JSON.parse(request.body);
      }

      await next(request, response);
    });
  } catch (error) {
    throw error;
  }
};
