const express = require("express");
const route = express.Router();
const {
    getEmployee,
    getEmployeeById,
    addEmployee,
    deleteEmployee,
    updateEmployee,
  } = require("../controllers/EmployeeController");


  route.get("/Employee", getEmployee);
  route.get("/Employee/:id", getEmployeeById);
  route.post("/Employee/add", addEmployee);
  route.post("/Employee/:id", updateEmployee);
  route.post("/Employee/delete/:id", deleteEmployee);


  module.exports = route