//Import Employee class in 
const Employee = require("./Employee")

class Manager extends Employee
{
    constructor(name,id,email,officeNumber)
    {
        //Call the parent(Employee) class to initalize the data
        super(name,id,email)

        this.officeNumber = officeNumber || null
    }

    //Get office number
    getOfficeNumber(){return this.officeNumber}

    //Get role
    getRole(){return 'Manager'}
}

// Export Manager class out for other classes to use and testing
module.exports = Manager