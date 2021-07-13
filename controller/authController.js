const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

exports.signUp = async (req,res) => {
    const {username,password} = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username: username,
            password: hashPassword
        });
        // This basically writes the user details to our session which is
        // maintained in redis database
        req.session.user = newUser;
        res.status(201).json({
            status: "Successful",
            message: "User created successfullly",
            data: {
                user: newUser,
            }
        });
    } catch(e) {
        res.status(400).json({
            status: "Failed"
        });
    }
}

exports.login = async (req,res) => {
    const {username,password} = req.body
    try {
        const user = await User.findOne({username})
        if (!user){
            return res.status(400).json({
                status: "Failed",
                message:"User not found",
            });
        }else{
            const isCorrect = await bcrypt.compare(password, user.password)
            // This basically writes the user details to our session which is
            // maintained in redis database
            req.session.user = user;
            if (isCorrect){
                return res.status(200).json({
                    status: "Successful",
                    message:"Login Successful",
                });
            }else{
                return res.status(400).json({
                    status: "Failed",
                    message:"Incorrect password or username",
                })
            }
            
        }
    } catch(e) {
        res.status(400).json({
            status: "Failed",
        });
    }
}