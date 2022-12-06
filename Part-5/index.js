const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const middleware = require("./middleware/authentication");

const app = express();

const {getEmployee,getEmployeeById,addEmployee, deleteEmployee, updateEmployee} = require("./controllers/EmployeeController");
const  register  =require("./controllers/Register.controller")


app.use(cors());
app.use(express.json());

app.post("/register",register);
app.get("/",(req,res)=>{
    try {
        // console.log(app)
        res.send("Employee-express-server")
    } catch (error) {
        console.log(error)
    }
});

app.use(middleware);

app.get("/Employee/:id",getEmployeeById);
app.post("/Employee",addEmployee);
app.get("/Employee",getEmployee);
app.put("/employee/:id",updateEmployee);
app.delete("/Employee/:id",deleteEmployee);





module.exports = app;