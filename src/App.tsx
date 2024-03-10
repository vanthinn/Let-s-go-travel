import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { routerUser } from './routers/router'
import { useEffect } from 'react'
import { getProfile } from './services/user.service'
import { useAuthContext } from './contexts/authContext'

function App() {
 const auth = JSON.parse(String(localStorage.getItem('auth')))
 const { token, setUser, setToken } = useAuthContext()

 const getProfilePage = async () => {
  const res = await getProfile()
  if (res) {
   setUser(res.data)
  }
 }

 useEffect(() => {
  if (auth !== undefined && token === '') {
   setToken(auth?.token)
  }
 }, [auth])

 useEffect(() => {
  if (token !== '') {
   getProfilePage()
  }
 }, [token])
 return (
  <>
   <Routes>
    <Route path="login" element={<Login />} />
    <Route path="sign-up" element={<SignUp />} />

    {routerUser.map((route, index) => {
     return (
      <Route
       key={index}
       path={route.path}
       element={
        <>
         <route.layout>
          <route.element />
         </route.layout>
        </>
       }></Route>
     )
    })}
   </Routes>
  </>
 )
}

export default App
