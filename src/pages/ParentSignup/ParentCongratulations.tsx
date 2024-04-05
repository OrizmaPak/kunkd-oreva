import Button from "@/components/Button";
// import Congrats from "@/assets/congrats.svg";
import FormWrapper from "@/common/FormWrapper";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import "./parentcongratulations.css";

const ParentCongratulations = () => {
  return (
    <FormWrapper>
      {/* <motion.div animate={{}} transition={{ ease: "easeOut", duration: 2 }}> */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="inner-form-w2 mx-auto relative">
          <div className="w-[100%]  my-auto ">
            <span></span>
            <div>
              <div className=" flex justify-center items-center">
                {/* <img loading="lazy" src={Congrats} alt="Congrats" /> */}
                <IoCheckmarkCircleOutline
                  className="congrat-w"
                  color="#8530C1"
                />
              </div>
              <h1 className="font-bold header2 text-center mt-4 font-Recoleta">
                Congratulations
              </h1>
              <p className="text2 text-[#A7A7A7] text-center mb-4 font-Hanken">
                Your profile has been created
              </p>
              <Link to="/secureaccount">
                <Button color="white" size="full" className="text3">
                  Secure account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* </motion.div> */}
    </FormWrapper>
  );
};

export default ParentCongratulations;
