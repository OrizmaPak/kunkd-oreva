import Button from "@/components/Button";
import ArrowDown from "@/assets/arrowdown.svg";
import ClassesIcon from "@/assets/classes.svg";
import Rectangle from "@/assets/rectange.svg";
// import { data } from "@/pages/DashBoard/SchoolDashBoard/Teachers/Teachers";
import Row from "./Row";
import { Pagination } from "@mantine/core";
import Chiks from "@/assets/chiks.svg";
import Jessica from "@/assets/jessica.svg";
import Grease from "@/assets/grease.svg";
import Blxst from "@/assets/blxst.svg";
import Godwin from "@/assets/godwin.svg";
import Mitchel from "@/assets/godwin.svg";
import Pemela from "@/assets/pamela.svg";
import Spa from "@/assets/spa.svg";
import Bella from "@/assets/bella.svg";
import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Grade from "./Grade";
import { useState } from "react";
import EditClassTeachers from "./EditClassTeachers";
import AddNewClass from "./AddNewClass";

export const data = [
  {
    noOfTeacher: 2,
    noOfStudents: 23,
    classCode: "A",
    classs: "Green",
    id: 1,
    name1: "Chiks Olowo",
    name2: "Jessica Deji",
    gender: "Female",
    image1: Chiks,
    image2: Jessica,
    title: "Grade 1",
  },
  {
    noOfTeacher: 1,
    noOfStudents: 43,
    classCode: "C",
    classs: "Purple",
    id: 2,
    name1: "Jessica Deji",
    gender: "Female",
    image1: Jessica,
    title: "Grade 2",
  },
  {
    noOfTeacher: 2,
    noOfStudents: 23,
    classCode: "C",
    classs: "Black",
    id: 3,
    name2: "Grease Kemma",
    email: "grease@pamers.school",
    gender: "Male",
    image2: Grease,
    image1: Chiks,
    name1: "Chiks Olowo",
    title: "Grade 3",
  },
  {
    noOfTeacher: 2,
    noOfStudents: 26,
    classCode: "D",
    classs: "Yellow",
    id: 4,
    name1: "Blxst Ojo",
    email: "blxst@pamers.school",
    gender: "Female",
    image1: Blxst,
    image2: Godwin,
    name: "Godwin Oshodi",
    title: "Grade 4",
  },
  {
    noOfTeacher: 1,
    noOfStudents: 38,
    classCode: "E",
    classs: "Indingo",
    id: 5,
    name1: "Godwin Oshodi",
    email: "godwin@pamers.school",
    gender: "Male",
    image1: Godwin,
    title: "Grade 5",
  },
  {
    noOfTeacher: 2,
    noOfStudents: 29,
    classCode: "F",
    classs: "Blue",
    name2: "Pamela Azunda",
    id: 6,
    name1: "Mitchel Obi",
    email: "mitchel@pamers.school",
    gender: "Male",
    image1: Mitchel,
    image2: Pemela,
    title: "Grade 6",
  },
  {
    noOfTeacher: 1,
    noOfStudents: 41,
    classCode: "G",
    classs: "White",
    id: 7,
    name1: "Pamela Azunda",
    email: "pamela@pamers.school",
    gender: "Male",
    image1: Pemela,
    title: "Grade 7",
  },
  {
    noOfTeacher: 2,
    noOfStudents: 53,
    classCode: "H",
    classs: "Pink",
    id: 8,
    name1: "spa Chine",
    email: "chiks@pamers.school",
    gender: "Male",
    image1: Spa,
    image2: Bella,
    name2: "Bella Pepple",
    title: "Grade 8",
  },
  {
    noOfTeacher: 2,
    noOfStudents: 33,
    classCode: "I",
    classs: "Red",
    id: 9,
    name2: "spa Chine",
    name1: "Bella Pepple",
    email: "chiks@pamers.school",
    gender: "Male",
    image1: Bella,
    image2: Spa,
    title: "Grade 9",
  },
];

const Classes = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);

  const [newClass, { open: newClassOpen, close: newClassClose }] =
    useDisclosure(false);

  // const [modalStep, setModalStep] = useState(STEP_1);
  const handleClick = () => {
    close();
  };

  const [currentClicked, setCucrrentClicked] = useState(0);
  console.log(currentClicked);
  const currentClickedData = data.find((el) => el.id == currentClicked);

  return (
    <div className="h-full flex flex-col">
      <Modal
        radius={"xl"}
        size="md"
        opened={opened}
        onClose={close}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        {currentClickedData && (
          <Grade
            {...currentClickedData}
            onEdit={() => (editOpen(), close())}
            handleClick={handleClick}
          />
        )}
      </Modal>

      <Modal
        radius={"xl"}
        size="lg"
        opened={newClass}
        onClose={newClassClose}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <AddNewClass />
      </Modal>

      <Modal
        radius={"xl"}
        size="md"
        opened={editOpened}
        onClose={editClose}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        {currentClickedData && <EditClassTeachers {...currentClickedData} />}
      </Modal>

      <div className=" flex-grow flex flex-col rounded-3xl p-4 bg-white">
        <div className="grid grid-cols-3 justify-center items-center w-full px-8 ">
          <div>
            <h1 className="text-[25px] font-bold">Classes (35)</h1>
          </div>
          <div className="flex gap-2">
            <span>Sort by</span>
            <span>Newest</span>
            <img src={ArrowDown} alt="Arrowdown" />
          </div>
          <div className="flex justify-center">
            <Button onClick={() => newClassOpen()} size="md">
              <span className="flex  justify-end items-end gap-2">
                <img src={ClassesIcon} alt="" />
                <span>Create class</span>
              </span>
            </Button>
          </div>
        </div>

        <div>
          <div className="grid  grid-cols-[100px_300px_1fr_1fr_150px] mt-5  px-8">
            <div className="flex justify-start items-center ">
              <span className=" ">
                <img src={Rectangle} alt="" />
              </span>
            </div>
            <div className=" ">Name</div>
            <div className="">No of Students</div>
            <div className="">No of Teachers</div>
            <div className="flex justify-end   items-center">
              <span>Actions</span>
            </div>
          </div>
          <hr className="my-4 mx-8" />
        </div>
        <div className="flex flex-grow flex-col">
          {data &&
            data.map((data, index) => {
              return (
                <Row
                  key={index}
                  {...data}
                  onClick={() => (setCucrrentClicked(data.id), open())}
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

export default Classes;
