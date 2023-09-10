import { useState } from "react";
import Starr from "@/assets/starr.svg";
import Button from "@/components/Button";
import ArrowUp from "@/assets/colorArrowup.svg";
import ArrowDown from "@/assets/colorArrowDown.svg";
import { motion } from "framer-motion";
import useStore from "@/store";
import { getUserState } from "@/store/authStore";

const Subscriptionplan = () => {
  const [openPlan, setOpenPlan] = useState(false);
  const [user] = useStore(getUserState);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-4 ">
        <h1 className="text25 font-bold my-8">Subscription Plan</h1>
        <div className="px-6 border border-[#8530C1]  py-10 rounded-3xl my-8 ">
          <div className="grid grid-cols-[1fr_1fr_300px]">
            <p className="flex flex-col">
              <span className="text-[#B5B5C3] text-[16px]">Plan</span>
              <span className="font-bold text25">Basic</span>
            </p>
            <p className="flex flex-col">
              <span className="text-[#B5B5C3] text-[16px]">Payment</span>
              <span className="font-bold text25">Free</span>
            </p>

            <p className="flex justify-center items-center">
              <Button size="md">
                <p className="flex gap-3">
                  <img loading="lazy" src={Starr} alt="starr" />
                  <span className="text1">Upgrade</span>
                </p>
              </Button>
            </p>
          </div>
          {/* <div className="grid grid-cols-[1fr_1fr_300px]">
            <span></span>
          </div> */}
        </div>
        {user?.role === "parent" && (
          <div>
            <div className="flex items-center gap-4">
              <span
                onClick={() => setOpenPlan((el) => !el)}
                className="flex gap-2 cursor-pointer text3"
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
        <span className="absolute text2 top-[-2px] text-white bg-[#8530C1] px-6 py-2  left-[-3px] rounded-tl-3xl  rounded-br-3xl">
          Recommended
        </span>
      )}
      <div className="flex  justify-between w-full ">
        <h1 className="text25 font-bold ">
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
