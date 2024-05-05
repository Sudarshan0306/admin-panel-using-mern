import { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { Link } from 'react-router-dom'

export const AdminUsers = () => {
  const [userData, setUsersData] = useState([])

  const { authorizationToken } = useAuth()

  const getAllUsersData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        method: 'GET',
        headers: {
          Authorization: authorizationToken
        }
      })

      const data = await response.json()
        // console.log(data.users)
      setUsersData(data.users)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async id => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
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
        getAllUsersData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllUsersData()
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
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Link to={`/admin/users/${item._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(item._id)}>
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
