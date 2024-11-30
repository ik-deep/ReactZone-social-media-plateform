const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userDataValidation } = require("../utils/authUtils.js");
const { registerUser, findUserByKey } = require("../models/authModel.js");

const registerController = async (req, res) => {

  const { firstName, lastName, email, password, picturePath, location, occupation } = req.body;
  //data validation
  try {
    await userDataValidation({ firstName, lastName, email, password })
  } catch (error) {
    return res.status(400).json(error);
  }

  //store user data
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const userDb = await registerUser({ firstName, lastName, email, passwordHash, picturePath, location, occupation });
    return res.send({
      status: 201,
      message: "User registered successfully!",
      data: userDb,
    })
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error!",
      error: error.message,
    })
  }
}

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({
      status: 400,
      message: "Missing user credentials!",
    })
  }
  try {
    const userDB = await findUserByKey({ email });
    //checking user validate
    const isMatch = await bcrypt.compare(password, userDB.password);
    if (!isMatch) {
      return res.send({
        status: 400,
        message: "Incorrect password!",
      })
    }

    const token = jwt.sign({id:userDB._id}, process.env.JWT_SECRET);
   userDB.password="";

    return res.send({
      status: 201,
      message: "User login successfully!!",
      data:{userDB,token}
    })
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error!",
      error: error.message,
    })
  }

}


module.exports = { registerController, loginController };