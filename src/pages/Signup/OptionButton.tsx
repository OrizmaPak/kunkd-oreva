const OptionButton = ({
  title,
  body,
  icon,
  image,
  onClick,
  clicked,
  id,
  setUserId,
  userId,
}: {
  onClick: () => void;
  clicked: boolean;
  title: string;
  image: string;
  icon: React.ReactNode;
  body: string;
  id: number;
  userId: number;
  setUserId: (val: number) => void;
}) => {
  const handlleContinue = () => {
    onClick();
    setUserId(id);
  };
  console.log(userId);
  return (
    <div
      onClick={handlleContinue}
      className={`relative border-[2px] flex gap-4  transition-all duration-300 rounded-3xl py-3 my-3  pad-x-10 cursor-pointer   ${
        clicked ? "border-[2px] border-customGreen " : "border-[#F9F5FC]"
      }`}
    >
      <div className="relative w-[250px]">
        <img src={image} alt="images" className="rounded-2xl" />
        <span className="flex items-end justify-center absolute left-[10px] top-[10px]">
          {icon}
        </span>
      </div>
      <p className="flex items-center text-start justify-between ">
        <div className="flex-1">
          <h1 className="font-BalooSemiBold  text1 ">{title}</h1>
          <p className="font-ArimoRegular text-[#A7A7A7] text3">{body}</p>
        </div>
      </p>
    </div>
  );
};

export default OptionButton;
