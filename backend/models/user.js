const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  systemId: {type: String, required: true, unique: true},
  dateOfBirth: {type: Date, required: true},
  courseName: {type: String, required: true},
  gender: {type: String, required: true},
  contactNumber: {type: Number, required: true},
  role: {type: String, default: "Student"},
  avatar: {type: String, default: null}
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
  return token;
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;