#! /usr/bin/env node
const runCommand         = require('./lib/runCommand.js');
const updateJson         = require('./lib/updateJson.js');
const themeFileReader    = require('./lib/themeFileReader.js');
const repoName           = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/elpuas/create-block-based-theme.git ${repoName}`;
const npmInstallCommand  = `cd ${repoName} && npm install`;
let checkedOut
const format = /^[0-9-]+$/gm;

if (typeof repoName !== 'undefined' && format.test(repoName) ) {
    checkedOut = runCommand(gitCheckoutCommand);
} else {
    console.error('Error: Please use a valid name for your theme');
    console.log('Script Example: npx @elpuas/create-block-theme my-super-awesome-theme');
    process.exit(1);
}

console.log(`Creating a new WordPress theme called ${repoName}...`);
console.log('');
console.log('Cloning the repo...');

if (!checkedOut) {
    console.error('Failed to checkout the repo');
    process.exit(1);
}

console.log('Repo cloned successfully.');
console.log('');
console.log(`Installing dependencies for ${repoName}...`);

const installed = runCommand(npmInstallCommand);
if (!installed) {
    console.error('Failed to install dependencies');
    process.exit(1);
}

console.log('Dependencies installed successfully.');
console.log('');
console.log('Updating package.json...');
console.log('');

updateJson( repoName );

console.log('Updating style.css...');
console.log('');

themeFileReader( repoName, 'style.css' );

console.log(`Success! Created ${repoName} at ${process.cwd()}/${repoName}`);
console.log('');
console.log(`cd ${repoName} and start hacking.`);
console.log('Inside that directory, you can run several commands:');
console.log('');
console.log('  npm run start');
console.log('    Starts the development server.');
console.log('');
console.log('  npm run build');
console.log('    Bundles the app files for production.');
console.log('');
console.log('Happy Coding!');
console.log('');
