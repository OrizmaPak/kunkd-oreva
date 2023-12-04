import { Loader } from "@mantine/core";
import { motion } from "framer-motion";


const ChangeProfileStatus = ({ onCancel, onContinue, isLoading,activeIsLoading, label,}: { onCancel: () => void , isLoading?:boolean,activeIsLoading?:boolean, label?:string, onContinue?:()=>void}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="font-bold text20  text-center  leading-8 mb-10">
        Are you sure you want to change the status of this {" "}{label}?
      </h1>
      {/* <p className="text-center mb-10 ">
        If you change status of this {label} you can reverse it
      </p> */}

      <div className="flex justify-end gap-4 mb-5 px-5">
        <button
          onClick={onCancel}
          className="p-3 pad-x-10 bg-red-200 text-red-600 rounded flex-grow"
        >
          Cancel
        </button>
        <button
          onClick={onContinue}
          className="p-3 pad-x-10 bg-red-600 text-white rounded flex-grow"
        >
            {isLoading || activeIsLoading? (
                <p className="flex justify-center items-center">
                  <Loader color="white" size="sm" />
                </p>
              ) : (
                <span>Continue</span>
              )}
          
        </button>
      </div>
    </motion.div>
  );
};

export default ChangeProfileStatus;
