import React from 'react'
import { IoMdEyeOff } from 'react-icons/io'
import { FaEye } from 'react-icons/fa'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import StatusModal from '../components/StatusModal'
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email('email tidak valid').required('email wajib'),
  password: yup.string().min(6, 'min 6 karakter').required('password wajib'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'password tidak sama')
    .required('confirm password wajib'),
})

function Register() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPassword2, setShowPassword2] = React.useState(false)

  const [showModal, setShowModal] = React.useState(false);
  const [modalConfig, setModalConfig] = React.useState({ type: 'success', title: '', message: '' })
  
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
      const res = await fetch('http://localhost:8888/api/register', {
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
          title: 'Register Failed',
          message: result.message || 'Something went wrong'
        })
        setShowModal(true)
        return
      }

      setModalConfig({
        type: 'success',
        title: 'Registration Success',
        message: 'Your account has been created. Redirecting to login page...'
      })
      setShowModal(true)


    setTimeout(() => {
      setShowModal(false); 
      navigate('/login');   
    }, 3000);
      console.log(result)
    } catch (err) {
      console.error("Registrasi Error:", err);
      setModalConfig({
        type: 'error',
        title: 'System Error',
        message: 'Could not connect to server.'
      })
      setShowModal(true)
      
    }
  }

  return (
    <main>

    <section className='flex flex-col justify-center items-center gap-2'>
      
      <div>

      <h2 className='mt-8 text-[#191C1D] font-extrabold text-2xl'>Create Account</h2> 
      <p>Join the elite architects of the web.</p>
      </div>

      <div className='bg-white rounded-2xl shadow-sm p-8 w-full max-w-md'>

      
      <form onSubmit={handleSubmit(onSubmit)}
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
            <p className='text-xs'>MINIMUM 6 CHARACTERS</p>

            <p className='text-red-500 text-xs'>
                {errors.password?.message}
              </p>
          </div>

          <div>
            
            <div className='border flex py-4 px-3 gap-2 bg-[#FCFDFE] border-[#DEDEDE] rounded-lg focus-within:border-black'>
              <input
                id='password'
                type={showPassword2 ? 'text' : 'password'}
                placeholder='••••••••'
                className='outline-none w-full text-xs text-[#4F5665]'
                 {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="ml-2 cursor-pointer text-gray-500"
              >
                {showPassword2 ? <IoMdEyeOff /> : <FaEye />}
              </button>
            </div>
            <p className='text-red-500 text-xs'>
                {errors.confirmPassword?.message}
              </p>
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

export default Register