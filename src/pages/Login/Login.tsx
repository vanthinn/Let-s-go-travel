import { FC } from 'react'
import banner from '../../assets/images/1691409760937.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toastMessage } from '../../utils/toastMessage'
import { login } from '../../services/auth.service'
import { useAuthContext } from '../../contexts/authContext'

const schema = yup.object().shape({
 email: yup
  .string()
  .required('This is required')
  .max(30, 'Max length exceeded')
  .email('Invalid email'),
 password: yup.string().required('This is required'),
})

interface Props {}

const Login: FC<Props> = (): JSX.Element => {
 const { setToken } = useAuthContext()
 const navigate = useNavigate()
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({
  resolver: yupResolver(schema),
 })
 const onSubmit = async (data: any) => {
  const user = {
   email: data.email,
   pw: data.password,
  }

  const res = await login(user)
  if (res?.status === 200) {
   localStorage.setItem('auth', JSON.stringify({ token: res.data }))
   setToken(res.data)
   navigate('/')
   toastMessage('Login Successfully', 'success')
  }

  if (res?.status === 404) {
   toastMessage(`${res?.message}`, 'error')
  }
 }
 return (
  <div className="min-h-screen relative w-full bg-gradient-to-b from-[#4467E4] via-[#8CA2EF]/80 to-[#D8DFF7]">
   <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-slate-50 rounded-3xl 
   shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-hidden grid grid-cols-2">
    <div className="col-span-1 flex flex-col items-center pt-4 pb-8 bg-white">
     <h4 className="text-[#5653E6] font-semibold text-2xl mt-8 mb-16">
      Wellcome to project TTTN
     </h4>
     <img src={banner} alt="" />
    </div>
    <div className="col-span-1 bg-gradient-to-b from-[#3454FD] via-[#1534D9]/50 to-[#b3cbf4]/50 pt-6 flex flex-col  flex-1">
     <h4 className="text-center font-semibold text-2xl text-white mt-6">
      Login
     </h4>
     <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-12 mt-4 flex flex-col flex-1">
      <div className="flex flex-col gap-0.5 ">
       <label htmlFor="email" className="text-white">
        Email <span className="text-red-600">*</span>
       </label>
       <input
        id="email"
        {...register('email')}
        className="outline-none rounded-md px-2 py-1"
       />
       {errors.email && (
        <span className="text-red-700 text-base">{errors.email.message}</span>
       )}
      </div>

      <div className="flex flex-col gap-0.5 mt-3">
       <label htmlFor="password" className="text-white">
        Password <span className="text-red-600">*</span>
       </label>
       <input
        id="password"
        type="password"
        {...register('password')}
        className="outline-none rounded-md px-2 py-1"
       />
       {errors.password && (
        <span className="text-red-700 text-base">
         {errors.password.message}
        </span>
       )}
      </div>

      <span className="font-semibold text-right text-sm text-[#3155B2] cursor-pointer hover:text-blue-600 mt-2">
       Forgot password?
      </span>
      <input
       className="bg-[#3454FD] py-1 mt-auto mb-2 w-full text-white rounded-md cursor-pointer font-semibold"
       type="submit"
       value={'Login'}
      />
      <p className="font-thin text-[#060606] text-sm text-center mb-10">
       Not an account?{' '}
       <span
        onClick={() => navigate('/sign-up')}
        className="font-semibold text-[#3155B2] cursor-pointer hover:text-blue-600">
        Sign up
       </span>
      </p>
     </form>
    </div>
   </div>
  </div>
 )
}

export default Login
