import Marked from "@/assets/marked.svg";
import Cancel from "@/assets/Cancel.svg";
import GreaterIcon from "@/assets/greatericon.svg";
import { Link, useNavigate } from "react-router-dom";
import "./kundakidsunlimitedcontent.css";

const KundaKidsUnlimitedContent = () => {
  const navigate = useNavigate();
  const customArray1 = [
    "Newsletter",
    "Booking",
    "KundaKids Mobile and Deesktop App",
    "Free Delivery(UK, Euroupe & USA)",
  ];
  const customArray2 = [
    "Storytellling (Africa Languages)",
    "Financial Literacy",
    "Access to Events",
    "Digital Gift Box",
  ];

  return (
    <div>
      <div className="max-w-[600px] w-[100%] mx-auto ">
        <div className="pt-24">
          <h1 className="text-center header2  font-bold font-Recoleta">
            Get Kunda Kids Unlimited
          </h1>
          <p className="text-center text-[#A7A7A7] font-Hanken text2 mb-8">
            Start learning and reading without restrictions
          </p>
        </div>

        <div className="bg-[#8530C1] rounded-[40px] px-6 py-4 border-solid border-[12px] unlimited-card border-[#E7D4F4] mt-8 mx-auto">
          <p className=" text-center text-white text-[18px] font-Hanken">
            School
          </p>
          <h1 className=" text-center text-[36px] font-medium text-white mb-4 font-Hanken">
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
            <button className="text-[20px] my-8 py-3 px-14 font-bold rounded-xl bg-slate-50 text-[#8530C1]">
              <span className="text-[20px]">Contact us</span>
            </button>
          </p>
        </div>
      </div>
      {/* <Link to="/">
        <span>
          <img
            loading="lazy"
            src={Cancel}
            alt="Cancle"
            className="absolute top-10 right-24"
          />
        </span>
      </Link> */}
      <div className=" footer-btn-container relative py-2 flex justify-end items-end  mx-auto">
        <button
          onClick={() => navigate("/school")}
          className="flex justify-center items-center gap-4"
        >
          <p className="text-[16px] font-Hanken font-semibold">
            Continue free{" "}
          </p>
          <img loading="lazy" src={GreaterIcon} alt="greater icon" />
        </button>
      </div>
    </div>
  );
};

export default KundaKidsUnlimitedContent;

const CustomList = ({ val }: { val: string }) => {
  return (
    <div className="flex justify-start items-center gap-4 my-4 text-white">
      <span>
        <img loading="lazy" src={Marked} alt="marked" />
      </span>
      <p className="text-[12px]">{val}</p>
    </div>
  );
};
