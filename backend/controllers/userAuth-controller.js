const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const blTokenModel = require("../models/blacklistToken");
const courseModel = require("../models/course");
const userProgressModel = require("../models/user-progress");
const {cloudinary, uploadToCloudinary} = require("../config/cloudinary");


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
        res.status(500).json({message: "Server error: ", error: err.message})
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
    const { fullName, email, password, contactNumber } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let avatarData = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "EduConnect/avatar");
      avatarData = { public_id: result.public_id, url: result.secure_url };

      if (user.avatar?.public_id) {
        try {
          await cloudinary.uploader.destroy(user.avatar.public_id);
        } catch (e) {
          console.warn("Failed to delete old avatar:", e.message);
        }
      }
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName;

    if (email && email !== user.email) {
      const existingEmail = await userModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already in use" });
      }
      updateData.email = email;
    }

    if (contactNumber) updateData.contactNumber = contactNumber;

    if (password && password.length > 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (avatarData) updateData.avatar = avatarData;

    const updatedUser = await userModel.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({ success: true, message: "Profile updated successfully", user: userResponse });
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