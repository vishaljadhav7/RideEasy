import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {BASE_URL} from '../constants'
import { useState, useEffect } from "react"
import { addRide } from "../utils/rideSlice"
import axios from 'axios'

// /auth/user/signin

const UserSignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ emailId : null, password : null})
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false) 

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name] : e.target.value }))
 }

 const handleSubmit =  async (e) => {
  e.preventDefault();
  try {
   const res = await axios.post(BASE_URL + "/auth/user/signin", {...formData})
   console.log("res.data.data from driver sign in ", res)
   dispatch(addRide(res.data.data)) 
   return navigate("/ride-home");
  } catch (error) {
   setErrorMessage(error?.response?.data.message || "Something went wrong");
  }
}


  useEffect(()=>{
    const canSubmit = Object.keys(formData).every(field => Boolean(formData[field]))
    setIsSubmit(canSubmit)
    }, [formData])

  
  return (
    <div className="h-screen w-full  md:flex bg-orange-400 md:bg-white">
      <div className='h-full md:w-[40%] w-[100%] flex items-center justify-center '>
        <form 
        onChange={handleChange}
        onSubmit={handleSubmit}
        className='w-[80%] md:w-[75%] bg-white h-auto shadow-lg p-4 flex flex-col gap-6 rounded-lg'>
         <h2 className="text-2xl font-semibold text-center">Sign In</h2>

         <div className="space-y-1">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="emailId"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
       
          <div className="space-y-1">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-between mt-2 gap-2">
            <button 
            className="btn btn-primary md:w-[100px] bg-purple-300 px-3 py-2 rounded-lg" 
            type="submit"
            disabled={!isSubmit}
            >
              Sign In
            </button>
            <div className="mt-2">
                <p>
                  New Here?{" "}
                  <Link to="/user-signup">
                    <span className="text-teal-500 font-bold">Sign Up!</span>
                  </Link>
                </p>
              </div>
            </div>

            {errorMessage && <p className="text-red-500 mt-5 p-1">{errorMessage}</p>} 
        </form>
      </div>

      <div className='h-full w-[60%]  md:flex flex-col items-center justify-center gap-4 hidden md:visible'> 
      <h1 className='text-4xl font-semibold'>Sign In as Ride</h1>
      <p className='text-[16px] text-gray-500 w-[70%] '>Welcome Back! Your next ride is just a few clicks away. Log in to explore flexible ride options and travel on your terms. Let’s get moving!</p>
      </div>
    </div>
  )
}

export default UserSignIn