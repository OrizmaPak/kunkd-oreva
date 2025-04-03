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
import { handleEventTracking } from "@/api/moengage";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import EmptyState from "@/assets/connectionEmpty.png";
import RequestSearch from "./RequestSearch";
import Button from "@/components/Button";
import DenyRequest from "./DenyRequest";

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
  const [isPending, setIsPending] = useState(true);

  return (
    <>
      <div className="h-full flex flex-col overflow-y-scroll">
        <div className="mb-4">
          <h1 className="text-[24px]  font-Inter  gap-3">
            Requests
            <span className="text-gray-500 font-[14px] ml-6 bg-customGreen2 rounded-2xl p-2">
              {attemptConnectStudents?.length || 0}
            </span>
          </h1>
        </div>
        <div className=" flex-grow flex flex-col   rounded-3xl py-4 bg-white border-[2px] border-[#E4E7EC]  ">
          <div className="flex justify-between mt-4 mb-2 ">
            <div className="grid grid-cols-2 h-[40px]  rounded-xl items-center ml-10 ">
              <button
                onClick={() => setIsPending(true)}
                className={`h-full  w-full rounded-l-xl border-t-[2px] border-b-[2px] text-[14px] font-Inter border-[#E4E7EC] text-center py-[10px] px-[16px] border-l-[2px] ${
                  isPending
                    ? "bg-customGreen2 border-customGreen2 text-[#1D2739]"
                    : "bg-[#F5F7F8] border-[#E4E7EC] text-[#667185]"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setIsPending(false)}
                className={`h-full  w-full rounded-r-xl text-center py-[10px] px-[16px] text-[14px] font-Inter border-t-[2px] border-b-[2px]  border-r-[2px] ${
                  !isPending
                    ? "bg-customGreen2 border-customGreen2 text-[#1D2739]"
                    : "bg-[#F5F7F8] border-[#E4E7EC] text-[#667185]"
                }`}
              >
                Denied
              </button>
            </div>

            <RequestSearch />
          </div>

          {isPending ? (
            <div>
              <div className="grid   grid-cols-[1fr_120px_250px_1fr_150px] mt-5  px-8 text-[#344054] font-semibold  py-4 border-b-2 bg-[#F9FAFB] border-[#F0F2F5]">
                <div>Student's Name</div>
                <div>Class</div>
                <div>Parent's Email</div>
                <div>Parent's Name</div>
                <div>Actions</div>
              </div>
              <div className="flex-grow">
                <div>
                  {isLoading ? (
                    new Array(8).fill(1).map((_, index) => (
                      <Skeleton key={index} height={60} my={10} visible={true}>
                        <h1 className="w-full"></h1>
                      </Skeleton>
                    ))
                  ) : attemptConnectStudents?.length > 0 ? (
                    attemptConnectStudents.map(
                      (res: TRequestStudents, index) => (
                        <Row key={index} requestData={res} refetch={refetch} />
                      )
                    )
                  ) : (
                    <div className="flex justify-center items-center h-full mt-24 flex-col ">
                      <img
                        src={EmptyState}
                        alt="No requests"
                        className="w-[150px] h-[150px] object-contain"
                      />
                      <p className=" font-Inter text-[18px] ">
                        No connection requests{" "}
                      </p>
                      <p className=" font-Baloo text-[14px] ">
                        Connection requests would appear here.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex  justify-end mt-2 px-4">
                {totalPage > 1 && (
                  <div className="  mr-2 flex justify-end  pb-4">
                    <Pagination
                      total={totalPage}
                      value={activePage}
                      defaultChecked={true}
                      onChange={setPage}
                      onClick={() => {
                        refetch();
                      }}
                      styles={() => ({
                        control: {
                          "&[data-active]": {
                            backgroundColor: "#C2DBB0 !important",
                          },
                        },
                      })}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <DenyRequest />
            </>
          )}
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
  const [user] = useStore(getUserState);
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const [
    openedAcceptConnection,
    { open: openAcceptConnection, close: closeAcceptConnection },
  ] = useDisclosure(false);

  const [
    openedDenyConnection,
    { open: openDenyConnection, close: closeDenyConnection },
  ] = useDisclosure(false);

  const { mutate, isLoading: acceptIsLoading } = useAcceptStudentAdmission();
  const { mutate: mutateReject, isLoading: rejectIsLoading } =
    useRejectStudentAdmission();

  const handleAccept = (objData: TRequestStudents) => {
    mutate(
      { student_id: objData?.id },
      {
        onSuccess(data) {
          handleEventTracking("handle_student_request", {
            school_id: user?.user_id,
            class_name: objData?.class?.class_name,
            student_name: objData?.firstname + " " + objData?.lastname,
            request_status: "accepted",
          });
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

  const handleReject = (objData: TRequestStudents) => {
    mutateReject(
      { student_id: objData?.id },
      {
        onSuccess(data) {
          handleEventTracking("handle_student_request", {
            school_id: user?.user_id,
            class_name: objData?.class?.class_name,
            student_name: objData?.firstname + " " + objData?.lastname,
            request_status: "declined",
          });
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

      <Modal
        radius={16}
        size="md"
        padding={0}
        opened={openedAcceptConnection}
        onClose={closeAcceptConnection}
        closeButtonProps={{ size: "lg" }}
        withCloseButton={false}
        centered
        mr={500}
      >
        <AcceptStudentModal
          close={closeAcceptConnection}
          submit={() => handleAccept(requestData)}
          isLoading={acceptIsLoading}
        />
      </Modal>

      <Modal
        radius={16}
        size="md"
        padding={0}
        opened={openedDenyConnection}
        onClose={closeDenyConnection}
        closeButtonProps={{ size: "lg" }}
        withCloseButton={false}
        centered
      >
        <DenyStudentModal
          close={closeDenyConnection}
          submit={() => handleReject(requestData)}
          isLoading={rejectIsLoading}
        />
      </Modal>

      <div className="grid grid-cols-[1fr_120px_250px_1fr_150px] my-2 h-[72px] items-center px-8 border-b-2 border-[#E5E7EB] text-[#101928]">
        <div>
          <p className="text-center items-center flex gap-3">
            <img
              src={requestData?.image || Blxst}
              alt="Student"
              className="w-[40px] h-[40px] rounded-full"
            />
            <span>
              {requestData?.firstname.charAt(0).toUpperCase() +
                requestData?.firstname.slice(1)}{" "}
              {requestData?.lastname}
            </span>
          </p>
        </div>
        <div>
          <p>{requestData?.class?.class_name}</p>
        </div>
        <div>
          <p>sample123@gmail.com</p>
        </div>
        <div>
          <p>
            {requestData?.parent?.firstname} {requestData?.parent?.lastname}
          </p>
        </div>

        <div className="flex justify-between text-white gap-4">
          <button
            onClick={() => openDenyConnection()}
            className="text-[16px] h-[38px] flex justify-center items-center rounded text-[#2C3137] font-semibold"
          >
            <span>Deny</span>
          </button>
          <button
            onClick={() => openAcceptConnection()}
            className="text-[16px] h-[38px] flex justify-center items-center rounded font-semibold text-customGreen"
          >
            <span>Accept</span>
          </button>
        </div>
      </div>
    </>
  );
};

export const AcceptStudentModal = ({
  close,
  submit,
  isLoading,
}: {
  close: () => void;
  isLoading: boolean;
  submit: () => void;
}) => {
  return (
    <div className="">
      <p className="font-Inter bg-customGreen text-[18px] px-[20px] py-4 text-white rounded-t-lg">
        Accept Request
      </p>
      <p className="mt-8 text-center text-[16px]">
        Are sure you want to accept this connection request?
      </p>
      <div className="flex justify-center items-center mt-8 gap-5 pb-5">
        <Button onClick={close} size="sm" className="bg-[#F5F7F8] text-black">
          Cancel
        </Button>
        <Button onClick={submit} backgroundColor="green" size="sm">
          {isLoading ? (
            <Loader color="green" size="sm" />
          ) : (
            <span>Yes, accept request</span>
          )}
        </Button>
      </div>
    </div>
  );
};

const DenyStudentModal = ({
  close,
  submit,
  isLoading,
}: {
  close: () => void;
  isLoading: boolean;
  submit: () => void;
}) => {
  return (
    <div className="">
      <p className="font-Inter bg-customGreen text-[18px] px-[20px] py-4 text-white rounded-t-lg">
        Deny Request
      </p>
      <p className="mt-8 text-center text-[16px]">
        Are sure you want to deny this connection request?
      </p>
      <div className="flex justify-center items-center mt-8 gap-5 pb-5">
        <Button onClick={close} size="sm" className="bg-[#F5F7F8] text-black">
          Cancel
        </Button>
        <Button onClick={submit} backgroundColor="green" size="sm">
          {isLoading ? (
            <Loader color="green" size="sm" />
          ) : (
            <span>Yes, deny request</span>
          )}
        </Button>
      </div>
    </div>
  );
};
