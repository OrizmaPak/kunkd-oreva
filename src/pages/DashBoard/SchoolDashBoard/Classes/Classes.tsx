import { useGetClassList, useGetTeacherList } from "@/api/queries";
import ArrowDown from "@/assets/arrowdown.svg";
import Box from "@/assets/box.svg";
import ClassesIcon from "@/assets/classes.svg";
import EditPencil from "@/assets/editPencil.svg";
import Button from "@/components/Button";
import { Menu, Modal, Pagination, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import AddNewClass from "./AddNewClass";
import EditClassName from "./EditClassName";
import { TTeacherList } from "../Teachers/Teachers";
import { useState } from "react";
import EditClassTeachers from "./EditClassTeachers";
import Grade from "./Grade";
import Row from "./Row";
import SchoolNotificationModal from "@/components/SchoolNotificationModal";




export type TClassList = {
  id: number;
  name: string;
  slug: string;
  student_count: number;
  teacher_count: number;
};

const Classes = () => {
  const queryClient = useQueryClient();
  const [activePage, setPage] = useState(1);
  const { data: teacherDataList } = useGetTeacherList();
  const teacherList: TTeacherList[] = teacherDataList?.data.data.records;
  const [status, setStatus] = useState("active");
  const { data: classDataList, isLoading, refetch } = useGetClassList(status, activePage.toString());
  const totalPage = classDataList?.data.data.number_pages;
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);

  const [newClass, { open: newClassOpen, close: newClassClose }] =
    useDisclosure(false);

    const [newClassNameOpened, { open: newClassNameOpen, close: newClassNameClose }] =
    useDisclosure(false);

  const [openedSchNotifications, { open:openSchNotifications, close:closeSchNotifications }] = useDisclosure(false);


  // const [modalStep, setModalStep] = useState(STEP_1);
  const handleClick = () => {
    close();
  };


//   const classDataList =  useEffect(() =>{
// const { data, isLoading } = useGetClassList(status);
// return data
//   },[status])

  const listOfClass = classDataList?.data.data.records;


  const [currentClicked, setCucrrentClicked] = useState(0);
  const currentClickedTeacherData = teacherList?.find(
    (el: TTeacherList) => el?.user?.class_id == currentClicked
  );
  const currentClickedClassData: TClassList = listOfClass?.find(
    (el: TClassList) => el?.id == currentClicked
  );

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <Modal
        radius={10}
        padding={"xl"}
        xOffset={500}
        title={
          <h1 className=" pl-8 text-[24px] font-semibold flex gap-2">
            <span>
 {currentClickedClassData?.name}
            </span>
           <img onClick={()=>{
            newClassNameOpen()
            close()
           }
           } src={EditPencil } alt="" />
          </h1>
        }
        size="md"
        opened={opened}
        onClose={close}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        {
          <Grade
            data={currentClickedTeacherData}
            onEdit={() => (editOpen(), close())}
            handleClick={handleClick}
            student_count={currentClickedClassData?.student_count}
          />
        }
      </Modal>




       <Modal
        radius={10}
        padding={"xl"}
        xOffset={500}
        title={
          <h1 className=" pl-8 text-[24px] font-semibold flex gap-2">
   Edit Class Name
          </h1>
        }
        size="md"
        opened={newClassNameOpened}
        onClose={newClassNameClose }
        closeButtonProps={{ size: "lg" }}
        centered
      >
        {
          <EditClassName 
          currentClicked={currentClicked}
          editClose={newClassNameClose}
          />
        }
      </Modal>


      <Modal
        radius={10}
        size="md"
        opened={newClass}
        onClose={newClassClose}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <AddNewClass newClassClose={newClassClose} openSchNotifications={openSchNotifications} />
      </Modal>

      <Modal
        radius={10}
        size="md"
        opened={editOpened}
        onClose={editClose}
        title={
          <h1 className="text-[24px] font-semibold text-center w-full ml-16">
            Edit Class Teachers
          </h1>
        }
        closeButtonProps={{ size: "lg" }}
        centered
      >
        {<EditClassTeachers currentClicked={currentClicked} editClose={editClose} />}
      </Modal>


      <Modal
        radius={10}
        size="md"
        opened={openedSchNotifications}
        onClose={closeSchNotifications}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <SchoolNotificationModal onCancel={closeSchNotifications}   label="Classes"/>
      </Modal>

      <div className=" flex-grow flex flex-col rounded-3xl p-4 bg-white">
        <div className="grid grid-cols-3 justify-center items-center w-full px-8 ">
          <div>
            <h1 className="text-[25px] font-bold">Classes ({listOfClass?.length|| 0})</h1>
          </div>
          <div className="flex gap-2">
          
             <Menu>
            <Menu.Target>
              <div className="flex gap-2">
                 <button>Sort by</button>
                  <img loading="lazy" src={ArrowDown} alt="Arrowdown" />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
               <button onClick={()=>{
                 queryClient.invalidateQueries({ queryKey: ['GetClassList']});
                setStatus('')}}>
                Active
                </button> 
              </Menu.Item>
              <Menu.Item>
                <button onClick={()=>{
          queryClient.invalidateQueries({ queryKey: ['GetClassList']});
                  
                  setStatus("disabled")}}>
                  
                Disabled
                </button>
                
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
            
           
          </div>
          <div className="flex justify-center">
            <Button onClick={() => newClassOpen()} size="sm">
              <span className="flex  h-[32px] w-[] justify-center items-center gap-2">
                <img loading="lazy" src={ClassesIcon} alt="" />
                <span>Add new class</span>
              </span>
            </Button>
          </div>
        </div>

        <div className="border-b-[2px] py-5 border-[#eee]">
          <div className="grid  grid-cols-[100px_300px_1fr_1fr_150px] mt-5  px-8 text-gray-400">
            <div className="flex justify-start items-center ">
              <span className=" ">
                <img loading="lazy" src={Box} alt="box" />
              </span>
            </div>
            <div>Name</div>
            <div>No of Students</div>
            <div>No of Teachers</div>
            <div className="flex justify-end   items-center">
              <span>Actions</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {isLoading
            ? new Array(8).fill(1).map((array) => (
                <Skeleton height={60} my={10} visible={true}>
                  <h1 className="w-full">{array}</h1>
                </Skeleton>
              ))
            : listOfClass?.map((data: TClassList, index: number) => {
                return (
                  <Row
                    key={index}
                    data={data}
                    onClick={() => (setCucrrentClicked(data.id), open())}
                    status={status}
                  />
                );
              })}
        </div>
      </div>
      <div>
      <div className="flex  justify-end mt-2 px-4">
        {/* <span>
          Showing <span className="text-[#8530C1]"> 1-9 </span> from
          <span className="text-[#8530C1]"> {totalPage * 5} </span> data
        </span> */}
        {totalPage > 1 && (
        <div className="px-10  mr-2 flex justify-end  pb-8">
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

export default Classes;
