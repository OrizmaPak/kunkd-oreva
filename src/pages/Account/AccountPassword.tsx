import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { motion } from "framer-motion";

const SettingPassword = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-4">
        <h1 className="text-[25px] font-bold py-8">Password</h1>

        <form>
          <div className="grid grid-cols-[150px_1fr_1fr] gap-8 my-6 items-center">
            <p className="flex flex-col">
              <span>Old Password</span>
            </p>

            <span>
              <hr className="mr-16" />
            </span>
            <span>
              <InputFormat type="password" placeholder="xxxxxxxx" />
            </span>
          </div>
          <div className="grid grid-cols-[150px_1fr_1fr] gap-8 my-6 items-center">
            <p className="flex flex-col">
              <span>New Password</span>
            </p>
            <span>
              <hr className="mr-16" />
            </span>
            <span>
              <InputFormat type="password" placeholder="xxxxxxxx" />
              <span className="text-gray-400 mt-4">Minimum 6 characters</span>
            </span>
          </div>

          <p className="flex justify-center items-center pt-14  px-48">
            <Button>Change</Button>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default SettingPassword;
