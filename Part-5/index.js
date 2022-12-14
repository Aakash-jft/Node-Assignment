const express = require("express");
const cors = require("cors");
const  bodyParser = require("body-parser");
const middleware = require("./middleware/authentication");
const register = require("./controllers/Register.controller");
const cookieParser = require("cookie-parser");
const {
  getEmployee,
  getEmployeeById,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = require("./controllers/EmployeeController");

const app = express();






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


app.post("/register", register);
app.get("/", (req, res) => {
  try {
    res.send("Employee-express-server");
  } catch (error) {
    console.log(error);
  }
});

app.use(middleware);

app.get("/Employee/:id", getEmployeeById);
app.post("/Employee", addEmployee);
app.get("/Employee", getEmployee);
app.put("/employee/:id", updateEmployee);
app.delete("/Employee/:id", deleteEmployee);

module.exports = app;
