import React from 'react'
import Input from '../components/Input'

function Login() {
  return (
    <div>ShortLink<div>
      <h1>Welcome Back</h1>
      <p>Please enter your details to sign in.</p>
      
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
              <Input
                label='Password'
                htmlFor='password'
                id='password'
                placeholder='••••••••'
              />
              
            </div>

            <button type='submit'>Login</button>

            <p>Or continue with</p>

            <div>
              <a href="https://www.google.com/" target='_blank'>
                <img src="" alt="" />
                <p>Sign in with Google</p>
              </a>


            </div>
          </form>
      </div></div>
  )
}

export default Login