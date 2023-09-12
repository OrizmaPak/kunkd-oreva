import BlcakPencil from "@/assets/blackPencilIcon.svg";

const Profile = ({
  name,
  image,
  email,
  asignClass,
  handleClick,
  onEdit,
}: // totalStudent,
{
  name: string;
  image: string;
  email: string;
  asignClass: string;
  handleClick: () => void;
  onEdit: () => void;
  // totalStudent: number;
}) => {
  return (
    <div className="p-3 ">
      <div className="flex gap-4">
        <div>
          <img
            loading="lazy"
            src={image}
            alt="image"
            className="w-[176px] h-[176px] rounded-full "
          />
        </div>
        <div className=" flex-1 px-8">
          <div className="flex flex-col  ">
            <span className="text-[30px] font-bold font-Recoleta  ">
              {name}
            </span>
            <span>{email}</span>
          </div>

          <hr className="my-4 " />
          <div className="flex gap-4">
            <p className="flex flex-col border-r-2  pr-2">
              <span>Assigned class</span>
              <p onClick={onEdit} className="flex gap-2">
                <span className="font-bold"> {asignClass}</span>
                <img
                  loading="lazy"
                  src={BlcakPencil}
                  alt="pencil"
                  className=" cursor-pointer"
                />
              </p>
            </p>
            <p className="flex flex-col">
              <span>No of students in class</span>
              <span className="font-bold">{0}</span>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-4 justify-between">
        <div className="p-4 bg-white rounded-3xl mt-3 border border-[rgba(243, 218, 255, 1)]  w-60 my-5 flex-grow">
          <div className="flex justify-between">
            <h1 className="text-[20px] font-bold">Total Time Spent</h1>
          </div>
          <div>
            <h1 className="text-[25px] font-bold">1,970</h1>
            <p className="flex justify-between ">
              <span>Minutes</span>
              <span className="flex">
                <img loading="lazy" src={PositiveArrow} alt="Positive arrow" />
                <span className="text-green-600">3.9%</span>
              </span>
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-3xl mt-3 border border-[rgba(243, 218, 255, 1)]  w-60 my-5 flex-grow">
          <div className="flex justify-between">
            <h1 className="text-[20px] font-bold">Total Time Spent</h1>
          </div>
          <div>
            <h1 className="text-[25px] font-bold">1,970</h1>
            <p className="flex justify-between ">
              <span>Minutes</span>
              <span className="flex">
                <img loading="lazy" src={PositiveArrow} alt="Positive arrow" />
                <span className="text-green-600">3.9%</span>
              </span>
            </p>
          </div>
        </div>
      </div> */}

      <div className="flex  gap-4  justify-center my-10 px-28">
        {/* <button className="p-4 px-10 bg-red-200 text-red-600 rounded-full flex-grow">
          Cancel
        </button> */}
        <button
          onClick={handleClick}
          className="p-3 px-10 bg-red-600 text-white rounded-full flex-grow"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Profile;
