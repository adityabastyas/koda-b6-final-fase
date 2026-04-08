import React from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { FaEye } from 'react-icons/fa'
import Input from '../components/Input'
import { Link } from 'react-router-dom'

function Register() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPassword2, setShowPassword2] = React.useState(false)

  return (
    <section className='flex flex-col justify-center items-center gap-2'>
      
      <div>

      <h2 className='mt-8 text-[#191C1D] font-extrabold text-2xl'>Create Account</h2> 
      <p>Join the elite architects of the web.</p>
      </div>

      <div className='bg-white rounded-2xl shadow-sm p-8 w-full max-w-md'>

      
      <form
            className='flex flex-col gap-6'
          >
            <div>
              <Input
                label='Email Address'
                htmlFor='email'
                id='email'
                placeholder='name@company.com'
              />
            </div>

            <div>
            
            <div className='border flex py-4 px-3 gap-2 bg-[#FCFDFE] border-[#DEDEDE] rounded-lg focus-within:border-black'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                className='outline-none w-full text-xs text-[#4F5665]'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 cursor-pointer text-gray-500"
              >
                {showPassword ? <IoMdEyeOff /> : <FaEye />}
              </button>
            </div>
            <p className='text-xs'>MINIMUM 6 CHARACTERS</p>
          </div>



          <div>
            
            <div className='border flex py-4 px-3 gap-2 bg-[#FCFDFE] border-[#DEDEDE] rounded-lg focus-within:border-black'>
              <input
                id='password'
                type={showPassword2 ? 'text' : 'password'}
                placeholder='••••••••'
                className='outline-none w-full text-xs text-[#4F5665]'
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="ml-2 cursor-pointer text-gray-500"
              >
                {showPassword2 ? <IoMdEyeOff /> : <FaEye />}
              </button>
            </div>
          </div>

            <button 
            type='submit'
            className='w-full cursor-pointer  bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg'
          >
            Sign Up 
          </button>

          </form>


            <p className='w-full text-[#C3C6D7] font-medium py-3 px-4 rounded-lg text-center'
          >By Signing up, you agress to our Terms of Service and Privacy Policy</p>

            


      </div>


            <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
           Already have an account?
            <Link to="/login" className='text-blue-600 hover:underline font-medium'>
              Sign up
            </Link>
          </p>
        </div>


      </section>
  )
}

export default Register