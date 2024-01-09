import { getApiErrorMessage } from "@/api/helper";
import { useCancelSubscription, useGetPlans } from "@/api/queries";
import ArrowDown from "@/assets/colorArrowDown.svg";
import ArrowUp from "@/assets/colorArrowup.svg";
import Starr from "@/assets/starr.svg";
import Button from "@/components/Button";
// import useStore from "@/store";
// import { getUserState } from "@/store/authStore";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Subscriptionplan = () => {
  const navigate = useNavigate();
  const { data } = useGetPlans();
  const { mutate, isLoading } = useCancelSubscription();
  console.log("plansdata---->", data?.data?.data);
  const planData = data?.data?.data;
  const [openPlan, setOpenPlan] = useState(false);
  // const [user] = useStore(getUserState);
  const stringObject = localStorage.getItem("user");
  const userObject = JSON.parse(stringObject as string);
  console.log("user----->", userObject);
  const handleCancelSubscription = () => {
    mutate("data", {
      onSuccess(data) {
        notifications.show({
          title: `Notification`,
          message: data.data.message,
        });
      },

      onError(err) {
        notifications.show({
          title: `Notification`,
          message: getApiErrorMessage(err),
        });
      },
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-4 ">
        <h1 className="text25 font-bold my-8">Subscription Plan</h1>

        {userObject?.subscription?.status === false ? (
          <div>
            <div className="px-6 border-[2px] border-[#FBECFF]  py-10 rounded-3xl my-8 ">
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
                  <Button onClick={() => navigate("/packages")} size="md">
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
          </div>
        ) : (
          <div>
            <div className="flex justify-end ">
              <button
                onClick={handleCancelSubscription}
                className="p-3 border-[#FDA29B] border-[2px] rounded text-[#B42318] text2"
              >
                {isLoading ? (
                  <p className="flex justify-center items-center">
                    <Loader color="red" size="sm" />
                  </p>
                ) : (
                  <span>Cancel Subscription</span>
                )}
              </button>
            </div>
            <div className="border-[2px] border-[#FBECFF]  py-10 rounded-3xl my-8 ">
              <div className="flex justify-between  px-3">
                <p>
                  <button className=" p-2  flex item-center justisfy-center gap-2 rounded">
                    {" "}
                    <span className="font-semibold">
                      {userObject?.subscription?.plan.charAt(0).toUpperCase() +
                        userObject?.subscription?.plan.slice(1)}{" "}
                      Plan{" "}
                    </span>{" "}
                  </button>
                </p>
                <p>
                  <button
                    disabled={userObject?.subscription?.status}
                    onClick={() => navigate("/packages")}
                    className="bg-[#F3DAFF] p-2 text-[#8530C1] flex item-center justisfy-center gap-2 rounded"
                  >
                    {" "}
                    <BiSolidEdit size={20} color="#8530C1" />
                    <span>change plan</span>{" "}
                  </button>
                </p>
              </div>
              <hr className="border-[2px] border-[#FBECFF]  my-2 " />
              <div className="px-3">
                {planData && (
                  <p>
                    <span className="text25">
                      {userObject?.subscription?.amount}{" "}
                    </span>{" "}
                    per{" "}
                    {userObject?.subscription?.plan === "standard"
                      ? "Month"
                      : "Year"}
                  </p>
                )}
              </div>
            </div>
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
