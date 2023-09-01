import Blxst from "@/assets/Blxst.svg";
import {
  useGetAttemptStudentConnect,
  useAcceptStudentAdmission,
  useRejectStudentAdmission,
  useGetAdmittedStudentsInClass,
} from "@/api/queries";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getApiErrorMessage } from "@/api/helper";
import { Skeleton } from "@mantine/core";

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
  student_id: number;
};

const Request = () => {
  const { data, refetch, isLoading } = useGetAttemptStudentConnect();

  const { data: admittedStudentInClass } = useGetAdmittedStudentsInClass();
  console.log("Admitted student", admittedStudentInClass);
  const attemptConnectStudents: TRequestStudents[] = data?.data.data.records;

  console.log("attempting students", data?.data.data.records);

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <div className=" flex-grow flex flex-col rounded-3xl p-4 bg-white">
        <div className="flex  justify-between items-center w-full px-8 ">
          <div>
            <h1 className="text-[24px] font-semibold">Request (35)</h1>
          </div>
          <div className="flex gap-8 font-semibold">
            <span className="text-[16px] text-[#8530C1]">Pending</span>
            <span className="text-[16px] text-[#B5B5C3]">Accepted</span>
          </div>
        </div>
        <div>
          {isLoading
            ? new Array(8).fill(1).map((array) => (
                <Skeleton height={60} my={10} visible={true}>
                  <h1 className="w-full">{array}</h1>
                </Skeleton>
              ))
            : attemptConnectStudents?.map((res: TRequestStudents, index) => (
                <Row key={index} requestData={res} refetch={refetch} />
              ))}
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
  const { mutate, isLoading: acceptIsLoading } = useAcceptStudentAdmission();
  const { mutate: mutateReject, isLoading: rejectIsLoading } =
    useRejectStudentAdmission();

  const handleAccept = (id: number) => {
    mutate(
      { student_id: id },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          refetch();
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
  const handleReject = (id: number) => {
    mutateReject(
      { student_id: id },
      {
        onSuccess(data) {
          console.log("success", data.data.message);
          refetch();
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
    <div className="grid grid-cols-[1fr_300px] my-8">
      <div className="flex">
        <p className="mr-6">
          <img
            src={requestData.student.image ? requestData.student.image : Blxst}
            alt="image"
            className=" rounded-full w-[60px]"
          />
        </p>
        <p>
          <span className="text-[#7E7E89] text2 font-medium">
            <span className="text-[#8530C1] ">
              {requestData.parent.firstname.charAt(0).toUpperCase() +
                requestData.parent.firstname.slice(1)}{" "}
              {requestData.parent.lastname}
            </span>{" "}
            is requesting for her child to join your class
          </span>
          <span className=" text-[#7E7E89]  block mt-3 text-[14px]">
            1 hour ago
          </span>
        </p>
      </div>

      <div className="flex  text-white gap-5">
        <button
          onClick={() => {
            handleReject(requestData.student.id);
          }}
          className=" pad-x-40   text-[16px]   h-[42px] flex justify-center items-center rounded-2xl bg-[#E2B6FF] "
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
            handleAccept(requestData.student.id);
          }}
          className="pad-x-40 text-[16px]  h-[42px]  flex justify-center items-center rounded-2xl bg-[#8530C1]"
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
  );
};
