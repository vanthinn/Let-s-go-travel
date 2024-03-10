import { ReactNode, useState } from 'react'
import { IUser } from '../interfaces/user'
import AuthContext from './authContext'

interface Props {
 children: ReactNode
}

export const AuthProvider = ({ children }: Props): JSX.Element => {
 const [user, setUser] = useState<IUser>()
 const [token, setToken] = useState<string>('')

 return (
  <AuthContext.Provider value={{ user, setUser, token, setToken }}>
   {children}
  </AuthContext.Provider>
 )
}
