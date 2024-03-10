import { FC, useEffect, useState } from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { getHistory } from '../../services/user.service'
import { IHistory } from '../../interfaces/tour'

interface Props {}

const History: FC<Props> = (): JSX.Element => {
 const [listHistory, setListHistory] = useState<IHistory[]>([])
 const getHistoryPage = async (): Promise<void> => {
  const res = await getHistory()
  if (res.status === 200) {
   console.log(res)
   setListHistory(res.data)
  }
 }
 useEffect(() => {
  getHistoryPage()
 }, [])
 return (
  <div className="p-6  border border-gray-300 rounded-xl flex flex-col">
   <h4 className="text-2xl font-semibold text-[#19245D] mb-4">Lịch sử xem</h4>

   <div className="mt-2 grid grid-cols-2 gap-8 ">
    {listHistory?.map((item, index) => (
     <div
      key={index}
      className="bg-[#fefcf7] col-span-1 hover:scale-105 transition-all duration-300 cursor-pointer flex gap-4 pr-2  rounded-xl overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <img
       className="h-32 w-32"
       src={item?.tourist.url_imgs
        .slice(1, item?.tourist?.url_imgs.length - 1)
        .split(',')[0]
        .replaceAll("'", '')}
       alt="test"
      />

      <div className="flex flex-col ">
       <h4 className="mt-2 text-xl font-semibold">{item?.tourist?.name}</h4>
       <div className="mt-0.5 flex gap-1 ">
        <label className="" title={item?.tourist?.address}>
         <HiOutlineLocationMarker className="h-5 w-5 inline mr-1.5 mb-0.5 " />
         {item?.tourist?.address}
        </label>
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 )
}

export default History
