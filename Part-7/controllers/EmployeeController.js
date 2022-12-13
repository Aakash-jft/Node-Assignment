const express = require("express");
const Employee = require("../models/EmployeeSchema")
const router = express.Router();


let arr= [];



let obj = {
  "Employee":arr,
  "name":"",
  "job":"",
  "salary":0,
  "flag":true
}

  

 





let getEmployee = async function (req, res) {
  try {
    let data = await Employee.find();
    obj.Employee=[...data];
    res.render("index",obj)
  } catch (error) {
    console.log(error)
  }
 
};
let getEmployeeById =  async function (req, res) {
  try {
      let data = await Employee.findById(req.params.id);
      obj.name=data.name;
      obj.job=data.job;
      obj.salary = data.salary;
      obj.id=data._id;
      obj.flag = false;
      res.status(200);
      res.redirect("/Employee");
    
  } catch (error) {
    console.log(error)
  }
  
};
let addEmployee =async function (req, res) {
 try {
    await Employee.create(req.body);
    for(let i in obj){
      if(i=="Employee" || i=="flag"){
        continue;
      }
      else{
        obj[i]=""
      }
    }
    res.status(200);
    res.redirect('/Employee');
 } catch (error) {
  console.log(error)
 }
};
let deleteEmployee = async function (req, res) {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200);
    res.redirect("/Employee");
  } catch (error) {
    console.log(error);
  }
  
};

let updateEmployee = async function (req, res) {
  try {
    await Employee.findByIdAndUpdate(obj.id,req.body);
    for(let i in obj){
      if(i=="Employee" || i=="flag"){
        continue;
      }
      else{
        obj[i]=""
      }
    }

    obj.flag=true;

    res.status(200);
    res.redirect("/Employee");
  } catch (error) {
    console.log(error);
  }
  
};



module.exports = {
  getEmployee,
  getEmployeeById,
  addEmployee,
  deleteEmployee,
  updateEmployee,
};
