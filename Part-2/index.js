// /Documents/Database/db.json
const http = require("http");
const fs = require("fs");
const path = require("path");


function requestListener(req,res){

    fs.readFile("/home/jellyfish/Documents/Database/db.json","UTF-8",(err,html)=>{
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(html);
        console.log(err);
    })

}

const server = http.createServer(requestListener);


server.listen(8081,"localhost",()=>{
    console.log("server is running on port 8081");
})