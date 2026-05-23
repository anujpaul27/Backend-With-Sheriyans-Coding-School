const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function register (req,res)
{
    try 
    {
        // 1. get the user info from the body 
        const {username,email,password} = req.body;

        // 2. This user info exist or not 
        const isUserExist = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        })

        // if user exist response and return 
        if (isUserExist)
        {
            return res.status(403).json({
                message: "User already exist.",
            })
        }

        // 4. hash password 
        const hashPassword = await bcrypt.hash(password,10)

        //5.Create User and save to the mongoDB 
        const user = await userModel.create({
            username,
            email,
            password: hashPassword
        })

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET
        )

        res.cookie('token', token)

        // Success response 
        res.status(201).json({
            message: 'User Registration Successful.',
            data: user
        })
        
    }
    catch (err)
    {
        res.status(403).json({
            message: err.message
        })
    }
}

module.exports = {register}