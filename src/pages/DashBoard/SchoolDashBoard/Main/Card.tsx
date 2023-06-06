import React from "react";

const Card = ({
  image,
  title,
  amount,
}: {
  image: string;
  title: string;
  amount: string;
}) => {
  return (
    <div className="flex p-3 gap-6 rounded-3xl bg-white w-[250px] flex-grow">
      <div className="">
        <img src={image} alt="image " className="w-[60px]" />
      </div>
      <div className="flex flex-col">
        <span>{title}</span>
        <span className="font-bold text-[20px] ">{amount}</span>
      </div>
    </div>
  );
};

export default Card;
