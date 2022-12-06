const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

let Employee = [
  {
    name: "a",
    job: "df",
    salary: 55000,
    id: 1,
  },
  {
    name: "sdf",
    job: "jft",
    salary: 300,
    id: 2,
  },
  {
    name: "hfhg",
    job: "dshg",
    salary: 100,
    id: 3,
  },
  {
    name: "sdmb",
    job: "sdag",
    salary: 456789,
    id: 4,
  },
];

function responceListner(req, res) {
  
    // fs.readFile("/home/jellyfish/Documents/Database/db.json",null,(err,data)=>{
    // })
    
    let buffer;
    let acc ='Access-Control-Allow-Origin'
    
    req.headers.origin="*";
    console.log(req.headers,res.headers);
    // req.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // req.setHeader("Access-Control-Allow-Credentials","true");
    // req.setHeader("Access-Control-Allow-Methods'","GET, POST, PUT, PATCH")
    if(req.method=="GET"){
        const { pathname ,query} = url.parse(req.url)
        // if (pathname !== '/Employee') {
        //     return handleError(res, 404)
        // }
        if(query){
            const {id} = qs.parse(query);
            let index = Employee.findIndex(a=>Number(a.id) == Number(id))
            res.writeHead(200);
            res.end(JSON.stringify(Employee[index]));
        }
        else{
            res.writeHead(200);
        res.end(JSON.stringify(Employee));
        }
        

    }

    else if (req.method == "POST") {
        req.on("data", (data => {
        buffer = JSON.parse(data);
        console.log(Employee,"before");
        buffer.id = Employee[Employee.length-1].id +1;
        console.log(Employee,"after");
        Employee.push(buffer);
        })).on("end",()=>{
        res.writeHead(200);
        console.log(JSON.stringify(buffer))
        res.end(JSON.stringify(buffer))
      })
      }
      else if(req.method=="PUT"){
        const {pathname,query} = url.parse(req.url)
        const {id} = qs.parse(query);
        if(pathname == "/Employee/put"){
            req.on("data",(data)=>{
                buffer = JSON.parse(data);
                buffer.id = id;
                console.log(buffer);
                let finId = Employee.findIndex((a) => Number(a.id) == Number(id));
                Employee[finId] = buffer;
            }).on("end",()=>{
    
                res.writeHead(200);
                console.log(JSON.stringify(buffer))
            res.end(JSON.stringify(buffer))
    
            })
          }

        }
        

            const { pathname ,query  } = url.parse(req.url)
            const {id} = qs.parse(query);
            console.log(req.method);
            console.log(pathname,query)
            if (pathname == '/Employee/del') {
            Employee = Employee.filter(user => user.id != id);
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(Employee));
            }
            else if(pathname=="/Employee/put"){
                req.on("data",(data)=>{
                    buffer = JSON.parse(data);
                    buffer.id = id;
                    let finId = Employee.findIndex((a) => Number(a.id) == Number(id));
                    Employee[finId] = buffer;
                }).on("end",()=>{
        
                    res.writeHead(200);
                    console.log(JSON.stringify(buffer))
                res.end(JSON.stringify(buffer))
                })

            }
        
    
            console.log(req.method);


            
    
  
}

const server = http.createServer(responceListner);

server.listen("8086", "localhost", () => {
  console.log("server is running on 8086");
});
