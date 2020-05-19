class Employee
{
    //Initialize the properies using the data that passed in the parameter
    constructor(name,id,email)
    {
        this.name = name
        this.id = id
        this.email = email
    }

    //Get name
    getName(){return this.name}

    //Get id
    getId(){return this.id}

    //Get email
    getEmail(){return this.email}

    //Get role
    getRole(){return 'Employee'}
}

// Export Employee class out for other classes to use and testing
module.exports = Employee