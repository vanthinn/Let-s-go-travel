import { FC } from 'react'
import banner from '../../assets/images/1691409760937.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../services/auth.service'
import { toastMessage } from '../../utils/toastMessage'

const schema = yup.object().shape({
 fullName: yup.string().required('This is required'),
 email: yup
  .string()
  .required('This is required')
  .max(30, 'Max length exceeded')
  .email('Invalid email'),
 password: yup.string().required('This is required'),
 confirmPassword: yup
  .string()
  .oneOf([yup.ref('password'), ''], 'Passwords must match')
  .required('Please confirm your password'),
})

interface Props {}

const SignUp: FC<Props> = (): JSX.Element => {
 const navigate = useNavigate()
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({
  resolver: yupResolver(schema), // Use yupResolver here
 })
 const onSubmit = async (data: any) => {
  const user = {
   email: data.email,
   pw: data.password,
   fullname: data.fullName,
   role: 'user',
  }

  const res = await signUp(user)
  if (res?.status === 201) {
   localStorage.setItem('auth', JSON.stringify({ token: res.data }))
   navigate('/')
   toastMessage('Sign up Successfully', 'success')
  }

  if (res?.status === 400) {
   toastMessage(`${res?.message}`, 'error')
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
      SignUp
     </h4>
     <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-12 mt-4 flex flex-col flex-1">
      <div className="flex flex-col gap-0.5 mt-3">
       <label htmlFor="fullName" className="text-white">
        Full name <span className="text-red-600">*</span>
       </label>
       <input
        id="fullName"
        {...register('fullName')}
        className="outline-none rounded-md px-2 py-1"
       />
       {errors.fullName && (
        <span className="text-red-700 text-base">
         {errors.fullName.message}
        </span>
       )}
      </div>

      <div className="flex flex-col gap-0.5 mt-3 ">
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

      <div className="flex flex-col gap-0.5 mt-3 mb-8">
       <label htmlFor="confirmPassword" className="text-white">
        Confirm Password <span className="text-red-600">*</span>
       </label>
       <input
        id="confirmPassword"
        type="password"
        {...register('confirmPassword')}
        className="outline-none rounded-md px-2 py-1"
       />
       {errors.confirmPassword && (
        <span className="text-red-700 text-base">
         {errors.confirmPassword.message}
        </span>
       )}
      </div>

      <input
       className="bg-[#3454FD] py-1 mt-auto mb-2 w-full text-white rounded-md cursor-pointer font-semibold "
       type="submit"
       value={'SignUp'}
      />
      <p className="font-thin text-[#060606] text-sm text-center mb-10">
       Already have an account?{' '}
       <span
        onClick={() => navigate('/login')}
        className="font-semibold text-[#3155B2] cursor-pointer hover:text-blue-600">
        Log in
       </span>
      </p>
     </form>
    </div>
   </div>
  </div>
 )
}

export default SignUp
