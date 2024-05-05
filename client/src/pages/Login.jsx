import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const { storeTokenToLS } = useAuth()

  const handleChange = e => {
    let name = e.target.name
    let value = e.target.value

    setLoginUser({
      ...loginUser,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // alert(`${loginUser.password} ${loginUser.email}`)
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'post',
        body: JSON.stringify(loginUser),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res_data = await response.json()
      // console.log('res from login', res_data)

      if (response.ok) {
        // console.log(await response.json());
        toast.success('Login Successfully')
        storeTokenToLS(res_data.token)

        setLoginUser({
          email: '',
          password: ''
        })

        navigate('/')
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }
      // console.log(response);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <section>
        <main>
          <div className='section-login'>
            <div className='container grid grid-two-cols'>
              <div className='login-image'>
                <img src='' alt='' />
              </div>
              <div className='login-form'>
                <h1 className='main-heading mb-3'> Login Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='email'> Email</label>
                    <input
                      className='form-control'
                      type='email'
                      name='email'
                      placeholder='Enter your email'
                      id='email'
                      required
                      value={loginUser.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password'> Password</label>
                    <input
                      className='form-control'
                      type='password'
                      name='password'
                      placeholder='Enter your password'
                      id='password'
                      required
                      value={loginUser.password}
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <button className='btn btn-secondary' type='submit'>
                    {' '}
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login
