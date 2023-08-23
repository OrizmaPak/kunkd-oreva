const OptionButton = ({
  title,
  body,
  image,
  onClick,
  clicked,
}: {
  onClick: () => void;
  clicked: boolean;
  title: string;
  image: React.ReactNode;
  body: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative border-[2px]  transition-all duration-300 rounded-md py-4 my-6  px-4 cursor-pointer  bg-[#F9F5FC] ${
        clicked ? "border-[2px] border-[#8530C1]" : "border-[#F9F5FC]"
      }`}
    >
      <p className="flex items-center text-start justify-between ">
        <div className="flex-1">
          <h1 className="font-Hanken font-bold text-[18px]">{title}</h1>
          <p className="font-Hanken text-[#A7A7A7]">{body}</p>
        </div>
        <span className="flex items-end justify-center">
          {/* <img loading="lazy" src={image} alt="checkIcon" /> */}
          {image}
        </span>
      </p>
    </div>
  );
};

export default OptionButton;
