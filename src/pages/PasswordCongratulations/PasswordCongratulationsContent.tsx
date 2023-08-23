import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const PasswordCongratulationsContent = () => {
  return (
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
            The password has been updated
          </p>
          <Link to="/login">
            <Button size="full">Back to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordCongratulationsContent;
