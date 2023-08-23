import Button from "@/components/Button";
// import Congrats from "@/assets/congrats.svg";
import FormWrapper from "@/common/FormWrapper";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ParentCongratulations = ({}: { onSubmit: () => void }) => {
  return (
    <FormWrapper>
      {/* <motion.div animate={{}} transition={{ ease: "easeOut", duration: 2 }}> */}
      <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
        <div className="w-[100%]  my-auto ">
          <span></span>
          <div>
            <div className=" flex justify-center items-center">
              {/* <img loading="lazy" src={Congrats} alt="Congrats" /> */}
              <IoCheckmarkCircleOutline size={150} color="#8530C1" />
            </div>
            <h1 className="font-bold text-[40px] text-center mt-4 font-Recoleta">
              Congratulations
            </h1>
            <p className="text-[15px] text-[#A7A7A7] text-center mt-4 mb-16 font-Hanken">
              Your profile has been created
            </p>
            <Link to="/secureaccount">
              <Button color="white" size="full">
                Secure account
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* </motion.div> */}
    </FormWrapper>
  );
};

export default ParentCongratulations;
