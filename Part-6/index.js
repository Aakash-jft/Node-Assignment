const express = require("express");
const cors = require("cors");
const  bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const middleware = require("./middleware/authentication");
const connection = require("./middleware/dbConnection")
const {render, register} = require("./controllers/Register.controller")
const {
  getEmployee,
  getEmployeeById,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = require("./controllers/EmployeeController");
// const register = require("./controllers/Register.controller");


const app = express();

app.set("view engine","ejs");

app.use(express.static(__dirname + '/views'));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });


app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());




 

app.get("/login",render);
app.post("/login",register);
// app.use(connection);

app.use(middleware);

app.get("/Employee", getEmployee);
app.get("/Employee/:id", getEmployeeById);
app.post("/Employee/add", addEmployee);
app.post("/Employee/:id", updateEmployee);
app.post("/Employee/delete/:id", deleteEmployee);

module.exports = {app}
