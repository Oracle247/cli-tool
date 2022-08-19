import * as fs from 'fs';
const CURR_DIR = process.cwd();

const createDirectoryContent = (templatePath, newProjectPath) => {
    const filesToCreate = fs.readdirSync(templatePath);
    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        const stats = fs.statSync(origFilePath); // get stats of the current file

        if (stats.isFile()) {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            if (file === '.npmignore') file = '.gitignore'; // rename .npmignore to .gitignore

            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`; // get the write path
            fs.writeFileSync(writePath, contents, 'utf8'); // write the file
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
            createDirectoryContent(`${templatePath}/${file}`, `${newProjectPath}/${file}`); // recursively call the function
        }
    });
}

export default createDirectoryContent;