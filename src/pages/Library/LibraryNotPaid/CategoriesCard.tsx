import React from "react";

const CategoriesCard = ({ image, label }: { image: string; label: string }) => {
  return (
    <div className="flex gap-3 justify-center items-center">
      <span>
        <img src={image} alt="image" className="w-[50px] h-[50px]" />
      </span>
      <p className="font-bold font-Recoleta">{label}</p>
    </div>
  );
};

export default CategoriesCard;
