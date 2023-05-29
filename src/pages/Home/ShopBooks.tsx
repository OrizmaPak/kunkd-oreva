import ShopCard from './ShopCard'
import ShopCard1 from '@/assets/Chisom.svg'
import WaveThree from '@/assets/wavethree.svg'
import client1 from '@/assets/client.svg'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import { useRef } from 'react'
import {BsChevronRight,BsChevronLeft} from "react-icons/bs";


import ClientCard from './ClientCard'

const ShopBooks = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows : false,
    slidesToScroll: 1,
    autoplay: true,
      autoplaySpeed: 2000
  };

  var settings2 = {
    className: "center",
    arrows: false,
    dots: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 2,
      swipeToSlide: true,
  }
  const arrowStyles = {
    color: 'red', // Replace with your desired color
    '&:hover': {
      color: 'blue' // Replace with your desired hover color
    }
  };

  const sliderRef= useRef<Slider>(null)
  return (
    <div className=''>
      <div className="bg-cover bg-bottom  w-full  matt h-[250px] " style={{ backgroundImage: `url(${WaveThree})` }}></div>
      <div className='bg-[#EBEFF3]  w-[100%] pb-[40px] '>

      <div className='max-w-[800px] mx-auto mb-[70px] leading-8 text-center '>
            <h1 className='text-black text-3xl font-bold text-center mb-4 leading-8 ' >Shop Our Books</h1>
            <p>Discover a world of literary treasures at the Kunda Kids store, where you can find carefully curated books, educational materials, and engaging resources. From beautifully illustrated storybooks to interactive learning kits, we provide everything you need to create a nurturing environment that sparks a love for reading in your child.
            </p>
        </div>

        <div className='max-w-[1000px] mx-auto'>
          
        <Slider {...settings}>
          <div> 
        <ShopCard image={ShopCard1} title='Chisoms Eco-Friendly Vist' body='Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit.
          Visit Store'/>
          </div>
          <div>

        <ShopCard image={ShopCard1} title='Chisoms Eco-Friendly Vist' body='Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit.
          Visit Store'/>
          </div>
          <div>

        <ShopCard image={ShopCard1} title='Chisoms Eco-Friendly Vist' body='Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit.
          Visit Store'/>
          </div>
         
               
          </Slider>
        </div>
      
      
      
      <div className='max-w-[800px] mx-auto leading-8 text-center'>
        <h1 className='pt-8 text-3xl font-bold '>What Our Client's Have To say</h1>
        <p>Kunda & Friends is a beautiful new music-led 3D animation and for children that takes preschoolers on a fun and adventurous ride with Kunda and his friends</p>
      </div>

        <div className='max-w-[1000px] mx-auto gap-4 mb-20 mt-14  relative'>
          <button onClick={()=>sliderRef?.current?.slickPrev()} className='absolute z-10 -left-8 top-[45%] hover:text-white bg-[#ffff] hover:bg-[#8530C1] rounded-full p-1'>
          <BsChevronLeft  />
          </button>
          <button onClick={()=>sliderRef?.current?.slickNext()} className='absolute z-10 -right-8 top-[45%] hover:text-white bg-[#ffff] hover:bg-[#8530C1] rounded-full p-1'>
          <BsChevronRight  />
          </button>
        <Slider ref={sliderRef} {...settings2}>
            <div className='mr-4'>
            <ClientCard name='Bolu Watife' location='Lagos Nigeria' image={client1} story=' Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'/>
            </div>
            <div className='mr-4'>
            <ClientCard name='Bolu Watife' location='Lagos Nigeria' image={client1} story=' Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'/>
            </div>
            <div className='mr-4'>
            <ClientCard name='Bolu Watife' location='Lagos Nigeria' image={client1} story=' Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'/>
            </div>
            <div className='mr-4'>
            <ClientCard name='Bolu Watife' location='Lagos Nigeria' image={client1} story=' Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'/>
            </div>
            <div className='mr-4'>
            <ClientCard name='Bolu Watife' location='Lagos Nigeria' image={client1} story=' Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'/>
            </div>
            <div className='mr-4'>
            <ClientCard name='Bolu Watife' location='Lagos Nigeria' image={client1} story=' Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'/>
            </div>

          </Slider>
          
          <style>
        {`
          .slick-prev,
          .slick-next {
            // background-color: ${arrowStyles.color};
          }
          .slick-prev:hover,
          .slick-next:hover {
            background-color: ${arrowStyles['&:hover'].color};
            color: ${arrowStyles['&:hover'].color};
            border-radius : 50%;
          }
        `}
      </style>
          {/* <ClientCard name='Bolu Watife' location='Lagos Nigeria' image={client1} story=' Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'/> */}

        </div>
    </div>
    </div>
  )
}

export default ShopBooks
