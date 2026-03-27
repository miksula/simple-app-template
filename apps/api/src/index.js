import { createServer } from "node:http";
import process from "node:process";

const port = Number(process.env.PORT) || 8001;

const server = createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Hello, API!");
});

server.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
