const express = require("express");
const corse = require("cors");
const jwt = require("jsonwebtoken")
const middleware = require("./middlewear/authantication");

const app = express();

const {getEmployee,getEmployeeById,addEmployee, deleteEmployee, updateEmployee} = require("./controllers/EmployeeController");
const  register  =require("./controllers/Register.controller")


app.use(corse());
app.use(express.json());



app.post("/register",register);


app.get("/Employee",middleware,getEmployee);
app.get("/Employee/:id",middleware,getEmployeeById);
app.post("/Employee",middleware,addEmployee);
app.put("/employee/:id",updateEmployee);
app.delete("/Employee/:id",deleteEmployee);


app.get("/",(req,res)=>{
    try {
        // console.log(app)
        res.send("Employee-express-server")
    } catch (error) {
        console.log(error)
    }
})


module.exports = app;