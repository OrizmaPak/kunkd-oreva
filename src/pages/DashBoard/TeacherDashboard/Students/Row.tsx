// import ToggleIcon from "@/assets/toggleicon.svg";
import { getApiErrorMessage } from "@/api/helper";
import { useDisableSchoolStudent } from "@/api/queries";
import Rectangle from "@/assets/boxIcon.svg";
import ChangeProfileStatus from "@/pages/DashBoard/SchoolDashBoard/Teachers/ChangeProfileStatus";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { MdChangeCircle } from "react-icons/md";
import { TRequestStudents } from "../../TeacherDashboard/Request/Request";


const Row = ({
  data,
  onClick,
  
}: {
  data: TRequestStudents;

  classCode?: string;
  onClick?: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();


  const {mutate, isLoading} = useDisableSchoolStudent()
  const handleDisableSchoolStudent = async ()=>{
   mutate({student_id:data?.student?.id},  {
          onSuccess(data) {
             queryClient.invalidateQueries({ queryKey: ['GetClassList']});
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
    // <div className="  py-3  h-[72px] hover:cursor-pointer flex-grow font-medium">
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
      <div className="grid   grid-cols-[100px_300px_1fr_150px] mt-2  px-8">
        <div className="flex justify-start items-center ">
          <span className=" ">
            <img loading="lazy" src={Rectangle} alt="" />
          </span>
        </div>
        <div
          onClick={onClick}
          className="flex items-center justify-start gap-4 "
        >
          <span>
            <img
              loading="lazy"
              src={data.student.image}
              alt="image"
              className=" w-[46px]"
            />
          </span>
          <span>
            {data.firstname} {data.lastname}
          </span>
        </div>
        <div className="flex justify-start items-center ">
          {data.class.class_name}
        </div>

        <div className="flex justify-end  gap-4  items-center">
          <span>{/* <img loading="lazy" src={ToggleIcon} alt="" /> */}</span>
          <button onClick={open} className="flex justify-center items-center gap-2">
              <MdChangeCircle size={30} color="#8530C1"/> <span>Active</span>
            </button>
          <span></span>
        </div>
      </div>
      <hr className="my-[10px] mx-8" />
    </div>
    </>
   
    // </div>
  );
};

export default Row;
