const fs = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const isCodeGen = argv.isCodeGen;
const targetPath = (isCodeGen) ? `./codegen.yml` : `./src/environments/environment.ts`;
let content = fs.readFileSync(targetPath, 'utf8');

if (!process.env.GITHUB_AUTH_TOKEN){
    console.log(`
    create .env file on root with the following entries:

    GITHUB_AUTH_TOKEN=
    GITHUB_CLIENT_ID=
    GITHUB_SECRET=    
    `);
}

if (content.indexOf('<GITHUB_AUTH_TOKEN>') >= 0){
    content = content.replace('<GITHUB_AUTH_TOKEN>', process.env.GITHUB_AUTH_TOKEN)
    .replace('<GITHUB_CLIENT_ID>', process.env.GITHUB_CLIENT_ID)
    .replace('<GITHUB_SECRET>', process.env.GITHUB_SECRET);
    fs.writeFileSync(targetPath, content);
}

