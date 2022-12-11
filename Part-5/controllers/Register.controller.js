const jwt = require("jsonwebtoken");

require("dotenv").config;

let register = (req, res) => {
  try {
    let user = req.body.name;
    console.log(user);
    const accesstoken = jwt.sign({ user }, process.env.KEY);

    console.log(typeof(accesstoken));

    res.cookie("key","kkajdfu",()=>{
      console.log("done");
    });

    res.send(accesstoken);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = register;
