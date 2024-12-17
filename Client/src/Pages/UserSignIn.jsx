import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const UserSignIn = () => {
  const navigate = useNavigate()
  
  return (
    <div className="h-screen w-full  md:flex bg-orange-400 md:bg-white">
      <div className='h-full md:w-[40%] w-[100%] flex items-center justify-center '>
        <form className='w-[80%] md:w-[75%] bg-white h-auto shadow-lg p-4 flex flex-col gap-6 rounded-lg'>
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
            // disabled={!isSubmit}
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
        </form>
      </div>

      <div className='h-full w-[60%]  md:flex flex-col items-center justify-center gap-4 hidden md:visible'> 
      <h1 className='text-4xl font-semibold'>Sign In as Ride</h1>
      <p className='text-[16px] text-gray-500 w-[70%] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, modi! Voluptates beatae in suscipit, eos eveniet incidunt laudantium harum? Doloremque reiciendis voluptates unde iste dignissimos facilis aperiam aliquam cupiditate inventore.</p>
      </div>
    </div>
  )
}

export default UserSignIn