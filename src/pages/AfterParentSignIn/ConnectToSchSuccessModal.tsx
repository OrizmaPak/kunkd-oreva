import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";
import CongratIcon from "@/assets/congratIcon.png";

const ConnectToSchSuccessModal = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center py-4">
      <div className="inner-form-w2 mx-auto relative">
        <div className="w-[100%] my-auto">
          <div className="flex justify-center items-center">
            <img src={CongratIcon} alt="congratulations" />
          </div>
          <div className="mt-4 mb-2">
            <h1 className="font-semibold header2 font-BalooSemiBold my-4 text-center">
              Congratulations
            </h1>
            <p className="text2 text-[#A7A7A7] text-center mb-4 font-Hanken">
              You have successfully connected to a school.
            </p>
          </div>
          <Button
            size="full"
            className="text2 px-[50px] rounded-full"
            backgroundColor="green"
            onClick={() => navigate("/schooldashboard/content")}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectToSchSuccessModal;
