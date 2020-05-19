const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const {head,end} = require('./template.js')
const {prompt} = require('inquirer')
const { promisify } = require('util')
const axios = require('axios')
const {writeFile, readFile} = require('fs')
const wfs = promisify(writeFile)
const rfs = promisify(readFile)
const body = []

let employeeList = {
    manager : [],
    engineer : [],
    intern : []}

let isManager = false
const keys = ['name','role','id','office number','Github username','school']

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

createNewProfile(employeeList.manager,['name','id','email','officenum'],'manager')
createNewProfile(employeeList.intern,['name','id','email','school'],'intern')
createNewProfile(employeeList.engineer,'engineer')

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
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

init()