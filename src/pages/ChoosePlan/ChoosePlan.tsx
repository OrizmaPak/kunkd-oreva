import ParentSignupLayout from "@/common/ParentSignupLayout";
import MonthPackage from "@/pages/ChoosePlan/ChoosePlanContent";
import Cancel from "@/assets/Cancel.svg";
import useStore from "@/store/index";
import { useNavigate } from "react-router-dom";
import { getProfileState } from "@/store/profileStore";

const ChoosePlan = () => {
  // const [isMonth, setIsMonth] = useState(true);

  // const handleMonth = () => {
  //   setIsMonth(true);
  // };
  // const handleYear = () => {
  //   setIsMonth(false);
  // };
  const [, setProfiles] = useStore(getProfileState);
  const navigate = useNavigate();

  return (
    <>
      <ParentSignupLayout active={2}>
        <div className="mt-20 relative">
          <button
            onClick={() => {
              if (localStorage.getItem("gotToHome") === "true") {
                navigate("/parent");
              } else {
                navigate("/");
                localStorage.clear();
                setProfiles([]);
              }
            }}
          >
            <span className="absolute top-0 right-32">
              <img loading="lazy" src={Cancel} alt="cancel" />
            </span>
          </button>
          <h1 className="text-center font-Recoleta font-bold text-[30px]">
            Get KundaKids Unlimited
          </h1>
          <p className=" text-center  text-gray-300">
            Start learning and reading without restrictions.
          </p>
          {/* <div className="flex j justify-center items-center mt-5">
            <div className="border border-[#E7D4F4] rounded-full gap-4">
              <button
                onClick={handleMonth}
                className={`p-2 px-4 ${
                  isMonth ? "bg-[#8530C1] text-white" : ""
                }  rounded-full text-black`}
              >
                Monthly
              </button>
              <button
                onClick={handleYear}
                className={`p-2 px-4 ${
                  !isMonth ? "bg-[#8530C1] text-white" : ""
                } rounded-full text-black`}
              >
                Yearly
              </button>
            </div>
          </div> */}
          <MonthPackage />
        </div>
      </ParentSignupLayout>
    </>
  );
};

export default ChoosePlan;
