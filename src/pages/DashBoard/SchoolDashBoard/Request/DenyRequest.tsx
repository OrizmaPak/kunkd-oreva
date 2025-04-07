import { useGetAttemptAllStudentConnect } from "@/api/queries";
import Blxst from "@/assets/Blxst.svg";
import { Skeleton, Pagination } from "@mantine/core";

import EmptyState from "@/assets/connectionEmpty.png";
import { TRequestStudents } from "./Request";
import { useState } from "react";

const DenyRequest = () => {
  const [activePage, setPage] = useState(1);

  const { data, refetch, isLoading } = useGetAttemptAllStudentConnect(
    true,
    activePage.toString()
  );
  const totalPage = Math.ceil(data?.data.data.totalRecord / 10);
  const attemptConnectStudents: TRequestStudents[] = data?.data.data.records;

  return (
    <div>
      <div className="grid  grid-cols-[1fr_120px_250px_1fr_150px] mt-5  px-8 text-[#344054] font-semibold  py-4 border-b-2 bg-[#F9FAFB] border-[#F0F2F5]">
        <div>Student's Name</div>
        <div>Class</div>
        <div>Parent's Email</div>
        <div>Parent's Name</div>
        <div>Date Rejected</div>
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
            attemptConnectStudents
              .slice() // Create a shallow copy to avoid mutating the original array
              .reverse() // Reverse the order of the array
              .map((res: TRequestStudents, index) => (
                <Row key={index} requestData={res} />
              ))
          ) : (
            <div className="flex justify-center items-center h-full mt-24 flex-col">
              <img
                src={EmptyState}
                alt="No requests"
                className="w-[150px] h-[150px] object-contain"
              />
              <p className="font-Inter text-[18px]">No connection requests</p>
              <p className="font-Baloo text-[14px]">
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
  );
};

export default DenyRequest;

const Row = ({ requestData }: { requestData: TRequestStudents }) => {
  return (
    <>
      <div className="grid grid-cols-[1fr_120px_250px_1fr_150px] my-2 py-4 px-8 border-b-2 border-[#F0F2F5] text-[#101928]">
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
        <div>
          <p>Apr 12, 2023 </p>
        </div>
      </div>
    </>
  );
};
