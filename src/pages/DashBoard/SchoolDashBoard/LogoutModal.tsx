import Button from "@/components/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import DeleteIcon from "@/assets/deleteicon24.png";
const LogoutModal = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useStore(getProfileState);
  console.log(profiles);
  // const navigate = useNavigate();
  const handLogOut = () => {
    localStorage.clear();
    setProfiles([]);
    onCloseModal();
    navigate("/");
  };
  // const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <div className="flex justify-center items-center mb-3">
          <img src={DeleteIcon} alt="image" className="w-[60px] h-[60px]" />
        </div>
        <h1 className="font-bold text-[25px] mb-2 text-center  font-Inter leading-[30px] ">
          Log out?
        </h1>
        <p className=" font-InterReg my-4 text-center">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end gap-4 mb-5 ">
          <Button
            varient="outlined"
            onClick={onCloseModal}
            className="p-4 px-10  text-black  flex-grow font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handLogOut}
            className="p-4 px-10 bg-red-600 text-white  flex-grow"
          >
            Yes
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LogoutModal;
