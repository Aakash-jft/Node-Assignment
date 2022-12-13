const mongoose = require("mongoose");
require("dotenv").config;
const connect=async()=>{
    try {
        await  mongoose.connect(process.env.SRC);
        console.log("connected to db")
    } catch (error) {
        console.log(error);
    }
  
}

module.exports = connect;