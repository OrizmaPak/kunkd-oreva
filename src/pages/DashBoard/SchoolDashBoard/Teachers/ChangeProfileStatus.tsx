import { Loader } from "@mantine/core";
import { motion } from "framer-motion";
// import DisAbledIcon from "@/assets/deleteicon24.png";
import Button from "@/components/Button";

const ChangeProfileStatus = ({
  onCancel,
  onContinue,
  isLoading,
  activeIsLoading,
  status,
  label,
}: {
  onCancel: () => void;
  isLoading?: boolean;
  activeIsLoading?: boolean;
  label?: string;
  onContinue?: () => void;
  status?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="p-0"
    >
      <h1 className="font-bold text20  text-white py-4 px-5  bg-customGreen leading-8 mb-10">
        {status == "active"
          ? "Disable Class"
          : `Enable ${
              label == "class"
                ? "Class"
                : label == "Student"
                ? "Student"
                : "Teacher"
            }`}
      </h1>
      <p className="text-center mb-10 ">
        {` Are sure you want to ${
          status == "active" ? "disable" : "enable"
        } this ${
          label == "Class"
            ? "Class"
            : label == "Student"
            ? "Student"
            : "Teacher"
        }`}
      </p>

      <div className="flex justify-end gap-4 mb-5 px-5">
        <Button
          size="sm"
          onClick={onCancel}
          className="p-3 pad-x-10 text-black flex-grow bg-[#F5F7F8] rounded-full "
        >
          Cancel
        </Button>
        <Button
          onClick={onContinue}
          backgroundColor="green"
          size="sm"
          className="p-3 pad-x-10  text-white flex-grow px-40 rounded-full"
        >
          {isLoading || activeIsLoading ? (
            <p className="flex justify-center items-center">
              <Loader color="white" size="sm" />
            </p>
          ) : (
            <span>{` Yes, ${status == "active" ? "disable " : "enable "}${
              label == "Class"
                ? "Class"
                : label == "Student"
                ? "Student"
                : "Teacher"
            }`}</span>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ChangeProfileStatus;
