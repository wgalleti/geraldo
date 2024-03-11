import PropTypes from 'prop-types'
import { createContext, useCallback, useState, useEffect } from 'react'
import http from '../plugins/http'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('geraldo-token')
  )
  const [user, setUser] = useState(null)
  const whoami = useCallback(async () => {
    const { data } = await http.get('/auth/user/')
    setUser(data)
    return data
  }, [setUser])

  const login = useCallback(async (credentials) => {
    try {
      const { data } = await http.post('/auth/login/', credentials)
      const { user, token } = data
      localStorage.setItem('geraldo-token', token)
      localStorage.setItem('geraldo-user', JSON.stringify(user))
      setIsAuthenticated(true)

      toast.success(`Bem vindo(a) ${user.username}`)
    } catch (error) {
      toast.error('Credenciais inválidas')
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('geraldo-token')
    localStorage.removeItem('geraldo-user')

    setIsAuthenticated(false)
  }, [])

  const { isSuccess, isError, data } = useQuery({
    queryKey: ['whoami'],
    queryFn: whoami,
    enabled: isAuthenticated
  })

  useEffect(() => {
    if (isSuccess) {
      setIsAuthenticated(true)
      const { user } = data
      setUser(user)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      logout()
      toast.error('Token inválido ou expirado. Efetue login novamente')
    }
  }, [isError, logout])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.any
}

export { AuthContext, AuthProvider }
