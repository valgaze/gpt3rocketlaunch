const portfinder = require("portfinder");
const server = require("./server");
const {
  openBrowser
} = require("./open_browser");
const {
  loud
} = require("./logger");

const loudOpen = (url) => {
  loud(`Attempt URL Open: ${url}`);
  return openBrowser(url);
};
const path = require("path");

module.exports = async function launch({
  port,
  credential = "placeholder",
  url,
  staticPath,
  indsexPath,
}) {
  if (url) {
    return loudOpen(url);
  }
  const portRef = port || (await portfinder.getPortPromise()); // get port
  const host = "localhost";
  const {
    app
  } = await server({
    credential,
    port: portRef,
    staticPath,
    indsexPath,
  });

  const altURL = `http://${host}:${portRef}`;
  loud(`[Server] Listening on ${altURL}\n\n[CTRL-C to quit]`);
  loudOpen(altURL);
};