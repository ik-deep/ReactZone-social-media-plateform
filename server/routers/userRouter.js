const express = require("express");
const {getUser, getUserFriends, addRemoveFriends}  = require("../controllers/userControllers");
const { verifyToken } = require("../middleWare/auth");


const userRouter = express.Router();

userRouter
         .get("/:id",verifyToken,getUser)
         .get("/:id/friends",verifyToken,getUserFriends)
         .patch("/:id/:friendId",verifyToken,addRemoveFriends)

module.exports = {userRouter};