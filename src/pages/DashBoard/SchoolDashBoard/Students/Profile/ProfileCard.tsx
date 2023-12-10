import { TSchoolStudentStat } from "./";

const ProfileCard = ({
  schoolStudentStat
}: {
  schoolStudentStat:TSchoolStudentStat
}) => {
  return (
    <div className="grid grid-cols-[1fr_200px_1fr] bg-[#003914] text-white p-3 rounded-3xl gap-3 mx-[auto]">
      <div className="flex justify-center items-center">
        <img
          loading="lazy"
          src={schoolStudentStat?.avatar}
          alt="image"
          className="w-[100px] rounded-full  border-white border"
        />
      </div>
      <div className=" border-r-2 pt-5">
        <h1 className="text-[24px] leading-8">{schoolStudentStat?.name}</h1>
        <p>{schoolStudentStat?.parent_email}</p>
      </div>
      <div className="flex justify-center ">
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
