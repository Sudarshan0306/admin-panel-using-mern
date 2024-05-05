import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('')
  const [services, setServices] = useState([])
  const authorizationToken = `Bearer ${token}`

  const storeTokenToLS = serverToken => {
    setToken(serverToken)
    return localStorage.setItem('token', serverToken)
  }

  let isLoggedIn = !!token

  // Tackling the logout functionality
  const logoutUser = () => {
    setToken('')

    return localStorage.removeItem('token')
  }

  //JWT Authentication - to get the currently logged In user data

  const userAuthentication = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/user', {
        method: 'GET',
        headers: {
          Authorization: authorizationToken
        }
      })

      if (response.ok) {
        const data = await response.json()
        // console.log(data.userData)
        setUser(data.userData)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error fetching user data')
      setIsLoading(false)
    }
  }

  //to fetch services data from the backend

  const getServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data/service', {
        method: 'GET'
      })

      if (response.ok) {
        const serviceData = await response.json()
        // console.log(serviceData.msg);
        setServices(serviceData.msg)
      }
    } catch (error) {
      console.error(`service Fetch: ${error}`)
    }
  }

  useEffect(() => {
    getServices()
    userAuthentication()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenToLS,
        logoutUser,
        user,
        services,
        authorizationToken,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContextValue = useContext(AuthContext)
  if (!authContextValue) {
    throw new Error('useAuth is used outside the provider')
  }

  return authContextValue
}
