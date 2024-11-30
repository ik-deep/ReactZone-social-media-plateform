const userSchema = require("../Schema/userSchema")

const findUserById = ({id})=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const userDb = await userSchema.findOne({_id:id});
            if(!userDb) reject("User not found!");
            resolve(userDb);
        }catch(error){
            reject(error);
        }
    })
}

module.exports = {findUserById}