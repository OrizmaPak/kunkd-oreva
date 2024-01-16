import UserIcon from "@/assets/usericon.svg";

import { TSchoolStudentStat } from ".";
import { Skeleton } from "@mantine/core";

const MyTeacher = ({
  schoolStudentStat,
  isLoading,
}: {
  schoolStudentStat: TSchoolStudentStat;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <Skeleton
          height={150}
          width={280}
          radius={20}
          mb="xl"
          visible={isLoading}
        />
      ) : (
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
      )}
    </>
  );
};

export default MyTeacher;
