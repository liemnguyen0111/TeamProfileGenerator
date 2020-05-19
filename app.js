//Import classes
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

//Import html template
const {head,end} = require('./template.js')

//install npm to run this app
const {prompt} = require('inquirer')
const { promisify, callbackify } = require('util')
const axios = require('axios')

//fs that allow user to read and write to files
const {writeFile, appendFile}  = require('fs')
const fs = require('fs')
const wfs = promisify(writeFile)
const apfs = promisify(appendFile)
const body = []

//Employee list that contain all employees information
let employeeList = {
    manager : [],
    engineer : [],
    intern : []}

//A boolean use to keep track if manager profile has been created, only one manager per team
let isManager = false

//Use to store user info each time that create new user profile and reset once done
let info = []

//Use to check what type of profile is creating and reset once done
let isRole = ''

//Key type use to create questions
const keys = ['What is your name? ','What role are you playing? ','Your email address? ']

//Available roles
let role = ['Manager','Engineer','Intern']

//index is use to keep track of the number of questions for recursion and stop when out of bound
let index = 0

//Create questions
let createQuestions = () =>
{  
    if(index === 1)
    {
    return {
    type: 'list',
    name: 'choices',
    message: keys[index],
    choices : role
           }
    }
    else{
        return {
            type: 'input',
            name: 'name',
            message: keys[index],
            choices : role
                   }
    }
}

//Prompt user with questions to create new profile
let newProfile = () =>
{
 if(index < keys.length)
 {
 prompt(createQuestions())
 .then(data => {

    //Check if data.name is undefined, push if not
     if(data.name !== undefined)
     {info.push(data.name)}

    // console.log(data)
    //insert key to keys to create questions depend on the role
    switch(data.choices)
    {
        case 'Manager':
            keys.push('What is your office number? ')
            isRole = data.choices
        break
        case 'Engineer':
            keys.push('What is your Github username? ')
            isRole = data.choices
        break
        case 'Intern':
            keys.push('Which school are you going to? ')
            isRole = data.choices
        break
    }
    index++
    newProfile()
 })
 .catch(err => console.log(err))
}else
{
    //remove the last keys index once the profile is created
    keys.pop()

    //Once all the questions are asked, created the profile and push it into the employeeList
    info.splice(1,0,generateID())
    createNewProfile(info)
}
}

//Generate a random unique id for user
const generateID = () =>
{
    return Math.ceil(Math.random() * 9999)
}

let generateHTML = () =>
{
    wfs('./output/team.html','','utf8')
    const log = fs.createWriteStream('./output/team.html', {flags : 'a'})
    log.write(head)
    for(const prop in employeeList)
                {
                    let obj = employeeList[prop]
                    for(const key in obj)
                    {
                       log.write(createCard(obj[key]))
                    }
                }

    log.write(end)
    log.end()     
}

let createCard = (obj) =>
{    
     let temp = ''
    switch(obj.getRole())
    {
            case 'Manager':
                temp =  `Office number: ${obj.getOfficeNumber()}`
            break
            case 'Engineer':
                temp = `Github: ${obj.getGithub()}`
            break
            case 'Intern':
                temp = `School: ${obj.getSchool()}`
            break
    }
  
    return `  <div class="card border-success mb-3" style="max-width: 18rem;">
    <div class="card-header border-info p-3 mb-2 bg-dark text-info">
        <h5 class="card-title">${obj.getName()}</h5>
        <h5 class="card-title">${obj.getRole()}</h5>
    </div>
    <div class="card-body text-info">
          <section class ='card-text'> 
            <p>ID: ${obj.getId()}</p>
            <p>Email: ${obj.getEmail()}</p>
            <p>${temp}</p>
          </section>
    </div>
</div>`
}

//Display all the existing profiles on CLI
let viewProfile = () =>
{
    for(const prop in employeeList)
    {
        console.log(`=>>>>>>>> ${(prop).toUpperCase()}<<<<<<<<=`)
        let obj = employeeList[prop]
        for(const key in obj)
        console.log(`Name: ${obj[key].getName()} role: ${obj[key].getRole()}`)

    }
    init()
}

//Open a web page that display all the profiles
let viewProfileOnWeb = () =>
{
    console.log('view profile on web')
    init()
}

//Allow user to edit existing profiles
let editProfile = () =>
{
    let tempList = []
    for(const prop in employeeList)
    {
        let obj = employeeList[prop]
        for(const key in obj)
        tempList.push(`Name: ${obj[key].getName()} role: ${obj[key].getRole()} id: ${obj[key].getId()}`)

    }

   if(tempList.length > 0)
    {
        prompt({
            type: 'list',
            name: 'choices',
            message: 'Select an employee to edit',
            choices: tempList
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
    }else{
        console.log('Please add an employee before you can edit')
        init()}


}

let count = 0
//Create new object and push it into employee list
let createNewProfile = (info) =>
{  
    switch(isRole)
    {
        case 'Manager':
            employeeList.manager.push(new Manager(info[0],info[1],info[2],info[3]))
            isManager = true
            count++
            role.splice(0,1)
            generateHTML()
            init()
            break
        case 'Engineer':
            employeeList.engineer.push(new Engineer(info[0],info[1],info[2],info[3]))
            count++
            generateHTML()
            init()
            break   
         case 'Intern':
            employeeList.intern.push(new Intern(info[0],info[1],info[2],info[3]))
            count++
            generateHTML()
            init()
            break   
    }
  
}

//First stage when open on CLI 
let init = () =>
{
    isRole = ''
    index = 0
    info = []
    console.log(`================Welcome to template engine================`)
     prompt(
         {
            type: 'list',
            name: 'choices',
            message: `Please select one of the following:`,
            choices : ['Add new profile','View team profile','View team profile on >>website<<','Edit team profile','Exit']
         }
     )
    .then(({choices}) => {
        switch(choices)
        {
            case 'Add new profile':
                newProfile()
            break
            case 'View team profile':
                viewProfile()
            break
            case 'View team profile on >>website<<':
                viewProfileOnWeb()
            break
            case 'Edit team profile':
                editProfile()
            break
        }
    })
    .catch(err => console.log(err))
}

//init
init()

