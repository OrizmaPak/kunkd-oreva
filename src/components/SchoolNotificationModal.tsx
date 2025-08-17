       
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const SchoolNotificationModal = ({ onCancel, label }: { onCancel: () => void, label:string}) => {
    const navigete = useNavigate();
    const handleCancel = () => {
       
        onCancel();
    }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="font-bold text20  text-center leading-8 mb-10">
       Please upgrade your license to add more {label}
      </h1>
      {/* <p className="text-center mb-10 ">
        Please click on continue to contact admin for your account upgrade.
      </p> */}

      <div className="flex justify-end gap-4  mb-5 px-5">
        <button
          onClick={handleCancel}
          className="p-3 pad-x-10 bg-red-200 text-red-600 rounded flex-grow"
        >
          Cancel
        </button>
        <button
          onClick={()=>navigete("/kundakidsunlimited")}
          className="p-3 pad-x-10 bg-[#8530C1] text-white rounded flex-grow"
        >
          Continue
        </button>

       
      </div>
    </motion.div>
  );
};

export default SchoolNotificationModal ;
