import PositiveArrow from "@/assets/positiveArrow.svg";

const Profile = ({
  name,
  image,
  email,
}: {
  name: string;
  image: string;
  email: string;
}) => {
  return (
    <div className="p-3">
      <p className="font-bold font-Recoleta text-[25px] mb-5">Profile</p>
      <div className="flex gap-4">
        <div>
          <img src={image} alt="image" className="w-[250px]" />
        </div>
        <div className=" flex-1 px-8">
          <div className="flex flex-col  ">
            <span className="text-[30px] font-bold font-Recoleta my-4">
              {name}
            </span>
            <span>{email}</span>
          </div>

          <hr className="my-4" />
          <div className="flex gap-4">
            <p className="flex flex-col border-r-2  pr-4">
              <span>Assigned class</span>
              <span className="font-bold">Purple</span>
            </p>
            <p className="flex flex-col">
              <span>No of students in class</span>
              <span className="font-bold">23</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-3xl mt-3 border border-gray-400  w-60 my-5">
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">Total Time Spent</h1>
        </div>
        <div>
          <h1 className="text-[25px] font-bold">1,970</h1>
          <p className="flex justify-between ">
            <span>Minutes</span>
            <span className="flex">
              <img src={PositiveArrow} alt="Positive arrow" />
              <span className="text-green-600">3.9%</span>
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-4 ">
        <button className="p-4 px-10 bg-red-200 text-red-600 rounded-full">
          Suspend
        </button>
        <button className="p-4 px-10 bg-red-600 text-white rounded-full">
          Remove
        </button>
      </div>
    </div>
  );
};

export default Profile;
