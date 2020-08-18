const path = require("path");
const readline = require("readline");

const rootDir = path.resolve(__dirname, "..");
const getPath = (...paths) => path.resolve(rootDir, ...paths);
const rootPackagePath = getPath("package.json");
const credentialDir = getPath("settings/key.json");

const fse = require("fs-extra");

const fs = require("fs");

// Credit for package.json fun (MIT) https://github.com/storybookjs/storybook/blob/50367f9fa9ddb2fbec2177d7192ea88b62efe5e2/lib/cli/src/js-package-manager/PackageJsonHelper.ts
function writeJson(filePath, content) {
    return fse.writeJson(filePath, content);
}

function readPackageJson(packageJsonPath) {
    if (!fs.existsSync(packageJsonPath)) {
        return false;
    }

    const jsonContent = fs.readFileSync(packageJsonPath, "utf8");
    return JSON.parse(jsonContent);
}

function write(packageJsonPath, key, val) {
    const packageContent = readPackageJson(packageJsonPath);
    packageContent[key] = val;
    writeJson(packageContent, packageJsonPath);
}

function writeConfigType(type) {
    write(rootPackagePath, "config", {
        type,
    });
}

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
        "",
    ];
    const candidate = res ? res.toLowerCase() : false;
    if (no.includes(candidate)) {
        return false;
    } else {
        return true;
    }
}
module.exports = {
    writeJson,
    readPackageJson,
    write,
    writeConfigType,
    askQuestion,
    credentialDir,
    confirm,
    rootPackagePath
};