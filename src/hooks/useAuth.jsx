import { useContext, createContext, useState, useMemo, useEffect } from 'react'

const initialState = {
  session: undefined,
  login: () => {},
  logout: () => {}
}

const AuthContext = createContext(initialState)

export function AuthProvider(props) {
  const [session, setSession] = useState(initialState.session)

  useEffect(() => {
    const sessionString = window.localStorage.getItem('session')
    const sessionObject = JSON.parse(sessionString)
    setSession(sessionObject)
  }, [])

  const login = (session) => {
    const sessionString = JSON.stringify(session)
    window.localStorage.setItem('session', sessionString)
    setSession(session)
  }

  const logout = () => {
    window.localStorage.removeItem('session')
    setSession(initialState.session)
  }

  const memoize = {
    session,
    login,
    logout
  }

  const value = useMemo(() => memoize, [session])

  return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
  return useContext(AuthContext)
}
