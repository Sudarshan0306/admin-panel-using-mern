import React from 'react'
import { useAuth } from '../store/auth'

const Service = () => {
  const { services } = useAuth();
  // console.log(services);

  return (
    <>
      <section className='section-services'>
        <div className='container'>
          <h1 className='main-heading'> Services </h1>
        </div>
        <div className='container grid grid-three-cols'>
        
          { services.map((item, index) => {
            const { price, description, provider, title } = item;

            return (
              <div className='card' key={index}>
                <div className='card-img'>
                  <img
                    src='/images/services.png'
                    alt='our services'
                    width='200'
                  />
                </div>

                <div className='card-details'>
                  <div className='grid grid-two-cols'>
                    <p>{provider}</p>
                    <p>{price}</p>
                  </div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
              </div>
            )
          })}

          
        </div>
      </section>
    </>
  )
}

export default Service
