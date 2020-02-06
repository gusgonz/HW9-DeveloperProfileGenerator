const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'username'
    },
    {
        type: 'list',
        message: 'Pick a color:',
        name: 'color',
        choices: [
            'green',
            'blue',
            'pink',
            'red'
        ]
    }
];

const data = {};

function writeToFile(fileName, data) {

}


async function init() {

    // User prompt
    inquirer.prompt(questions)
        .then(function (response) {
            // grabbing username and selected color
            let gitUsername = response.username.trim();
            let color = response.color;
            console.log(gitUsername, color);
        })


}

init();
