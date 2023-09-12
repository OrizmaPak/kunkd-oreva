import EditPencil from "@/assets/editPencil.svg";
import { motion } from "framer-motion";
import { TTeacherList } from "../Teachers/Teachers";

const Grade = ({
  data,
  handleClick,
  onEdit,
  student_count,
}: {
  name1?: string;
  data?: TTeacherList;
  handleClick?: () => void;
  onEdit?: (e: any) => void;
  student_count: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="pb-3 px-7">
        <hr className="mb-8" />

        <div className="">
          <p className="flex my-4 gap-2  items-center" onClick={onEdit}>
            {data?.user.firstname ? (
              <span> Assigned teacher</span>
            ) : (
              <span>There is no teacher assigned to this class</span>
            )}
            <img
              loading="lazy"
              src={EditPencil}
              alt="editpencil"
              className=" cursor-pointer"
            />
          </p>
          <div className=" flex justify-start gap-10 items-center my-5">
            <div className="flex justify-center  gap-2 items-center  border-r-gray-500 ">
              {data?.user.image && (
                <img
                  loading="lazy"
                  src={data?.user.image}
                  alt="image"
                  className="w-[60px] h-[60px] rounded-full"
                />
              )}
              <span>
                {data?.user.firstname} {data?.user.lastname}
              </span>
            </div>
            {/* <div className="flex justify-center gap-2 items-center">
              <img loading="lazy" src={image2} alt="" />
              <span>{name2}</span>
            </div> */}
          </div>
          <div>
            <p>No of students in class </p>
            <span className="font-bold">
              {student_count ? student_count : 0}
            </span>
          </div>
        </div>

        <div className="flex  gap-4  justify-center mt-5 px-10">
          <button
            onClick={handleClick}
            className="py-2 px-5 h-[42px] w-[260px] bg-red-600 text-white rounded-full flex-grow"
          >
            Delete class
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Grade;
