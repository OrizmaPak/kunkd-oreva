import ArrowDown from "@/assets/arrowdown.svg";
import Rectangle from "@/assets/boxIcon.svg";
import Row from "./Row";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mantine/core";
// import DeleteProfile from "../Teachers/DeleteProfile";
import DeleteProfile from "../../SchoolDashBoard/Teachers/DeleteProfile";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useGetAdmittedStudentsInClass } from "@/api/queries";
import { TRequestStudents } from "../../TeacherDashboard/Request/Request";
import { Skeleton } from "@mantine/core";

const Students = () => {
  const { data, isLoading } = useGetAdmittedStudentsInClass();
  console.log("Admitted student", data);
  const admittedStudents: TRequestStudents[] = data?.data.data.records;

  console.log("Admitted student", admittedStudents);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  return (
    <div className="h-[100%] flex flex-col overflow-y-scroll ">
      <Modal
        radius={"xl"}
        size="lg"
        padding={100}
        opened={opened}
        onClose={close}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <DeleteProfile onCancel={close} />
      </Modal>

      <div className=" flex-grow flex flex-col  rounded-3xl bg-white py-2  ">
        <div className="grid grid-cols-2 justify-center items-center w-full px-8 ">
          <div>
            <h1 className="text-[25px] font-bold">Students (35)</h1>
          </div>
          <div className="flex gap-2 justify-end ">
            <span className="text-[#8530C1]">Sort by</span>
            <span>Newest</span>
            <img loading="lazy" src={ArrowDown} alt="Arrowdown" />
          </div>
        </div>

        <div className="grid  grid-cols-[100px_300px_1fr_1fr_150px] mt-5 text-gray-400  px-8">
          <div className="flex justify-start items-center ">
            <span className=" ">
              <img loading="lazy" src={Rectangle} alt="" />
            </span>
          </div>
          <div className=" ">Name</div>
          <div className="">Class</div>
          <div className="">Gender</div>
          <div className="flex justify-end   items-center">
            <span>Actions</span>{" "}
          </div>
        </div>

        <hr className="my-4 mx-8" />
        <div className="flex flex-col flex-grow">
          {isLoading
            ? new Array(8).fill(1).map((array) => (
                <Skeleton height={60} my={10} visible={true}>
                  <h1 className="w-full">{array}</h1>
                </Skeleton>
              ))
            : admittedStudents?.map((data: TRequestStudents, index) => {
                return (
                  <Row
                    key={index}
                    onClick={() => navigate("profile/" + data.student_id)}
                    data={data}
                    onDeleteProfile={open}
                  />
                );
              })}
        </div>
      </div>
      <div className="flex  justify-between mt-2 px-4">
        <span>
          Showing <span className="text-[#8530C1]"> 1-9 </span> from
          <span className="text-[#8530C1]"> 35 </span> data
        </span>
        <Pagination
          total={10}
          styles={() => ({
            control: {
              "&[data-active]": {
                backgroundColor: "#8530C1 !important",
              },
            },
          })}
        />
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
