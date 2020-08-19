/**
 * Handlers
 * {
 * name: ['a', 'spelling variant'],
 * handler: ({__storage}) => {}
 * }
 *
 *
 */

const path = require("path");
const launch = require("./launcher");
const {
  runNPMScript,
  mkdir,
  copyDir,
  templateDir,
  writeJson,
  askQuestion,
  loud,
  good,
  readJSON,
  confirm,
  frontendPath,
  getPath,
} = require("./../util/index");

module.exports = [
  {
    name: ["create", "build", "init", "config", "configure", "set"],
    handler: async ({ __debug, args }) => {
      const { newDirectory, port, credential, skipConfirms } = args;

      if (!newDirectory) {
        return loud(`Missing '-n' flag to create a new project
npx rocketlaunch create -n directory_here -k XX-XXXXXXXX

npx rocketlaunch create -n directory_here -f ~/Desktop/apikey.json`);
      }

      // 1) Make target directory
      __debug(`1) Building...`);
      const buildDir = await mkdir(newDirectory);

      // 2) Copy template to target
      __debug(`2) Copying...`);
      const copy = await copyDir(templateDir, newDirectory).catch((e) =>
        console.log("<Error Copy>", e)
      );

      // 2) Copy frontend to dest
      __debug(`2a) Coping frontend...`);
      const frontendDest = path.resolve(newDirectory, "frontend");
      const copyFrontend = await copyDir(
        frontendPath,
        frontendDest
      ).catch((e) => console.log("<Error Copy>", e));

      // 3) Check if they want confirmation screens

      // 3a) Dependencies, happens automatically w/ -y flag
      if (!skipConfirms) {
        const proceed = await confirm(
          `Do you want to install dependencies now? (Yes recommended) `
        );
        if (proceed) {
          __debug(`3) Installing deps...`);
          const installDeps = await runNPMScript(
            path.resolve(newDirectory),
            `install:all`
          ).catch((e) => console.log("E", e));
        } else {
          good(`Later when you have a minute, run the following:
          
        cd ${newDirectory}
        npm run install:all
        npm run setkey # set your API key in settings/key.json
        npm start # << by default boots on localhost:8000`);
        }
      } else {
        __debug(`3) Installing deps...`);
        const installDeps = await runNPMScript(
          path.resolve(newDirectory),
          `install:all`
        ).catch((e) => console.log("<error>", e));
      }

      const hasCredential = Boolean(credential);

      if (hasCredential) {
        const payload = {
          key: credential,
        };
        const settingsPath = path.resolve(newDirectory, "settings", "key.json");
        console.log(`Writing ${settingsPath}...`);
        const writePayload = await writeJson(settingsPath, payload);

        return good(`You're all set, run the following to boot:
          
          cd ${newDirectory}
          npm start`);
      }

      if (skipConfirms) {
        if (!hasCredential) {
          return good(`Later when you have a minute, run the following:
          
          cd ${newDirectory}
          npm run install:all
          npm run setkey # set your API key in settings/key.json`);
        } else {
          return good(`You're all set, run the following to boot:
          
          cd ${newDirectory}
          npm start`);
        }
      } else {
        if (!hasCredential) {
          const setupAPIKey = await confirm(
            `Do you want to set up your credential/API Key now? `
          );

          if (setupAPIKey) {
            const installDeps = await runNPMScript(
              path.resolve(newDirectory),
              `setcredential`
            );
          } else {
            good(`Later when you have a minute, run the following:
          
          cd ${newDirectory}
          npm run install:all
          npm run setkey # set your API key in settings/key.json`);
          }
        }
      }
    },
  },
  {
    name: [
      "serve",
      "launch",
      "code",
      "gym",
      "start",
      "serve",
      "init",
      "server",
      "serrve",
      "st",
    ],
    handler: async ({ args, __debug }) => {
      __debug("Serve...");
      const { port, route, credential, message } = args;

      const hasCredential = Boolean(credential);
      const config = {
        credential,
        port,
        route,
        message,
      };

      const askForCred = async (msg = `What is your API key?`) => {
        const key = await askQuestion(msg);
        if (key === "") {
          return await askForCred(msg);
        }
      };
      if (!hasCredential) {
        const res = await askForCred();
        config.credential = res;
      }

      return launch(config);
    },
  },
  {
    name: ["examples", "ex", "examples", "showme"],
    handler: () => {
      console.log(`
Usage: rocketlaunch [command] [options]
A helper to host an endpoint or scaffold a gpt3 project
Replace any instances of "XX-XXXXXXXX" with your API key


>> tl;dr:
   $ npx rocketlaunch -f ~/Desktop/key.json -m "make a red button labeled bingo and a green one with bongo"
   $ npx rocketlaunch -k XX-XXXXXXXX -m "make a red button labeled bingo and a green one with bongo"

>> Install
  $ npm i rocketlaunch -g
  $ yarn global add nodemon rocketlaunch
  (Or prefix with npx for no install)
  
>> Learn about GPT3
  $ npx rocketlaunch learn
  $ npx rocketlaunch resources
  $ npx rocketlaunch help

>> Serve endpoint + frontend, defaults to localhost:8000/ask
  $ npx rocketlaunch serve -k XX-XXXXXXXX
  $ npx rocketlaunch serve -k XX-XXXXXX -r /query -p 8005
  $ npx rocketlaunch serve -f ~/Desktop/key.json -r /query -p 8005

>> create: scaffold a project
    $ npx rocketlaunch create
    $ npx rocketlaunch create -n my_directory
    $ npx rocketlaunch create -n "new project"

    -n specified, don't ask for directory name, just create a new directory
    -k API key itself (saved settings/key.json)
    -f filepath to key
    - Alias: init, build, scaffold
  
>> serve: serve endpoint on /chat
    -r set an additional route with
    -k set the API key
    -p set the port
    -f set filepath to API key
    -m Immediately trigger a prediction
    - Alias: init, start, server`);
    },
  },
  {
    name: ["help", "helpme"],
    handler: () => {
      console.log(`
$ npx rocketlaunch help
Usage: rocketlaunch [command] [options]
A helper to host an endpoint or scaffold a gpt3 project

Commands:
  help
  serve ($ rocketlaunch serve -k XX-XXXXXXXX)
  create
  learn ($ rocketlaunch learn)
  resources ($ rocketlaunch resources)
  examples
  
Options:
  -n,  Create directory: -n my_directory
  -k,  Pass in API credential: -k XX-XXXXXXXX
  -p,  Set port: -p 5555
  -f,  Filepath to api key

Examples:
  $ npx rocketlaunch serve -k XX-XXXXXXXX

  $ npx rocketlaunch -k XX-XXXXXXXX -m "make a red button labled bingo & a green one w/ bongo"


  $ npx rocketlaunch create -n my_directory -k XX-XXXXXXXX`);
    },
  },
  {
    name: ["learn", "gpt3", "101"],
    handler: ({ __storage, launchBrowser }) =>
      launchBrowser(__storage.urls.deck),
  },
  {
    name: ["chat", "chat-ui"],
    handler: ({ __storage, launchBrowser }) =>
      launchBrowser(__storage.urls.deck),
  },
  {
    name: ["biscotti", "biscotto"],
    handler: ({ launchBrowser }) => {
      return launchBrowser(
        ` https://www.youtube.com/watch?v=6A8W77m-ZTw&start=103&end=133`
      );
    },
  },
  {
    name: "resources",
    exactMatch: true,
    handler: ({ __storage, launchBrowser }) =>
      launchBrowser(__storage.urls.resources),
  },
  {
    name: "*",
    handler: ({ __storage, launchBrowser }) => {
      console.log(`${new Date()}: ${JSON.stringify(__storage)}`);
    },
  },
];
