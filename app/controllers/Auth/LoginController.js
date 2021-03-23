const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
require('dotenv').config()

exports.login = async (req,res) => {

    let {email,password} = req.body

    let user = await User.findOne({email:email})
    if(!user) {
        res.json({message:"Invalid login credentials"}).status(422)
    }
    
    let verifyPassword = await bcrypt.compare(password,user.password)
    if(!verifyPassword) {
        res.json({message:"Invalid login credentials"}).status(422)
    }
    const payload = {
        user: {
            id:user._id,
            name: user.name,
            email: user.email,
        },
    }
    let accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 })
    let refreshToken = jwt.sign(payload, process.env.REFRESEH_KEY, { expiresIn: 24 * 60 * 60 })

    res.json({message:"Login successfuly",accessToken: accessToken, refreshToken: refreshToken}).status(200)
}