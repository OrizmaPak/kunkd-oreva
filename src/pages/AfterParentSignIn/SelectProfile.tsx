import { useNavigate } from "react-router-dom";
import GroupIcon from "@/assets/groupIcons.svg";
import { useGetProfile } from "@/api/queries";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";

export type selectAvatarType = {
  name: string;
  image: string;
  id: number;
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
            {!isLoading ? (
              profiles?.map((avatar, index) => (
                <AvatarCard key={index} {...avatar} isLoading={isLoading} />
              ))
            ) : (
              <span>Loading</span>
            )}
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
  return (
    <div>
      {isLoading ? (
        <span>Loading </span>
      ) : (
        <button onClick={handleClick}>
          <img
            loading="lazy"
            src={image}
            alt="avatar"
            className="w-[100px] h-[100px] object-cover "
          />
          <p className="text-black font-normal text-[20px]  mt-4 ">{name}</p>
        </button>
      )}
    </div>
  );
};
