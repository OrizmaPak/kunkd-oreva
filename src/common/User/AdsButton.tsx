import { useNavigate } from "react-router-dom";
const AdsButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <p className="bg-[#8530C1] rounded-3xl mx-20 py-4 flex justify-between items-center gap-4 pad-x-40 ">
          <p className="font-[bold] text-white text1">
            Get unlimited access to books in resource
            <span className="text-[#FBC70D] font-bold ml-2 text1">$59.88</span>
            /year
          </p>
          <button onClick={()=>navigate(`/packages`)} className="bg-white text1 text-[#8530C1] text2 font-bold rounded-3xl px-4 py-2">
            Upgrade Plan
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdsButton;
