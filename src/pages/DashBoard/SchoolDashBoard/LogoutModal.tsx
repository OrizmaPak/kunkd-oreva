import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <h1 className="font-bold text-[25px] mb-8 text-center font-Recoleta leading-[30px] ">
          Are you sure you want to Log out of your dashboard?
        </h1>

        <div className="flex justify-end gap-4 mb-5 ">
          <Button
            onClick={onCloseModal}
            className="p-4 px-10 bg-[#FFF8F7] text-red-600 rounded-full flex-grow font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="p-4 px-10 bg-red-600 text-white rounded-full flex-grow"
          >
            Logout
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LogoutModal;
