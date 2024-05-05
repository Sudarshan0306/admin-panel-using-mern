import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  })

  const navigate = useNavigate()
  const { storeTokenToLS } = useAuth()

  const handleInput = e => {
    // console.log(e.target.value);
    let name = e.target.name
    let value = e.target.value

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // console.log(user);
    // alert(`${user.username}`)

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      // console.log(response)
      const res_data = await response.json()
      // console.log('res from server', res_data)

      if (response.ok) {
        toast.success('Registered Successfully')

        storeTokenToLS(res_data.token)

        setUser({
          username: '',
          email: '',
          phone: '',
          password: ''
        })

        navigate('/')
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <section>
        <main>
          <div className='section-registration'>
            <div className='container grid grid-two-cols'>
              <div className='registration-image'>
                <img src='' alt='' />
              </div>
              <div className='registration-form'>
                <h1 className='main-heading mb-3'> Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className='form group'>
                    <label htmlFor='username'> Username</label>
                    <input
                      className='form-control'
                      type='text'
                      name='username'
                      id='username'
                      placeholder='Enter your name'
                      required
                      autoComplete='off'
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor='email'> Email</label>
                    <input
                      className='form-control'
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Enter your email'
                      required
                      autoComplete='off'
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor='phone'> Phone</label>
                    <input
                      className='form-control'
                      type='number'
                      name='phone'
                      id='phone'
                      placeholder='Enter your phone'
                      required
                      autoComplete='off'
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor='password'> Password</label>
                    <input
                      className='form-control'
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Enter your password'
                      required
                      autoComplete='off'
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button className='btn btn-secondary' type='submit'>
                    {' '}
                    Register Now{' '}
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

export default Register
