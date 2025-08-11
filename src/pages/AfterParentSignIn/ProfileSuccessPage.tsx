import SignInWrapper from "@/common/SignInWrapper"
import Doll from "@/assets/doll.svg";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";



const ProfileSuccessPage = () => {
    const navigator = useNavigate();
  return (
    <div>

        <SignInWrapper>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[50px] p-6 mt-10 w-[550px]"
            >
            <div className="mt-8">
                <div className="flex justify-center items-center mt-5 mb-2">
                <img src={Doll} alt="Kunda Logo" className="w-[120px]" />
                </div>
                <h1 className="text-center font-bold text-[35px] font-BalooSemiBold">
                Success!
                </h1>
                <p className="text-center">
                  You’ve created a profile.
                </p>
            </div>

            <div className="flex justify-center items-center py-10 flex-col gap-5 px-28">
                                <Button backgroundColor="green" onClick={()=>navigator('/schooldashboard/content')} className=" rounded-full">Continue to homepage</Button>
                                <Button onClick={()=>navigator("/connecttoschool")} borderColor="green"  varient="outlined" className="rounded-full "><span className="text-[#9FC43E]">Join a class</span></Button>
            </div>
            </motion.div>
        </SignInWrapper>
    </div>
  )
}

export default ProfileSuccessPage