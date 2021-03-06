// Variables used in building CLI application
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs").promises;

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamArray = [];
const render = require("./lib/htmlRenderer");

// Function to start building team
function teamBuilder() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "You are the team manager. What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?"
        },
    ])
        .then((answers) => {
            const manager = new Manager(
                answers.managerName,
                answers.id,
                answers.email,
                answers.officeNumber
            );
            teamArray.push(manager);
            buildTeam();
        });
};

// Function to add engineers and interns to team
function buildTeam() {
    return inquirer.prompt([
        {
            type: "list",
            name: "nextMember",
            message: "What is team member's role?",
            choices: ["Engineer", "Intern", "Your team is complete and better than any other team!"],
        },
    ])
        .then((teamBuilding) => {
            switch (teamBuilding.nextMember) {
                case "Engineer":
                    getEngineer();
                    break;
                case "Intern":
                    getIntern();
                    break;
                default:
                    finalTeam();
            }
        });
};
function getEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "gitHub",
            message: "What is your engineer's GitHub username?"
        },
    ])
        .then((answers) => {
            const engineer = new Engineer(
                answers.name,
                answers.id,
                answers.email,
                answers.gitHub
            );
            teamArray.push(engineer);
            buildTeam();
        });
};
function getIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?",
        },
    ])
        .then((answers) => {
            const intern = new Intern(
                answers.name,
                answers.id,
                answers.email,
                answers.school
            );
            teamArray.push(intern);
            buildTeam();
        });
};

// Function to output team
function finalTeam() {
    fs.writeFile(outputPath, render(teamArray), "utf-8");
};

async function init() {
    try {
        teamBuilder();
    } catch (err) {
        console.log(err);
    };
};

init();