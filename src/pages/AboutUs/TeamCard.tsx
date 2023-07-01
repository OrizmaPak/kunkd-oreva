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
      <img
        loading="lazy"
        src={image}
        alt="image"
        className="w-[100%] h-[100%]"
      />
      {showMessage && (
        <div
          className={
            "absolute h-full w-full top-0 left-0 bg-gradient-to-b from-transparent to-black  rounded-br-[30px] rounded-bl-[30px]"
          }
        ></div>
      )}
      <div
        className={
          "p-4 pt-0 group absolute bottom-0 left-0 w-full pb-10 hover:cursor-default bg-gradient-to-b from-transparent to-black rounded-br-[30px] rounded-bl-[30px] flex flex-col justify-start items-start transition-all duration-300 overflow-hidden "
        }
        onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
      >
        <h1 className=" font-bold text-[26px] text-white">{name}</h1>
        <div className="mt-1 h-0 group-hover:h-[120px] transition-all duration-300">
          {!showMessage ? (
            <span className="group-hover:opacity-0 text-white font-bold">
              {title}
            </span>
          ) : (
            <p
              className={
                "opacity-0 group-hover:opacity-100 text-white text-left "
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
