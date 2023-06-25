import React from "react";

const CategoriesCard = ({
  image,
  label,
  goTo,
}: {
  image: string;
  label: string;
  goTo: () => void;
}) => {
  return (
    <div
      onClick={goTo}
      className="flex gap-3 justify-center items-center cursor-pointer"
    >
      <span>
        <img src={image} alt="image" className="w-[100px] h-[100px]" />
      </span>
      <p className="font-bold font-Recoleta">{label}</p>
    </div>
  );
};

export default CategoriesCard;
