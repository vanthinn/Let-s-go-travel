import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTourById } from '../../services/tour.service'
import { ITour } from '../../interfaces/tour'
import { HiLocationMarker } from 'react-icons/hi'

interface Props {}

const DetailTourist: FC<Props> = (): JSX.Element => {
 const { id } = useParams()
 const [tour, setTour] = useState<ITour>()

 const getDetail = async () => {
  const res = await getTourById(id)
  if (res?.status === 200) {
   setTour(res.data)
  }
 }

 useEffect(() => {
  if (id) {
   getDetail()
  }
 }, [id])
 return (
  <div className="px-24  pb-4 pt-8  flex flex-col gap-1">
   <h3 className="font-semibold text-[26px] text-blue-600">{tour?.name}</h3>
   <div className="font-semibold text-[18px]">
    <HiLocationMarker className="inline h-6 w-6 ml-[-4px] mb-1.5 text-blue-600" />{' '}
    Địa chỉ: <span>{tour?.address}</span>
   </div>
   <div
    className={``}
    dangerouslySetInnerHTML={{
     __html: tour?.info || '',
    }}
   />
   <div className="grid grid-cols-4 gap-4">
    {tour?.url_imgs
     .slice(1, tour?.url_imgs.length - 1)
     .split(',')
     .map((item, index) => (
      <div key={index} className="max-h-50 w-full overflow-hidden ">
       <img
        className="h-full w-full object-cover group-hover:scale-110  transition-all duration-300 "
        src={item.replaceAll("'", '')}
        alt="img"
       />
      </div>
     ))}
   </div>
  </div>
 )
}

export default DetailTourist
