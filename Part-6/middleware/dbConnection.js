const mysql = require("mysql")

async function connection(req,res,next){
    const pool = mysql.createPool({
      connectionLimit:10,
      host:"localhost",
      user:"aakash",
      password:"123456",
      database: "Emplooyee"
    })
  
   await pool.getConnection((err,connection)=>{
          if(err) throw err
          console.log(`connected as id ${connection.threadId}`)
      
         connection.query("SELECT * from Employees",(err,rows)=>{
            connection.release()
      
            if(!err){
              
               req.data=[...rows];
               next();
            }
            else{
              console.log(err)
              return res.status(500).send(err.message);
            }
      
          })
        })
  
  
  }

  module.exports = connection;