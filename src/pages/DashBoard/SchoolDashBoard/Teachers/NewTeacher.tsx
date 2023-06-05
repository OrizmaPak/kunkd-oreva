import Button from "@/components/Button";
import { useDisclosure } from "@mantine/hooks";
import AddTeacherIcon from "@/assets/addUserIcon.svg";
import AddTeacherModal from "./AddTeacherModal";

const NewTeacher = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Button onClick={toggle} size="sm" varient="filled">
        <span className="flex  justify-between items-center gap-2">
          <img src={AddTeacherIcon} alt="" />
          <span>Add new teacher</span>
        </span>
      </Button>
      {opened ? <AddTeacherModal opened={opened} toggle={toggle} /> : null}
    </>
  );
};

export default NewTeacher;
