import GooglePay from "@/assets/GooglePay.svg";
import PayPal from "@/assets/PayPal.svg";
import ApplePay from "@/assets/ApplePay.svg";
import Visa from "@/assets/visa.svg";
import Master from "@/assets/Mastercard.svg";
import Stripe from "@/assets/Stripe.svg";
import Amex from "@/assets/AMEX.svg";
import Payooner from "@/assets/Payoneer.svg";
import UnionPay from "@/assets/unionpay.svg";
import Discover from "@/assets/discover.svg";

import Stat from "@/pages/Home/Stat";
const PaymentType = () => {
  return (
    <div className=" z-10 relative  pb-[100px]">
      <Stat>
        <div className="flex  w-[100%] px-20 pt-24">
          <div className="  flex-grow  flex  justify-start items-center ">
            <div>
              <form>
                <p className="flex flex-col gap-y-4">
                  <label htmlFor="country">Country/region</label>
                  <select
                    name=""
                    id=""
                    className="p-4 border border-[#8530C1] rounded-3xl px-8 "
                  >
                    <option value="">Nigeria(NGN #)</option>
                  </select>
                </p>
              </form>
            </div>
          </div>

          <div className="  flex-grow grid grid-cols-5 gap-y-10 ">
            <span className="flex items-center justify-center">
              <img src={GooglePay} alt="googlepay" className="w-[30%]" />
            </span>
            <span className="flex items-center justify-center">
              <img src={PayPal} alt="googlepay" className="w-[30%]" />
            </span>
            <span className="flex items-center justify-center">
              <img src={ApplePay} alt="googlepay" className="w-[30%]" />
            </span>
            <span className="flex items-center justify-center">
              <img src={Visa} alt="googlepay" className="w-[30%]" />
            </span>
            <span className="flex items-center justify-center">
              <img src={Master} alt="googlepay" className="w-[30%]" />
            </span>
            <span className="flex items-center justify-center">
              <img src={Stripe} alt="googlepay" className="w-[30%]" />
            </span>
            <span className="flex items-center justify-center">
              <img src={Amex} alt="googlepay" className="w-[30%]" />
            </span>

            <span className="flex items-center justify-center">
              <img src={Payooner} alt="googlepay" className="w-[30%]" />
            </span>
            <span className="flex items-center justify-center">
              <img src={UnionPay} alt="googlepay" className="w-[30%]" />
            </span>
            <span className="flex items-center justify-center">
              <img src={Discover} alt="googlepay" className="w-[30%]" />
            </span>
          </div>
        </div>
      </Stat>
    </div>
  );
};

export default PaymentType;
