#! /usr/bin/env node
const readline = require('readline');
const { execSync } = require('child_process');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

console.log("create-block-theme");


const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to execute ${command}`, error);
        return false;
    }
    return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/elpuas/create-block-based-theme.git ${repoName}`;
const npmInstallCommand = `cd ${repoName} && npm install`;

console.log(`Creating a new WordPress theme called ${repoName}...`);
console.log('');
console.log('Cloning the repo...');
const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) {
    console.error('Failed to checkout the repo');
    process.exit(1);
}

console.log(`Installing dependencies for ${repoName}...`);

const installed = runCommand(npmInstallCommand);

if (!installed) {
    console.error('Failed to install dependencies');
    process.exit(1);
}

console.log(`Success! Created ${repoName} at ${process.cwd()}/${repoName}`);
console.log('Inside that directory, you can run several commands:');
console.log('');
console.log('  npm run start');
console.log('    Starts the development server.');
console.log('');
console.log('  npm run build');
console.log('    Bundles the app files for production.');