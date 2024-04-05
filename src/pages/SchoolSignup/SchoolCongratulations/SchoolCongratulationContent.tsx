import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import "./schoolcongratulationcontent.css";

const SchoolCongratulationsContent = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="inner-form-w mx-auto">
        <div className="w-[100%]  my-auto ">
          <span></span>
          <div>
            <div className=" flex justify-center items-center">
              <IoCheckmarkCircleOutline color="#8530C1" className="congrat-w" />
            </div>
            <h1 className="font-bold header2 text-center mt-4 font-Recoleta">
              Congratulations
            </h1>
            <p className="text2 text-[#A7A7A7] text-center mt-2 mb-5 font-Hanken">
              Your profile has been created
            </p>
            <Link to="/kundakidsunlimited">
              <Button size="full" className="text2">
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCongratulationsContent;
