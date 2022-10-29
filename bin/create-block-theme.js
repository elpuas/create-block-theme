#! /usr/bin/env node
const runCommand         = require('./lib/runCommand.js');
const updateJson         = require('./lib/updateJson.js');
const themeFileReader    = require('./lib/themeFileReader.js');
const chalk              = require('chalk');
const prompts            = require('prompts');
const repoName           = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/elpuas/create-block-based-theme.git ${repoName}`;
const npmInstallCommand  = `cd ${repoName} && npm install`;
let checkedOut

if (typeof repoName !== 'undefined' && repoName.match(format)) {
        checkedOut = runCommand(gitCheckoutCommand);
} else {
    console.error(`${chalk.red('Error:')} Please use a valid name for your theme`);
    console.log(`Script Example: npx @elpuas/create-block-theme chalk.green(my-super-awesome-theme)`);
    process.exit(1);
}

console.log(`Creating a new ${chalk.green('WordPress')} theme called ${repoName}...`);
console.log('');
console.log('Cloning the repo...');

if (!checkedOut) {
    console.error(chalk.red('Failed to checkout the repo'));
    process.exit(1);
}

console.log(`Repo cloned ${chalk.green('successfully')}!`);
console.log('');
console.log(`Installing dependencies for ${chalk.green(repoName)}...`);

const installed = runCommand(npmInstallCommand);
if (!installed) {
    console.error(chalk.error('Failed to install dependencies'));
    process.exit(1);
}

console.log(`Dependencies installed ${chalk.green('successfully')}.`);
console.log('');
console.log('Updating package.json...');
console.log('');

updateJson( repoName );

console.log('Updating style.css...');
console.log('');

themeFileReader( repoName, 'style.css' );

console.log(`Success! Created ${chalk.green(repoName)} at ${process.cwd()}/${repoName}`);
console.log('');
console.log(`cd ${chalk.green(repoName)} and start hacking.`);
console.log('');
console.log('Inside that directory, you can run several commands:');
console.log('');
console.log('  npm run start');
console.log('    Starts the development server.');
console.log('');
console.log('  npm run build');
console.log('    Bundles the app files for production.');
console.log('');
console.log('*******************');
console.log(`*  ${chalk.green('Happy Coding!')}  *`);
console.log('*******************');
console.log('');
