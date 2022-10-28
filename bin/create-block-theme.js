#! /usr/bin/env node
const { execSync }    = require('child_process');
const updateJson      = require('./lib/updateJson.js');
const themeFileReader = require('./lib/themeFileReader.js');

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

let checkedOut
// If the repo name is not provided, exit.
// else, clone the repo and continue.

if (typeof repoName !== 'undefined') {
    checkedOut = runCommand(gitCheckoutCommand);
} else {
    console.error('Please provide a name for your theme.');
    console.log('Example: npx @elpuas/create-block-theme my-super-awesome-theme');
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
// Install the dependencies.
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