const inquirer = require('inquirer');
const axios = require('axios');
const htmlMaker = require('./generateHTML.js')
const fs = require('fs'),
    convertFactory = require('electron-html-to');

const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});

const Spinner = require('cli-spinner').Spinner;

const spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');


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

// function writeToFile(fileName, data) {

// }

function getStars() {
    // returning so that i can await it later
    return (axios
        .get(`https://api.github.com/users/${data.username}/starred`)
        .then(function (resp) {
            data.stars = resp.data.length;
        }));
}

// for google maps, need to use maps url builder and encode the
// https://www.google.com/maps/search/?api=1&query=${response.location}
// encodeURI() on the url with location at end

function init() {

    // User prompt
    inquirer.prompt(questions)
        .then(function (response) {
            let flag = false;

            // grabbing username and selected color and stroing in data object
            data.username = response.username.trim();
            data.color = response.color;
            spinner.start();

            // api call - github users
            axios
                .get(`https://api.github.com/users/${data.username}`)
                .then(async function (resp) {
                    let response = resp.data;

                    data.bio = response.bio;
                    data.followers = response.followers;
                    data.following = response.following;
                    data.repos = response['public_repos'];
                    data.location = encodeURI(`https://www.google.com/maps/search/?api=1&query=${response.location}`);
                    data.place = response.location;
                    data.blog = response.blog;
                    data.name = response.name;
                    data.company = response.company;
                    data.img = response['avatar_url'];
                    data.github = `https://www.github.com/${data.username}/`;


                    // number of starred repos
                    await getStars();


                })
                .catch(function (error) {
                    flag = true;
                    console.error('\nInvalid GitHub Username\nPlease enter a valid username');
                })

                .finally(function () {

                    if (!flag) {
                        // console.log(data);
                        let htmlString = htmlMaker.generateHTML(data);
                        // console.log(htmlString);

                        conversion({ html: htmlString }, function (err, result) {
                            if (err) {
                                return console.error(err);
                            }

                            // console.log(result.numberOfPages);
                            // console.log(result.logs);
                            result.stream.pipe(fs.createWriteStream('./profile.pdf'));
                            spinner.stop(true);
                            console.log('PDF successfully created!')
                            conversion.kill();
                        });
                    } else {
                        spinner.stop(true);
                    }
                });

        })


}

init();
