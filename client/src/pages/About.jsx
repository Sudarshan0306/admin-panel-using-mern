import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'

const About = () => {
  const { user } = useAuth()
  return (
    <>
      <main>
        <section className='section-hero'>
          <div className='container grid grid-two-cols'>
            <div className='hero-content'>
              {/* <p>
                Hi {user ? <span style={{ fontWeight: 700 }}>{user.username} </span>  : `to our website`}
              </p> */}
              {/* <p>We care to cure your Health</p> */}
              <p>
                Welcome,
                {user ? (
                  <span style={{ fontWeight: 700 }}>
                    {user.username}
                    <p style={{ fontWeight: 'normal' }}> to our website</p>
                  </span>
                ) : (
                  ` to our website`
                )}
              </p>

              <h1>Why Choose Us? </h1>
              <p className='mt-4'>
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p>
                Customization: We understand that every business is unique.
                Thats why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              <p>
                Customer-Centric Approach: We prioritize your satisfaction and
                provide top-notch support to address your IT concerns.
              </p>
              <p>
                Affordability: We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p>
                Reliability: Count on us to be there when you need us. We are
                committed to ensuring your IT environment is reliable and
                available 24/7.
              </p>
              <div className='btn-group mt-3'>
                <NavLink to='/contact'>
                  <button className='btn'> Connect Now</button>
                </NavLink>
                <NavLink to='/service'>
                  <button className='btn secondary-btn'>learn more</button>
                </NavLink>
              </div>
            </div>
            <div className='hero-image'>
              <img
                src='/images/about.png'
                alt='coding buddies '
                width='400'
                height='500'
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default About
