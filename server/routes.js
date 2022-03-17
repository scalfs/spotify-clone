import config from "./config.js";
import { logger } from "./util.js";
import { Controller } from "./controller.js";
const {
  location,
  pages: { homeHTML, controllerHTML },
} = config;
const controller = new Controller();

async function routes(request, response) {
  const { method, url } = request;

  if (method === "GET" && url === "/") {
    response.writeHead(302, { Location: location.home });
    return response.end();
  }

  if (method === "GET" && url === "/home") {
    const { stream } = await controller.getFileStream(homeHTML);
    // default response is text/html
    // response.writeHead(200, {'Content-Type': 'text/html'})
    return stream.pipe(response);
  }

  if (method === "GET" && url === "/controller") {
    const { stream } = await controller.getFileStream(controllerHTML);
    // default response is text/html
    // response.writeHead(200, {'Content-Type': 'text/html'})
    return stream.pipe(response);
  }

  //files
  if (method === "GET") {
    const { stream, type } = await controller.getFileStream(url);

    return stream.pipe(response);
  }

  response.writeHead(404);
  return response.end();
}

export function handler(request, response) {
  return routes(request, response).catch((error) =>
    logger.error(`Ohh nnoooo: ${error.stack}`)
  );
}
