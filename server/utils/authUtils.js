const userDataValidation = ({firstName, lastName, email, password})=>{
    return new Promise((resolve,reject)=>{
        if(!firstName || !lastName || !email || !password){
            reject("user data missing");
           }

        if(!isEmail(email)){
            reject("email is not a formated");
        }
     
       if(typeof firstName !== 'string') reject("firstName is not a text");
       if(typeof lastName !== 'string') reject("lastName is not a text");
       if(typeof email !== 'string') reject("email is not a text");
       if(typeof password !== 'string') reject("password is not a text");

        resolve();
    })
}

const isEmail = (text) => {
  let emailCheck =  (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text));
    return emailCheck;
  };

module.exports = {userDataValidation};