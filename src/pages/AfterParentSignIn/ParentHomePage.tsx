import {
  useGetSummerChallengeQuizzes,
  useGetUpdatedProfile,
} from "@/api/queries";
import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { getProfileState } from "@/store/profileStore";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Hero from "./Hero";
import "./parenthomepage.css";
import HomeTab from "./HomTab";
import { Outlet } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ProfileUpdateModal from "./ProfileUpdateModal";
import JoinChanllengeModal from "./JoinChanllengeModal";
import TopLeaderboardModal from "../SummerQuiz/TopLeaderboardModal";

const ParentHomePage = ({ childProfile }: { childProfile: string }) => {
  {
    /* Calling the store  */
  }
  const [user, setUser] = useStore(getUserState);
  {
    /* Calling  useGetUpdatedProfile to update the store, this only necessary for new users  */
  }
  const { data } = useGetUpdatedProfile();

  const currentUserProfile = data?.data?.data;
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [
    openedTopLeaderboard,
    { open: openTopLeaderboard, close: closeTopLeaderboard },
  ] = useDisclosure(false);
  const [
    openedJoinChanllenge,
    { open: openJoinChanllenge, close: closeJoinChanllenge },
  ] = useDisclosure(false);

  useEffect(() => {
    {
      /* Updating the store inside this useEffect  */
    }
    setUser({ ...user, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);
  const [profiles] = useStore(getProfileState);

  useEffect(() => {
    sessionStorage.setItem("gotToHome", "true");
  }, []);

  const profile = childProfile
    ? profiles?.find((each) => each.id === +childProfile)
    : profiles?.[0];

  const { data: datta } = useGetSummerChallengeQuizzes(
    sessionStorage.getItem("profileId") as string
  );
  const quizzes = datta?.data?.data?.quizzes;

  useEffect(() => {
    if (profile?.username == "") {
      open();
    }
    if (
      profile?.accepted_summer_challenge === false &&
      profile.username !== "" &&
      sessionStorage.getItem("showJoinChallenge") &&
      quizzes?.length > 0
    ) {
      openJoinChanllenge();
    }
    // eslint disabled the next line
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (!user || !profile) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* Calling  Modal for updating profile   */}
      <Modal
        opened={opened}
        radius={6}
        size="lg"
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

      {/* Calling  Modal for joining sunmmer challenge   */}

      <Modal
        opened={openedJoinChanllenge}
        radius={6}
        size="lg"
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
        <JoinChanllengeModal
          close={closeJoinChanllenge}
          openTopLeaderboard={openTopLeaderboard}
        />
      </Modal>

      {/* Calling  Modal for instruction on how to top leaderboard  */}
      <Modal
        opened={openedTopLeaderboard}
        radius={6}
        size="lg"
        padding={14}
        onClose={() => {
          navigate("/summer-quiz"); // Call custom function
          closeTopLeaderboard(); // Close the modal
        }}
        overlayProps={{
          opacity: 0.85,
          blur: 3,
        }}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <TopLeaderboardModal />
      </Modal>
      <div>
        <Wrapper>
          <InnerWrapper>
            <Hero userimage={profile?.image} username={profile?.name} />
            <h1 className="text-center font-bold text30   font-Hanken   ">
              Our Library
            </h1>
            <HomeTab />
            <Outlet />
          </InnerWrapper>
        </Wrapper>
      </div>
    </>
  );
};

export default ParentHomePage;
