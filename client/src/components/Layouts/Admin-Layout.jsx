import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FaUser, FaComment, FaRegListAlt, FaHome } from 'react-icons/fa'
import { useAuth } from '../../store/auth'

export const AdminLayout = () => {

  const {user, isLoading} = useAuth();

  // console.log('admin layout', user);

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if(!user.isAdmin) {
    return <Navigate to= '/' />
  }
  return (
    <>
      <header>
        <div className='container'></div>
        <nav>
          <ul>
            <li>
              <NavLink to='/admin/users'>
                <FaUser />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to='/admin/contacts'>
                <FaComment />
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink to='/service'>
                <FaRegListAlt />
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to='/'>
                <FaHome />
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
}
