import "./CarouselCard.css";
type Props = {
  className?: string;
  title?: string;
  body?: string;
};

const CarouselCard = ({ className, title, body }: Props) => {
  return (
    <div
      className={`${className}    carousel-card rounded-3xl px-[30px] py-[50px] `}
    >
      <div className={` `}>
        <h1 className="font-bold text-[28px] mb-[20px] leading-[36px] font-Hanken text-white">
          {title}
        </h1>
        <p className="text-white font-Hanken text-[18px]">{body}</p>
      </div>
    </div>
  );
};

export default CarouselCard;
