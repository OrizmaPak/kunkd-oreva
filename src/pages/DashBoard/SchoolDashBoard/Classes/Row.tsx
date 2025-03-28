// import ToggleIcon from "@/assets/toggleicon.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useActiveClass, useDisableClass } from "@/api/queries";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ChangeProfileStatus from "../Teachers/ChangeProfileStatus";
import { TClassList } from "./Classes";
import { formattedDate, handleEventTracking } from "@/api/moengage";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import OuterRec from "@/assets/Outer Rectangle.png";

const Row = ({
  data,
  onClick,
  status,
}: {
  data: TClassList;
  onClick?: () => void;
  status?: string;
}) => {
  const [currentClicked, setCucrrentClicked] = useState(0);

  const queryClient = useQueryClient();
  const [user] = useStore(getUserState);

  const { mutate, isLoading } = useDisableClass();
  const { mutate: mutateActiveClass, isLoading: activeLoading } =
    useActiveClass();

  const handleDisableClass = async () => {
    if (status === "active") {
      mutate(
        { class_id: currentClicked },
        {
          onSuccess(data) {
            handleEventTracking("disable_class", {
              school_id: user?.user_id,
              disable_date: formattedDate,
            });
            queryClient.invalidateQueries({ queryKey: ["GetClassList"] });
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
    } else {
      mutateActiveClass(
        { class_id: currentClicked },
        {
          onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["GetClassList"] });
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
        radius={20}
        padding={0}
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
          onContinue={handleDisableClass}
          activeIsLoading={activeLoading}
          isLoading={isLoading}
          onCancel={close}
          label="Class"
          status={status}
        />
      </Modal>
      <div className="   my-auto border-b-[2px] border-[#eee] text-[#101928]  py-6 font-medium ">
        <div>
          <div className="grid  grid-cols-[300px_1fr_1fr_250px]  text-[#101928] font-Arimo  px-8">
            {/* <div className="flex justify-start items-center ">
              <span className=" ">
                <img loading="lazy" src={Rectangle} alt="" />
              </span>
            </div> */}
            <div
              onClick={onClick}
              className="flex hover:cursor-pointer items-center  text-[#101928] justify-start gap-3 "
            >
              <img src={OuterRec} alt="image" className="w-[20px] h-[20px]" />

              <span className="text-[#101928] font-Arimo">{data.name}</span>
            </div>
            <div className="flex justify-start items-center   ">
              {data.student_count}
            </div>
            <div className="">Mike Smith</div>
            <div className="flex justify-between  gap-4  items-center pr-4 ">
              <span>
                {/* <img loading="lazy" src={ToggleIcon} alt="" /> */}
              </span>
              <button
                onClick={() => {
                  setCucrrentClicked(data.id);
                  open();
                }}
                className=" text-[#7E7E89] font-semibold font-Hanken "
              >
                <span className="">
                  {status === "active" ? "Disable" : "Enable"}
                </span>
              </button>
              <button
                onClick={onClick}
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
