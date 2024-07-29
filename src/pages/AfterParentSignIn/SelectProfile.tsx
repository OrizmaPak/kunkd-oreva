import { useGetProfile } from "@/api/queries";
import BlurImage from "@/assets/BlxstBlur.jpg";
import GroupIcon from "@/assets/groupIcons.svg";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { Skeleton } from "@mantine/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { getUserState } from "@/store/authStore";
import ParentUpdateModal from "./ParentUpdateModal";

export type selectAvatarType = {
  name: string;
  image: string;
  id: number;
  dob?: string;
  username?: string;
  accepted_summer_challenge: boolean;
  student?: {
    assigned_teacher_id: number;
    assigned_teacher_name: string;
    class_id: number;
    class_name: string;
    school_id: number;
    school_name: string;
    status: string;
  };
};

const SelectProfile = ({
  setChildProfile,
}: {
  setChildProfile: (val: string) => void;
}) => {
  const [profiles] = useStore(getProfileState);
  const [user] = useStore(getUserState);

  const { data, isLoading } = useGetProfile();

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (user?.phone == "") {
      open();
    }
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        radius={6}
        size="lg"
        onClose={close}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
        closeButtonProps={{ size: "lg" }}
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        <ParentUpdateModal close={close} />
      </Modal>

      {!isLoading && data?.data?.data?.length === 0 ? (
        <Navigate to="/childprofilesetup" replace />
      ) : (
        <div
          style={{
            backgroundImage: `url(${GroupIcon})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          className="relative h-screen w-full flex justify-center items-center  "
        >
          {
            <div>
              <div className="text-center  font-bold  mb-10 text-black">
                <h1 className="text-[60px] font-Recoleta">Who's Learning?</h1>
                <p className=" font-Hanken">
                  Select which kid is learning now{" "}
                </p>
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
                      <AvatarCard
                        key={index}
                        {...avatar}
                        isLoading={isLoading}
                        setChildProfile={setChildProfile}
                      />
                    ))}
              </div>
            </div>
          }
        </div>
      )}
    </>
  );
};

export default SelectProfile;

const AvatarCard = ({
  image,
  name,
  id,
  isLoading,
  setChildProfile,
}: {
  image: string;
  name: string;
  id: number;
  isLoading: boolean;
  setSelected?: (val: string) => void;
  setChildProfile: (val: string) => void;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    image = "";
    setChildProfile(id.toString());
    sessionStorage.setItem("profileId", id.toString());

    navigate("/parent");
  };

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
          <p className="text-black font-normal text-[20px]  mt-4 ">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
        </button>
      )}
    </div>
  );
};
