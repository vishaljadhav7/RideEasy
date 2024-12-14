import {  useState } from "react";
import { Link } from "react-router-dom";
import { driveSignUpSchema } from "../Schemas";
import { BASE_URL } from "../constants";
import { useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          captainData,
          { withCredentials: true }
        );
        // console.log("res from drver sign up ", res.data.data) 
         
        // dispatch(addUser(res.data.data)) 
        return navigate("/drive-home");
      } catch (err) {
        setErrorMessage(err?.response?.data || "Something went wrong");
      }
    },
  });
 

  return (
    <div className="h-screen w-full md:flex">
      {/* Left section with the form */}
      <div className="h-full md:w-[40%] w-full flex items-center justify-center bg-orange-400">
        <form 
         className="w-[95%] md:w-[75%] bg-white h-[90%] overflow-y-scroll shadow-lg p-4 flex flex-col gap-4 rounded-lg"
     
         >
          <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

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
            className='bg-[#111] text-white font-semibold mb-1 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Sign Up</button>
        <p className='text-center'>Already have a account? <Link to={"/driver-signin"} className='text-blue-600'>Login here</Link></p>
        </form>

      </div>

   
      <div className="h-full w-[60%] md:flex flex-col items-center justify-center gap-4 hidden ">
        <h1 className="text-4xl font-semibold text-black">Sign Up as Driver</h1>
        <p className="text-lg text-gray-400 w-[70%] text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, modi! Voluptates beatae in suscipit, eos eveniet incidunt laudantium harum? Doloremque reiciendis voluptates unde iste dignissimos facilis aperiam aliquam cupiditate inventore.
        </p>
      </div>
    </div>
  );
};


export default DriverSignUp