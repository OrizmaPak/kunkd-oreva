import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import Hero from "./Hero";
import userImage from "@/assets/userimage1.svg";
import CardScreen from "@/common/User/CardScreen";
import Card from "@/common/User/Card";
import CardNdRange from "@/common/User/CardNdRange";
import AdsButton from "@/common/User/AdsButton";
import {
  data,
  DataType,
} from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";

import { STEP_1, STEP_2, STEP_3, STEP_4, STEP_5 } from "@/utils/constants";
import { useState } from "react";
import {
  WelcomeModal,
  ChildAgeModal,
  ChildNameModal,
  SelectAvatar,
  WellDoneModal,
} from "./Modals";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import LessDownIcon from "@/assets/lessthanIcon.svg";
import Avatar1 from "@/assets/Avatar1.svg";
import Avatar2 from "@/assets/Avatar2.svg";
import Avatar3 from "@/assets/Avatar3.svg";
import Avatar4 from "@/assets/Avatar4.svg";

const ReturningParentHomePage = () => {
  const [currentStep, setCurrentStep] = useState(STEP_1);
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Modal
            style={{ backgroundColor: "red", boxShadow: "none i" }}
            title={
              currentStep > 0 && (
                <img
                  src={LessDownIcon}
                  onClick={() => setCurrentStep(currentStep - 1)}
                  alt="cancel button"
                />
              )
            }
            opened={opened}
            onClose={close}
            centered
            size="lg"
            radius={"xl"}
            closeOnClickOutside={false}
            withCloseButton={false}
          >
            <SelectProfile onClose={close} />
            <style>
              {`
         .mantine-Modal-inner{
            
          background-color:transparent !important;
          };
          .mantine-1xfy099{
          background-color: !important;
          box-shadow:0 !important;

          }
          ..mantine-Modal-header{
            background-color:transparent !important;
          }
                `}
            </style>
          </Modal>
          <Hero userimage={userImage} username="Kunle" />

          <CardScreen
            data={data?.slice(1, 7).map((el) => ({ ...el }))}
            header="New & Trending"
            actiontitle="View all"
            isTitled={false}
            card={(props: DataType) => <Card {...props} />}
          />
          <CardScreen
            data={data?.slice(1, 7).map((el) => ({ ...el }))}
            card={(props: DataType) => <Card {...props} />}
            header="Books In Our Library"
            actiontitle="View Categories"
            isTitled={true}
          />
          <AdsButton />
          <CardScreen
            data={data?.slice(1, 7).map((el) => ({ ...el, title: "" }))}
            header="Recommended For You"
            isTitled={false}
            card={(props: DataType) => <Card {...props} />}
          />
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default ReturningParentHomePage;

const SelectProfile = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex gap-10">
      <img onClick={onClose} src={Avatar1} alt="avatar" />
      <img onClick={onClose} src={Avatar2} alt="avatar" />
      <img onClick={onClose} src={Avatar3} alt="avatar" />
      <img onClick={onClose} src={Avatar4} alt="avatar" />
    </div>
  );
};
