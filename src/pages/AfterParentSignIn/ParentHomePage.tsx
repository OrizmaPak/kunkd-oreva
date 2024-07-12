import { useGetUpdatedProfile } from "@/api/queries";

import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import Hero from "./Hero";
import "./parenthomepage.css";
import HomeTab from "./HomTab";
import { Outlet } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ProfileUpdateModal from "./ProfileUpdateModal";
import JoinChanllengeModal from "./JoinChanllengeModal";

const ParentHomePage = ({ childProfile }: { childProfile: string }) => {
  const [useri, setUser] = useStore(getUserState);
  const { data } = useGetUpdatedProfile();
  const currentUserProfile = data?.data?.data;
  const [opened, { open, close }] = useDisclosure(false);
  const [
    openedJoinChanllenge,
    { open: openJoinChanllenge, close: closeJoinChanllenge },
  ] = useDisclosure(false);

  useEffect(() => {
    setUser({ ...useri, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);
  const [profiles] = useStore(getProfileState);

  useEffect(() => {
    sessionStorage.setItem("gotToHome", "true");
  }, []);

  const [user] = useStore(getUserState);

  const profile = childProfile
    ? profiles?.find((each) => each.id === +childProfile)
    : profiles[0];

  console.log({ childProfile, profiles }, "===>> profiles data");

  useEffect(() => {
    if (profile?.username == "") {
      console.log("whatisProfile1", profile);
      open();
    }
    if (
      profile?.accepted_summer_challenge === false &&
      profile.username !== ""
    ) {
      console.log("whatisProfile2", profile);
      openJoinChanllenge();
    }
  }, [profile]);

  if (!user || !profile) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Modal
        opened={opened}
        radius={6}
        size="md"
        padding={14}
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
        <ProfileUpdateModal
          name={profile?.name}
          image={profile?.image}
          id={profile?.id}
          close={close}
          openJoinChanllenge={openJoinChanllenge}
        />
      </Modal>
      <Modal
        opened={openedJoinChanllenge}
        radius={6}
        size="md"
        padding={14}
        onClose={closeJoinChanllenge}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
        closeButtonProps={{ size: "lg" }}
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        <JoinChanllengeModal close={closeJoinChanllenge} />
      </Modal>
      <div>
        <Wrapper>
          <InnerWrapper>
            <Hero userimage={profile?.image} username={profile?.name} />
            <h1 className="text-center font-bold text30   font-Hanken   ">
              Our Library
            </h1>

            {/* <div className="flex justify-center items-center mt-8">
            <div className=" justify-center items-center category-gap  ">
              <CategoriesCard
                image={BookIcon}
                label="Stories"
                goTo={() => navigate("stories")}
              />
              <CategoriesCard
                image={musicIcon}
                label="Audiobooks"
                goTo={() => navigate("audiobooks")}
              />
              <CategoriesCard
                image={videoIcon}
                label="African Languages"
                goTo={() => navigate("africanlanguages")}
              />
            </div>
          </div> */}
            <HomeTab />
            <Outlet />
          </InnerWrapper>
        </Wrapper>
      </div>
    </>
  );
};

export default ParentHomePage;
