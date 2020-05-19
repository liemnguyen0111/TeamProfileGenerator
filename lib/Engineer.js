//Import Employee class in
const Employee = require("./Employee");

class Engineer extends Employee
{
    constructor(name,id,email,github)
    {
        //Call the parent(Employee) class to initalize the data
        super(name,id,email)

        this.github = github
    }

    //Get github username
    getGithub(){return this.github}

    //Get role
    getRole(){return 'Engineer'}
}

// Export Employee class out for other classes to use and testing
module.exports = Engineer