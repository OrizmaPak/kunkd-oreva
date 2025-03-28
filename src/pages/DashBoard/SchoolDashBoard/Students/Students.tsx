import { useGetAdmittedStudentsInSchool } from "@/api/queries";
import ArrowDown from "@/assets/arrowdown.svg";
// import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { TRequestStudents } from "../../TeacherDashboard/Request/Request";
import { Menu, Pagination, Skeleton } from "@mantine/core";
import { useState } from "react";
import Row from "./Row";
import SearchFilter from "../SearchFilter";
import EmptyState from "@/assets/connectionEmpty.png";

const Students = () => {
  const [status, setStatus] = useState("active");
  const [activePage, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetAdmittedStudentsInSchool(
    status,
    activePage?.toString()
  );
  const admittedStudents: TRequestStudents[] = data?.data.data.records;

  const totalPage = Math.ceil(data?.data.data.totalRecord / 10);

  const navigate = useNavigate();
  return (
    <div className="h-[100%] flex flex-col overflow-y-scroll ">
      <div className="mb-4">
        <h1 className="text-[25px]  font-Inter">
          Students{" "}
          <span className="text-[#667185] bg-customGreen2 rounded-2xl p-2 ml-4 ">
            {admittedStudents?.length || 0}
          </span>{" "}
        </h1>
      </div>
      <div className=" flex-grow flex flex-col  rounded-3xl py-4 bg-white border-[2px] border-[#F2EAF1]  ">
        <SearchFilter setFilterValue={setStatus} />

        <div className="grid  grid-cols-[1fr_1fr_200px]  mt-5 font-normal  px-8 text-[#7E7E89]  py-4 border-b-2  bg-[#F9FAFB] border-[#E4E7EC]">
          <div className=" ">Name</div>
          <div className="">Class</div>
          <div className="flex justify-end   items-center">
            <span></span>{" "}
          </div>
        </div>

        <div className="flex flex-col flex-grow ">
          {isLoading ? (
            new Array(8).fill(1).map((_, index) => (
              <Skeleton key={index} height={60} my={10} visible={true}>
                <h1 className="w-full"></h1>
              </Skeleton>
            ))
          ) : admittedStudents?.length > 0 ? (
            admittedStudents.map((data: TRequestStudents, index) => (
              <Row
                status={status}
                key={index}
                onClick={() => navigate("profile/" + data?.id)}
                data={data}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full mt-24 flex-col">
              <img
                src={EmptyState}
                alt="No students"
                className="w-[150px] h-[150px] object-contain"
              />
              <p className="font-Inter text-[18px]">No students available</p>
              <p className="font-Baloo text-[14px]">
                Students will appear here once added.
              </p>
            </div>
          )}
        </div>

        <div className="flex  justify-end item-end mt-2 px-4">
          {totalPage > 1 && (
            <div className="  mr-2 flex justify-end  pb-2">
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

export default Students;
