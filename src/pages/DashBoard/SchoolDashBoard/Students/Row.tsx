// import ToggleIcon from "@/assets/toggleicon.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useDisableSchoolStudent } from "@/api/queries";
import ChangeProfileStatus from "@/pages/DashBoard/SchoolDashBoard/Teachers/ChangeProfileStatus";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { TRequestStudents } from "../../TeacherDashboard/Request/Request";
import { handleEventTracking } from "@/api/moengage";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { FaUserCircle } from "react-icons/fa";

const Row = ({
  status,
  data,
}: // onClick,
{
  data: TRequestStudents;
  status: string;
  classCode?: string;
  onClick?: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const [user] = useStore(getUserState);
  const { mutate, isLoading } = useDisableSchoolStudent();
  const datta = data;
  const handleDisableSchoolStudent = async () => {
    mutate(
      { student_id: datta?.id },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ["GetStudents"] });
          handleEventTracking("disable_student", {
            school_id: user?.user_id,
            profile_id: datta?.id,
            student_name: datta?.firstname,
          });
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
  };

  return (
    // <div className="  py-3  h-[72px] hover:cursor-pointer flex-grow font-medium">
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
          onContinue={handleDisableSchoolStudent}
          isLoading={isLoading}
          onCancel={close}
          label="Student"
        />
      </Modal>
      <div>
        <div className="grid h-[72px]   grid-cols-[1fr_1fr_200px]    px-8 border-b-2 border-[#E5E7EB] ">
          <div className="flex items-center justify-start gap-[20px] cursor-pointer ">
            <span>
              {data?.image ? (
                <img
                  loading="lazy"
                  src={data.image}
                  alt="image"
                  className=" w-[46px]"
                />
              ) : (
                <span>
                  <FaUserCircle size={30} color="#BCD678" />
                </span>
              )}
            </span>
            <span>
              {data.firstname} {data.lastname}
            </span>
          </div>
          <div className="flex justify-start items-center ">
            {data.class.class_name}
          </div>

          <div className="flex   gap-12   ">
            <button
              disabled={status !== "active"}
              onClick={() => {
                {
                  status === "active" && open();
                }
              }}
              className={` text-[#7E7E89] font-semibold font-Hanken  `}
            >
              <span>{status === "active" ? "Disable" : "Disabled"}</span>
            </button>
            <button
              disabled={status !== "active"}
              // onClick={onClick}
              className=" text-customGreen font-Inter"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </>

    // </div>
  );
};

export default Row;
