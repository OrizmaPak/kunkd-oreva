import React from "react";

const ProfileCard = ({
  image,
  name,
  email,
  gender,
}: {
  image?: string;
  name?: string;
  email?: string;
  gender?: string;
}) => {
  return (
    <div className="grid grid-cols-[1fr_200px_1fr] bg-[#003914] text-white p-3 rounded-3xl gap-4  mx-[auto]">
      <div className="flex justify-center items-center">
        <img src={image} alt="image" className="w-[100px] rounded-full" />
      </div>
      <div className=" border-r-2">
        <h1>{name}</h1>
        <p>{email}</p>
      </div>
      <div className="flex justify-center ">
        <div className="  flex-col gap-4 ml-4">
          <p className="mt-4 mb-2">Gende: {gender}</p>
          <span className=" border-dotted border-2 px-3 py-2 rounded-full inline-block ">
            Class: Purple - A
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
