import { TSchoolStudentStat } from "./";

const ProfileCard = ({
  schoolStudentStat,
}: {
  schoolStudentStat: TSchoolStudentStat;
}) => {
  return (
    <div className="flex justify-between bg-[#003914] text-white px-6 py-4 rounded-xl  mx-[auto] ">
      <div className="flex justify-center items-center gap-3">
        <img
          loading="lazy"
          src={schoolStudentStat?.avatar}
          alt="image"
          className="w-[100px] rounded-full  border"
        />
        <div className=" ">
          <h1 className="text-[24px] leading-8">{schoolStudentStat?.name}</h1>
          <p>{schoolStudentStat?.parent_email}</p>
        </div>
      </div>
      <p className="border-[2px] border-white h-[100px] py-4 " />
      <div className="flex justify-start  ">
        <div className="  flex-col gap-4 ml-4 flex item-center justify-center">
          {/* <p className="mt-4 mb-2">Gende: {gender}</p> */}
          <span className=" border-dotted border-2 px-3 py-2  rounded-full inline-block ">
            Class: {schoolStudentStat?.class}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
