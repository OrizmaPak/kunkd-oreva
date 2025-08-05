import Button from "@/components/Button";
import { Link } from "react-router-dom";
import CongratIcon from "@/assets/congratIcon.png";


const ConnectToSchSuccessModal = () => {
  return (
 <>
      <div className="w-full h-full flex justify-center items-center py-4">
        <div className="inner-form-w2 mx-auto relative">
          <div className="w-[100%]  my-auto ">
            <div>
              <div className=" flex justify-center items-center">
              <img src={CongratIcon} alt="" className="" />
            </div>
            <div className=" mt-4 mb-2">
              <h1 className="  font-semibold header2 font-BalooSemiBold my-4 text-center">
                Congratulations
              </h1>
              <p className="text2 text-[#A7A7A7] text-center mb-4 font-Hanken">
               You have successfully connected to a school.
              </p>
            </div>
              <Link to="">
                <Button
                  size="full"
                  className="text2 px-[50px]  rounded-full"
                  backgroundColor="green"
                >
                  Continue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
 
 </>
  
  );
};

export default ConnectToSchSuccessModal;
