const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        minLength: 4,
        maxLength: 10,
    },
    lastName : {
        type: String,
        lowercase: true,
        trim: true, 
        maxLength: 10,
    },
    emailId : {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,  
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Invalid email address: " + value);
            }
          },
    },
    password : {
        type: String,
        required: [true, 'Password is required'],
        validate(value) {
          if (!validator.isStrongPassword(value)) {
            throw new Error("Enter a Strong Password: " + value);
          }
        },
    },
    socketId : {
        type : String
    },
    profilePic : {
        type: String,
        default : "https://plus.unsplash.com/premium_photo-1682023585957-f191203ab239"
    },
    refreshToken: {
      type: String
  }
}, {timestamps : true});


userSchema.pre("save", async function (next){
  const user = this;

  if(!user.isModified("password")){
    return next();
  }

  user.password = await bcrypt.hash(user.password, 10);
  next();
})

userSchema.methods.verifyPassword = async function (passwordFromUser) {
  return await bcrypt.compare(passwordFromUser, this.password);
};

userSchema.methods.generateAuthToken =  function (){
  const user = this;

  return jwt.sign(
    {
      _id : user._id,
      firstName : user.firstName,
      emailId : user.emailId
    },
    process.env.TOKEN_KEY,
    {
      expiresIn : process.env.TOKEN_EXPIRY
    }
  )
}


const User = mongoose.model("User", userSchema)

module.exports = User;
