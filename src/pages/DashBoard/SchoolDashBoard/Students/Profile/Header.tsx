import ArrowDown from "@/assets/arrowdown.svg";
import LessThanIcon from "@/assets/lessthanIcon.svg";
import StudentIcon from "@/assets/studentIcon.svg";
import MyDateFilter from "@/components/DateFilter";
import { getApiErrorMessage } from "@/api/helper";
import { notifications } from "@mantine/notifications";
import { useDisableSchoolStudent } from "@/api/queries";
import { useParams } from "react-router-dom";
import ChangeProfileStatus from "@/pages/DashBoard/SchoolDashBoard/Teachers/ChangeProfileStatus";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


import { useNavigate } from "react-router-dom";
const Header = ({setStartDate, setEndDate}:{setStartDate:(val:string)=>void, setEndDate:(val:string)=>void}) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.studentId;
  const [opened, { open, close }] = useDisclosure(false);

  const {mutate, isLoading} = useDisableSchoolStudent()
  const handleDisableSchoolStudent = async ()=>{
   mutate({student_id:Number(id)},  {
          onSuccess(data) {
             navigate(-1)
            notifications.show({
              title: `Notification`,
              message: data.data.message,
            });
            close()
          },

          onError(err) {
            notifications.show({
              title: `Notification`,
              message: getApiErrorMessage(err),
            });
          },
        })
  }
  return (
    <>
       <Modal
        radius={10}
        padding={30}
        size={"md"}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
      >
        <ChangeProfileStatus onContinue={handleDisableSchoolStudent} isLoading={isLoading} onCancel={close} label="Student" />
      </Modal>
    
    <div>
      <div className="flex justify-between items-center w-full  ">
        <div className="flex justify-items-center items-center gap-4">
          <span onClick={() => navigate(-1)} className=" hover:cursor-pointer">
            <img loading="lazy" src={LessThanIcon} alt="" className="" />
          </span>
          <h1 className="text-[25px] font-bold"> Students profile</h1>
        </div>
        <div className="flex justify-end  gap-2 items-center">
          <span className="text-[#8530C1]">Sort by date:</span>
          <MyDateFilter setStartDate={setStartDate} setEndDate={setEndDate}/>
         
        </div>
        <div>
          <button onClick={open} className="text-white bg-[#ED1C24] p-3 flex gap-2  rounded-3xl">
            <img loading="lazy" src={StudentIcon} alt="" />
            <span>Remove student</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
