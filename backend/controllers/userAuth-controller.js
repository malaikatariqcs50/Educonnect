const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const blTokenModel = require("../models/blacklistToken");
const courseModel = require("../models/course");
const userProgressModel = require("../models/user-progress");


const signupController = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {fullName, email, password, gender, dateOfBirth, systemId, contactNumber, courseName} = req.body;

    if(!fullName || !password || !email || !courseName || !gender || !dateOfBirth || !contactNumber || !systemId){
        return res.status(400).json({message: "All fields are required!"})
    }

    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already Exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            fullName,
            email,
            password: hashedPassword,
            gender,
            contactNumber,
            courseName,
            dateOfBirth,
            systemId
        })

        await user.save();
        await courseModel.updateOne({title: courseName}, {$inc: {enrolled: 1}});
        const userProgress = new userProgressModel({
            userId: user._id,
            fullName,
            courseName
        })
        await userProgress.save();
        const token = user.generateAuthToken();
        res.status(201).json({user, token})
    }
    catch(err){
        res.status(500).json({message: "Server error: ", err})
    }
}

const loginController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email or password is invalid" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email or password is invalid" });
        }

        const token = user.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Login error" });
    }
}

const profileController = (req, res)=>{
    res.status(200).json(req.user)
}

const logoutController = async (req, res)=>{
     res.clearCookie('token');
     const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blTokenModel.create({token});
    res.status(200).json({message: 'Logged out!'})
}

const editProfile = async (req, res) => {
  try {
    const { fullName, email, password, contactNumber, avatar } = req.body;
    const userId = req.user.id;
   // const avatarFile = req.file;


    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (contactNumber) updateData.contactNumber = contactNumber;
    if (password) updateData.password = password
    if(avatar){
      updateData.avatar = avatar;
    }
     //if (avatarFile) {
      //updateData.avatar = await processUploadedFile(avatarFile);
    //}

    const result = await userModel.updateOne({ _id: userId }, { $set: updateData });
    const user = await userModel.findById(userId)
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error while updating profile" });
  }
};


module.exports = {
    signupController,
    loginController,
    profileController,
    logoutController,
    editProfile
};