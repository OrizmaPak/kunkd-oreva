import ArrowDown from "@/assets/arrowdown.svg";

import Rectangle from "@/assets/boxIcon.svg";
import Chiks from "@/assets/chiks.svg";
import Jessica from "@/assets/jessica.svg";
import Grease from "@/assets/grease.svg";
import Blxst from "@/assets/Blxst.svg";
import Godwin from "@/assets/godwin.svg";
import Mitchel from "@/assets/godwin.svg";
import Pemela from "@/assets/pamela.svg";
import Spa from "@/assets/spa.svg";
import Bella from "@/assets/bella.svg";
import { Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useState } from "react";
import NewTeacher from "./NewTeacher";
import Profile from "./Profile";
import Row from "./Row";
import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";
import DeleteProfile from "./DeleteProfile";
import EditAssignedClass from "./EditAssignedClass";

export type DashBoardDataType = {
  noOfTeacher: number;
  noOfStudents: number;
  classCode: string;
  classs: string;
  id: number;
  name: string;
  email: string;
  gender: string;
  image: string;
};
export const dashboardData = [
  {
    noOfTeacher: 15,
    noOfStudents: 23,
    classCode: "A",
    classs: "Green",
    id: 1,
    name: "Chiks Olowo",
    email: "chiks@pamers.school",
    gender: "Female",
    image: Chiks,
  },
  {
    noOfTeacher: 5,
    noOfStudents: 43,
    classCode: "C",
    classs: "Purple",
    id: 2,
    name: "Jessica Deji",
    email: "jessica@pamers.school",
    gender: "Female",
    image: Jessica,
  },
  {
    noOfTeacher: 5,
    noOfStudents: 43,
    classCode: "C",
    classs: "Purple",
    id: 2,
    name: "Jessica Deji",
    email: "jessica@pamers.school",
    gender: "Female",
    image: Jessica,
  },
  {
    noOfTeacher: 6,
    noOfStudents: 23,
    classCode: "C",
    classs: "Black",
    id: 3,
    name: "Grease Kemma",
    email: "grease@pamers.school",
    gender: "Male",
    image: Grease,
  },
  {
    noOfTeacher: 6,
    noOfStudents: 23,
    classCode: "C",
    classs: "Black",
    id: 3,
    name: "Grease Kemma",
    email: "grease@pamers.school",
    gender: "Male",
    image: Grease,
  },
  {
    noOfTeacher: 1,
    noOfStudents: 26,
    classCode: "D",
    classs: "Yellow",
    id: 4,
    name: "Blxst Ojo",
    email: "blxst@pamers.school",
    gender: "Female",
    image: Blxst,
  },
  {
    noOfTeacher: 6,
    noOfStudents: 38,
    classCode: "E",
    classs: "Indingo",
    id: 5,
    name: "Godwin Oshodi",
    email: "godwin@pamers.school",
    gender: "Male",
    image: Godwin,
  },
  {
    noOfTeacher: 2,
    noOfStudents: 29,
    classCode: "F",
    classs: "Blue",
    id: 6,
    name: "Mitchel Obi",
    email: "mitchel@pamers.school",
    gender: "Male",
    image: Mitchel,
  },
  {
    noOfTeacher: 5,
    noOfStudents: 41,
    classCode: "G",
    classs: "White",
    id: 7,
    name: "Pamela Azunda",
    email: "pamela@pamers.school",
    gender: "Male",
    image: Pemela,
  },
  {
    noOfTeacher: 3,
    noOfStudents: 53,
    classCode: "H",
    classs: "Pink",
    id: 8,
    name: "spa Chine",
    email: "chiks@pamers.school",
    gender: "Male",
    image: Spa,
  },
  {
    noOfTeacher: 1,
    noOfStudents: 33,
    classCode: "I",
    classs: "Red",
    id: 9,
    name: "Bella Pepple",
    email: "chiks@pamers.school",
    gender: "Male",
    image: Bella,
  },
];

const Teachers = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalStep, setModalStep] = useState(STEP_1);
  const handleClick = () => {
    setModalStep(STEP_2);
  };

  const [currentClicked, setCucrrentClicked] = useState(0);
  console.log(currentClicked);
  const currentClickedData = dashboardData.find(
    (el) => el.id == currentClicked
  );
  return (
    <div className="h-full flex flex-col">
      <Modal
        radius={"xl"}
        size="lg"
        opened={opened}
        onClose={close}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        {modalStep === STEP_1 && currentClickedData && (
          <Profile
            name={currentClickedData?.name}
            image={currentClickedData.image}
            email={currentClickedData.email}
            handleClick={handleClick}
            onEdit={() => setModalStep(STEP_3)}
          />
        )}
        {modalStep === STEP_2 && <DeleteProfile onCancel={close} />}

        {modalStep === STEP_3 && <EditAssignedClass onClose={close} />}
      </Modal>

      <div className="  flex-grow flex flex-col rounded-3xl p-4 bg-white">
        <div className="grid grid-cols-3 justify-center items-center w-full px-8 ">
          <div>
            <h1 className="text-[25px] font-bold">Teacher (35)</h1>
          </div>
          <div className="flex gap-2 justify-center font-bold">
            <span className="text-[#8530C1] ">Sort by</span>
            <span>Newest</span>
            <img src={ArrowDown} alt="Arrowdown" />
          </div>
          <div className="flex gap-3 justify-end">
            <NewTeacher />
          </div>
        </div>

        <div>
          <div className="grid  grid-cols-[100px_1fr_1fr_150px_150px] mt-5  text-gray-400 px-8">
            <div className="flex justify-start items-center">
              <span className=" ">
                <img src={Rectangle} alt="" />
              </span>
            </div>
            <div>Name</div>
            <div>Email</div>
            <div>Gender</div>
            <div className="flex justify-end   items-center">
              <span>Actions</span>{" "}
            </div>
          </div>
          <hr className="my-4 mx-8" />
        </div>

        <div className="flex flex-col flex-grow">
          {dashboardData &&
            dashboardData.slice(1, 10).map((data, index) => {
              return (
                <Row
                  onClick={() => {
                    open();
                    setCucrrentClicked(data.id);
                    setModalStep(STEP_1);
                  }}
                  key={index}
                  {...data}
                />
              );
            })}
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default Teachers;
