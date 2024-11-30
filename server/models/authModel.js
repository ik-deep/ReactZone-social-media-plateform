const userSchema = require("../Schema/userSchema");

const registerUser = ({firstName, lastName, email, passwordHash, picturePath, location, occupation}) =>{
    return new Promise(async(resolve,reject)=>{
         //checking for username or email existing  
         const userAlreadyExist = await userSchema.findOne({ $or: [{ email: this.email }] });
         if (userAlreadyExist && userAlreadyExist.email == email)
             reject("Email already exist!");

        const newUserObj = new userSchema({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })
        try {
            const userDb = await newUserObj.save();
            resolve(userDb);
        } catch (error) {
            reject(error);
        }
    })
}

const findUserByKey = ({email}) =>{
      return new Promise(async(resolve,reject)=>{
        try{
            const userDb = await userSchema.findOne({email:email}).select("+password");
            if(!userDb) reject("user not found!");
            resolve(userDb);
        }catch(error){
           
            reject(error);
        }
      })
}

module.exports = {registerUser,findUserByKey};