import { useState } from "react";
import { Skeleton } from "@mantine/core";
import Backbutton from "@/assets/backbutton24.png";
import { useNavigate } from "react-router-dom";

const Hero = ({ image }: { image: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const storedUser = localStorage.getItem("user");
  const userObj = JSON.parse(storedUser as string);

  const navigate = useNavigate();
  const handleGoBack = () => {
    if (userObj.role === "user") {
      navigate("/parent");
    } else {
      navigate("/school");
    }
  };

  return (
    <div className="relative">
      <Skeleton visible={isLoading} className="relative">
        <button onClick={handleGoBack} className="absolute  top-4  left-4">
          <img src={Backbutton} alt="" className="w-[40px] h-[40px]" />
        </button>
        <img
          src={image}
          alt="banner "
          className=" h-[350px] rounded-t-[20px] w-full  object-cover"
          onLoad={() => setIsLoading(false)}
        />
      </Skeleton>
    </div>
  );
};

export default Hero;
