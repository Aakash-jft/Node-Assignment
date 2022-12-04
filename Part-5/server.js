const app = require("./index");

require("dotenv").config();

const port = process.env.PORT || 3000;


app.listen(port,(req,res)=>{
    try {
        console.log("server is running on ",port );
    } catch (error) {
        console.log(error);
    }
})