import Wrapper from "../../common/User/Wrapper";
import InnerWrapper from "../../common/User/InnerWrapper";
import Header from "./Header";
import AdsButton from "../../common/User/AdsButton";
// import { data } from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import DataList from "./DataList";
import { useGetLikedContent } from "@/api/queries";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import { useState } from "react";


const MyList = () => {
  const user = localStorage.getItem("user")
  const userObject = JSON.parse(user as string)
  const profileId = localStorage.getItem("profileId");
  const { data } = useGetLikedContent(profileId  as string);
  const [myListType, setMyListType] = useState("stories");
  const likedContent: TStoryContent[] = data?.data.data.records;
  const storiesLikedContents = likedContent?.filter(
    (content) => content.category === "Stories"
  );
  const audiobooksLikedContents = likedContent?.filter(
    (content) => content.category === "Audiobooks"
  );

  const languagesLikedContents = likedContent?.filter(
    (content) => content.category === "Languages"
  );

  

  // const [myListData, setMyListData] = useState(storiesLikedContents);

  // if (myListType === "stories") {
  //   setMyListData(storiesLikedContents);
  // } else if (myListType === "audiobooks") {
  //   setMyListData(audiobooksLikedContents);
  // } else if (myListType === "languages") {
  //   setMyListData(languagesLikedContents);
  // }
  // const handleListType = (type)=>{
  //   if (myListType === 'stories'){
  //     setMyListData(storiesLikedContents);
  //   }
  // }

  return (
    <div>
      <Wrapper>
        <InnerWrapper>
          <Header setMyListType={setMyListType} myListType={myListType} />

          <DataList
            data={
              myListType === "stories"
                ? storiesLikedContents
                : myListType === "audiobooks"
                ? audiobooksLikedContents
                : myListType === "languages"
                ? languagesLikedContents
                : storiesLikedContents
            }
          />
          <div className="pb-14">
          {userObject.subscription.status === false && userObject.role === "user" &&  <AdsButton />}
          </div>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default MyList;
