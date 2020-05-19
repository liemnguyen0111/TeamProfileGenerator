
//Import Employee class in
let Employee = require('./Employee')

class Intern extends Employee
{
    constructor(name,id,email,school)
    {
         //Call the parent(Employee) class to initalize the data
        super(name,id,email)

        this.school = school || null
    }

    //Get school
    getSchool(){return this.school}

    //Get role
    getRole(){return 'Intern'}
}

// Export Employee class out for other classes to use and testing
module.exports = Intern