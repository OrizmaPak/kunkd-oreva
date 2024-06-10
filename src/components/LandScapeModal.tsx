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
        <h1 className="font-bold text-[16px] mb-2 text-center  font-Inter leading-[25px] ">
          Activate landscape mode and rotate your device for the best
          experience! <br /> Please note that this webApp is not yet
          mobile-responsive. Kindly visit it on a PC or tablet. <br />
          Thank you!
        </h1>
        {/* <p className=" font-InterReg my-4 text-center">
          Please rotate your device to landscape mode for the best experience.
          Thank you!
        </p> */}
        <div className="flex justify-end gap-4 mb-5 "></div>
      </div>
    </motion.div>
  );
};

export default LandScapeModal;
