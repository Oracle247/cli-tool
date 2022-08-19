#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createDirectoryContents from './createDirectoryContents.js';
const CURR_DIR = process.cwd();

const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'Which project template would you like to create?',
        choices: CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'What is the name of your project?',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a name for your project.';
            }
        }
    }
];
inquirer.prompt(QUESTIONS).then(answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;
  
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  
    createDirectoryContents(templatePath, projectName);
  });