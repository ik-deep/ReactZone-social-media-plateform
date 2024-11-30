const postSchema = require("../schema/postSchema");

const getAllPosts = () =>{
    return new Promise(async(resolve,reject)=>{
        try{
          const allPosts = await postSchema.find();
          if(!allPosts) reject("Post not found");
          resolve(allPosts);
        }catch(error){
            reject(error);
        }
    })
}

const getMyPosts = ({id}) =>{
    return new Promise(async(resolve, reject)=>{
        try{
          const myPosts = await postSchema.findOne({userId:id});
          resolve(myPosts);
        }catch(error){
            reject(error);
        }
    })
}

const findAndUpdatePost = ({id,post}) =>{
    return new Promise(async(resolve, reject)=>{
        try{
          const likePost = await postSchema.findByIdAndUpdate(id,{likes:post.likes},{new:true});
          resolve(likePost);
        }catch(error){
            reject(error);
        }
    })
}



module.exports = {getAllPosts, getMyPosts,findAndUpdatePost};