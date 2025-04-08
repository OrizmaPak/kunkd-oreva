import Button from "@/components/Button";
import { Link } from "react-router-dom";
// import { IoCheckmarkCircleOutline } from "react-icons/io5";
import "./schoolcongratulationcontent.css";
import CongratIcon from "@/assets/congratIcon.png";

const SchoolCongratulationsContent = ({ route }: { route: string }) => {
  return (
    <div className="w-full h-full flex justify-center  items-center p-5">
      <div className="inner-form-w mx-auto">
        <div className="w-[100%]  my-auto ">
          <span></span>
          <div>
            <div className=" flex justify-center items-center">
              <img src={CongratIcon} alt="" className="" />
            </div>
            <h1 className="font-bold text-[24px] text-center mt-4 font-BalooSemiBold">
              Congratulations
            </h1>
            <p className="text2 text-[#A7A7A7] text-center mt-2 mb-5 font-ArimoRegular">
              Your profile has been created
            </p>
            <p className="">
              <Link to={route}>
                <Button
                  size="full"
                  className="text2 px-[50px]  rounded-full"
                  backgroundColor="green"
                >
                  Continue
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCongratulationsContent;
