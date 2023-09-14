import { Modal } from "@mantine/core";
import { STEP_1, STEP_2 } from "@/utils/constants";
import AddTeacherForm from "./AddTeacherForm";
import UploadPicture from "./UploadPicture";
import { useState } from "react";
import { TTeacherData } from "./AddTeacherForm";
import { useAddTeacherData } from "@/api/queries";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const [teacherData, setTeacherData] = useState<TTeacherData>();
  const { mutate, isLoading } = useAddTeacherData();

  const handleAddTeacherForm = (val: File) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const result = event?.target?.result as string; // Extract base64 data
      const base64String = result;

      mutate(
        {
          firstname: teacherData?.firstname,
          lastname: teacherData?.lastname,
          email: teacherData?.email,
          // password: teacherData?.password,
          class_id: Number(teacherData?.classid),
          gender_id: Number(teacherData?.genderid),
          image: base64String,
        },
        {
          onSuccess(data) {
            queryClient.invalidateQueries(["GetTeacherList"]);
            toggle();
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
        }
      );
    };

    reader.readAsDataURL(val);
  };

  return (
    <Modal
      radius={"xl"}
      size="xl"
      opened={opened}
      onClose={toggle}
      withCloseButton={false}
      closeButtonProps={{
        size: "xl",
      }}
      centered
    >
      {modalStep === STEP_1 && (
        <AddTeacherForm
          handleContinue={handleContinue}
          setTeacherData={setTeacherData}
          toggle={toggle}
        />
      )}

      {modalStep === STEP_2 && (
        <UploadPicture
          btnTitle="Continue"
          handleSubmit={handleAddTeacherForm}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};

export default AddTeacherModal;
