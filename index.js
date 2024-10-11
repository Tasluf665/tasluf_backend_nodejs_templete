const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const projectRoot = path.resolve(__dirname, '..', '..');
const allContent = require('./allContent');

const createFiles = (folderPath, fileName, content) => {
    const dir = path.join(projectRoot, folderPath);
    const filePath = path.join(dir, fileName);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content);
}

const createFolder = (folderPath) => {
    const dir = path.join(projectRoot, folderPath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

const installDependencies = () => {
    console.log('Installing dependencies...');

    // Run the npm install command using child_process
    exec('cd .. && cd .. && npm install express cors dotenv ejs joi joi-objectid lodash mongoose', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during npm install: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log('Dependencies installed successfully!');
    });
}



const main = () => {
    createFiles("middleware", "async.js", allContent.asyncContent)
    createFiles("middleware", "error.js", allContent.errorContent)
    createFolder("models")
    createFolder("routes")
    createFolder("utils")
    createFolder("views")
    createFiles("", ".env", allContent.envContent)
    createFiles("", ".gitignore", allContent.gitignoreContent)
    createFiles("", "app.js", allContent.indexContent)

    installDependencies()
};

main();