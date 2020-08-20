// export interface Command {
//   name: string | string[];
//   handler: (object) => any;
//   exactMatch ? : boolean;
//   sync ? : boolean;

// }
/**
 * $ npx rocketlaunch create
 * $ npx rocketlaunch create -n my_directory
 * $ npx rocketlaunch create -n "new project"
 *
 *
 * $ npx rocketlaunch serve -c XX-XXXXXXXX
 * $ npx rocketlaunch serve -f ~/Desktop/key.json
 * $ npx rocketlaunch serve -p 8005
 * $ npx rocketlaunch serve -c XX-XXXXXX -r /beer
 *
 *
 * # create: scaffold a project
 *  Alias: init, build, scaffold
 *  -c specified, don't ask for API key, otherwise ask quiz
 *  -n specified, don't ask for directory name, just create a new directory
 *
 * # serve: serve endpoint on /chat
 *  -r set an additional route with
 *  -c set the credential, otherwise ask
 *  -p set the port
 *  -f set flag
 *
 * [x] # learn
 * [x] # resources
 * -y flag
 */

const argv = require("minimist")(process.argv.slice(2));
const path = require("path");
const {
  // runNPMScript,
  mkdir,
  copyDir,
  templateDir,
  writeJson,
  askQuestion,
  loud,
} = require("./../util/index");

const commandRunner = async (candidate, commands, args = {}) => {
  const debug = (flag) => {
    return function (...payload) {
      if (flag) {
        console.log.apply(console, payload);
      }
    };
  };
  const __debug = debug(true);

  console.log("##", args);
  const normalizer = (command) => {
    const normal = {
      name: [""],
      sync: command.sync ? true : false,
      exactMatch: command.exactMatch ? true : false,
      handler({ __storage }) {
        return __storage;
      },
    };
    if (typeof command.name === "string") {
      normal.name.push(command.name);
    } else {
      normal.name = command.name;
    }
    if (typeof command.handler === "function") {
      normal.handler = command.handler;
    }
    return normal;
  };
  // Facts about world, injected as params
  const __storage = {
    urls: {
      deck: "https://gpt3.valgaze.com",
      resources:
        "https://github.com/valgaze/gpt3-chat/blob/master/docs/resources.md",
    },
  };

  const launchBrowser = (x) => console.log("<launchBrowser>", x);

  // Find matching command if any
  // Match found, invoke handler w/ helpers
  // Done.
  const matchingCommand = commands.filter((command) => {
    const { name } = command;
    if (typeof name === "string") {
      return name === candidate;
    } else {
      for (let i = 0; i < name.length; i++) {
        const possible = name[i];
        if (candidate === possible) {
          return true;
        }
      }
    }
  });

  __debug("<handler>", matchingCommand);

  // Caught command
  if (matchingCommand && matchingCommand.length) {
    const normalize = normalizer(matchingCommand[0]);
    const { handler, sync = false } = normalize;
    if (handler && typeof handler === "function") {
      const cwd = process.cwd();

      const HANDLER_PAYLOAD = {
        __storage,
        launchBrowser,
        cwd,
        path,
        __debug,
        args,
      };
      if (sync === true) {
        return handler.call(this, HANDLER_PAYLOAD);
      } else {
        return await handler.call(this, HANDLER_PAYLOAD);
      }
    }
  } else {
    __debug(`No match for ${candidate}`);
  }
};

const runCommands = (commands, roster, args) => {
  let payload = commands;
  if (typeof commands === "string") {
    payload = [commands];
  }
  payload.forEach((command) => {
    commandRunner(command, roster, args);
  });
};

const roster = [
  {
    name: ["create", "build", "init", "start"],
    handler: ({ args }) => {
      console.log("#", args);
      console.log(`WIP....
      const runCommands = (commands, roster) => { let payload = commands if (typeof commands === 'string') { payload = [commands] } payload.forEach((command) => { commandRunner(command, roster) }) };
      `);
    },
  },
  {
    name: ["serve", "init", "server", "serrve", "start", "st"],
    handler: async ({ args }) => {
      console.log("## route", args.route);
      // Boot serve
      // Pass on args
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
  learn (rocketlaunch learn)
  serve (rocketlaunch serve -c XX-XXXXXXXX)
  resources (rocketlaunch resources)
  
Options:
  -n,  Create directory: -n my_directory
  -c,  Pass in API credential: -c XX-XXXXXXXX
  -p,  Set port: -p 5555


Examples:
  $ npx rocketlaunch serve -c XX-XXXXXXXX

  $ npx rocketlaunch -n my_directory -c XX-XXXXXXXX`);
    },
  },
  {
    name: ["learn", "gpt3", "101"],
    handler: ({ __storage, launchBrowser }) =>
      launchBrowser(__storage.urls.deck),
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

const notice = () => {
  if (msg) {
    loud(msg);
  } else {
    loud(`Error: Missing credential/API key, pass thru using the -c flag:
    
    $ rocketlaunch serve -c XX-XXXXXXXXXXXXXXX
    
    $ npx rocketlaunch serve -c XX-XXXXXXXXXXXXXXX
  `);
  }
};

// Helpers

const askData = async (msg) => {
  const val = await askQuestion(msg);
  return val;
};
const askAPIKey = async () =>
  await askData(`If you have your API key, enter it here (or CTRL-C to quit)`);

const validRoute = (route) =>
  route && route.charAt("/") === "/" ? route : undefined;

// process.argv
const {
  _: commands,
  y = false,
  p: port,
  c: credential,
  n: directory,
  r: route,
} = argv;

const all_args = {
  port,
  credential,
  directoryName: directory,
  directoryPath: directory ? path.resolve(process.cwd(), directory) : null,
  skipConfirms: Boolean(y),
  route: validRoute(route),
};

runCommands(commands, roster, all_args);
