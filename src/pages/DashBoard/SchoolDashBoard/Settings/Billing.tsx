import { useGetLicense } from "@/api/queries";
import { TLicense } from "../Main/Main";
import Button from "@/components/Button";
import ClassesIcon from "@/assets/components/ClassesIcon";
import TeachersIcon from "@/assets/components/TeachersIcon";
import StudentsIcon from "@/assets/components/StudentsIcon";

const Billing = () => {
  const { data: dataLicense } = useGetLicense();
  const license: TLicense = dataLicense?.data.data.school.licence;
  return (
    <div className="px-8 py-5">
      <div className="border-[2px] border-[#ECEFF1] p-8 rounded-md">
        <p className="text-[14px] font-InterReg">Current Plan Summary</p>
        <hr className="mb-5 mt-2" />
        <div className="flex justify-between items-center">
          <div className="w-[165px] h-[94px] text-[14px] font-InterReg">
            <p className="text-[14px] font-Inter flex gap-2 justify-center">
              {" "}
              <ClassesIcon /> Class
            </p>

            <p className=" font-Inter text-[20px] text-center">
              {license?.license_class_count || "0"}
            </p>
            <p className="text-[#98A2B3]  font-InterReg text-center text-[12px]">
              <span className="text-[14px] px-1 font-Inter text-customGreen">
                {license?.added_class_count || "0 "}
              </span>
              slots available of
              <span className="text-[14px]  font-Inter px-1">
                {license?.license_class_count || "0"}
              </span>
            </p>
          </div>

          <div className="w-[165px] h-[94px]">
            <p className="text-[14px] font-Inter flex gap-2 justify-center">
              <TeachersIcon />
              Teachers
            </p>

            <p className=" font-Inter text-[20px] text-center">
              {license?.license_teacher_count || "0"}
            </p>
            <p className="text-[#98A2B3]  font-InterReg text-center text-[12px]">
              <span className="text-[14px] px-1 font-Inter text-customGreen">
                {license?.added_teacher_count || "0"}
              </span>
              slots available of
              <span className="text-[14px]  font-Inter px-1">
                {license?.license_teacher_count || "0"}
              </span>
            </p>
          </div>

          <div className="w-[165px] h-[94px]">
            <p className="text-[14px] font-Inter flex gap-2 justify-center">
              <StudentsIcon />
              Students
            </p>

            <p className=" font-Inter text-[20px] text-center">
              {license?.license_student_count || "0"}
            </p>
            <p className="text-[#98A2B3]  font-InterReg text-center text-[12px]">
              <span className="text-[16px]  font-Inter px-1 text-customGreen ">
                {license?.added_student_count || "0"}
              </span>
              slots available of
              <span className="text-[14px]  font-Inter px-1">
                {license?.license_student_count || "0"}
              </span>
            </p>
          </div>
        </div>

        <p className="text-[14px] font-InterReg mt-8">Subscription Plan</p>
        <hr className="mb-5 mt-2" />
        <div className="flex justify-between items-center my-4 ">
          <div className="w-[60%] flex justify-between items-center ">
            <div>
              <p className=" font-Inter text-[20px]">Starter Plan</p>
              <p className="text-[14px] font-InterReg">Annual</p>
            </div>
            <div>
              <p className="text-[#696969]">Start date</p>
              <p className="text-[#2C3137]">Nov 19, 2024</p>
            </div>
            <div>
              <p className="text-[#696969]">Expiry</p>
              <p className="text-[#2C3137]">Nov 19, 2025</p>
            </div>
          </div>
          <div className="w-[40%] flex justify-end items-end ">
            <Button
              size="sm"
              backgroundColor="green"
              className="px-[14px] rounded-full"
            >
              Upgrade plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
