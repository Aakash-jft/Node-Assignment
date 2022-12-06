const express = require("express");
const router = express.Router();




let getEmployee = function(req,res){
    // console.log("here")
    try {
        // console.log(req)
        return res.status(200).send(Employee);
    } catch (error) {
        return res.status(500).send(error.message);
    }

}
let getEmployeeById = function(req,res){
    try {
        const id = req.params.id;
    
        let index = Employee.findIndex(e=>Number(e.id)==Number(id));
        console.log(Employee[index],id);
        return res.status(200).send(Employee[index]);
        
    } catch (error) {
       return res.status(500).send(error.message);
    }
    
}
let addEmployee = function(req,res){
    try {
        
        console.log(req.body);
        req.body.id=(Employee.length>0?Employee[Employee.length-1].id+2:0)
        Employee.push(req.body);
        return res.status(200).send(req.body);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}
let deleteEmployee = function(req,res){
    try {
        let id = req.params.id;
        Employee = Employee.filter(e=>Number(e.id)!=Number(id));
        
        return res.status(200).send(Employee);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

let updateEmployee = function(req,res){
    try {
        let id = req.params.id;
        let index = Employee.findIndex(e=>Number(e.id)==Number(id));
        // req.body.id=(Employee.length>0?Employee[Employee.length-1].id+2:0)
        req.body.id=id;
        Employee[index]=req.body;
        console.log(req.body);

        return res.status(200).send(Employee);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

let Employee = [
    {
      name: "a",
      job: "df",
      salary: 55000,
      id: 1,
    },
    {
      name: "sdf",
      job: "jft",
      salary: 300,
      id: 2,
    },
    {
      name: "hfhg",
      job: "dshg",
      salary: 100,
      id: 3,
    },
    {
      name: "sdmb",
      job: "sdag",
      salary: 456789,
      id: 4,
    },
  ];

  module.exports = {getEmployee,getEmployeeById,addEmployee,deleteEmployee,updateEmployee};