//Import Employee class in
const Employee = require("./Employee");

class Engineer extends Employee
{
    constructor(name,id,email,github,url)
    {
        //Call the parent(Employee) class to initalize the data
        super(name,id,email)

        this.github = github || null

        this.url = url
    }

    //Get github username
    getGithub(){return this.github}

    //Get role
    getRole(){return 'Engineer'}

    //Get url
    getUrl(){return this.url}
}

// Export Employee class out for other classes to use and testing
module.exports = Engineer