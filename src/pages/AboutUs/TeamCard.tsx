import { useState } from "react";

const TeamCard = ({
  name,
  image,
  message,
  title,
}: {
  name: string;
  image: string;
  message: string;
  title: string;
}) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="w-[340px] h-[440px] relative transition-all duration-500 ease-in-out  ">
      <img src={image} alt="image" className="w-[100%] h-[100%]" />
      {showMessage && (
        <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-b from-transparent to-black  rounded-br-[30px] rounded-bl-[30px]"></div>
      )}
      <div
        className="p-4 absolute bottom-0 left-0 w-full pb-10 hover:cursor-default bg-gradient-to-b from-transparent to-black rounded-br-[30px] rounded-bl-[30px] flex flex-col justify-start items-start transition-all duration-300 "
        onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
      >
        <h1 className="  mb-1 font-bold text-[26px] text-white">{name}</h1>
        {!showMessage && (
          <span className="text-white mb-1 font-bold">{title}</span>
        )}
        {showMessage && <p className="text-white text-left">{message}</p>}
      </div>
    </div>
  );
};

export default TeamCard;
