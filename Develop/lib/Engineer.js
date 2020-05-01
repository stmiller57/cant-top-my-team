// Engineer class that extends from Employee class
const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email, gitHubUser) {
        super(name, id, email);
        this.github = gitHubUser;
    };
    getRole() { return "Engineer" };
    getGithub() { return this.github };

};

module.exports = Engineer;