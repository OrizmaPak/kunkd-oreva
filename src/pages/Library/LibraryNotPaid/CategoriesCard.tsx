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
        <img
          loading="lazy"
          src={image}
          alt="image"
          className="w-[70px] h-[70px]"
        />
      </span>
      <p className="font-semibold  font-Hanken text1">{label}</p>
    </div>
  );
};

export default CategoriesCard;
