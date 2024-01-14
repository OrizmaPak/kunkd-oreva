import { getApiErrorMessage } from "@/api/helper";
import {
  useAcceptStudentAdmission,
  useGetAttemptAllStudentConnect,
  useRejectStudentAdmission,
} from "@/api/queries";
import Blxst from "@/assets/Blxst.svg";
import { Loader, Skeleton, Pagination } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import SchoolNotificationModal from "@/components/SchoolNotificationModal";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export type TRequestStudents = {
  parent: {
    firstname: string;
    lastname: string;
    user_id: number;
  };
  class: {
    class_id: number;
    class_name: string;
  };
  student: {
    id: number;
    image: string;
  };
  firstname: string;
  lastname: string;
  image: string;
  status: string;
  id: number;
};

const Request = () => {
  const [activePage, setPage] = useState(1);

  const { data, refetch, isLoading } = useGetAttemptAllStudentConnect(
    true,
    activePage.toString()
  );
  const totalPage = Math.ceil(data?.data.data.totalRecord / 10);

  const attemptConnectStudents: TRequestStudents[] = data?.data.data.records;

  return (
    <>
      <div className="h-full flex flex-col overflow-y-scroll">
        <div className=" flex-grow flex flex-col rounded-3xl p-4 bg-white">
          <div className="flex  justify-between items-center w-full px-8 ">
            <div>
              <h1 className="text-[24px] font-semibold">
                Request ({attemptConnectStudents?.length || 0})
              </h1>
            </div>
          </div>
          <div className="flex-grow">
            <div>
              {isLoading
                ? new Array(8).fill(1).map((array) => (
                    <Skeleton height={60} my={10} visible={true}>
                      <h1 className="w-full">{array}</h1>
                    </Skeleton>
                  ))
                : attemptConnectStudents?.map(
                    (res: TRequestStudents, index) => (
                      <Row key={index} requestData={res} refetch={refetch} />
                    )
                  )}
            </div>
          </div>

          <div className="flex  justify-end mt-2 px-4">
            {/* <span>
          Showing <span className="text-[#8530C1]"> 1-9 </span> from
          <span className="text-[#8530C1]"> {totalPage * 5} </span> data
        </span> */}
            {totalPage > 1 && (
              <div className="  mr-2 flex justify-end  pb-4">
                <Pagination
                  total={totalPage}
                  value={activePage}
                  defaultChecked={true}
                  onChange={setPage}
                  onClick={() => {
                    console.log(activePage);
                    refetch();
                  }}
                  styles={() => ({
                    control: {
                      "&[data-active]": {
                        backgroundColor: "#8530C1 !important",
                      },
                    },
                  })}
                />
              </div>
            )}
          </div>
        </div>

        <style>
          {`
       ::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
        `}
        </style>
      </div>
    </>
  );
};

export default Request;

const Row = ({
  requestData,
  refetch,
}: {
  requestData: TRequestStudents;
  refetch: () => void;
}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutate, isLoading: acceptIsLoading } = useAcceptStudentAdmission();
  const { mutate: mutateReject, isLoading: rejectIsLoading } =
    useRejectStudentAdmission();

  const handleAccept = (id: number) => {
    mutate(
      { student_id: id },
      {
        onSuccess(data) {
          refetch();
          queryClient.invalidateQueries({
            queryKey: ["GetAttemptStudentConnect"],
          });
          queryClient.invalidateQueries({
            queryKey: ["GetAttemptAllStudentConnect"],
          });
          notifications.show({
            title: `Notification`,
            message: data.data.message,
          });
        },
        onError(err) {
          open();
          notifications.show({
            title: `Notification`,
            message: getApiErrorMessage(err),
          });
        },
      }
    );
  };
  const handleReject = (id: number) => {
    mutateReject(
      { student_id: id },
      {
        onSuccess(data) {
          refetch();
          queryClient.invalidateQueries({
            queryKey: ["GetAttemptStudentConnect"],
          });
          queryClient.invalidateQueries({
            queryKey: ["GetAttemptAllStudentConnect"],
          });
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

  return (
    <>
      <Modal
        radius={10}
        size="md"
        opened={opened}
        onClose={close}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <SchoolNotificationModal onCancel={close} label="Students" />
      </Modal>

      <div className="grid grid-cols-[1fr_300px] my-4 ">
        <div className="flex item-center ">
          <p className="mr-6 flex justify-center ">
            <img
              src={requestData?.image ? requestData?.image : Blxst}
              alt="image"
              className=" rounded-full w-[60px]"
            />
          </p>
          <div className="flex justify-center items-center">
            <p className="text-[#7E7E89] text2 font-medium  text-center inline  items-center">
              <span className="text-[#8530C1] ">
                {requestData?.firstname.charAt(0).toUpperCase() +
                  requestData?.firstname.slice(1)}{" "}
                {requestData?.lastname}
              </span>{" "}
              is requesting to join your school
            </p>
          </div>
        </div>

        <div className="flex  text-white gap-5 items-center justify-center ">
          <button
            onClick={() => {
              handleReject(requestData.student.id);
            }}
            className=" pad-x-40   text-[16px]   h-[38px] flex justify-center items-center rounded bg-[#E2B6FF] "
          >
            {rejectIsLoading ? (
              <p className="flex justify-center items-center">
                <Loader color="white" size="sm" />
              </p>
            ) : (
              <span>Decline</span>
            )}
          </button>
          <button
            onClick={() => {
              handleAccept(requestData?.id);
            }}
            className="pad-x-40 text-[16px]  h-[38px]  flex justify-center items-center rounded bg-[#8530C1]"
          >
            {acceptIsLoading ? (
              <p className="flex justify-center items-center">
                <Loader color="white" size="sm" />
              </p>
            ) : (
              <span>Accept</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
