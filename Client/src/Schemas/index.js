import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    firstName : Yup.string()
    .min(4, "first name must be at least 4 characters")
    .max(10, "first name must be at most 8 characters")
    .required("Please enter your first name"),

    lastName : Yup.string()    
    .min(4, "last name must be at least 4 characters")
    .max(10, "last name must be at most 8 characters")
    .required("Please enter your last name"),
 
    emailId: Yup.string() 
    .email("Please enter a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email format"
    )
    .required("Email is required"),

    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    .required("Please enter your password"),
})

export const driveSignUpSchema = Yup.object({
  firstName : Yup.string()
  .min(4, "first name must be at least 4 characters")
  .max(10, "first name must be at most 8 characters")
  .required("Please enter your first name"),

  lastName : Yup.string()    
  .min(4, "last name must be at least 4 characters")
  .max(10, "last name must be at most 8 characters")
  .required("Please enter your last name"),

  emailId: Yup.string() 
  .email("Please enter a valid email")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Please enter a valid email format"
  )
  .required("Email is required"),

  password: Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
  )
  .required("Please enter your password"),

  vehicleColor : Yup.string()
  .min(3, "Vehicle color must be at least 3 characters long")
  .required("Vehicle color is required"),

  vehicleCapacity : Yup.number()
  .min(1, "Vehicle capacity must be at least 1")
  .required("Please enter vehicle capacity"),

  vehiclePlateNumber : Yup.string()
  .min(3, "Vehicle plate number must be at least 3 characters long")
  .required("Please enter vehicle plate number"), // Vehicle type is required

  vehicleType : Yup.string()
  .required("Please enter vehicle type"),
})