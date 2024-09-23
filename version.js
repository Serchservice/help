const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const packageJsonPath = join(__dirname, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

const bumpVersion = (type) => {
    const versionParts = packageJson.version.split('.');
    if (type === 'patch') {
        versionParts[2] = parseInt(versionParts[2], 10) + 1;
    } else if (type === 'minor') {
        versionParts[1] = parseInt(versionParts[1], 10) + 1;
        versionParts[2] = 0;
    } else if (type === 'major') {
        versionParts[0] = parseInt(versionParts[0], 10) + 1;
        versionParts[1] = 0;
        versionParts[2] = 0;
    }

    packageJson.version = versionParts.join('.');
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
};

const type = process.argv[2];
if (!['patch', 'minor', 'major'].includes(type)) {
    console.error('Usage: node bump-version.js [patch|minor|major]');
    process.exit(1);
}

bumpVersion(type);
console.log(`Version bumped to ${packageJson.version}`);