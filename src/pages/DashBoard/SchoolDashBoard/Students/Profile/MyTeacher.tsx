import UserIcon from "@/assets/usericon.svg";

import { TSchoolStudentStat } from ".";

const MyTeacher = ({schoolStudentStat}:{schoolStudentStat:TSchoolStudentStat}) => {
  return (
    <div className="py-2 bg-white px-3 rounded-3xl flex-grow pb-4">
      <h1 className="font-bold text-[20px]">My Teacher</h1>
      <div className="flex  justify-between items-center mt-8 ">
        <img
          loading="lazy"
          src={schoolStudentStat?.teacher_picture || UserIcon}
          alt="fgrase"
          className="w-[70px]  rounded-full"
        />

        <p className="flex flex-col ">
          <p className="font-bold ">{schoolStudentStat?.teacher_name}</p>
          <p>{schoolStudentStat?.teacher_email}</p>
        </p>
      </div>
    </div>
  );
};

export default MyTeacher;
