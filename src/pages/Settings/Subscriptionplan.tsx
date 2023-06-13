import React from "react";
import Starr from "@/assets/starr.svg";
import Button from "@/components/Button";
import ArrowDown from "@/assets/arrowdown.svg";

const Subscriptionplan = () => {
  return (
    <div className="px-20 ">
      <h1 className="text-[25px] font-bold">Subscription Plan</h1>
      <div className="p-6 border border-[#8530C1]  rounded-3xl my-8">
        <div className="grid grid-cols-[1fr_1fr_300px]">
          <span className="text-[#B5B5C3]">Plan</span>
          <span className="text-[#B5B5C3]">Payment</span>
          <p className="flex justify-center items-center">
            <Button size="md">
              <p className="flex gap-3">
                <img src={Starr} alt="starr" />
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
        <span className="flex gap-2">
          See avalaible plan <img src={ArrowDown} alt="arrow" />
        </span>
        <hr className="flex-grow" />
      </div>
    </div>
  );
};

export default Subscriptionplan;
