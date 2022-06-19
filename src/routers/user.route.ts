export const route = (route: any, request: any): any => {
  const url = request.url.split("/");

  const routers: any = {
    "/api/users": url.length === 3 && url[1] === "api" && url[2] === "users",
    "/api/users/:id":
      url.length === 4 &&
      url[1] === "api" &&
      url[2] === "users" &&
      url[3] !== "",
  };

  return routers[route];
};
