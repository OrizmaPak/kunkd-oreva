import EditPencil from "@/assets/editPencil.svg";
import { motion } from "framer-motion";

const Grade = ({
  title,
  name1,
  name2,
  image1,
  image2,
  noOfStudents,
  handleClick,
  onEdit,
}: {
  name1?: string;
  name2?: string;
  title?: string;
  image1?: string;
  image2?: string;
  noOfStudents?: number;
  email?: string;
  handleClick?: () => void;
  onEdit?: (e: any) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="p-3 px-7">
        <p className="font-bold font-Recoleta text-[25px] mb-5">{title}</p>

        <hr className="my-3" />

        <div className="">
          <p className="flex my-4 gap-2  items-center" onClick={onEdit}>
            <span> Assigned teachers</span>
            <img src={EditPencil} alt="editpencil" />
          </p>
          <div className=" flex justify-start gap-10 items-center my-5">
            <div className="flex justify-center  gap-2 items-center  border-r-gray-500 ">
              <img src={image1} alt="" />
              <span>{name1}</span>
            </div>
            <div className="flex justify-center gap-2 items-center">
              <img src={image2} alt="" />
              <span>{name2}</span>
            </div>
          </div>
          <div>
            <p>No of students in class </p>
            <span className="font-bold">{noOfStudents}</span>
          </div>
        </div>

        <div className="flex  gap-4  justify-center my-10 px-10">
          <button
            onClick={handleClick}
            className="py-3 px-5 bg-red-600 text-white rounded-full flex-grow"
          >
            Delete class
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Grade;
