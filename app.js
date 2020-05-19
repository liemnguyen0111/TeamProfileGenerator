//Import classes
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

//Import html template
const {head,end} = require('./template.js')

//install npm to run this app
const {prompt} = require('inquirer')
const { promisify } = require('util')
const axios = require('axios')

//fs that allow user to read and write to files
const {writeFile, readFile} = require('fs')
const wfs = promisify(writeFile)
const rfs = promisify(readFile)
const body = []

//Employee list that contain all employees information
let employeeList = {
    manager : [],
    engineer : [],
    intern : []}

//A boolean use to keep track if manager profile has been created, only one manager per team
let isManager = false

//Key type use to create questions
const keys = ['name','role','id','office number','Github username','school']

//Prompt user with questions to create new profile
let newProfile = () =>
{
 console.log('new Profile')
}

//Display all the existing profiles on CLI
let viewProfile = () =>
{
    console.log('view profile')
}

//Open a web page that display all the profiles
let viewProfileOnWeb = () =>
{
    console.log('view profile on web')
}

//Allow user to edit existing profiles
let editProfile = () =>
{
    console.log('edit profile')
}

//Create new object and push it into employee list
let createNewProfile = (employee,info,type) =>
{  
    let emp
    switch(type)
    {
        case 'manager':
            emp = new Manager(info[0],info[1],info[2],info[3])
            break
        case 'engineer':
            emp = new Engineer(info[0],info[1],info[2],info[3])
            break   
         case 'intern':
            emp = new Intern(info[0],info[1],info[2],info[3])
            break   
    }
   employee.push(emp)
}

// createNewProfile(employeeList.manager,['name','id','email','officenum'],'manager')
// createNewProfile(employeeList.intern,['name','id','email','school'],'intern')
// createNewProfile(employeeList.engineer,'engineer')

//First stage when open on CLI 
let init = () =>
{
    console.log(`================Welcome to template engine================`)
     prompt(
         {
            type: 'list',
            name: 'choices',
            message: `Please select one of the folling:`,
            choices : ['Add new profile','View team profile','View team profile on >>website<<','Edit team profile']
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