const path = require("path");

const portfinder = require("portfinder");
const server = require("./server");
const { loud, good } = require("./../util/logger");
const { openBrowser } = require("./open_browser");

const loudOpen = (url) => {
  loud(`Attempt URL Open: ${url}`);
  return openBrowser(url);
};

module.exports = async function launch({
  port,
  credential = "placeholder",
  url,
  staticPath,
  indsexPath,
  route,
  message,
}) {
  const portRef = port || (await portfinder.getPortPromise()); // get port
  const host = "localhost";
  const { app } = await server({
    credential,
    port: portRef,
    staticPath,
    indsexPath,
    route,
  });
  let altURL = `http://${host}:${portRef}`;
  loud(`[Server] Listening on ${altURL}\n\n[CTRL-C to quit]`);
  if (route) {
    good(`POST prompts to ${altURL}${route}`);
  }

  if (message) {
    const extension = `?startmsg="${message}"`;
    altURL = `${altURL}/#/${extension}`;
  }
  loudOpen(altURL);
};
