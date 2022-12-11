const express = require("express");
const mysql = require("mysql")
const router = express.Router();


let Employee = [];



let obj = {
  "Employee":Employee,
  "name":"",
  "job":"",
  "salary":0,
  "flag":true
}

  const pool = mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    user:"aakash",
    password:"123456",
    database: "Emplooyee"
  })

 





let getEmployee = async function (req, res) {
  // console.log("here")
  try {
  
    await pool.getConnection(async(err,connection)=>{
      if(err) throw err
      console.log(`connected as id ${connection.threadId}`)
  
     await connection.query("SELECT * from Employees",async(err,rows)=>{
       await connection.release()
  
        if(!err){
          new Promise((resolve, reject) => {
            Employee= [...rows];
           obj = {...obj,"Employee":Employee};
            console.log(Employee);
          resolve(res.render("index",obj));
          })
          
        }
        else{
          console.log(err)
          return res.status(500).send(err.message);
        }
  
      })
    })
    
    return 
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
let getEmployeeById =  async function (req, res) {
  try {
    const id = req.params.id;
    
    console.log(req.params.id);
    await pool.getConnection(async(err,connection)=>{
      if(err) throw err
      console.log(`connected as id ${connection.threadId}`)
      

    await connection.query("SELECT * from Employees WHERE id=?",id,async(err,rows)=>{
        connection.release()
  
        if(!err){
          res.status(200);
          let Employee= [...rows];
          console.log(Employee[0].name);
          obj.name=Employee[0].name;
          obj.job = Employee[0].job;
          obj.salary = Employee[0].salary;
          obj.id=id
          obj.flag=false;
          console.log(rows,"update")
   
          res.redirect('/Employee');
        }
        else{
          console.log(err)
          return res.status(500).send(err.message);
        }
  
      })
    });



    

  
    
    return 
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
let addEmployee =async function (req, res) {
  try {
   
    await pool.getConnection(async(err,connection)=>{
      if(err) throw err
      console.log(`connected as id ${connection.threadId}`)
  
    await connection.query("INSERT INTO Employees SET ?",req.body,(err,rows)=>{
        connection.release()
  
        if(!err){
          
           console.log(rows);
           obj.name="";
          obj.job = "";
          obj.salary = "";
           res.status(200);
            res.redirect('/Employee');
        }
        else{
          console.log(err)
          return res.status(500).send(err.message);
        }
  
      })
    })
        
    return;
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
let deleteEmployee = async function (req, res) {
  try {
    console.log(req.params.id);
    await pool.getConnection(async(err,connection)=>{
      if(err) throw err
      console.log(`connected as id ${connection.threadId}`)
  
    await connection.query("DELETE from Employees WHERE id=?",req.params.id,async(err,rows)=>{
        connection.release()
  
        if(!err){
           res.redirect('/Employee');
        }
        else{
          console.log(err)
          return res.status(500).send(err.message);
        }
  
      })
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

let updateEmployee = async function (req, res) {
  try {
    let id = req.params.id;
    console.log(req.params.id);
    await pool.getConnection(async(err,connection)=>{
      if(err) throw err
      console.log(`connected as id ${connection.threadId}`)
      
      let {name,job,salary} = req.body;

    await connection.query("UPDATE Employees SET name=?,job=?,salary=? WHERE id=?",[name,job,salary,id],async(err,rows)=>{
        connection.release()
  
        if(!err){
          obj.name="";
          obj.job = "";
          obj.salary = "";
          obj.flag=true;
          res.status(200);
          res.redirect("/Employee");
        }
        else{
          console.log(err)
          return res.status(500).send(err.message);
        }
  
      })
    });
    
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
};



module.exports = {
  getEmployee,
  getEmployeeById,
  addEmployee,
  deleteEmployee,
  updateEmployee,
};
