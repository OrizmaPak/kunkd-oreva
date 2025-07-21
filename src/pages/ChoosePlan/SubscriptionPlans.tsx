import React from "react";
import { Table} from "@mantine/core";
import { FaCheck, FaTimes } from "react-icons/fa";
import BgImage from "@/assets/newBackground.svg"; 
import { useGetPlans } from "@/api/queries";
import { handleEventTracking } from "@/api/moengage";
import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

const SubscriptionPlans = () => {

    const { isLoading, data } = useGetPlans();
  
    const planData = data?.data.data;

const isNigeria = planData?.countryCode === "NG";
const isUK = planData?.countryCode === "GB";
const countryCode = planData?.countryCode || "US"; // Default to US if not available

const discountPrice = isNigeria
  ? planData?.plans[0]?.naira_discount_value
  : isUK
  ? planData?.plans[0]?.pounds_discount_value
  : planData?.plans[0]?.dollar_discount_value;

const price = isNigeria
  ? planData?.plans[0]?.naira_value
  : isUK
  ? planData?.plans[0]?.pounds_value
  : planData?.plans[0]?.dollar_value;


  const yearDiscountPrice = isNigeria
  ? planData?.plans[1]?.naira_discount_value
  : isUK
  ? planData?.plans[1]?.pounds_discount_value
  : planData?.plans[1]?.dollar_discount_value;

const yearPrice = isNigeria
  ? planData?.plans[1]?.naira_value
  : isUK
  ? planData?.plans[1]?.pounds_value
  : planData?.plans[1]?.dollar_value;
  const monthlyPlanId = planData?.plans[0]?.id;
  const yearlyPlanId = planData?.plans[1]?.id;
  const features = [
    "Safe, ad-free content",
    "Access unlimited quality content",
    "New content every week",
    "Multiple children’s profiles",
    "Monitor child’s progress",
  ];

  const thStyle: React.CSSProperties = {
    textAlign: "center",
    verticalAlign: "middle",
    padding: "16px", // Increased padding for header cells
  };

  const tdStyle: React.CSSProperties = {
    padding: "20px", // Increased padding for body cells
  };

    const [user] = useStore(getUserState);
  const navigate = useNavigate();

   const handlePaln = (planId: number) => {
      const currencyIso =
        countryCode === "NG" ? "NGN" : countryCode === "UK" ? "GBP" : "USD";
      if (!planData?.plans) {
        // navigate("/childprofilesetup");
        if (sessionStorage.getItem("gotToHome") === "true") {
          navigate("/parent");
        } else {
          navigate("/childprofilesetup");
        }
      } else {
        handleEventTracking("web_add_to_cart", {
          user_id: user?.user_id,
          subsription_plan: planId,
          // date: timeString,
          amount: price,
          currency:
            countryCode === "NG" ? "NGN" : countryCode === "UK" ? "GBP" : "USD",
        });
        sessionStorage.setItem("planId", planId?.toString());
        sessionStorage.setItem("price", price as string);
        sessionStorage.setItem("currency_iso3", currencyIso);
        navigate("/makepayment");
      }
    };

  return (
    <div   style={{
    backgroundImage: `url(${BgImage})`,
    backgroundSize: "cover",      // Optional
    backgroundRepeat: "no-repeat", // Optional
    backgroundPosition: "center",  // Optional
  }}
   className="flex justify-center items-center min-h-screen ">
      <div className="p-6 w-full max-w-4xl">
        <div className="flex justify-center items-center rounded-lg">
          <div className="bg-[#FFF6D9] px-[100px] py-4 rounded-t-3xl border-[3px] border-white">
            <h2 className="text-center text-[36px] font-bold  font-BalooSemiBold">
              Select your Subscription
            </h2>
            <p className="text-center text-gray-500 ">
              Select your most preferred subscription plan.
            </p>
          </div>
        </div>

        {/* Container with border radius */}
        <div className="border bg-white border-gray-200 rounded-2xl overflow-hidden">
          <Table  striped>
            <thead className="bg-[#C4F2FF]">
              <tr>
                <th style={thStyle}></th>
                <th style={thStyle}>Free</th>
                <th style={thStyle}>
                  Monthly - {discountPrice?.split('.')[0]} <br />
                  <span className="line-through ">{price}</span>
                </th>
                <th style={thStyle}>
                  Yearly - {yearDiscountPrice?.split('.')[0]} <br />
                  <span className="line-through ">{yearPrice}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td style={tdStyle} className="text-left font-medium">
                    {feature}
                  </td>
                  <td style={tdStyle} className="text-center">
                    {index === 0 ? (
                      <FaCheck className="text-customGreen mx-auto" />
                    ) : (
                      <FaTimes className="text-gray-400 mx-auto" />
                    )}
                  </td>
                  <td style={tdStyle} className="text-center">
                    <FaCheck className="text-customGreen mx-auto" />
                  </td>
                  <td style={tdStyle} className="text-center">
                    <FaCheck className="text-customGreen mx-auto" />
                  </td>
                </tr>
              ))}
              <tr>
                <td style={tdStyle}></td>
                <td style={tdStyle} className="text-center">
                  <Button varient="outlined"  className="rounded-full border-customGreen px-[30px]  " onClick={() => navigate("/childprofilesetup")}>
                  <span className="text-[#AEB7BF]">
                     Choose 
                    </span> 
                  </Button>
                </td>
                <td style={tdStyle} className="text-center">
                  <Button varient="outlined"  className="rounded-full border-customGreen px-[30px] "  onClick={() => handlePaln(monthlyPlanId as number)}>
                                     <span className="text-[#AEB7BF]">
                    Subscribe
                    </span>
                  </Button>
                </td>
                <td style={tdStyle} className="text-center">
                  <Button varient="filled" className="rounded-full bg-customGreen px-[30px] text-white" onClick={() => handlePaln(yearlyPlanId as number)}>
                    Subscribe
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
