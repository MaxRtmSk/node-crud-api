import type { IServerRequest } from "../types/app.types";

export const route = (
  route: "/api/users" | "/api/users/:id",
  request: IServerRequest
): boolean => {
  const url = request.url ? request.url.split("/") : "";

  const routers: {
    "/api/users": boolean;
    "/api/users/:id": boolean;
  } = {
    "/api/users": url.length === 3 && url[1] === "api" && url[2] === "users",
    "/api/users/:id":
      url.length === 4 &&
      url[1] === "api" &&
      url[2] === "users" &&
      url[3] !== "",
  };

  return routers[route];
};
