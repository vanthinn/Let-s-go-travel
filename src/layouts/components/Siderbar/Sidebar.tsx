import { FC, useState } from 'react'
import avatar from '../../../assets/images/user.png'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/authContext'

interface Props {}

const listNav = [
 {
  id: 1,
  name: 'Thông tin cá nhân',
  path: 'profile',
 },
 {
  id: 2,
  name: 'Đổi mật khẩu',
  path: 'change-password',
 },
 {
  id: 3,
  name: 'Đăng xuất',
 },
]

const Sidebar: FC<Props> = (): JSX.Element => {
 const navigate = useNavigate()
 const { user, setToken } = useAuthContext()
 const [pick, setPick] = useState(1)

 const ChangeNavigate = (path: string) => {
  if (path === 'profile') {
   setPick(1)
   navigate('/profile')
   return
  }

  if (path === 'change-password') {
   setPick(2)
   navigate('/auth/change-password')
   return
  }

  localStorage.removeItem('auth')
  setToken('')
  navigate('/')
 }

 return (
  <div className="p-4 pb-12 border border-gray-300 rounded-xl flex flex-col">
   <div className="flex gap-4 items-center pb-4 border-b-2 border-slate-300">
    <img
     className="h-14 w-14 rounded-full border border-slate-500 object-cover"
     src={avatar}
     alt="avatar"
    />
    <span className="font-semibold text-xl text-[#19245D]">
     {user?.fullname}
    </span>
   </div>

   <div className="mt-4 flex flex-col">
    <div>
     <h4 className="text-[18px] text-[#19245D] font-semibold">Tài khoản</h4>
     <ul className="ml-6">
      {listNav.map((item, index) => (
       <li
        onClick={() => ChangeNavigate(item.path || '')}
        className={`${item.id === pick ? 'text-red-500' : 'hover:text-blue-500 transition-all duration-300'} cursor-pointer `}
        key={index}>
        {item.name}
       </li>
      ))}
     </ul>
    </div>
   </div>
   <h4
    onClick={() => {
     navigate('/history'), setPick(0)
    }}
    className="text-[18px] mt-2 text-[#19245D] font-semibold cursor-pointer hover:text-blue-500 transition-all duration-300">
    Lịch sử xem
   </h4>
  </div>
 )
}

export default Sidebar
