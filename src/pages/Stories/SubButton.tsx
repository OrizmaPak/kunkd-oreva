const SubButton = ({
  name,
  onClick,
  subCategoryId,
}: {
  name: string;
  onClick?: () => void;
  subCategoryId: string;
}) => {
  const handleClick = () => {
    if (onClick) onClick();
    sessionStorage.setItem("subCategoryId", subCategoryId);
  };
  return (
    <button
      onClick={handleClick}
      className="py-3 my-2 rounded-3xl text3 pad-x-40 bg-[#FFF7FD]"
    >
      {name}
    </button>
  );
};

export default SubButton;
