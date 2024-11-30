const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const clc = require("cli-color")
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require('path');
const { authRouter } = require("./routers/authRouter");
const { userRouter } = require("./routers/userRouter");
const { postRouter } = require("./routers/postRouter");
const userSchema = require("./Schema/userSchema");
const postSchema = require("./schema/postSchema");
const { users, posts } = require("./data");


// // CONFUGURATION
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(fileURLToPath(import.meta.url));  both line not requred in es6 because __dirname now persent in globally
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


//mongodb connection 
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log(clc.yellowBright("mongodb connected successfully"));
})
.catch((error) => {
    console.log(clc.red(error));
})

//middlewares
app.use(express.json())
app.use(express.json());


//API Calls
app.use("/auth",authRouter)
app.use('/users',userRouter);
app.use("/posts",postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(clc.yellowBright(`Server Port: ${PORT}`)));
    /* ADD DATA ONE TIME */
    // userSchema.insertMany(users);
    // postSchema.insertMany(posts);

