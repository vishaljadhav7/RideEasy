import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { BASE_URL } from '../constants';
import { signUpSchema } from '../Schemas';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {addRide} from '../utils/rideSlice'


const initialValues = {
  firstName: '',
  lastName: '',
  emailId: '',
  password: '',
};

const UserSignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false) 
   
  const [errorMessage, setErrorMessage] = useState('') 
  // const [isSubmit, toggleSubmit] = useState(false)

  const { values, handleSubmit, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const {firstName, lastName, emailId, password} = values;
      
      try {
        const res = await axios.post(
          BASE_URL + "/auth/user/signup",
          { firstName, lastName, emailId, password },
        );
 
        // res.data.data => for user info
        // res.data.token => for token
        localStorage.setItem('token', res.data.token)
        dispatch(addRide(res.data.data)) 
        return navigate("/ride-home");
      } catch (err) {
        setErrorMessage(err?.response?.data || "Something went wrong");
      }
    },
  });
 
   useEffect(()=>{
   const canSubmit = Object.keys(values).every(field => Boolean(values[field]))
   setIsSubmit(canSubmit)
   }, [values])
   


  return (
    <div className="h-screen w-full md:flex bg-gradient-to-br from-orange-100 to-orange-300 md:bg-white">
         <div className='h-full md:w-[40%] w-[100%] flex items-center justify-center bg-white shadow-md md:rounded-r-lg'>
           <form className='w-[80%] md:w-[75%] bg-white h-auto shadow-lg p-6 flex flex-col gap-6 rounded-lg border border-gray-200'>
           <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up As Ride</h2>

          <div className="space-y-1">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.firstName && touched.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          
       
          <div className="space-y-1">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.lastName && touched.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          
        
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
          
          
          <div className="flex items-center justify-between mt-2 gap-2">
            <button 
             className={`px-4 py-2 text-white rounded-md font-semibold ${
              isSubmit
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-300 cursor-not-allowed"
            } transition-all duration-300`}
            type="submit"
            disabled={!isSubmit}
            onClick={handleSubmit}
            >
              Sign Up
            </button>
            <div className="mt-2">
                <p>
                  Already a user?{" "}
                  <Link to="/user-signin">
                    <span className="text-teal-500 font-bold">Sign In!</span>
                  </Link>
                </p>
              </div>
            </div>
            {errorMessage && <p className="text-red-500 px-2 py-1">{errorMessage}</p>}
           </form>
         </div>
         <div className='h-full w-[60%] md:flex flex-col items-center justify-center gap-4 hidden md:visible bg-gradient-to-bl from-orange-100 to-orange-300 shadow-inner p-6 rounded-l-lg'>
            <h1 className='text-4xl font-bold text-gray-800'>Sign Up as Ride</h1>
            <p className='text-md text-gray-700 w-[70%] text-center leading-relaxed'>Join RideEasy and experience travel made easy! Sign up now to unlock hassle-free rides, affordable fares, and the convenience you deserve. Your journey starts here!</p>
          </div> 
    </div>
  )
}

export default UserSignUp