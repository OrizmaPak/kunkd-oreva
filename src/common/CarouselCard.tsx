import React from 'react'
type Props={
    className?:string,
    title?:string,
    body?:string

}

const CarouselCard = ({className, title, body}:Props) => {
  return (
    <div className={`${className} w-[600px] h-[313px] rounded-3xl  `}>
        <div className={` h-full w-full rounded-3xl p-10 backdrop-blur-lg `}>
            <h1 className='font-bold text-[40px] mb-10 font-Hanken text-white'>{title}</h1>
            <p className='text-white font-Hanken'>{body}</p>
        </div>
    </div>
  )
}

export default CarouselCard