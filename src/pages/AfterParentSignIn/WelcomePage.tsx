import SignInWrapper from "@/common/SignInWrapper"
import { motion } from "framer-motion";
import AddAvatarIcon from "@/assets/addprofileIcon.png";
import KundaLogo from "@/assets/KundaLogo.svg";
import { useNavigate } from "react-router-dom";


const WelcomePage = () => {
    const navigate = useNavigate();
  return (
    <div>
            <SignInWrapper>
  <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-[50px]  p-6  mt-10 w-[550px]"
    >
      <div className="mt-20">
         <div className="flex justify-center items-center mt-10 mb-7 ">
          <img src={KundaLogo} alt="image" className="w-[160px]" />
        </div>
        <h1 className="text-center font-bold text-[35px]  font-BalooSemiBold ">
          Welcome to Kunda Kids
        </h1>
        <p className="text-center">
          To begin, create a profile for your child.
        </p>
      </div>
      <div className="flex justify-center items-center py-10">
        <button onClick={()=>navigate("/profilesetup")}  className=" text-center">
          <img loading="lazy" src={AddAvatarIcon} alt="avatar" />
          <p className="py-5 font-BalooSemiBold text-[#9FC43E]">Add Profile</p>
        </button>
      </div>
    </motion.div>

            </SignInWrapper>

    </div>
  )
}

export default WelcomePage