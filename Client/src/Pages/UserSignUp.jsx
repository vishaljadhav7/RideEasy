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
          { withCredentials: true }
        );
 
        // console.log("  2nd res from user sign up ", res.data.data) 
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
    <div className="h-screen w-full md:flex bg-orange-400 md:bg-white">
         <div className='h-full md:w-[40%] w-[100%] flex items-center justify-center'>
           <form className='w-[95%] md:w-[75%] bg-white h-auto shadow-lg p-4 flex flex-col gap-3 rounded-lg'>
           <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

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
            className="btn btn-primary md:w-[100px] bg-purple-300 px-3 py-2 rounded-lg" 
            type="submit"
            disabled={!isSubmit}
            onClick={handleSubmit}
            // disabled={!isSubmit}
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
         <div className='h-full w-[60%]  md:flex flex-col items-center justify-center gap-4 hidden md:visible'>
            <h1 className='text-4xl font-semibold'>Sign Up as Ride</h1>
            <p className='text-[16px] text-gray-500 w-[70%] '>Join RideEasy and experience travel made easy! Sign up now to unlock hassle-free rides, affordable fares, and the convenience you deserve. Your journey starts here!</p>
          </div> 
    </div>
  )
}

export default UserSignUp