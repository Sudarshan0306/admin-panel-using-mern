import { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([])
  const { authorizationToken } = useAuth()

  const getAllContacsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/contacts', {
        method: 'GET',
        headers: {
          Authorization: authorizationToken
        }
      })

      const data = await response.json()
    //   console.log(data.contacts)

      if (response.ok) {
        setContactData(data.contacts)
      }
      setContactData(data.contacts)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: authorizationToken
          }
        }
      )

      const data = await response.json()
      // console.log('users after delete ', data.users)

      if (response.ok) {
        getAllContacsData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllContacsData()
  }, [])

  return (
    <>
      <section className='admin-users-section'>
        <div className='container'>
          <h1>Admin Users Data</h1>
        </div>
        <div className='container admin-users'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                    <td>
                      <button onClick={() => deleteContact(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
