const jwt = require("jsonwebtoken");

require("dotenv").config;


let render = (req,res)=>{
  try {
    res.render("login");
    
  } catch (error) {
    res.status(400).send(error.message)
  }
}

let register = (req, res) => {
  try {
    let user = req.body;
    console.log(user);
    const accesstoken = jwt.sign({ user }, process.env.KEY);

    // console.log(typeof(accesstoken));

    res.cookie("key",accesstoken);
    res.redirect('/Employee');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {register,render};
