import { Modal } from "@mantine/core";
import { STEP_1, STEP_2 } from "@/utils/constants";
import AddTeacherForm from "./AddTeacherForm";
import UploadPicture from "./UploadPicture";
import { useState } from "react";

const AddTeacherModal = ({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) => {
  const [modalStep, setModalStep] = useState(STEP_1);
  const handleContinue = () => {
    setModalStep(STEP_2);
  };
  return (
    <Modal
      radius={"xl"}
      size="xl"
      opened={opened}
      onClose={toggle}
      closeButtonProps={{
        size: "xl",
      }}
      centered
    >
      {modalStep === STEP_1 && (
        <AddTeacherForm handleContinue={handleContinue} />
      )}

      {modalStep === STEP_2 && <UploadPicture />}
    </Modal>
  );
};

export default AddTeacherModal;
