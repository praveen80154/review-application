const User = require('../models/usermodels')
const jwt = require('jsonwebtoken');

const crypto=require('crypto');
//new user register
exports.registerUser = async (req, res) =>{ 
    try{
        const {name, email, password} = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email address is already registered." });
        }
        const user = await User.create({name,email,password});
        const token=user.getJwtToken();
        const options={
            expires:new Date(Date.now()+7* 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie('token', token, options).status(201).json({ success: true, user,token,options });
    }catch(err){
        console.log(err)
        res.status(400).json({ message: err.message });
    }
};
//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid user" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        const token=user.getJwtToken();
        const options={
            expires:new Date(Date.now()+7* 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie('token', token, options);
        res.status(201).json({ success: true, user, token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
//logout
exports.logout = async (req, res) => {
    try {
        const options={
            expires:new Date(Date.now()),
            httpOnly: true,
        }
        res.cookie('token',null,options)
        res.status(200).json({ success: true,message:"logged out"});
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

//user profile
exports.myprofile=async(req,res)=>{
    const user= await User.findById(req.user.id);
    res.status(200).json({ success: true,user});
}
//password change
exports.changepassword  = async (req, res) => {
    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await user.matchPassword(req.body.oldpassword);
    if (!isMatch) {
            return res.status(401).json({ success: false, message: "old password is wrong" });
    }
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success:true,
        message:'Password changed successfully'
    })
};
//all user for admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};