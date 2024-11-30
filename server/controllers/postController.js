const { getAllPosts, getMyPosts,findAndUpdatePost } = require("../models/postModel");
const { findUserById } = require("../models/userModel");
const postSchema = require("../schema/postSchema");

const createPost =async (req,res) =>{
      const {userId, description, picturePath} = req.body;
      try{
        const user = await findUserById({id:userId});

        const newPost = new postSchema({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        });

        await newPost.save();
        const post = await getAllPosts();
        res.send({
            status:201,
            message:"New Post created!",
            data:post,
        })
      }catch(error){
        res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
      }
}

const getFeedPosts = async (req,res) =>{
   
    try{
       const posts = await getAllPosts();
       res.send({
        status:201,
        message:"Read posts!",
        data:posts,
    })
    }catch(error){
        res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
}
const getMyPost =async(req,res)=>{
       const {id} = req.params;
    try{
     const posts = await getMyPosts({id:id});
     res.send({
        status:201,
        message:"Read my posts!",
        data:posts,
    })
    }catch(error){
        res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
}

const likePost = async(req,res) =>{
    const {id} = req.params;
    const userId = req.body;
    try{
        const post = await getMyPosts({id:id});
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }
        const updatedPost = await findAndUpdatePost({id,post});

        res.send({
            status:201,
            message:"likes updated!",
            data:updatedPost,
        })
    }catch(error){
        res.send({
            status:500,
            message:"Internal server error",
            error:error.message
        })
    }
}

module.exports = {createPost,getFeedPosts,getMyPost,likePost}