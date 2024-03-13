import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTourById, rating } from '../../services/tour.service'
import { ITour } from '../../interfaces/tour'
import { HiLocationMarker } from 'react-icons/hi'
import HoverRating from '../../components/HoverRating'
import { toastMessage } from '../../utils/toastMessage'

interface Props {}

const DetailTourist: FC<Props> = (): JSX.Element => {
 const { id } = useParams()
 const [tour, setTour] = useState<ITour>()
 const [rate, setRate] = useState<number | null>(0)

 const getDetail = async () => {
  const res = await getTourById(id)
  if (res?.status === 200) {
   setTour(res.data)
  }
 }

 const rateTour = async (rate: number | null) => {
  const res = await rating({ tourist_id: id, rate: rate })
  if (res?.status === 205) {
   setRate(rate)
   toastMessage('Cảm ơn bạn đánh giá', 'success')
  }

  if (res?.status === 401) {
   toastMessage('Bạn vui lòng đăng nhập để đánh giá', 'error')
  }
 }

 useEffect(() => {
  if (id) {
   getDetail()
  }
 }, [id])
 return (
  <div className="px-24  pb-4 pt-8  flex flex-col gap-1 relative">
   <h3 className="font-semibold text-[26px] text-blue-600">{tour?.name}</h3>
   <div className="font-semibold text-[18px]">
    <HiLocationMarker className="inline h-6 w-6 ml-[-4px] mb-1.5 text-blue-600" />{' '}
    Địa chỉ: <span>{tour?.address}</span>
   </div>

   <div className="flex  items-center">
    <span className="font-semibold text-[18px] mr-4">Đánh giá:</span>
    <HoverRating
     value={tour?.rate || null}
     isHover={false}
     precision={0.5}
     css="no-center"
    />
    <span className="ml-[-72px] font-semibold">{tour?.rate} </span>
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

   <div className="fixed bottom-[36px] right-[36px]  bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-md px-12 py-6 flex flex-col justify-center items-center gap-3">
    <p className="font-semibold text-base">
     Hãy gửi đánh giá đến cho chúng tôi
    </p>
    <HoverRating
     value={rate}
     setValue={rateTour}
     isHover={true}
     precision={1}
    />
   </div>
  </div>
 )
}

export default DetailTourist
