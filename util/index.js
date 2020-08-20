const runScript = require("@npmcli/run-script");
const copydir = require("copy-dir");
const makeDir = require("make-dir");
const writeJsonRef = require("write-json");
const fs = require('fs');
const path = require("path");
const readline = require("readline");

// Config
const rootDir = path.resolve(__dirname, "..");
const getPath = (...paths) => path.resolve(rootDir, ...paths);
const templateRoot = getPath("_template");
const getTemplatePath = (...paths) => path.resolve(templateRoot, ...paths);
const frontendPath = getPath('frontend')

// Template content
const package = getTemplatePath("package.json");
const credentialDir = getTemplatePath("settings");
const typescriptDir = getTemplatePath("typescript");
const javascriptDir = getTemplatePath("javascript");

const utilDir = getTemplatePath("util");

// Logger
const {
  loud,
  good,
  bad
} = require("./logger");
const {
  resolve
} = require("path");


const allTemplate = [
  package,
  credentialDir,
  typescriptDir,
  javascriptDir,
  utilDir,
];

function askQuestion(questionString) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(questionString, function (res) {
      resolve(res);
      rl.close();
    });
  });
}

function readJSON(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        try {
          const parsedData = JSON.parse(data)
          resolve(
            parsedData
          )
        } catch (err) {
          reject(
            err
          )
        }
      }
    });
  })
}
async function confirm(questionString) {
  const res = await askQuestion(questionString);
  //   const yes = [
  //     "yes",
  //     "y",
  //     "yy",
  //     "yah",
  //     "sure",
  //     "yep",
  //     "yeah",
  //     1,
  //     "1",
  //     "yeep",
  //     "true",
  //     true,
  //   ];
  const no = [
    "no",
    "n",
    "nn",
    "no",
    "noo",
    "nope",
    "nah",
    0,
    "0",
    "nooo",
    "false",
    false,
    " ",
    "",
  ];
  const candidate = res ? res.toLowerCase() : false;
  if (no.includes(candidate)) {
    return false;
  } else {
    return true;
  }
}

const runNPMScript = async (folderPath, cmd, args = []) => {
  return new Promise((resolve, reject) => {
    runScript({
        event: cmd,
        args,
        path: folderPath,
        scriptShell: "/bin/bash",
        stdioString: true,
        stdio: "inherit",
        banner: false,
      })
      .then(({
        code,
        signal,
        stdout,
        stderr,
        pkgid,
        path,
        event,
        script
      }) => {
        const payload = {
          code,
          signal,
          stdout,
          stderr,
          pkgid,
          path,
          event,
          script,
        };
        resolve(payload);
      })
      .catch((er) => {
        reject({
          err: er,
        });
      });
  });
};



function writeJson(path, data) {
  return new Promise((resolve, reject) => {
    writeJsonRef(path, data, function (err, data) {
      if (err) {
        reject({
          err
        })
      } else {
        resolve({
          data
        })
      }
    });
  })
}


function copyDir(to, from) {

  const filter = (state, filePath, filename) => {
    return !filePath.includes('node_modules')
  }
  return new Promise((resolve, reject) => {
    copydir(to, from, {
      filter
    }, function (err, rest = {}) {
      if (err) {
        reject({
          err,
        });
      } else {
        resolve({
          data: rest,
        });
      }
    });
  });
}

module.exports = {
  askQuestion,
  allTemplate,
  runNPMScript,
  confirm,
  templateDir: templateRoot,
  mkdir: makeDir,
  copyDir,
  writeJson,
  loud,
  good,
  bad,
  readJSON,
  frontendPath,
  getPath
};