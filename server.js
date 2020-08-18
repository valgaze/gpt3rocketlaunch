const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const {
  gpt3Endpoint
} = require("gpt3rocket");
const app = express();
app.use(bodyParser.json());

module.exports = ({
  port,
  host,
  staticPath,
  indexPath,
  credential
}) => {
  const portRef = port || 8000;
  // UI
  if (staticPath && indexPath) {
    app.use(express.static(path.resolve(staticPath)));
    app.get("/", (req, res) => {
      res.sendFile(path.resolve(indexPath));
    });
  } else {
    app.use(express.static(path.resolve(__dirname, "frontend")));
    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
    });
  }

  if (credential && credential !== "placeholder") {
    const config = {
      credential,
      debug: false,
    };
    const gpt3 = gpt3Endpoint(config);

    // Endpoint
    app.post("/chat", gpt3);
    app.post("/ask", gpt3);
  } else {
    app.post("/chat", (req, res) => {
      res.send({
        text: `[Warning] Backend is not configured with a credential`,
      });
    });
  }

  return new Promise((resolve, reject) => {
    app.listen(portRef, () => {
      resolve({
        app,
        port: portRef,
      });
    });
  });
};