import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const TeacherNotificationModal = ({ onCancel }: { onCancel: () => void}) => {
    const navigete = useNavigate();
    const handleCancel = () => {
        navigete("/school")
        onCancel();
    }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="font-bold text20  text-center">
       Number of allowed contents reached!
      </h1>
      <p className="text-center mb-10 ">
        Please contact your school admin to upgrade their account
      </p>

      <div className="flex justify-end gap-4 mb-5 px-5">
        <button
          onClick={handleCancel}
          className="p-3 pad-x-10 bg-red-200 text-red-600 rounded flex-grow"
        >
          Cancel
        </button>
       
      </div>
    </motion.div>
  );
};

export default TeacherNotificationModal ;
