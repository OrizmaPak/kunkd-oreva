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
    <div className="grid grid-cols-[1fr_200px_1fr] bg-[#003914] text-white p-3 rounded-3xl gap-3 mx-[auto]">
      <div className="flex justify-center items-center">
        <img
          loading="lazy"
          src={image}
          alt="image"
          className="w-[100px] rounded-full  border-white border"
        />
      </div>
      <div className=" border-r-2 pt-5">
        <h1 className="text-[24px]">{name}</h1>
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
