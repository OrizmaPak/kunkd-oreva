import { useGetAdmittedStudentsInSchool } from "@/api/queries";
import ArrowDown from "@/assets/arrowdown.svg";
import Rectangle from "@/assets/boxIcon.svg";
// import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { TRequestStudents } from "../../TeacherDashboard/Request/Request";
// import DeleteProfile from "../Teachers/ChangeProfileStatus";
import { Menu, Pagination, Skeleton } from "@mantine/core";
import { useState } from "react";
import Row from "./Row";

// import ChangeProfileStatus from "../Teachers/ChangeProfileStatus";

const Students = () => {
  const [status, setStatus] = useState("active");
  const [activePage, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetAdmittedStudentsInSchool(
    status,
    activePage?.toString()
  );
  const admittedStudents: TRequestStudents[] = data?.data.data.records;

  const totalPage = Math.ceil(data?.data.data.totalRecord / 10);

  console.log("Admitted student", admittedStudents);
  // const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  return (
    <div className="h-[100%] flex flex-col overflow-y-scroll ">
      {/* <Modal
        radius={"xl"}
        size="lg"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
      >
        <ChangeProfileStatus onCancel={close} />
      </Modal> */}

      <div className=" flex-grow flex flex-col  rounded-3xl py-4 bg-white border-[2px] border-[#F2EAF1]  ">
        <div className="grid grid-cols-2 justify-center items-center w-full px-8 ">
          <div>
            <h1 className="text-[25px]  font-Inter">
              Students{" "}
              <span className="text-[#8530C1] bg-[#FFF7FD] rounded-3xl py-1 px-4">
                {admittedStudents?.length || 0}
              </span>{" "}
            </h1>
          </div>
          <div className="flex gap-2 justify-end ">
            <Menu>
              <Menu.Target>
                <div className="flex gap-2">
                  <button>Sort by</button>
                  <img loading="lazy" src={ArrowDown} alt="Arrowdown" />
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <button
                    onClick={() => {
                      setStatus("active");
                      //  queryClient.invalidateQueries({ queryKey: ['GetStudents']});
                    }}
                  >
                    Active
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={() => {
                      setStatus("disabled");
                      // queryClient.invalidateQueries({ queryKey: ['GetStudents']});
                    }}
                  >
                    Disabled
                  </button>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>

        <div className="grid  grid-cols-[450px_1fr_150px]  mt-5 font-normal  px-8 text-[#7E7E89]  py-4 border-b-2 bg-[#FFF7FD] border-[#F3DAFF]">
          <div className=" ">Name</div>
          <div className="">Class</div>
          <div className="flex justify-end   items-center">
            <span></span>{" "}
          </div>
        </div>

        <div className="flex flex-col flex-grow ">
          {isLoading
            ? new Array(8).fill(1).map((array) => (
                <Skeleton height={60} my={10} visible={true}>
                  <h1 className="w-full">{array}</h1>
                </Skeleton>
              ))
            : admittedStudents?.map((data: TRequestStudents, index) => {
                return (
                  <Row
                    status={status}
                    key={index}
                    onClick={() => navigate("profile/" + data?.id)}
                    data={data}
                  />
                );
              })}
        </div>

        <div className="flex  justify-end item-end mt-2 px-4">
          {/* <span>
          Showing <span className="text-[#8530C1]"> 1-9 </span> from
          <span className="text-[#8530C1]"> {totalPage * 5} </span> data
        </span> */}
          {totalPage > 1 && (
            <div className="  mr-2 flex justify-end  pb-2">
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
  );
};

export default Students;
