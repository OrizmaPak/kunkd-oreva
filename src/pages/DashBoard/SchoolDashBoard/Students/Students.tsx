import ArrowDown from "@/assets/arrowdown.svg";
import Rectangle from "@/assets/Rectangle.svg";
import { dashboardData } from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import Row from "./Row";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mantine/core";
import DeleteProfile from "../Teachers/DeleteProfile";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const Students = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col ">
      <Modal
        radius={"xl"}
        size="lg"
        opened={opened}
        onClose={close}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <DeleteProfile onCancel={close} />
      </Modal>

      <div className=" flex-grow flex flex-col  rounded-3xl p-4 bg-white">
        <div className="grid grid-cols-2 justify-center items-center w-full px-8 ">
          <div>
            <h1 className="text-[25px] font-bold">Students (35)</h1>
          </div>
          <div className="flex gap-2 justify-end ">
            <span className="text-[#8530C1]">Sort by</span>
            <span>Newest</span>
            <img src={ArrowDown} alt="Arrowdown" />
          </div>
        </div>

        <div className="grid  grid-cols-[100px_1fr_250px_250px_150px] mt-5 text-gray-400  px-8">
          <div className="flex justify-start items-center ">
            <span className=" ">
              <img src={Rectangle} alt="" />
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
          {dashboardData &&
            dashboardData.slice(1, 10).map((data, index) => {
              return (
                <Row
                  key={index}
                  onClick={() => navigate("profile/" + data.id)}
                  {...data}
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
    </div>
  );
};

export default Students;
