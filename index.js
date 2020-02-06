const inquirer = require('inquirer');
const axios = require('axios');


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

function getStars() {
    // returning so that i can await it later
    return (axios
        .get(`https://api.github.com/users/${data.username}/starred`)
        .then(function (resp) {
            data.stars = resp.data.length;
        }));
}


function init() {

    // User prompt
    inquirer.prompt(questions)
        .then(function (response) {
            // grabbing username and selected color and stroing in data object
            data.username = response.username.trim();
            data.color = response.color;

            // api call - github users
            axios
                .get(`https://api.github.com/users/${data.username}`)
                .then(async function (resp) {
                    let response = resp.data;

                    data.bio = response.bio;
                    data.followers = response.followers;
                    data.following = response.following;
                    data.repos = response['public_repos'];
                    data.location = response.location;
                    data.blog = response.blog;
                    data.name = response.name;
                    data.company = response.company;
                    data.imgURL = response['avatar_url'];
                    data.github = `https://www.github.com/${data.username}/`;


                    // number of starred repos
                    await getStars();


                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.log(data);
                });

        })


}

init();
