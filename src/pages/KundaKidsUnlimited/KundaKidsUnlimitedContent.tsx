import Marked from "@/assets/marked.svg";
import Cancel from "@/assets/Cancel.svg";
import GreaterIcon from "@/assets/greatericon.svg";
import { Link } from "react-router-dom";

const KundaKidsUnlimitedContent = () => {
  const customArray1 = [
    "Newsletter",
    "Booking",
    "KundaKids Mobile and Deesktop App",
    "Confidence Workshop (virtual)",
    "Free Delivery(UK, Euroupe & USA)",
    "Access to Events",
  ];
  const customArray2 = [
    "Storytellling (Africa Languages)",
    "African History Classes",
    "Financial Literacy",
    "Illustration Classes",
    "Digital Gift Box",
  ];

  return (
    <div>
      <div className="max-w-[600px] w-[100%] mx-auto ">
        <div className="pt-24">
          <h1 className="text-center text-[40px]  font-bold font-Recoleta">
            Get Kunda Kids Unlimited
          </h1>
          <p className="text-center text-[#A7A7A7] font-Hanken text-lg">
            Start learning and reading without restrictions
          </p>
        </div>

        <div className="bg-[#8530C1] rounded-[40px] px-6 py-8 border-solid border-[12px] border-gray-200 mt-8">
          <p className=" text-center text-white text-[20px] font-Hanken">
            EnterPrise
          </p>
          <h1 className=" text-center text-[30px] font-bold text-white mb-6 font-Hanken">
            CUSTOM
          </h1>
          <div className="flex justify-between">
            <div className="flex-1">
              {customArray1.map((el) => {
                return <CustomList val={el} />;
              })}
            </div>
            <div>
              {customArray2.map((el) => {
                return <CustomList val={el} />;
              })}
            </div>
          </div>
          <p className="flex justify-center">
            <button className="text-[20px] py-4 px-16 font-bold rounded-[40px] bg-slate-50 text-[#8530C1]">
              {" "}
              <h1>Contact us</h1>
            </button>
          </p>
        </div>
      </div>
      <Link to="/">
        <span>
          <img src={Cancel} alt="Cancle" className="absolute top-10 right-24" />
        </span>
      </Link>
      <span className="absolute right-24 bottom-14 flex gap-4">
        <p className="text-[18px] font-Hanken font-bold">Continue free </p>
        <img src={GreaterIcon} alt="greater icon" />
      </span>
    </div>
  );
};

export default KundaKidsUnlimitedContent;

const CustomList = ({ val }: { val: string }) => {
  return (
    <div className="flex justify-start items-center gap-4 my-6 text-white">
      <span>
        <img src={Marked} alt="marked" />
      </span>
      <p>{val}</p>
    </div>
  );
};
