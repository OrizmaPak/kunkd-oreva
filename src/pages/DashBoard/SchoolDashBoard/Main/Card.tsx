const Card = ({
  image,
  title,
  amount,
  max
}: {
  image: string;
  title: string;
  amount: number;
  max: number;
}) => {
  return (
    <div className="flex p-4 gap-8 rounded bg-white  flex-grow ">
      <div className="">
        <img loading="lazy" src={image} alt="image " className="w-[62px]" />
      </div>
      <div className="flex flex-col ">
        <span className=" text-gray-400 text3 ">{title}</span>
        <span className="font-semibold text25 ">{amount ? amount : 0} / {max}</span>
      </div>
    </div>
  );
};

export default Card;
