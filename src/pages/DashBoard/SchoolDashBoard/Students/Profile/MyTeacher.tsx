import UserIcon from "@/assets/usericon.svg";

import { TSchoolStudentStat } from ".";

const MyTeacher = ({
  schoolStudentStat,
}: {
  schoolStudentStat: TSchoolStudentStat;
}) => {
  return (
    <div className="p-5 bg-white rounded-3xl flex-grow pb-4">
      <h1 className="font-semibold text-[16px] leading-[30px] font-Hanken font-semibold ">
        My Teacher
      </h1>
      <div className="flex gap-4 items-center mt-8 ">
        <img
          loading="lazy"
          src={schoolStudentStat?.teacher_picture || UserIcon}
          alt="fgrase"
          className="w-[40px]  rounded-full"
        />

        <p className="">
          <p className="font-bold leading-[30px] ">
            {schoolStudentStat?.teacher_name}
          </p>
          <p className="mt-0">{schoolStudentStat?.teacher_email}</p>
        </p>
      </div>
    </div>
  );
};

export default MyTeacher;
