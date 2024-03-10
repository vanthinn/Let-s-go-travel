import { FC } from 'react'
import logo from '../../../assets/images/test1.png'
import {
 HiOutlineUser,
 HiOutlineHeart,
 HiOutlineHome,
 HiChartBar,
} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { toastMessage } from '../../../utils/toastMessage'

interface Props {}

const Header: FC<Props> = (): JSX.Element => {
 const navigate = useNavigate()
 const auth = JSON.parse(String(localStorage.getItem('auth')))

 return (
  <div className=" h-20 bg-[#e3e5ff] px-20 flex justify-between items-center fixed top-0 right-0 left-0 z-50  shadow-md">
   <div className="flex items-center">
    <img className="h-20 w-24 " src={logo} alt="logo" />
    <nav className="flex gap-6 ml-12 ">
     <li
      onClick={() => navigate('/')}
      className=" list-none flex gap-2 items-center font-semibold text-base cursor-pointer hover:text-blue-600 transition-all duration-200">
      <HiOutlineHome className="h-6 w-6" />
      <span>Trang chủ</span>
     </li>
     <li className="list-none flex gap-2 items-center font-semibold text-base cursor-pointer hover:text-blue-600 transition-all duration-200">
      <HiChartBar className="h-6 w-6" />

      <span>Thống kê</span>
     </li>
    </nav>
   </div>
   <div>
    <ul className="flex gap-6 mr-5">
     <li
      onClick={() =>
       auth?.token === undefined
        ? toastMessage('Login failed', 'error')
        : navigate('/history')
      }
      className="flex gap-1 items-center cursor-pointer hover:text-red-600 transition-all duration-200">
      <HiOutlineHeart className="h-6 w-6" />
      <span>Lịch sử xem</span>
     </li>

     <li
      onClick={() =>
       auth?.token === undefined ? navigate('/login') : navigate('/profile')
      }
      className="flex gap-1 items-center cursor-pointer hover:text-blue-600 transition-all duration-200">
      <HiOutlineUser className="h-6 w-6" />
      <span>{auth?.token === undefined ? 'Đăng Nhập' : 'Tài khoản'}</span>
     </li>
    </ul>
   </div>
  </div>
 )
}

export default Header
