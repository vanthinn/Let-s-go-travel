import { yupResolver } from '@hookform/resolvers/yup'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { changePassword } from '../../services/auth.service'
import { toastMessage } from '../../utils/toastMessage'
import { useNavigate } from 'react-router-dom'

interface Props {}

const schema = yup.object().shape({
 oldpw: yup.string().required('This is required'),
 newpw: yup.string().required('This is required'),
 confirmPassword: yup
  .string()
  .oneOf([yup.ref('newpw'), ''], 'Passwords must match')
  .required('Please confirm your password'),
})

const ChangePassword: FC<Props> = (): JSX.Element => {
 const navigate = useNavigate()
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm({
  resolver: yupResolver(schema),
 })

 const onSubmit = async (data: any) => {
  const dataRes = {
   oldpw: data.oldpw,
   newpw: data.newpw,
  }
  const res = await changePassword(dataRes)

  if (res.status === 205) {
   toastMessage('Thay đổi mật khẩu thành công', 'success')
   navigate('/profile')
  }

  if (res.status === 400) {
   toastMessage('Thay đổi mật khẩu không thành công', 'error')
  }
 }
 return (
  <div className="p-6  border border-gray-300 rounded-xl flex flex-col">
   <h4 className="text-2xl font-semibold text-[#19245D] mb-4">Đổi mật khẩu</h4>

   <form
    onSubmit={handleSubmit(onSubmit)}
    className="px-12 mt-4 flex flex-col flex-1">
    <div className="flex flex-col gap-0.5 mt-3">
     <label htmlFor="password" className="text-black">
      Mật khẩu <span className="text-red-600">*</span>
     </label>
     <input
      id="password"
      type="password"
      {...register('oldpw')}
      className="outline-none border border-gray-300 rounded-md px-2 py-1 max-w-[300px]"
     />
     {errors.oldpw && (
      <span className="text-red-700 text-base">{errors.oldpw.message}</span>
     )}
    </div>

    <div className="flex flex-col gap-0.5 mt-3">
     <label htmlFor="password" className="text-black">
      Mật khẩu mới <span className="text-red-600">*</span>
     </label>
     <input
      id="password"
      type="password"
      {...register('newpw')}
      className="outline-none border border-gray-300 rounded-md px-2 py-1 max-w-[300px]"
     />
     {errors.newpw && (
      <span className="text-red-700 text-base">{errors.newpw.message}</span>
     )}
    </div>

    <div className="flex flex-col gap-0.5 mt-3 mb-8">
     <label htmlFor="confirmPassword" className="text-black">
      Nhập lại mật khẩu mới <span className="text-red-600">*</span>
     </label>
     <input
      id="confirmPassword"
      type="password"
      {...register('confirmPassword')}
      className="outline-none border border-gray-300 rounded-md px-2 py-1 max-w-[300px]"
     />
     {errors.confirmPassword && (
      <span className="text-red-700 text-base">
       {errors.confirmPassword.message}
      </span>
     )}
    </div>
    <div>
     <input
      className=" px-4 py-1.5 rounded-md bg-green-600 cursor-pointer text-white text-center hover:opacity-80 transition-all duration-200"
      type="submit"
      value={'Lưu'}
     />
    </div>
   </form>
  </div>
 )
}

export default ChangePassword
