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
        transition={{ duration: 1 }}
      >
        <Button onClick={toggle} size="sm" varient="filled">
          <span className="flex  h-[34px]  px-3 justify-between items-center gap-2">
            <img loading="lazy" src={AddTeacherIcon} alt="" />
            <span className="py-1">Add new teacher</span>
          </span>
        </Button>
        {opened ? <AddTeacherModal opened={opened} toggle={toggle} /> : null}
      </motion.div>
    </>
  );
};

export default NewTeacher;
