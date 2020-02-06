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


function init() {

    // User prompt
    inquirer.prompt(questions)
        .then(function (response) {
            // grabbing username and selected color
            data.username = response.username.trim();
            data.color = response.color;
            console.log(data.username, data.color);
        })


}

init();
