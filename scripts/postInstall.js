let execSync = require("child_process").execSync;
let fs = require("fs");
let path = require("path");

function installDevDependencies() {
  console.log("Adding dev dependencies for the project...");

  let devDependenciesJsonPath = path.resolve("devDependencies.json");
  let devDependencies = JSON.parse(fs.readFileSync(devDependenciesJsonPath));

  for (let depName in devDependencies) {
    let depVersion = devDependencies[depName];
    let depToInstall = depName + "@" + depVersion;
    console.log("Adding " + depToInstall + "...");
    execSync(`yarn add ${depToInstall} -D`, { stdio: "inherit" });
  }
}

function replaceAppKey() {
  execSync(`yarn add replace-in-file -D`, { stdio: "inherit" });

  let appJsonPath = path.resolve("app.json");
  let appName = JSON.parse(fs.readFileSync(appJsonPath)).name;

  let replace = require("replace-in-file");

  replace.sync({
    files: [path.resolve("index.android.js"), path.resolve("index.ios.js")],
    from: "react-native-template-juang",
    to: appName
  });
}

function cleanup() {
  let devDependenciesJsonPath = path.resolve("devDependencies.json");
  fs.unlink(devDependenciesJsonPath);
  execSync(`rm -rf ${devDependenciesJsonPath}`);
}

function postTemplateInit() {
  installDevDependencies();
  replaceAppKey();
  cleanup();
}

postTemplateInit();
