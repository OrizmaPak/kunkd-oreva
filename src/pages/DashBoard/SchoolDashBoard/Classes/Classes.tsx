import { useGetClassList, useGetTeacherList } from "@/api/queries";
// import ArrowDown from "@/assets/arrowdown.svg";
// import ClassesIcon from "@/assets/classes.svg";
import EditPencil from "@/assets/editPencil.svg";
import Button from "@/components/Button";
import { Modal, Pagination, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddNewClass from "./AddNewClass";
import EditClassName from "./EditClassName";
import { TTeacherList } from "../Teachers/Teachers";
import { useState } from "react";
import EditClassTeachers from "./EditClassTeachers";
import Grade from "./Grade";
import Row from "./Row";
import SchoolNotificationModal from "@/components/SchoolNotificationModal";
import OuterRec from "@/assets/Outer Rectangle.png";
import SearchFilter from "../SearchFilter";
import { IoMdAddCircleOutline } from "react-icons/io";
import EmptyState from "@/assets/connectionEmpty.png";

export type TClassList = {
  id: number;
  name: string;
  slug: string;
  student_count: number;
  teacher_count: number;
};

const Classes = () => {
  const [activePage, setPage] = useState(1);
  const { data: teacherDataList } = useGetTeacherList();
  const teacherList = teacherDataList?.data.data.records;
  const [status, setStatus] = useState("active");
  console.log("status", status);
  const {
    data: classDataList,
    isLoading,
    refetch,
  } = useGetClassList(status, activePage.toString());
  const totalPage = Math.ceil(classDataList?.data.data.totalRecord / 10);

  const [openednewClass, { open: newClassOpen, close: newClassClose }] =
    useDisclosure(false);

  const [OpenedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  const [
    openedSchNotifications,
    { open: openSchNotifications, close: closeSchNotifications },
  ] = useDisclosure(false);

  // const [modalStep, setModalStep] = useState(STEP_1);

  //   const classDataList =  useEffect(() =>{
  // const { data, isLoading } = useGetClassList(status);
  // return data
  //   },[status])

  const listOfClass = classDataList?.data.data.records;

  const [currentClicked, setCurrentClicked] = useState(0);

  const currentClickedClassData: TClassList = listOfClass?.find(
    (el: TClassList) => el?.id == currentClicked
  );
  const currentClickedTeacherData: TTeacherList = teacherList?.find(
    (el: TTeacherList) => el?.user?.class_id == currentClicked
  );
  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <Modal
        radius={16}
        padding={0}
        xOffset={500}
        size="md"
        opened={OpenedEdit}
        onClose={closeEdit}
        centered
        withCloseButton={false}
      >
        {
          <EditClassName
            currentClassData={currentClickedClassData}
            currentTeacherData={currentClickedTeacherData}
            currentClicked={currentClicked}
            editClose={closeEdit}
          />
        }
      </Modal>

      <Modal
        radius={16}
        padding={0}
        size={450}
        opened={openednewClass}
        onClose={newClassClose}
        // closeButtonProps={{ size: "lg" }}
        centered
        withCloseButton={false}
      >
        <AddNewClass
          newClassClose={newClassClose}
          openSchNotifications={openSchNotifications}
        />
      </Modal>

      <Modal
        radius={10}
        size="md"
        opened={openedSchNotifications}
        onClose={closeSchNotifications}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <SchoolNotificationModal
          onCancel={closeSchNotifications}
          label="Classes"
        />
      </Modal>

      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-[25px]  font-Inter mb-4">
          Classes
          <span className="text-[#667185] bg-[#C2DBB0] rounded-2xl p-2 ml-3">
            {listOfClass?.length || 0}
          </span>{" "}
        </h1>

        <div className="flex justify-center">
          <Button
            onClick={() => newClassOpen()}
            size="sm"
            backgroundColor="green"
          >
            <span className="flex  h-[25px] w-[] justify-center items-center gap-2">
              <IoMdAddCircleOutline color="white" size={25} />
              <span className="text-white">Add new class</span>
            </span>
          </Button>
        </div>
      </div>

      <div className=" flex-grow flex flex-col rounded-3xl py-4 bg-white border-[2px] border-[#E4E7EC] ">
        <div className="px-8 flex gap-5 justify-end">
          <SearchFilter setFilterValue={setStatus} />
        </div>

        <div className="   ">
          <div className="grid  grid-cols-[300px_1fr_1fr_250px] mt-5    text-[#344054] font-semibold  py-4 border-b-[2px] bg-[#F9FAFB] border-[#E4E7EC] px-8">
            <div className="flex gap-3 items-center  ">
              <img src={OuterRec} alt="image" className="w-[20px] h-[20px]" />
              Name
            </div>
            <div className="">No of Students</div>
            <div className="">Name of Teachers</div>
            <div className="flex justify-end   items-center  ">
              <span></span>
            </div>
          </div>
        </div>
        <div className="flex flex-col  flex-grow">
          <div>
            {isLoading ? (
              new Array(8).fill(1).map((_, index) => (
                <Skeleton key={index} height={60} my={10} visible={true}>
                  <h1 className="w-full"></h1>
                </Skeleton>
              ))
            ) : listOfClass?.length > 0 ? (
              listOfClass.map((data: TClassList, index: number) => (
                <Row
                  key={index}
                  data={data}
                  onClick={() => (setCurrentClicked(data.id), openEdit())}
                  status={status}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-full mt-24 flex-col">
                <img
                  src={EmptyState}
                  alt="No classes"
                  className="w-[150px] h-[150px] object-contain"
                />
                <p className="font-Inter text-[18px]">No classes available</p>
                <p className="font-Baloo text-[14px]">
                  Classes will appear here once added.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex  justify-end mt-2 px-4">
          {totalPage > 1 && (
            <div className="  mr-2 flex justify-end mt-2  pb-4">
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

export default Classes;
