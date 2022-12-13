const {app} = require("./index");
const connect = require("./config/database");

require("dotenv").config();

const port = process.env.PORT || 3000;


  app.listen(port, async(req, res) => {
    try {
      await connect();
      console.log("server is running on ", port);
    } catch (error) {
      console.log(error);
    }
  });

