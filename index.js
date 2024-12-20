const fs = require('fs');
const path = require('path');
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
    createFiles("", "helpNote..txt", allContent.helpNoteContent)
};

main();