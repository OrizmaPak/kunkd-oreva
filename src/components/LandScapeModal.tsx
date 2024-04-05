import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LandScapeModal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <div className="flex justify-center items-center mb-3"></div>
        <h1 className="font-bold text-[25px] mb-2 text-center  font-Inter leading-[30px] ">
          Rotate Your Device for the Best Experience!
        </h1>
        <p className=" font-InterReg my-4 text-center">
          Please rotate your device to landscape mode for the best experience.
          Thank you!
        </p>
        <div className="flex justify-end gap-4 mb-5 "></div>
      </div>
    </motion.div>
  );
};

export default LandScapeModal;
