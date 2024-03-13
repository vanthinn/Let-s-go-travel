import { FC, useEffect, useState } from 'react'
import {
 HiOutlineSearch,
 HiOutlineTrendingUp,
 HiOutlineLocationMarker,
} from 'react-icons/hi'
import Autocomplete from '../../components/Autocomplete'
import { getAllTour } from '../../services/tour.service'
import { ITour } from '../../interfaces/tour'
import { useNavigate } from 'react-router-dom'
import { area, special } from '../../commom/constants'
import { option } from '../../components/Autocomplete/Autocomplete'

interface Props {}

const Home: FC<Props> = (): JSX.Element => {
 const navigate = useNavigate()
 const searchParams = new URLSearchParams(window.location.search)
 const area_id = searchParams.get('area_id')
 const special_id = searchParams.get('special_id')
 const [listTour, setListTour] = useState<ITour[]>([])
 const [listTourRecomend, setListTourRecomend] = useState<ITour[]>([])
 const [loading, setLoading] = useState<boolean>(false)
 const [areaSelect, setAreaSelect] = useState<option>(
  area_id !== null
   ? area.some((item) => item.id === Number(area_id))
     ? area.find((item) => item.id === Number(area_id)) || area[0]
     : area[0]
   : area[0],
 )
 const [specialSelect, setSpecialSelect] = useState(
  special_id !== null
   ? special.some((item) => item.id === Number(special_id))
     ? special.find((item) => item.id === Number(special_id)) || special[0]
     : special[0]
   : special[0],
 )

 const getTourPage = async (params: any): Promise<void> => {
  setLoading(true)
  const res = await getAllTour({ ...params })

  if (res?.status === 200) {
   setListTour(res.data)
  }
  setLoading(false)
 }

 const getTourPageRecommed = async (): Promise<void> => {
  const res = await getAllTour({ limit: 10 })

  if (res?.status === 200) {
   setListTourRecomend(res.data)
  }
 }

 const addQueryParam = (areaSelect: option, specialSelect: option): void => {
  const queryParams = new URLSearchParams()
  queryParams.set('area_id', areaSelect.id.toString())
  queryParams.set('special_id', specialSelect.id.toString())
  const newURL = `?${queryParams.toString()}`
  window.history.pushState({}, '', newURL)
 }

 const callApi = async (params: any) => {
  try {
   await Promise.all([getTourPage(params), getTourPageRecommed()])
  } catch (error) {
   console.log(error)
  }
 }

 useEffect(() => {
  addQueryParam(areaSelect, specialSelect)
  const params = {
   limit: 10,
   area_id: areaSelect.id,
   special_id: specialSelect.id,
  }
  callApi(params)
 }, [specialSelect, areaSelect])

 return (
  <div>
   <div className="px-24 py-4">
    <div className="flex gap-2 items-center text-[#494edc]">
     <HiOutlineTrendingUp className="h-8 w-8 " />
     <h4 className="text-xl">Đề xuất</h4>
    </div>
    <div className="mt-4 grid grid-cols-5 gap-8">
     {listTourRecomend?.map((item, index) => (
      <div
       key={index}
       onClick={() => navigate('/tourist/' + item.id)}
       className="col-span-1 rounded-md min-h-20 bg-slate-100 overflow-hidden group cursor-pointer flex flex-col 
shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
       <div className="max-h-50 w-full overflow-hidden ">
        <img
         className="h-full w-full object-cover group-hover:scale-110  transition-all duration-300 "
         src={item.url_imgs
          .slice(1, item?.url_imgs.length - 1)
          .split(',')[0]
          .replaceAll("'", '')}
         alt="img"
        />
       </div>
       <div className="px-4 py-2 flex flex-col">
        <h4 className="text-xl font-semibold">{item.name}</h4>
        <div className="mt-0.5 flex gap-1 ">
         <label className="line-clamp-1" title={item.address}>
          <HiOutlineLocationMarker className="h-5 w-5 inline mr-1.5 mb-0.5 " />
          {item.address}
         </label>
        </div>
       </div>
      </div>
     ))}
    </div>
   </div>

   <div className="px-24 bg-[#e3e5ff]/10 pb-4 pt-4  ">
    <div className="border-2 border-slate-400 py-4 rounded-lg px-4 flex flex-col">
     <div className="flex gap-2 items-center text-[#4388A5]">
      <HiOutlineSearch className="h-8 w-8 " />
      <h4 className="text-xl">Research</h4>
     </div>
     <div className="flex gap-12 mt-4">
      <div className="flex flex-col ">
       <label className="font-semibold" htmlFor="">
        Địa điểm
       </label>
       <Autocomplete
        width="240px"
        options={area}
        value={areaSelect}
        onChange={setAreaSelect}
       />
      </div>

      <div className="flex flex-col ">
       <label className="font-semibold" htmlFor="">
        Đặc điểm
       </label>
       <Autocomplete
        width="240px"
        options={special}
        value={specialSelect}
        onChange={setSpecialSelect}
       />
      </div>
      {/* <div className=" mt-auto">
       <button className="px-4 py-1.5 rounded-md bg-blue-600 text-white  flex gap-1 items-center hover:bg-blue-400 transition-all duration-200">
        <HiOutlineSearch className="h-5 w-5 " />
        <span>Search</span>
       </button>
      </div> */}
     </div>
    </div>
   </div>

   <div className="px-24 py-4">
    <div className="flex gap-2 items-center text-[#494edc]">
     <HiOutlineTrendingUp className="h-8 w-8 " />
     <h4 className="text-xl">Kết quả tìm kiếm</h4>
    </div>
    <div className="mt-4 grid grid-cols-4 gap-8">
     {!loading &&
      listTour?.map((item, index) => (
       <div
        key={index}
        onClick={() => navigate('/tourist/' + item.id)}
        className="col-span-1 rounded-md min-h-20 bg-slate-100 overflow-hidden group cursor-pointer flex flex-col 
shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="max-h-50 w-full overflow-hidden ">
         <img
          className="h-full w-full object-cover group-hover:scale-110  transition-all duration-300 "
          src={item.url_imgs
           .slice(1, item?.url_imgs.length - 1)
           .split(',')[0]
           .replaceAll("'", '')}
          alt="img"
         />
        </div>
        <div className="px-4 py-2 flex flex-col">
         <h4 className="text-xl font-semibold">{item.name}</h4>
         <div className="mt-0.5 flex gap-1 ">
          <label className="line-clamp-1" title={item.address}>
           <HiOutlineLocationMarker className="h-5 w-5 inline mr-1.5 mb-0.5 " />
           {item.address}
          </label>
         </div>
        </div>
       </div>
      ))}

     {loading && (
      <>
       <div className="h-32 col-span-1 animate-pulse transition-all duration-300 bg-gray-200 rounded-md"></div>
       <div className="h-32 col-span-1 animate-pulse transition-all duration-300 bg-gray-200 rounded-md"></div>
       <div className="h-32 col-span-1 animate-pulse transition-all duration-300 bg-gray-200 rounded-md"></div>
       <div className="h-32 col-span-1 animate-pulse transition-all duration-300 bg-gray-200 rounded-md"></div>
      </>
     )}
    </div>
   </div>
  </div>
 )
}

export default Home
