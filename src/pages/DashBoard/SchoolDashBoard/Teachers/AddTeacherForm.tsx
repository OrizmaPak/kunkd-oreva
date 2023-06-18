import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import EmailIcon from "@/assets/emaillogo.svg";
import PasswordIcon from "@/assets/passwordIcon.svg";
import PasswordEye from "@/assets/passwordeye.svg";
import { motion } from "framer-motion";

const AddTeacherForm = ({ handleContinue }: { handleContinue: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="p-4">
        <div>
          <h1 className="font-bold  font-Recoleta text-center mb-8">
            Add New Teacher
          </h1>
        </div>
        <form>
          <div className="flex gap-2 mb-2">
            <div className="flex-grow">
              <label htmlFor="firstname">Enter first Name</label>
              <InputFormat placeholder="First name" type="text" />
            </div>
            <div className="flex-grow">
              <label htmlFor="lastname">Enter Last name</label>
              <InputFormat placeholder="Last name" type="text" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email">Enter Email Address</label>
            <InputFormat
              type="email"
              placeholder="Email"
              leftIcon={<img src={EmailIcon} alt="icon" />}
            />
          </div>
          <div className="flex gap-2 mb-2">
            <div className=" flex-grow">
              <label htmlFor="password">Enter Password</label>
              <InputFormat
                type="password"
                placeholder="password"
                leftIcon={<img src={PasswordIcon} alt="pasword icon" />}
                rightIcon={<img src={PasswordEye} alt="paswordeye icon" />}
              />
            </div>
            <div className="flex-grow">
              <label htmlFor="password">Confirm Password</label>
              <InputFormat
                type="password"
                placeholder="password"
                leftIcon={<img src={PasswordIcon} alt="pasword icon" />}
                rightIcon={<img src={PasswordEye} alt="paswordeye icon" />}
              />
            </div>
          </div>

          <div className="flex gap-2 mb-2">
            <div className="flex-grow">
              <label htmlFor="class">Assign to a class</label>
              <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
                <select
                  name=""
                  id=""
                  placeholder="Select class"
                  className="w-full  h-full flex-1  focus:outline-none"
                ></select>
              </p>
            </div>
            <div className="flex-grow">
              <label htmlFor="class">Select gender</label>
              <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
                <select
                  name=""
                  id=""
                  placeholder="Select gender"
                  className="w-full  h-full flex-1  focus:outline-none"
                ></select>
              </p>
            </div>
          </div>
          <div className="max-w-[60%] mx-auto my-4">
            <Button onClick={handleContinue}>Continue</Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTeacherForm;
