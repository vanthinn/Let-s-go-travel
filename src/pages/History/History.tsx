import { FC, useEffect } from 'react'
import test from '../../assets/images/test.jpg'
import { HiOutlineStar } from 'react-icons/hi'
import { getHistory } from '../../services/user.service'

interface Props {}

const History: FC<Props> = (): JSX.Element => {
 const getHistoryPage = async (): Promise<void> => {
  const res = await getHistory()
  if (res.status === 201) {
   console.log(res)
  }
 }
 useEffect(() => {
  getHistoryPage()
 }, [])
 return (
  <div className="p-6  border border-gray-300 rounded-xl flex flex-col">
   <h4 className="text-2xl font-semibold text-[#19245D] mb-4">Lịch sử xem</h4>

   <div className="mt-2 grid grid-cols-2 gap-8 ">
    <div className="bg-[#fefcf7] col-span-1 hover:scale-105 transition-all duration-300 cursor-pointer flex gap-4 pr-2  rounded-xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
     <img className="h-32 w-32" src={test} alt="test" />

     <div className="flex flex-col ">
      <h4 className="mt-2 text-xl font-semibold">Đà Nẵng</h4>
      <i className="font-thin ">
       Đà Nẵng không chỉ gây ấn tượng với du khách với hình ảnh năng
      </i>
      <div className="flex gap-1 mt-auto mb-4">
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
      </div>
     </div>
    </div>

    <div className="bg-[#fefcf7] col-span-1 hover:scale-105 transition-all duration-300 cursor-pointer flex gap-4 pr-2  rounded-xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
     <img className="h-32 w-32" src={test} alt="test" />

     <div className="flex flex-col ">
      <h4 className="mt-2 text-xl font-semibold">Đà Nẵng</h4>
      <i className="font-thin ">
       Đà Nẵng không chỉ gây ấn tượng với du khách với hình ảnh năng
      </i>
      <div className="flex gap-1 mt-auto mb-4">
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
      </div>
     </div>
    </div>

    <div className="bg-[#fefcf7] col-span-1 hover:scale-105 transition-all duration-300 cursor-pointer flex gap-4 pr-2  rounded-xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
     <img className="h-32 w-32" src={test} alt="test" />

     <div className="flex flex-col ">
      <h4 className="mt-2 text-xl font-semibold">Đà Nẵng</h4>
      <i className="font-thin ">
       Đà Nẵng không chỉ gây ấn tượng với du khách với hình ảnh năng
      </i>
      <div className="flex gap-1 mt-auto mb-4">
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
       <HiOutlineStar className="h-4 w-4 text-yellow-500 " />
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default History
