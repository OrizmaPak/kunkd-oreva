import { Loader } from "@mantine/core";
import { motion } from "framer-motion";
import DisAbledIcon from "@/assets/deleteicon24.png";
import Button from "@/components/Button";

const ChangeProfileStatus = ({
  onCancel,
  onContinue,
  isLoading,
  activeIsLoading,
  label,
}: {
  onCancel: () => void;
  isLoading?: boolean;
  activeIsLoading?: boolean;
  label?: string;
  onContinue?: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex  justify-center items-center mb-3">
        <img src={DisAbledIcon} alt="image" className="w-[60px] h-[60px]" />
      </div>
      <h1 className="font-bold text20  text-center  leading-8 mb-10">
        Do you want to disable this {label}?
      </h1>
      {/* <p className="text-center mb-10 ">
        If you change status of this {label} you can reverse it
      </p> */}

      <div className="flex justify-end gap-4 mb-5 px-5">
        <Button
          varient="outlined"
          onClick={onCancel}
          className="p-3 pad-x-10 text-black rounded flex-grow"
        >
          Cancel
        </Button>
        <Button
          onClick={onContinue}
          className="p-3 pad-x-10 bg-red-600 text-white rounded flex-grow"
        >
          {isLoading || activeIsLoading ? (
            <p className="flex justify-center items-center">
              <Loader color="white" size="sm" />
            </p>
          ) : (
            <span>Yes</span>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ChangeProfileStatus;
