const args = process.argv.slice(2);
const {
  askQuestion,
  writeJson,
  credentialDir,
  confirm,
  rootPackagePath,

} = require("./index");
const [command, flag] = args;
const skipConfirms = Boolean(flag === "-y" || flag === "-Y");

async function main(command) {
  console.log(`\n## --------------------------`);
  console.log(`## Key will be stored in ${credentialDir}`);
  console.log(`## --------------------------\n`);

  if (command === "set_credential") {
    const credential = await askQuestion(
      "Enter your API Key (CTRL-C to cancel): "
    );
    const res = await writeJson(credentialDir, {
      key: credential,
    });
    return res;
  }

  if (command === "reset_credential") {
    if (!skipConfirms) {
      console.log(`This will destroy the key stored in ${credentialDir}`);
      const proceed = await confirm(`Do you want to proceed? (CTRL-C to quit)`);
      if (!proceed) return;
    }
    const res = await writeJson(credentialDir, {
      key: "placeholder",
    });
    console.log("Credential reset", res)
  }

  if (command === "set_typescript") {
    const package = require(rootPackagePath);
    package.config.type = "typescript";
    const res = await writeJson(rootPackagePath, package);
  }
}



main(command);