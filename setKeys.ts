const fs = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
console.log(argv.updateCodeGen);
const targetPath = (argv.updateCodeGen) ? `./codegen.yml` : `./src/environments/environment.ts`;
let content = fs.readFileSync(targetPath, 'utf8');

if (content.indexOf('<GITHUB_AUTH_TOKEN>') < 0){
    process.exit(-1);
}

content = content.replace('<GITHUB_AUTH_TOKEN>', process.env.GITHUB_AUTH_TOKEN)
            .replace('<GITHUB_CLIENT_ID>', process.env.GITHUB_CLIENT_ID)
            .replace('<GITHUB_SECRET>', process.env.GITHUB_SECRET);
fs.writeFileSync(targetPath, content);