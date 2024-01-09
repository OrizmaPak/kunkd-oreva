import { getApiErrorMessage } from "@/api/helper";
import { useAddTeacherData } from "@/api/queries";
import { STEP_1, STEP_2 } from "@/utils/constants";
import { Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AddTeacherForm, { TTeacherData } from "./AddTeacherForm";
import UploadPicture from "./UploadPicture";

const AddTeacherModal = ({
  opened,
  toggle,
  openSchNotifications,
}: {
  opened: boolean;
  toggle: () => void;
  openSchNotifications: () => void;
}) => {
  const [modalStep, setModalStep] = useState(STEP_1);
  const handleContinue = () => {
    setModalStep(STEP_2);
  };
  const queryClient = useQueryClient();

  const [teacherData, setTeacherData] = useState<TTeacherData>();
  const { mutate, isLoading } = useAddTeacherData();

  const handleAddTeacherForm = (val: File) => {
    if (val) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const result = event?.target?.result as string; // Extract base64 data
        const base64String = result;

        mutate(
          {
            firstname: teacherData?.firstname,
            lastname: teacherData?.lastname,
            email: teacherData?.email,
            redirect_url: "http://localhost:5173/passwordsetup",
            // redirect_url:"https://dev-kundakids.vercel.app/passwordsetup",

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
              toggle();
              if (
                getApiErrorMessage(err) ===
                "Please upgrade your license to add more teachers"
              ) {
                openSchNotifications();
              }
              notifications.show({
                title: `Notification`,
                message: getApiErrorMessage(err),
              });
            },
          }
        );
      };

      reader.readAsDataURL(val);
    } else {
      mutate(
        {
          firstname: teacherData?.firstname,
          lastname: teacherData?.lastname,
          email: teacherData?.email,
          // redirect_url:"http://localhost:5173/passwordsetup",
          redirect_url: "https://dev-kundakids.vercel.app/passwordsetup",

          // password: teacherData?.password,
          class_id: Number(teacherData?.classid),
          gender_id: Number(teacherData?.genderid),
        },
        {
          onSuccess(data) {
            queryClient.invalidateQueries(["GetTeacherList"]);
            queryClient.invalidateQueries(["GetLicense"]);

            toggle();
            notifications.show({
              title: `Notification`,
              message: data.data.message,
            });
          },

          onError(err) {
            toggle();
            // console.log("what is the error", getApiErrorMessage(err));
            if (
              getApiErrorMessage(err) ===
              "Please upgrade your license to add more teachers"
            ) {
              openSchNotifications();
            }
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        }
      );
    }
  };

  return (
    <Modal
      radius={10}
      size={"lg"}
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
