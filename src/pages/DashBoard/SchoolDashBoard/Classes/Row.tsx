// import ToggleIcon from "@/assets/toggleicon.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useActiveClass, useDisableClass } from "@/api/queries";
import Rectangle from "@/assets/boxIcon.svg";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ChangeProfileStatus from "../Teachers/ChangeProfileStatus";
import { TClassList } from "./Classes";

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

  const { mutate, isLoading } = useDisableClass();
  const { mutate: mutateActiveClass, isLoading: activeLoading } =
    useActiveClass();

  const handleDisableClass = async () => {
    if (status === "active") {
      mutate(
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
          onContinue={handleDisableClass}
          activeIsLoading={activeLoading}
          isLoading={isLoading}
          onCancel={close}
          label="Class"
        />
      </Modal>
      <div className="   my-auto border-b-[2px] border-[#eee]  py-4 font-medium ">
        <div>
          <div className="grid  grid-cols-[100px_300px_1fr_1fr_150px]    pr-4 pl-8">
            <div className="flex justify-start items-center ">
              <span className=" ">
                <img loading="lazy" src={Rectangle} alt="" />
              </span>
            </div>
            <div
              onClick={onClick}
              className="flex hover:cursor-pointer items-center justify-start gap-2 "
            >
              <span>{data.name}</span>
            </div>
            <div className="flex justify-start items-center ">
              {data.student_count}
            </div>
            <div className="flex justify-start items-center ">
              {data.teacher_count}
            </div>
            <div className="flex justify-end  gap-4  items-center">
              <span>
                {/* <img loading="lazy" src={ToggleIcon} alt="" /> */}
              </span>
              <button
                onClick={() => {
                  setCucrrentClicked(data.id);
                  open();
                }}
                className="flex justify-center items-center gap-1 bg-[#8530C1] rounded p-1 px-2"
              >
                <span className="text-white">
                  {status === "active" ? "Disable" : "Enable"}
                </span>
              </button>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Row;
