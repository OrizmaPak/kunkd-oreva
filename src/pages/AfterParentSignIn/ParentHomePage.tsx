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

const ParentHomePage = () => {
  const [currentStep, setCurrentStep] = useState(STEP_1);
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Modal
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
            {currentStep === STEP_1 && (
              <WelcomeModal onContinue={() => setCurrentStep(STEP_2)} />
            )}
            {currentStep === STEP_2 && (
              <ChildNameModal onContinue={() => setCurrentStep(STEP_3)} />
            )}
            {currentStep === STEP_3 && (
              <ChildAgeModal onContinue={() => setCurrentStep(STEP_4)} />
            )}
            {currentStep === STEP_4 && (
              <SelectAvatar onContinue={() => setCurrentStep(STEP_5)} />
            )}
            {currentStep === STEP_5 && <WellDoneModal onContinue={close} />}
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

export default ParentHomePage;
