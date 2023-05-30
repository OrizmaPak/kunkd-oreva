import Checked from "@/assets/Checked.svg";
import Cancel2 from "@/assets/cancel2.svg";
import Hambuger from "@/assets/hambuger.svg";
import FormWrapper from "@/common/FormWrapper";

import { useState } from "react";
const signinDashboardData = [
  {
    title: "Parent Details",
    body: "Please provide your name email and address",
  },
  {
    title: "Secure Account",
    body: "Create a password to secure your account",
  },
  {
    title: "Choose Plan",
    body: "Select a plan, get Kunda kids unlimited",
  },
  {
    title: "Make Payment",
    body: "Enter your payment details",
  },
  {
    title: "Add Child/Children",
    body: "Add your children to manage their account",
  },
];
const ParentSignupLayout = ({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  console.log("---- active step", active);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex w-full  h-screen">
      <div
        className={`bg-[#F9F5FC] w-full h-full bas ${
          !isOpen ? "basis-[150px]" : "basis-1/3"
        } pt-8 px-8`}
      >
        <div onClick={toggle} className="mb-24">
          <img src={isOpen ? Cancel2 : Hambuger} alt="cancel2" />
        </div>
        {signinDashboardData.map((data, index) =>
          isOpen ? (
            <SigninDash
              active={active === index}
              title={data.title}
              body={data.body}
            />
          ) : (
            <SigninDashIonsOnly active={active === index} />
          )
        )}
      </div>
      <div className="bg-white w-full h-full ">{children}</div>
    </div>
  );
};

export default ParentSignupLayout;

const SigninDash = ({
  title,
  body,
  active,
}: {
  title: string;
  body: string;
  active?: boolean;
}) => {
  //   console.log("--- active", active);
  return (
    <div className="flex  mt-16 gap-4">
      <div>
        <img src={Checked} alt="roundmark" />
      </div>
      <div>
        <h1
          className={`text-[20] ${
            active ? "opacity-100" : "opacity-50"
          } font-bold`}
        >
          {title}
        </h1>
        <p>{body}</p>
      </div>
    </div>
  );
};
const SigninDashIonsOnly = ({ active }: { active?: boolean }) => {
  return (
    <div className="mb-20">
      <img src={Checked} alt="roundmark" />
    </div>
  );
};
