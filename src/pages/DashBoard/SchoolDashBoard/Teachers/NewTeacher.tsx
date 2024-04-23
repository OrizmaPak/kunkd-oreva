import Button from "@/components/Button";
import { useDisclosure } from "@mantine/hooks";
import AddTeacherIcon from "@/assets/addUserIcon.svg";
import { motion } from "framer-motion";
import { Modal } from "@mantine/core";
import AddTeacherForm from "./AddTeacherForm";

const NewTeacher = ({
  openSchNotifications,
}: {
  openSchNotifications: () => void;
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Button onClick={open} size="sm" varient="filled">
          <span className="flex  h-[25px]  px-3 justify-between items-center gap-2">
            <img loading="lazy" src={AddTeacherIcon} alt="" />
            <span className="py-1">Add new teacher</span>
          </span>
        </Button>
        {/* {opened ? (
          <AddTeacherModal
            opened={opened}
            toggle={toggle}
            openSchNotifications={openSchNotifications}
          />
        ) : null} */}

        <Modal
          radius={10}
          size={"lg"}
          opened={opened}
          onClose={close}
          withCloseButton={false}
          // closeButtonProps={{
          //   size: "xl",
          // }}

          centered
        >
          <AddTeacherForm
            close={close}
            openSchNotifications={openSchNotifications}
          />
        </Modal>
      </motion.div>
    </>
  );
};

export default NewTeacher;
