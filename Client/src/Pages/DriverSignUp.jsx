import {  useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { driveSignUpSchema } from "../Schemas";
import { BASE_URL } from "../constants";
import { useFormik } from 'formik';
import axios from "axios";
import { useDispatch} from 'react-redux';
import { addDriver } from "../utils/driverSlice";
import { useEffect } from "react"


const initialValues = {
  firstName: "",
  lastName: "",
  emailId: "",
  password: "",
  vehicleColor : "",
  vehicleCapacity : "",
  vehiclePlateNumber : "",
  vehicleType : "",
};


const DriverSignUp = () => {
  const [errorMessage, setErrorMessage] = useState('') 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSubmit, setIsSubmit] = useState(false) 


  const { values, handleSubmit, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues,
    validationSchema: driveSignUpSchema,
    onSubmit: async (values) => {
      const {firstName, lastName, emailId, password, vehicleCapacity, vehiclePlateNumber, vehicleColor, vehicleType} = values;
      const captainData = {
        fullName: {
          firstName: firstName,
          lastName: lastName
        },
        emailId: emailId,
        password: password,
        vehicleDetails: {
          color: vehicleColor,
          plateNumber: vehiclePlateNumber,
          capacity: vehicleCapacity,
          type: vehicleType
        }
      }      
      try {
        const res = await axios.post(
          BASE_URL + "/auth/driver/signup",
          captainData
        );
         
        localStorage.setItem('token', res.data.token)
        dispatch(addDriver(res.data.data)) 
        return navigate("/drive-home");
      } catch (err) {
        setErrorMessage(err?.response?.data || "Something went wrong");
      }
    },
  });
 

  useEffect(()=> {
    const canSubmit = Object.keys(values).every(field => Boolean(values[field]))
    setIsSubmit(canSubmit) 
  }, [values])

  return (
    <div className="h-screen w-full md:flex bg-gradient-to-br from-orange-100 to-orange-300 md:bg-white">
      {/* Left section with the form */}
      <div className="h-full md:w-[40%] w-[100%] flex items-center justify-center bg-white shadow-md md:rounded-r-lg">
        <form 
         className="w-[80%] md:w-[75%] bg-white h-[90%] shadow-lg p-6 flex flex-col gap-6 rounded-lg border border-gray-200 overflow-y-scroll"
     
         >
          <h2 className="text-3xl font-bold text-center text-gray-800">Driver Sign Up</h2>

          {/* Full Name Section */}
          <div className="space-y-1">
            <label className="block text-gray-700">Full Name</label>
            <div className="flex gap-4 items-center">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}          
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="">
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
             )}
            </div>
          </div>

          {/* Email Section */}
          <div className="space-y-1">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="emailId"
              value={values.emailId}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.emailId && touched.emailId && (
              <p className="text-red-500 text-sm">{errors.emailId}</p>
            )}
          </div>

          {/* Password Section */}
          <div className="space-y-1">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Vehicle Information Section */}
          <div className="space-y-1">
            <label className="block text-gray-700">Vehicle Information</label>

            <div className="flex gap-4 items-center">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder='Vehicle Color'
                  name="vehicleColor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.vehicleColor}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="w-1/2">
                <input
                  type="text"
                  placeholder='Vehicle Plate'
                  name="vehiclePlateNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.vehiclePlateNumber}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
           <div>
           {errors.vehicleColor && touched.vehicleColor && (
              <p className="text-red-500 text-sm">{errors.vehicleColor}</p>
            )}
            {errors.vehiclePlateNumber && touched.vehiclePlateNumber && (
              <p className="text-red-500 text-sm">{errors.vehiclePlateNumber}</p>
            )}
           </div>

            <div className="flex gap-4 items-center mt-3">
              <div className="w-1/2">
                <input
                    type="number"
                    placeholder='Vehicle Capacity'
                    name="vehicleCapacity"
                    min={1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.vehicleCapacity}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="w-1/2">
                <select
                  required
                  name="vehicleType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  value={values.vehicleType}
                  className="bg-gray-100 w-full rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled >
                    Select Vehicle Type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">MotorCycle</option>
                </select>
              </div>

               </div>
               <div>
               {errors.vehicleCapacity && touched.vehicleCapacity && (
              <p className="text-red-500 text-sm">{errors.vehicleCapacity}</p>
            )}
            {errors.vehicleType && touched.vehicleType && (
              <p className="text-red-500 text-sm">{errors.vehicleType}</p>
            )}
            </div>
          </div>

          <button
          onClick={handleSubmit}
          type="submit"
          disabled={!isSubmit}
          className={`px-4 py-2 text-white rounded-md font-semibold ${
            isSubmit
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-300 cursor-not-allowed"
          } transition-all duration-300`}
          >Sign Up</button>
        <p className='text-center'>Already have a account? <Link to={"/driver-signin"} className='text-blue-600'>Login here</Link></p>
        </form>

      </div>

   
      <div className="h-full w-[60%] md:flex flex-col items-center justify-center gap-4 hidden md:visible bg-gradient-to-bl from-orange-100 to-orange-300 shadow-inner p-6 rounded-l-lg">
        <h1 className="text-4xl font-bold text-gray-800">Sign Up as Driver</h1>
        <p className="text-md text-gray-700 w-[70%] text-center leading-relaxed">
        Drive with RideEasy and earn on your schedule! Join a community of reliable drivers, enjoy flexible work hours, and take control of your earnings. Sign up today and hit the road with confidence.
        </p>
      </div>
    </div>
  );
};


export default DriverSignUp