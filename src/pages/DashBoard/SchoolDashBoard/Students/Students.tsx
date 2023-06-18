import ArrowDown from "@/assets/arrowdown.svg";
import Rectangle from "@/assets/Rectangle.svg";
import Button from "@/components/Button";
import NewStudent from "./NewStudent";
import { data } from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import Row from "./Row";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mantine/core";

const Students = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-full  rounded-3xl p-4 bg-white">
        <div className="grid grid-cols-3 justify-center items-center w-full px-8 ">
          <div>
            <h1 className="text-[25px] font-bold">Students (35)</h1>
          </div>
          <div className="flex gap-2">
            <span>Sort by</span>
            <span>Newest</span>
            <img src={ArrowDown} alt="Arrowdown" />
          </div>
          <div className="flex justify-end items-end">
            <NewStudent />
          </div>
        </div>

        <div className="grid  grid-cols-[100px_1fr_250px_250px_250px_150px] mt-5  px-8">
          <div className="flex justify-start items-center ">
            <span className=" ">
              <img src={Rectangle} alt="" />
            </span>
          </div>
          <div className=" ">Name</div>
          <div className="">Class</div>
          <div className="">Class Code</div>
          <div className="">Gender</div>
          <div className="flex justify-end   items-center">
            <span>Actions</span>{" "}
          </div>
        </div>

        <hr className="my-4 mx-8" />
        <div>
          {data &&
            data.map((data, index) => {
              return (
                <Row
                  key={index}
                  onClick={() => navigate("profile/" + data.id)}
                  {...data}
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
