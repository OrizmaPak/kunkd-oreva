// import ToggleIcon from "@/assets/toggl.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useDisableSchoolTeacher, useEnableSchoolTeacher } from "@/api/queries";
import Rectangle from "@/assets/boxIcon.svg";
import UserIcon from "@/assets/usericon.svg";
import ChangeProfileStatus from "@/pages/DashBoard/SchoolDashBoard/Teachers/ChangeProfileStatus";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { TTeacherList } from "./Teachers";

const Row = ({
  data,
  onClick,
  currentClicked,
  status,
}: {
  data: TTeacherList;
  onClick: () => void;
  currentClicked: number;
  status: string;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDisableSchoolTeacher();
  const { mutate: enableMutate, isLoading: enableLoading } =
    useEnableSchoolTeacher();

  const handleDisableTeacher = async () => {
    if (status === "active") {
      mutate(
        { user_id: currentClicked },
        {
          onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["GetTeacherList"] });
            notifications.show({
              title: `Notification`,
              message: data.data.message,
            });
            close();
          },

          onError(err) {
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        }
      );
    } else if (status === "disable") {
      enableMutate(
        { user_id: currentClicked },
        {
          onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["GetTeacherList"] });
            notifications.show({
              title: `Notification`,
              message: data.data.message,
            });
            close();
          },

          onError(err) {
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        }
      );
    }
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        radius={10}
        padding={30}
        size={"md"}
        opened={opened}
        onClose={close}
        // title={
        //   modalStep && modalStep === STEP_3 ? (
        //     <h1 className="text-[22px] font-semibold text-center  ml-20 font-Recoleta">
        //       Edit Assigned Class
        //     </h1>
        //   ) : null
        // }
        withCloseButton={false}
        centered
      >
        <ChangeProfileStatus
          onCancel={close}
          onContinue={handleDisableTeacher}
          isLoading={isLoading || enableLoading}
          label="Teacher"
        />
      </Modal>
      <div className=" hover:cursor-pointer  font-medium">
        <div>
          <div className="grid  grid-cols-[1fr_300px_150px_150px]  py-3  px-8 border-b-2 border-[#F2F4F7]">
            {/* <div className="flex justify-start items-center ">
            <span className=" ">
              <img loading="lazy" src={Rectangle} alt="image" />
            </span>
          </div> */}
            <div
              onClick={onClick}
              className="flex items-center justify-start gap-2 "
            >
              <span>
                <img
                  loading="lazy"
                  src={data.user.image || UserIcon}
                  alt="image"
                  className="w-[40px] h-[40px] object-cover rounded-xl "
                />
              </span>
              <span>
                {data.user.firstname} {data.user.lastname}
              </span>
            </div>
            <div className="flex justify-start items-center  text-[#7E7E89]">
              {data.user.email}
            </div>
            <div className="flex justify-start items-center ">
              {data.user.gender === "Male" ? (
                <span className="text-[#2BB457] bg-[#ECFDF3] rounded-3xl py-1 px-5">
                  Male
                </span>
              ) : (
                <span className="bg-[#EDF0FF] text-[#447ADC] rounded-3xl py-1 px-5">
                  Female
                </span>
              )}
            </div>
            <div className="flex justify-end  gap-4  items-center">
              <span>
                {/* <img loading="lazy" src={ToggleIcon} alt="image" /> */}
              </span>
              <button
                onClick={() => {
                  open();
                }}
                className="text-[#7E7E89] font-semibold font-Hanken "
              >
                <span>{status === "active" ? "Disable" : "Enable"}</span>
              </button>
              <button
                disabled={status !== "active"}
                onClick={onClick}
                className=" text-[#8530C1] font-Inter"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Row;
