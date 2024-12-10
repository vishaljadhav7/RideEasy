const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Define the driver schema
const driverSchema = new mongoose.Schema({
    fullName :{
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
       }
    },
    email: {
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
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate(value) {
          if (!validator.isStrongPassword(value)) {
            throw new Error("Enter a Strong Password: " + value);
          }
        },
    },
    profilePic : {
        type: String,
        default : "https://plus.unsplash.com/premium_photo-1682023585957-f191203ab239"
    },
    socketId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: [true, 'Vehicle color is required'],
            minlength: [3, 'Vehicle color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: [true, 'Vehicle plate number is required'],
            minlength: [3, 'Vehicle plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: [true, 'Vehicle capacity is required'],
            min: [1, 'Vehicle capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: [true, 'Vehicle type is required'],
            enum: ['car', 'motorcycle', 'auto'],
        },
    },
    location: {
        ltd: {
            type: Number,
            required: [true, 'Latitude is required'],
            validate: {
                validator: function (v) {
                    return validator.isFloat(String(v), { min: -90, max: 90 });
                },
                message: 'Latitude must be between -90 and 90',
            },
        },
        lng: {
            type: Number,
            required: [true, 'Longitude is required'],
            validate: {
                validator: function (v) {
                    return validator.isFloat(String(v), { min: -180, max: 180 });
                },
                message: 'Longitude must be between -180 and 180',
            },
        },
    },
});


driverSchema.methods.generateToken =  function (){
    const driver = this;
  
    return jwt.sign(
      {
        _id : driver._id,
        firstName : driver.firstName,
        emailId : driver.emailId
      },
      process.env.TOKEN_KEY,
      {
        expiresIn : process.env.TOKEN_EXPIRY
      }
    )
  }


driverSchema.methods.isPasswordCorrect = async function (passwordFromUser) {
    return bcrypt.compare(passwordFromUser, this.password);
};


driverSchema.pre('save', async function (next) {
    const user = this;

  if(!user.isModified("password")){
    return next();
  }

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
