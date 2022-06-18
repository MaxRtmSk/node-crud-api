export const getBody = (request: any, response: any, next: any) => {
  try {
    let data: any = [];

    request.on("data", (dataChunk: any) => {
      data.push(dataChunk);
    });

    request.on("end", () => {
      request.body = Buffer.concat(data).toString();
      if (request.headers["content-type"] === "application/json") {
        request.body = JSON.parse(request.body);
      }

      next(request, response);
    });
  } catch (error) {
    throw new Error();
  }
};
