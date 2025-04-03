// import ToggleIcon from "@/assets/toggl.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useDisableSchoolTeacher, useEnableSchoolTeacher } from "@/api/queries";
// import UserIcon from "@/assets/profileavatar24.png";
import ChangeProfileStatus from "@/pages/DashBoard/SchoolDashBoard/Teachers/ChangeProfileStatus";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { TTeacherList } from "./Teachers";
import { formattedDate, handleEventTracking } from "@/api/moengage";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { FaUserCircle } from "react-icons/fa";
import EditTeacher from "./EditTeacher";

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
  const [user] = useStore(getUserState);

  const handleDisableTeacher = async () => {
    if (status === "active") {
      mutate(
        { user_id: currentClicked },
        {
          onSuccess(data) {
            handleEventTracking("disable_teacher", {
              school_id: user?.user_id,
              disable_date: formattedDate,
            });
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
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  return (
    <>
      <Modal
        radius={20}
        padding={0}
        size={"md"}
        opened={opened}
        onClose={close}
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

      <Modal
        radius={20}
        padding={0}
        size={"md"}
        opened={openedEdit}
        onClose={closeEdit}
        withCloseButton={false}
        centered
      >
        <EditTeacher currentData={data} close={closeEdit} />
      </Modal>
      <div className=" hover:cursor-pointer  font-medium">
        <div>
          <div className="grid  grid-cols-[1fr_1fr_200px_200px_200px] text-[#101928]  font-InterReg h-[72px] items-center   px-8 border-b-2 border-[#E5E7EB]">
            {/* <div className="flex justify-start items-center ">
            <span className=" ">
              <img loading="lazy" src={Rectangle} alt="image" />
            </span>
          </div> */}
            <div
              onClick={onClick}
              className="flex items-center justify-start gap-[20px] "
            >
              <span>
                <FaUserCircle size={30} color="#BCD678" />
              </span>
              <span>
                {data.user.firstname} {data.user.lastname}
              </span>
            </div>
            <div className="flex justify-start items-center ">
              {data.user.email}
            </div>
            <div>{data?.user?.class_name || "No class has been assigned"}</div>
            <div>Apr 12, 2023 | 09:32AM</div>
            {/* <div className="flex justify-start items-center ">
              {data.user.gender === "Male" ? (
                <span className="text-[#2BB457] bg-[#ECFDF3] rounded-3xl py-1 px-5">
                  Male
                </span>
              ) : (
                <span className="bg-[#EDF0FF] text-[#447ADC] rounded-3xl py-1 px-5">
                  Female
                </span>
              )}
            </div> */}
            <div className="flex justify-between  gap-4  items-center pr-10">
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
                onClick={openEdit}
                className=" text-customGreen font-Inter"
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
