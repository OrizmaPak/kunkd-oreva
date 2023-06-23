import { motion } from "framer-motion";

const DeleteAccount = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="font-bold text-[30px] mt-8 text-center font-Recoleta">
        Are you sure you want to delete your account?
      </h1>
      <p className="text-center mb-10 ">
        If you delete your account, you can’t recover it.
      </p>

      <div className="flex justify-end gap-4 mb-5 px-5">
        <button
          onClick={onCancel}
          className="p-4 px-10 bg-red-200 text-red-600 rounded-full flex-grow"
        >
          No
        </button>
        <button
          onClick={onCancel}
          className="p-4 px-10 bg-red-600 text-white rounded-full flex-grow"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default DeleteAccount;
