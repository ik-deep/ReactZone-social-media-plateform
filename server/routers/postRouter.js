const express = require("express");
const { createPost, getFeedPosts, getMyPost } = require("../controllers/postController");

const postRouter = express.Router();

postRouter
         .post("/create-post",createPost)
         .get("/getAllPost",getFeedPosts)
         .get("/:id/getMyPost",getMyPost)

module.exports = {postRouter}