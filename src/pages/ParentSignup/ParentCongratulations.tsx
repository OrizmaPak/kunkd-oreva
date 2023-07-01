import Button from "@/components/Button";
import Congrats from "@/assets/congrats.svg";
import FormWrapper from "@/common/FormWrapper";
import { Link } from "react-router-dom";

const ParentCongratulations = ({}: { onSubmit: () => void }) => {
  return (
    <FormWrapper>
      <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
        <div className="w-[100%]  my-auto ">
          <span></span>
          <div>
            <div className=" flex justify-center items-center">
              <img loading="lazy" src={Congrats} alt="Congrats" />
            </div>
            <h1 className="font-bold text-[40px] text-center mt-4 font-Recoleta">
              Congratulations
            </h1>
            <p className="text-[15px] text-[#A7A7A7] text-center mt-4 mb-16 font-Hanken">
              Your profile has been created
            </p>
            <Link to="/secureaccount">
              <Button size="full">Secure account</Button>
            </Link>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ParentCongratulations;
