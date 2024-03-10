import { FC, useState } from 'react'
import { useAuthContext } from '../../contexts/authContext'
import { IUser } from '../../interfaces/user'
import { updateProfile } from '../../services/user.service'
import { toastMessage } from '../../utils/toastMessage'

interface Props {}

const Profile: FC<Props> = (): JSX.Element => {
 const { user, setUser } = useAuthContext()
 const [isEdit, setIsEdit] = useState<boolean>(false)
 const [data, setData] = useState<IUser>()

 const handleEdit = async () => {
  const res = await updateProfile(data)
  if (res.status === 205) {
   setUser({ ...user, ...data })
   toastMessage('Thay đổi thông tin thành công', 'success')
  }
 }

 return (
  <div className="p-4 bp-4  border border-gray-300 rounded-xl flex flex-col">
   <h4 className="text-2xl font-semibold text-[#19245D] mb-4">
    Thông tin cá nhân
   </h4>

   <div className="grid grid-cols-12 items-center py-2.5 border-t border-b border-gray-300 px-4">
    <label
     className="col-span-3 font-semibold text-xl text-[#19245D] py-0"
     htmlFor="">
     Họ và tên
    </label>

    {isEdit ? (
     <div className="col-span-9">
      <input
       className="border border-gray-400 outline-none px-2 py-0.5 rounded-md"
       placeholder={user?.fullname || ''}
       value={data?.fullname}
       onChange={(e) => setData({ ...data, fullname: e.target.value || '' })}
       type="text"
      />
     </div>
    ) : (
     <span className="col-span-9 text-xl">{user?.fullname}</span>
    )}
   </div>

   <div className="grid grid-cols-12 items-center py-2.5 border-b border-gray-300 px-4">
    <label
     className="col-span-3 font-semibold text-xl text-[#19245D] py-0"
     htmlFor="">
     Email
    </label>
    <span className="col-span-9 text-xl">{user?.email}</span>
   </div>

   <div className="grid grid-cols-12 items-center py-2.5 border-b border-gray-300 px-4">
    <label
     className="col-span-3 font-semibold text-xl text-[#19245D] py-0"
     htmlFor="">
     Số điện thoại
    </label>

    {isEdit ? (
     <div className="col-span-9">
      <input
       className="border border-gray-400 outline-none px-2 py-0.5 rounded-md"
       placeholder={user?.sdt || ''}
       onChange={(e) => setData({ ...data, sdt: e.target.value || '' })}
       type="text"
      />
     </div>
    ) : (
     <span className="col-span-9 text-xl">{user?.sdt || 'Chưa có'}</span>
    )}
   </div>

   <div className="grid grid-cols-12 items-center py-2.5 border-b border-gray-300 px-4">
    <label
     className="col-span-3 font-semibold text-xl text-[#19245D] py-0"
     htmlFor="">
     Giới tính
    </label>
    {isEdit ? (
     <div className="col-span-9 flex items-center gap-2">
      <input
       type="radio"
       id="Nam"
       name="GT"
       value="0"
       onChange={(e) => setData({ ...data, gender: e.target.value || '' })}
      />
      <label>Nam</label>
      <input
       className="ml-4"
       type="radio"
       id="Nu"
       name="GT"
       value="1"
       onChange={(e) => setData({ ...data, gender: e.target.value || '' })}
      />
      <label>Nữ</label>
     </div>
    ) : (
     <span className="col-span-9 text-xl">
      {data?.gender && String(data?.gender) === '0' ? 'Nam' : 'Nữ' || 'Chưa có'}
     </span>
    )}
   </div>

   <div className="grid grid-cols-12 items-center py-2.5 border-b border-gray-300 px-4">
    <label
     className="col-span-3 font-semibold text-xl text-[#19245D] py-0"
     htmlFor="">
     Ngày sinh
    </label>
    {isEdit ? (
     <div className="col-span-9">
      <input
       className="border border-gray-400 outline-none px-2 py-0.5 rounded-md w-52"
       placeholder="0923836659"
       value={data?.dob}
       onChange={(e) => setData({ ...data, dob: e.target.value || '' })}
       type="date"
      />
     </div>
    ) : (
     <span className="col-span-9 text-xl">{user?.dob || 'Chưa có'}</span>
    )}
   </div>

   <div className="grid grid-cols-12 items-center py-2.5 border-b border-gray-300 px-4">
    <label
     className="col-span-3 font-semibold text-xl text-[#19245D] py-0"
     htmlFor="">
     Địa chỉ
    </label>
    {isEdit ? (
     <div className="col-span-9">
      <input
       className="border border-gray-400 outline-none px-2 py-0.5 rounded-md w-96"
       placeholder={user?.address || ''}
       type="text"
       value={data?.address}
       onChange={(e) => setData({ ...data, address: e.target.value || '' })}
      />
     </div>
    ) : (
     <span className="col-span-9 text-xl">{user?.address || 'Chưa có'}</span>
    )}
   </div>

   <div className="mt-6 flex">
    {isEdit ? (
     <div className="ml-auto flex gap-2">
      <button className=" px-4 py-1.5 rounded-md bg-red-600 text-white  flex gap-1 items-center hover:bg-blue-400 transition-all duration-200">
       <span onClick={() => setIsEdit(false)}>Hủy</span>
      </button>
      <button className=" px-4 py-1.5 rounded-md bg-green-600 text-white  flex gap-1 items-center hover:bg-blue-400 transition-all duration-200">
       <span
        onClick={() => {
         handleEdit()
         setIsEdit(false)
        }}>
        Lưu
       </span>
      </button>
     </div>
    ) : (
     <button className="ml-auto px-4 py-1.5 rounded-md bg-blue-600 text-white  flex gap-1 items-center hover:bg-blue-400 transition-all duration-200">
      <span onClick={() => setIsEdit(true)}>Chỉnh sửa</span>
     </button>
    )}
   </div>
  </div>
 )
}

export default Profile
