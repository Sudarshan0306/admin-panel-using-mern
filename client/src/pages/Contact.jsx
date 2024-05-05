import React, { useState } from 'react'
import { useAuth } from '../store/auth'

const defaultContactFormData = {
  username: '',
  email: '',
  message: ''
}

const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true)

  const { user } = useAuth()

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: ''
    })

    setUserData(false)
  }

  const handleChange = e => {
    let name = e.target.name
    let value = e.target.value

    setContact({
      ...contact,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/form/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })

      if (response.ok) {
        alert("Message sent successfully")
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error)
    }

    // alert(contact.username)
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
                <h1 className='main-heading mb-3'> Contact Us</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div className='form-group'>
                    <label htmlFor='username'> Username</label>
                    <input
                      className='form-control'
                      type='input'
                      name='username'
                      placeholder='Enter your username'
                      id='username'
                      required
                      value={contact.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='email'> Email</label>
                    <input
                      className='form-control'
                      type='email'
                      name='email'
                      placeholder='Enter your email'
                      id='email'
                      required
                      value={contact.email}
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <div className='form-group'>
                    <label htmlFor='message'> Message</label>
                    <input
                      className='form-control'
                      type='textarea'
                      name='message'
                      placeholder='Enter your message'
                      id='message'
                      required
                      value={contact.message}
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <button className='btn btn-secondary' type='submit'>
                    {' '}
                    Submit
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

export default Contact
