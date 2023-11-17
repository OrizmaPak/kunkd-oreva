import { useGetTeacherList } from "@/api/queries";
import ArrowDown from "@/assets/arrowdown.svg";
import Rectangle from "@/assets/boxIcon.svg";
import { STEP_1, STEP_3 } from "@/utils/constants";
import { Modal, Pagination, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import EditAssignedClass from "./EditAssignedClass";
import NewTeacher from "./NewTeacher";
import Profile from "./Profile";
import Row from "./Row";

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

export type TTeacherList = {
  user:{"class_id": number,
  "class_name": string,
  "email": string,
  "firstname": string,
  "gender": string,
  "id":number,
  "image": string,
  "lastname": string}

};

const Teachers = () => {
  const { data, isLoading } = useGetTeacherList();
  const teacherList: TTeacherList[] = data?.data.data.records;
  const [opened, { open, close }] = useDisclosure(false);
  const [modalStep, setModalStep] = useState(STEP_1);
 

  const [currentClicked, setCucrrentClicked] = useState(0);
  const currentClickedProfile = teacherList?.find(
    (el) => el?.user?.id == currentClicked
  );
  // const activeClassTeacher = teacherList?.filter(data=> data?.user?.class_name !== "")
  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <Modal
        radius={10}
        padding={30}
        size={currentClickedProfile && modalStep === STEP_1 ? "700" : "md"}
        opened={opened}
        onClose={close}
        title={
          modalStep && modalStep === STEP_3 ? (
            <h1 className="text-[22px] font-semibold text-center  ml-20 font-Recoleta">
              Edit Assigned Class
            </h1>
          ) : null
        }
        withCloseButton={false}
        centered
      >
        {modalStep === STEP_1 && currentClickedProfile && (
          <Profile
            name={
              currentClickedProfile?.user?.firstname +
              " " +
              currentClickedProfile?.user?.lastname
            }
            asignClass={currentClickedProfile?.user?.class_name}
            image={currentClickedProfile?.user?.image}
            email={currentClickedProfile?.user?.email}
            handleClick={()=>close()}
            onEdit={() => setModalStep(STEP_3)}
          />
        )}
    

      {modalStep === STEP_3 && <EditAssignedClass onClose={close} currentClicked={currentClicked} />}
      </Modal>
      <div className="  flex-grow flex flex-col rounded-3xl p-4 bg-white">
        <div className="grid grid-cols-3 justify-center items-center w-full px-8 ">
          <div>
            <h1 className="text-[25px] font-bold">
              Teacher ({teacherList?.length})
            </h1>
          </div>
          <div className="flex gap-2 justify-center font-bold">
            <span className="text-[#8530C1] ">Sort by</span>
            <span>Newest</span>
            <img loading="lazy" src={ArrowDown} alt="Arrowdown" />
          </div>
          <div className="flex gap-3 justify-end">
            <NewTeacher />
          </div>
        </div>

        <div>
          <div className="grid  grid-cols-[100px_1fr_1fr_100px_100px] mt-5  text-gray-400 px-8">
            <div className="flex justify-start items-center">
              <span className=" ">
                <img loading="lazy" src={Rectangle} alt="" />
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
          {isLoading
            ? new Array(10).fill(1).map((array) => (
                <Skeleton height={60} my={10} visible={true}>
                  <h1 className="w-full">{array}</h1>
                </Skeleton>
              ))
            : teacherList?.map((data: TTeacherList, index: number) => {
                return (
                  <Row
                    onClick={() => {
                      console.log("userId--------",data?.user?.id)
                      open();
                      setCucrrentClicked(data?.user?.id);
                      setModalStep(STEP_1);
                      
                    }}
                    key={index}
                    data={data}
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

export default Teachers;
