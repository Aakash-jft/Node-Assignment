const express = require("express");
const db = require("../models/index")
const router = express.Router();


let Employee = [];



let obj = {
  "Employee":Employee,
  "Name":"",
  "Job":"",
  "Salary":0,
  "flag":true
}

  // const pool = mysql.createPool({
  //   connectionLimit:10,
  //   host:"localhost",
  //   user:"aakash",
  //   password:"123456",
  //   database: "Emplooyee"
  // })

  // const db = mysql.createConnection({

  //   connectionLimit:10,
  //   host:"localhost",
  //   user:"aakash",
  //   password:"123456",
  //   database: "Emplooyee"
  
  // });

  // db.connect((err) => {

  //   if (err) {
  
  //     throw err;
  
  //   }
  
  //   console.log("MySql Connected");
  
  // });
 





let getEmployee = async function (req, res) {
  // console.log("here")
  try {

      let data = await db.mytabs.findAll();
      console.log(data);

      Employee= [...data];
      obj = {...obj,"Employee":Employee};
           console.log(Employee);
        res.render("index",obj);

    // await db.query("SELECT * from Employees",async(err,rows)=>{
      
 
    //    if(!err){
    //      new Promise((resolve, reject) => {
    //        Employee= [...rows];
    //       obj = {...obj,"Employee":Employee};
    //        console.log(Employee);
    //      resolve(res.render("index",obj));
    //      })
         
    //    }
    //    else{
    //      console.log(err)
    //      return res.status(500).send(err.message);
    //    }
 
    //  })
  
    // await pool.getConnection(async(err,connection)=>{
    //   if(err) throw err
    //   console.log(`connected as id ${connection.threadId}`)
  
    //  await connection.query("SELECT * from Employees",async(err,rows)=>{
    //    await connection.release()
  
    //     if(!err){
    //       new Promise((resolve, reject) => {
    //         Employee= [...rows];
    //        obj = {...obj,"Employee":Employee};
    //         console.log(Employee);
    //       resolve(res.render("index",obj));
    //       })
          
    //     }
    //     else{
    //       console.log(err)
    //       return res.status(500).send(err.message);
    //     }
  
    //   })
    // })
    
    return 
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
let getEmployeeById =  async function (req, res) {
  try {
    const id = req.params.id;
    
    console.log(req.params.id);
    let data = await db.mytabs.findAll({
      where: {
        id: req.params.id
      }
    });

    res.status(200);
            let Employee= [...data];
            console.log(Employee[0].Name);
            obj.Name=Employee[0].Name;
            obj.Job = Employee[0].Job;
            obj.Salary = Employee[0].Salary;
            obj.id=id
            obj.flag=false;
            console.log(data,"update")
            res.redirect('/Employee');
     
    // await db.query("SELECT * from Employees WHERE id=?",id,async(err,rows)=>{
          
    
    //       if(!err){
    //         res.status(200);
    //         let Employee= [...rows];
    //         console.log(Employee[0].name);
    //         obj.name=Employee[0].name;
    //         obj.job = Employee[0].job;
    //         obj.salary = Employee[0].salary;
    //         obj.id=id
    //         obj.flag=false;
    //         console.log(rows,"update")
     
    //         res.redirect('/Employee');
    //       }
    //       else{
    //         console.log(err)
    //         return res.status(500).send(err.message);
    //       }
    
    //     })
    // await pool.getConnection(async(err,connection)=>{
    //   if(err) throw err
    //   console.log(`connected as id ${connection.threadId}`)
      

    // await connection.query("SELECT * from Employees WHERE id=?",id,async(err,rows)=>{
    //     connection.release()
  
    //     if(!err){
    //       res.status(200);
    //       let Employee= [...rows];
    //       console.log(Employee[0].name);
    //       obj.name=Employee[0].name;
    //       obj.job = Employee[0].job;
    //       obj.salary = Employee[0].salary;
    //       obj.id=id
    //       obj.flag=false;
    //       console.log(rows,"update")
   
    //       res.redirect('/Employee');
    //     }
    //     else{
    //       console.log(err)
    //       return res.status(500).send(err.message);
    //     }
  
    //   })
    // });



    

  
    
    return 
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
let addEmployee =async function (req, res) {
  try {

    await db.mytabs.create({
      Name: req.body.name,
      Job: req.body.job,
      Salary:req.body.salary

    });
    res.status(200);
    res.redirect('/Employee');

      // await db.query("INSERT INTO Employees SET ?",req.body,(err,rows)=>{
       
      //   if(!err){
          
      //      console.log(rows);
      //      obj.name="";
      //     obj.job = "";
      //     obj.salary = "";
      //      res.status(200);
      //       res.redirect('/Employee');
      //   }
      //   else{
      //     console.log(err)
      //     return res.status(500).send(err.message);
      //   }
      // })

    // await pool.getConnection(async(err,connection)=>{
    //   if(err) throw err
    //   console.log(`connected as id ${connection.threadId}`)
  
    // await connection.query("INSERT INTO Employees SET ?",req.body,(err,rows)=>{
    //     connection.release()
  
    //     if(!err){
          
    //        console.log(rows);
    //        obj.name="";
    //       obj.job = "";
    //       obj.salary = "";
    //        res.status(200);
    //         res.redirect('/Employee');
    //     }
    //     else{
    //       console.log(err)
    //       return res.status(500).send(err.message);
    //     }
  
    //   })
    // })
        
    return;
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
let deleteEmployee = async function (req, res) {
  try {
    console.log(req.params.id);
    await db.mytabs.destroy({
      where: {
        id: req.params.id
      }

    });
    res.status(200);
    res.redirect('/Employee');

    // await db.query("DELETE from Employees WHERE id=?",req.params.id,async(err,rows)=>{
       
  
    //     if(!err){
    //        res.redirect('/Employee');
    //     }
    //     else{
    //       console.log(err)
    //       return res.status(500).send(err.message);
    //     }
  
    //   })
    // await pool.getConnection(async(err,connection)=>{
    //   if(err) throw err
    //   console.log(`connected as id ${connection.threadId}`)
  
    // await connection.query("DELETE from Employees WHERE id=?",req.params.id,async(err,rows)=>{
    //     connection.release()
  
    //     if(!err){
    //        res.redirect('/Employee');
    //     }
    //     else{
    //       console.log(err)
    //       return res.status(500).send(err.message);
    //     }
  
    //   })
    // });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

let updateEmployee = async function (req, res) {
  try {
    let id = req.params.id;
    console.log(req.params.id);

            obj.name="";
            obj.job = "";
            obj.salary = "";
            obj.flag=true;
    
    await db.mytabs.update({Name: req.body.name, Job : req.body.job , Salary : req.body.salary},{where:{id:req.params.id}});
    res.redirect('/Employee');

    // await db.query("UPDATE Employees SET name=?,job=?,salary=? WHERE id=?",[name,job,salary,id],async(err,rows)=>{
    
    //       if(!err){
    //         obj.name="";
    //         obj.job = "";
    //         obj.salary = "";
    //         obj.flag=true;
    //         res.status(200);
    //         res.redirect("/Employee");
    //       }
    //       else{
    //         console.log(err)
    //         return res.status(500).send(err.message);
    //       }
    
    //     })
    // await pool.getConnection(async(err,connection)=>{
    //   if(err) throw err
    //   console.log(`connected as id ${connection.threadId}`)
      
    //   let {name,job,salary} = req.body;

    // await connection.query("UPDATE Employees SET name=?,job=?,salary=? WHERE id=?",[name,job,salary,id],async(err,rows)=>{
    //     connection.release()
  
    //     if(!err){
    //       obj.name="";
    //       obj.job = "";
    //       obj.salary = "";
    //       obj.flag=true;
    //       res.status(200);
    //       res.redirect("/Employee");
    //     }
    //     else{
    //       console.log(err)
    //       return res.status(500).send(err.message);
    //     }
  
    //   })
    // });
    
    
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
