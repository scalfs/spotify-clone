import { createServer } from "http";
import { handler } from "./routes.js";

// exporting this function guarantees a unique server instance
export default () => createServer(handler);
