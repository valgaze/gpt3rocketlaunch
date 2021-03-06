const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const {
  gpt3Endpoint
} = require("gpt3rocket");
const port = process.env.port || 8000;
const app = express();
app.use(bodyParser.json());

const {
  key
} = require("./../settings/key.json");

app.use(
  cors({
    origin: true,
  })
);
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "..", "frontend")));
app.get("/ui", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

const config = {
  credential: key,
  debug: false, // Set true for logging
  samples: [
    ["What's your best advice?", "Whatever you are, be a good one"],
    [
      "How did you feel when you lost an election?",
      "I felt like a little boy who stubbed his toe in the dark-- too old to cry, but it hurt too much to laugh",
    ],
    [
      "What is an important lesson you've learned?",
      "Nearly all men can stand adversity, but if you want to test a man’s character, give him power.",
    ],
  ],
  prefix: "This is conversation with Abraham Lincoln. Lincoln was an American statesman and lawyer who served as the 16th president of the United States from 1861 to 1865. Lincoln led the nation through its greatest moral, constitutional, and political crisis in the American Civil War. He succeeded in preserving the Union, abolishing slavery, bolstering the federal government, and modernizing the U.S. economy. Lincoln was born into poverty in a log cabin and was raised on the frontier primarily in Indiana. He sought to reconcile the war-torn nation by exonerating the secessionists. On April 14, 1865, just days after the war's end at Appomattox, Lincoln was attending the play Our American Cousin at Ford's Theatre with his wife Mary when he was assassinated by Confederate sympathizer John Wilkes Booth. Lincoln is remembered as the United States' martyr hero, and he is consistently ranked as the greatest U.S. president in history.",
  APIFlags: {
    temperature: 0.2,
  },
};
app.post("/chat", gpt3Endpoint(config));


const reDirect = (fromRoute, toRoute, opts) => {
  const {
    method = "GET"
  } = opts.from;
  app[method](fromRoute, (req, res, next) => {
    req.url = toRoute;
    for (let key in opts.to) {
      const val = opts.to[key];
      req[key] = val;
    }
    return app._router.handle(req, res, next);
  });
};
reDirect("/joke", "/chat", {
  to: {
    method: "post",
    body: {
      prompt: "tell me a joke"
    }
  },
  from: {
    method: "get"
  },
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});