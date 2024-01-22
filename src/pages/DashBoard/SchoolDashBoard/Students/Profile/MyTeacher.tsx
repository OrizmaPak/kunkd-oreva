import UserIcon from "@/assets/profileavatar24.png";

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
          <h1 className=" text-[16px] leading-[30px] font-Hanken font-semibold ">
            My Teacher
          </h1>
          <div className="flex gap-4 items-center mt-8 ">
            <img
              loading="lazy"
              src={schoolStudentStat?.teacher_picture || UserIcon}
              alt="fgrase"
              className="w-[50px]  rounded-full"
            />

            <p className="">
              <p className="font-semibold leading-[30px] font-Hanken text-[14px]  ">
                {schoolStudentStat?.teacher_name}
              </p>
              <p className="mt-0 text-[12px] text-[#B5B5C3]">
                {schoolStudentStat?.teacher_email}
              </p>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyTeacher;
