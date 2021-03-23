const {validationResult} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')

exports.register = async (req,res) =>{
    let error = validationResult(req)
    if (!error.isEmpty()) {
        res.json({
            error : error.array()
        }).status(422)
    }
    let {name,email,password} = req.body;
  
    try {
        let existingUser = await User.findOne({email:email});
        
        if(existingUser) {
            res.json({message:"User already registered"}).status(422)
        }
        let hash = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password,hash)
        let newUser = User({
            name:name,
            email:email,
            password:password
        })
        await newUser.save()
    } catch (err) {
        res.json({message:err.array}).status(422)
    }

    res.json({message:"User registered successfully"}).status(200)
}