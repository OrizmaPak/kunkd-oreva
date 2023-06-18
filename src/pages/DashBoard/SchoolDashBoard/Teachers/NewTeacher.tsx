import Button from "@/components/Button";
import { useDisclosure } from "@mantine/hooks";
import AddTeacherIcon from "@/assets/addUserIcon.svg";
import AddTeacherModal from "./AddTeacherModal";
import { motion } from "framer-motion";

const NewTeacher = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button onClick={toggle} size="sm" varient="filled">
          <span className="flex  justify-between items-center gap-2">
            <img src={AddTeacherIcon} alt="" />
            <span>Add new teacher</span>
          </span>
        </Button>
        {opened ? <AddTeacherModal opened={opened} toggle={toggle} /> : null}
      </motion.div>
    </>
  );
};

export default NewTeacher;
