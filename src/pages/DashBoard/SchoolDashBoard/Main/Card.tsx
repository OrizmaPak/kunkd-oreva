const Card = ({
  image,
  title,
  amount,
}: {
  image: string;
  title: string;
  amount: number;
}) => {
  return (
    <div className="flex p-4 gap-8 rounded-3xl bg-white w-[250px] flex-grow ">
      <div className="">
        <img loading="lazy" src={image} alt="image " className="w-[62px]" />
      </div>
      <div className="flex flex-col ">
        <span className=" text-gray-400 text3 ">{title}</span>
        <span className="font-semibold text25 ">{amount ? amount : 0}</span>
      </div>
    </div>
  );
};

export default Card;
