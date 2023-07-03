import { useState } from "react";
import Starr from "@/assets/starr.svg";
import Button from "@/components/Button";
import ArrowUp from "@/assets/colorArrowup.svg";
import ArrowDown from "@/assets/colorArrowDown.svg";
import { motion } from "framer-motion";

const Subscriptionplan = () => {
  const [openPlan, setOpenPlan] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-4 ">
        <h1 className="text-[25px] font-bold my-8">Subscription Plan</h1>
        <div className="p-6 border border-[#8530C1]  rounded-3xl my-8">
          <div className="grid grid-cols-[1fr_1fr_300px]">
            <span className="text-[#B5B5C3] text-[16px]">Plan</span>
            <span className="text-[#B5B5C3] text-[16px]">Payment</span>
            <p className="flex justify-center items-center">
              <Button size="md">
                <p className="flex gap-3">
                  <img loading="lazy" src={Starr} alt="starr" />
                  <span>Upgrade</span>
                </p>
              </Button>
            </p>
          </div>
          <div className="grid grid-cols-[1fr_1fr_300px]">
            <span className="font-bold text-[30px]">Basic</span>
            <span className="font-bold text-[30px]">Free</span>
            <span></span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span
            onClick={() => setOpenPlan((el) => !el)}
            className="flex gap-2 cursor-pointer"
          >
            See avalaible plan
            <img
              loading="lazy"
              src={openPlan ? ArrowDown : ArrowUp}
              alt="arrow"
            />
          </span>
          <hr className="flex-grow" />
        </div>
        {openPlan && (
          <div className="flex  gap-20">
            <PlanCard duration={12} amount={59.88} recommended />
            <PlanCard duration={1} amount={4.99} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Subscriptionplan;

const PlanCard = ({
  amount,
  duration,
  recommended,
}: {
  duration?: number;
  amount?: number;
  recommended?: boolean;
}) => {
  return (
    <div className="border-4 border-[#8530C1] text-[#8530C1] p-8 flex-grow rounded-3xl mt-10 relative flex items-center  h-36">
      {recommended && (
        <span className="absolute top-[-2px] text-white bg-[#8530C1] px-6 py-2  left-[-3px] rounded-tl-3xl  rounded-br-3xl">
          Recommended
        </span>
      )}
      <div className="flex  justify-between w-full ">
        <h1 className="text-[23px] font-bold ">
          {duration && duration > 1
            ? `${duration} Months`
            : `${duration} Month`}
        </h1>
        <h1 className="text-[23px] ">
          ${duration && duration > 1 ? `${amount}/Y` : `${amount}/M`}
        </h1>
      </div>
    </div>
  );
};
