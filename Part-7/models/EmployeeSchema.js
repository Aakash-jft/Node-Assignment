const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name:{ type:String , required:true},
    job:{type:String,required:true},
    salary:{type:Number,required:true}
})

const Employee = mongoose.model("employee",EmployeeSchema);

module.exports = Employee;