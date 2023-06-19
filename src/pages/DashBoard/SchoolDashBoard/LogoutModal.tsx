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
      <h1 className="font-bold text-[25px] my-8 text-center font-Recoleta">
        Are you sure you want to Log out of your dashboard?
      </h1>

      <div className="flex justify-end gap-4 mb-5 px-5">
        <button
          onClick={onCloseModal}
          className="p-4 px-10 bg-[#FFF8F7] text-red-600 rounded-full flex-grow font-bold"
        >
          Cancel
        </button>
        <button
          onClick={() => navigate("/newlyregistereduser")}
          className="p-4 px-10 bg-red-600 text-white rounded-full flex-grow"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default LogoutModal;
