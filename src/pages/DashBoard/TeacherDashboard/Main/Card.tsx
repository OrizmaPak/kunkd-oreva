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
    <div className="flex py-5 px-5 w-[100%]  gap-20 rounded-3xl bg-white  mx-auto mb-2">
      <div className="">
        <img src={image} alt="image " className="w-[120px]" />
      </div>
      <div className="flex flex-col">
        <span className="text-[20px]">{title}</span>
        <span className="font-bold text-[50px] ">{amount}</span>
      </div>
    </div>
  );
};

export default Card;
