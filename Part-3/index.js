const http = require("http");
const fs = require("fs");




function requestListner(req,res){
    if(req.url==="/"){
        fs.readFile("/home/jellyfish/Documents/Node-http/Node-Assignment/Part-1/index.html","UTF-8",(err,html)=>{
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
            if(err){
                console.log(err);
            }
        })
    }else if(req.url==="/text"){
        res.end("this is a text")
    }
    else if(req.url==="/json"){
        fs.readFile("/home/jellyfish/Documents/Database/db.json","UTF-8",(err,html)=>{
            res.writeHead(200, {"Content-Type": "text/json"});
            res.end(html);
            console.log(err);
        })
    }
    
}





const server  = http.createServer(requestListner);


server.listen(8085,"localhost",()=>{
    console.log("server id running on port 8085");
})