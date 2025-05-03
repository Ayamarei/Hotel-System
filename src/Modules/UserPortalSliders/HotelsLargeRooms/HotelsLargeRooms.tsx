import 'swiper/swiper-bundle.css'
import room1 from "../../../assets/images/sliders/largeLivingRooms/room1.png"
import room2 from "../../../assets/images/sliders/largeLivingRooms/room2.png"
import room3 from "../../../assets/images/sliders/largeLivingRooms/room3.png"
import room4 from "../../../assets/images/sliders/largeLivingRooms/room4.png"
import room5 from "../../../assets/images/sliders/largeLivingRooms/room1.png"
import room6 from "../../../assets/images/sliders/largeLivingRooms/room2.png"
import CustomSlider from '../CustomSlider/CustomSlider';
import UserPortalHeading from '../../Shared/UserPortalHeading/UserPortalHeading'
import { useTranslation } from 'react-i18next'


export default function HotelsLargeRooms() {
   const details = [
    {   
        image:room1,
        title:"Green Park",
        subTitle:"Tangerang, Indonesia",
        price: '$102 per night'
    },
    {
        image:room2,
        title:"Podo Wae",
        subTitle:"Madiun, Indonesia",
        price: '$209 per night'
    },
    {
        image:room3,
        title:"Silver Rain",
        subTitle:"Bandung, Indonesia",
        price: '$98 per night'
    },
    {
        image:room4,
        title:"Cashville",
        subTitle:"Kemang, Indonesia",
        price: '$66 per night'
    },
    {
        image:room5,
        title:"Green Park",
        subTitle:"Tangerang, Indonesia",
        price: '$230 per night'
    },
    {
        image:room6,
        title:"Podo Wae",
        subTitle:"Madiun, Indonesia",
        price: '$123 per night'
    }
    ]

    const {t} = useTranslation();
    

  return (
    <>
        <UserPortalHeading title={t("Sliders.HotelsWithLargeRooms")} />
        <CustomSlider  details={details}/>
    </>
  )
}
