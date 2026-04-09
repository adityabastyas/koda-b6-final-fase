import React from 'react'
import Input from '../components/Input'
import { IoMdEyeOff } from 'react-icons/io'
import { FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import StatusModal from '../components/StatusModal'
import {loginSuccess}  from "../redux/slices/auth.slice";
import { useDispatch } from "react-redux";

const schema = yup.object({
  email: yup.string().email('email tidak valid').required('email harus diisi'),
  password: yup.string().required('password harus diisi'),
})

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false)

  const [showModal, setShowModal] = React.useState(false)
  const [modalConfig, setModalConfig] = React.useState({
    type: 'success',
    title: '',
    message: '',
  })

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:8888/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setModalConfig({
          type: 'error',
          title: 'Login Failed',
          message: result.message || 'Something went wrong',
        })
        setShowModal(true)
        return
      }

      dispatch(
       loginSuccess({
       user: result.result.user, 
      token: result.result.token, 
     })
)

      setModalConfig({
        type: 'success',
        title: 'Login Success',
        message: 'Redirecting to dashboard...',
      })
      setShowModal(true)

      setTimeout(() => {
        setShowModal(false)
        navigate('/') 
      }, 3000)

    } catch (err) {
      console.error("Login Error:", err)
      setModalConfig({
        type: 'error',
        title: 'System Error',
        message: 'Could not connect to server.',
      })
      setShowModal(true)
    }
  }
  return (
    <main>


    <section className='flex flex-col justify-center items-center gap-2'>
      
      <div>

      <h2 className='mt-8 text-[#191C1D] font-extrabold text-2xl'>ShortLink</h2> 
      </div>

      <div className='bg-white rounded-2xl shadow-sm p-8 w-full max-w-md'>

        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
          <p className='text-sm text-gray-600'>Please enter your details to sign in.</p>
        </div>
      
      <form
       onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <div>
              <Input
                label='Email Address'
                htmlFor='email'
                id='email'
                placeholder='name@company.com'
                 {...register('email')}
              />
              <p className='text-red-500 text-xs'>
                {errors.email?.message}
              </p>
            </div>

            <div>
            <div className='flex justify-between items-center mb-1'>
              <label htmlFor='password' className='text-base font-semibold text-[#0B132A]'>
                Password
              </label>
              <a href='#' className='text-sm text-blue-600 hover:underline'>
                Forgot password?
              </a>
            </div>
            <div className='border flex py-4 px-3 gap-2 bg-[#FCFDFE] border-[#DEDEDE] rounded-lg focus-within:border-black'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                className='outline-none w-full text-xs text-[#4F5665]'
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 cursor-pointer text-gray-500"
              >
                {showPassword ? <IoMdEyeOff /> : <FaEye />}
              </button>
            </div>
             <p className='text-red-500 text-xs'>
                {errors.password?.message}
              </p>
          </div>

            <button 
            type='submit'
            className='w-full cursor-pointer  bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg'
          >
            Log in 
          </button>

          </form>


            <p className='w-full text-[#C3C6D7] font-medium py-3 px-4 rounded-lg text-center'
          >OR CONTINUE WITH</p>

            <div className='w-full flex justify-center cursor-pointer   text-[#434655] font-medium py-3 px-4 rounded-lg '
          >
              <a href="https://www.google.com/" target='_blank'>
              <img src="" alt="" />
          <p>Sign in with Google</p>
              </a>
            </div>


      </div>


            <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Don't have an account?
            <Link to="/register" className='text-blue-600 hover:underline font-medium'>
              Sign up
            </Link>
          </p>
        </div>


      </section>


      <StatusModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
      />

      <Footer/>

    </main>

  )
}

export default Login