import { CardTypes } from "../Home/ClientCard" 


const OptionButton = ({title, body,image, onClick, clicked}:CardTypes & {onClick : ()=> void ,clicked: boolean } ) => {
  return (
    <div onClick={onClick} className={`relative  rounded-md py-4 my-6  px-4 cursor-pointer bg-[#F9F5FC] ${clicked?'border border-[#8530C1]':''}`}>
        <p className='flex items-center text-start justify-between '>
            <div className='flex-1'  >
                <h1 className='font-Hanken font-bold text-[18px]'>{title}</h1>
                <p className='font-Hanken text-[#A7A7A7]'>{body}</p>
            </div>
        <span className='flex items-end justify-center'>
            <img src={image} alt="checkIcon" />
            </span>
        </p>
    </div>
  )
}

export default OptionButton

  