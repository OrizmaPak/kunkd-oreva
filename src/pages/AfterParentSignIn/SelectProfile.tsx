import { useNavigate } from "react-router-dom";
import GroupIcon from "@/assets/groupIcons.svg";
import { useGetProfile } from "@/api/queries";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { Skeleton } from "@mantine/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import BlurImage from "@/assets/BlxstBlur.jpg";

export type selectAvatarType = {
  name: string;
  image: string;
  id: number;
  dob?: string;
};

const SelectProfile = () => {
  const [profiles] = useStore(getProfileState);

  const { isLoading } = useGetProfile();

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${GroupIcon})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        className="relative h-screen w-full flex justify-center items-center  "
      >
        <div>
          <div className="text-center  font-bold  mb-10 text-black">
            <h1 className="text-[60px] font-Recoleta">Who's Learning?</h1>
            <p className=" font-Hanken">Select which kid is learning now </p>
          </div>
          <div className="flex text-white text-center gap-10 justify-center items-center bg-transparent">
            {isLoading
              ? Array(3)
                  .fill(1)
                  .map((arr, index) => (
                    <Skeleton
                      key={index}
                      height={100}
                      circle
                      visible={isLoading}
                    >
                      {arr}
                    </Skeleton>
                  ))
              : profiles?.map((avatar, index) => (
                  <AvatarCard key={index} {...avatar} isLoading={isLoading} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectProfile;

const AvatarCard = ({
  image,
  name,
  id,
  isLoading,
}: {
  image: string;
  name: string;
  id: number;
  isLoading: boolean;
  setSelected?: (val: string) => void;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    image = "";
    localStorage.setItem("profileId", JSON.stringify(id));
    navigate("/parent");
  };
  // const [imageLoding, setImageLoding] = useState(true);
  return (
    <div>
      {isLoading ? (
        <span>Loading </span>
      ) : (
        <button onClick={handleClick}>
          {/* <Skeleton height={100} circle visible={imageLoding}>
            <img
              loading="lazy"
              src={image}
              alt="avatar"
              className="w-[100px] h-[100px] object-cover  rounded-full "
              onLoad={() => setImageLoding(false)}
            />
          </Skeleton> */}

          <LazyLoadImage
            src={image}
            placeholderSrc={BlurImage}
            effect="blur"
            className=" rounded-full h-[100px] w-[100px] object-cover"
            wrapperClassName=" rounded-full object-cover  z-50"
            width={100}
            height={100}
          />
          <p className="text-black font-normal text-[20px]  mt-4 ">{name}</p>
        </button>
      )}
    </div>
  );
};
