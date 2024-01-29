import { useGetUpdatedProfile } from "@/api/queries";

import InnerWrapper from "@/common/User/InnerWrapper";
import Wrapper from "@/common/User/Wrapper";
import { Outlet } from "react-router-dom";
import Hero from "./Hero";
import "./newlyregistereduser.css";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { useEffect } from "react";
import HomTab from "@/pages/AfterParentSignIn/HomTab";

export type DataType = {
  title?: string;
  image?: string;
  range?: number;
  id?: string;
};

const NewlyRegisteredUser = () => {
  const [useri, setUser] = useStore(getUserState);
  const { data } = useGetUpdatedProfile();
  const currentUserProfile = data?.data?.data;
  useEffect(() => {
    setUser({ ...useri, ...currentUserProfile });
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile]);

  return (
    <Wrapper>
      <InnerWrapper>
        <Hero />
        <hr className="mt-[16px] mx-16 " />

        <h1 className="text-center font-bold text30  font-Recoleta my-10  ">
          Our Library
        </h1>
        <HomTab />
        <Outlet />
      </InnerWrapper>
    </Wrapper>
  );
};

export default NewlyRegisteredUser;
