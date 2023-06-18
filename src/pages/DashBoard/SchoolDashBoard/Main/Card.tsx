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
    <div className="flex p-3 gap-12 rounded-3xl bg-white w-[250px] flex-grow mx-10">
      <div className="">
        <img src={image} alt="image " className="w-[100px]" />
      </div>
      <div className="flex flex-col">
        <span>{title}</span>
        <span className="font-bold text-[20px] ">{amount}</span>
      </div>
    </div>
  );
};

export default Card;
