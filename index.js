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

function writeToFile(fileName, data) {

}

function init() {

    // User prompt
    inquirer.prompt(questions)
        .then(function (response) {
            console.log(response);
            let username = response.username;
        })
}

init();
