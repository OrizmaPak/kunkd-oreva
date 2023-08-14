import Button from "@/components/Button";
import { useDisclosure } from "@mantine/hooks";
import StudentIcon from "@/assets/studentIcon.svg";
import AddTeacherModal from "./AddStudentModal";

const NewStudent = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      {/* <Button onClick={toggle} size="sm" varient="filled"> */}
      <button className=" bg-[#8530C1] w-[200px] h-[32]">
        <span className="flex  h-[50px] justify-between items-center gap-2">
          <img
            loading="lazy"
            src={StudentIcon}
            alt="student icon"
            className="w-[30px]"
          />
          <span>Add new Student</span>
        </span>
      </button>
      {/* </Button> */}
      {opened ? <AddTeacherModal opened={opened} toggle={toggle} /> : null}
    </>
  );
};

export default NewStudent;
