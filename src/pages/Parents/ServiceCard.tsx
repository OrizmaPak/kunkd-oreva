import { CardTypes } from "../Home/ClientCard"

const ServiceCard = ({title, image, body}:CardTypes) => {
  return (
    <div className="flex mb-8  items-center gap-8">
      <div className=" w-[100px] " >
        <img src={image} alt="cardimage"className="w-full h-full"  />
      </div>
      <div className="flex-1">
        <h1 className="font-bold  text3xl">{title}</h1>
        <p>{body}</p>

      </div>
    </div>
  )
}

export default ServiceCard
