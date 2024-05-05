import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    phone: ''
  })

  const params = useParams();
  const {authorizationToken} = useAuth();
    // get single user data
  const getSingleUserData = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: 'GET',
          headers: {
            Authorization: authorizationToken
          }
        }
      )

      const data = await response.json()
    //   console.log('user after edit ', data)

      setData(data);

    //   if (response.ok) {
    //     getAllUsersData()
    //   }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getSingleUserData()
  }, [])

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setData({
        ...data,
        [name] : value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(
            `http://localhost:5000/api/admin/users/update/${params.id}`,
            {
              method: 'PATCH',
              headers: {
                "Content-Type": "application/json",
                Authorization: authorizationToken
              },
              body: JSON.stringify(data),
            }
          );
            if(response.ok) {
                toast.success("Data Updated Successfully")
            } else {
                toast.error("Data Not Updated")
            }
          
    } catch (error) {
        console.log(error);
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
                <h1 className='main-heading mb-3'> Update User Data</h1>
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
                      value={data.username}
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
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <div className='form-group'>
                    <label htmlFor='phone'> Phone</label>
                    <input
                      className='form-control'
                      type='textarea'
                      name='phone'
                      placeholder='Enter your phone'
                      id='phone'
                      required
                      value={data.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <br />

                  <button className='btn btn-secondary' type='submit'>
                    Update
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
