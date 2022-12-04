const http = require("http");
const fs = require("fs")

const path = require("path");

const requestListener = function (req, res) {
    // res.writeHead(200);
    // // res.end('Hello, World!');
    // // console.log("server started")
    // res.send()
    fs.readFile("index.html","UTF-8",(err,html)=>{

        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);

    })
  }

const server = http.createServer(requestListener);
server.listen(8080,"localhost",()=>{
    console.log("server is running on port 8080 ")
});
