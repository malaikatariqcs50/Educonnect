const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { body } = require('express-validator');
const {signupController, loginController, profileController, logoutController, editProfile} = require("../controllers/userAuth-controller");
const userAuth = require("../middlewares/authMiddleware");

router.post('/register', [
    body("email").isEmail().withMessage('Invalid email'),
    body('fullName').isLength({min: 3}).withMessage("Name must be 3 characters long!"),
    body('password').isLength({min: 6}).withMessage("Password must be 6 characters long"),
    body('dateOfBirth').isDate().withMessage('Invalid date format'),
    body('contactNumber').isLength({min: 11}).withMessage('Enter a valid number')
], signupController);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginController);

router.get('/profile', userAuth, profileController);
router.get('/logout', userAuth, logoutController);
router.put("/edit-profile", userAuth, upload.single('avatar'), editProfile)

module.exports = router;