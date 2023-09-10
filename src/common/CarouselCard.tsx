import "./CarouselCard.css";
type Props = {
  className?: string;
  title?: string;
  body?: string;
};

const CarouselCard = ({ className, title, body }: Props) => {
  return (
    <div className={`${className} w-[600px] carousel-card rounded-3xl  `}>
      <div className={` h-full w-full rounded-3xl p-10  `}>
        <h1 className="font-bold text-[40px] mb-[40px] font-Hanken text-white">
          {title}
        </h1>
        <p className="text-white font-Hanken">{body}</p>
      </div>
    </div>
  );
};

export default CarouselCard;
