const {app} = require("./index");
const db =require("./models/index");
require("dotenv").config();

const port = process.env.PORT || 3000;

db.sequelize.sync().then((req)=>{
  app.listen(port, (req, res) => {
    try {
      console.log("server is running on ", port);
    } catch (error) {
      console.log(error);
    }
  });
})

