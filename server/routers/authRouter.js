const express = require("express");
const { registerController, loginController } = require("../controllers/authController");
const { upload } = require("../middleWare/fileStorage");

const authRouter = express.Router();

authRouter
         .post('/register',upload.single("picture"), registerController)
         .post('/login', loginController)


module.exports = {authRouter};
