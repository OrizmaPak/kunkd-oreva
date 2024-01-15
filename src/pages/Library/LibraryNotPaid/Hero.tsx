import { useState } from "react";
import { Skeleton } from "@mantine/core";
const Hero = ({ image }: { image: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="">
      <Skeleton visible={isLoading}>
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
