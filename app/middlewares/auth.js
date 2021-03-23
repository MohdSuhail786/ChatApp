const { check } = require("express-validator");
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.registerValidation = [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
];    

exports.loginValidation = [
  check("email", "Email is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
]; 

exports.auth = async (req,res,next) => {
  let authorizationHeader = req.header("Authorization")
  if (!authorizationHeader) {
    return res.json({message: "Unauthorized"}).status(404)
  }
  authorizationHeader = authorizationHeader.split(" ")
  const bearer = authorizationHeader[0]
  const accessToken = authorizationHeader[1]

  if(bearer != "Bearer") {
    return res.json({message: "The type is must be Bearer"}).status(400)
  }
  if(!accessToken) {
    return res.json({message:"No access token found"}).status(404)
  }
  try {
    const jwtData = await jwt.verify(accessToken,process.env.SECRET_KEY)
    if(!jwtData) {
      return res.json({message:"Unauthorized"}).status(401)
    }
    req.user = jwtData.user
    next()
  } catch(err) {
    console.log(err.message)
    return res.json({message: "Unauthorized"}).status(401)
  }
}