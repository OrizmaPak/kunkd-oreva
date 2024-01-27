import { Tabs } from "@mantine/core";
import DefaultTab from "./DefaultTab";
import StoriesV2 from "../Stories/StoriesV2/StoriesV2";
import { useEffect, useState } from "react";
import BookIcon from "@/assets/storiesicon24.png";
import musicIcon from "@/assets/audiobookicon24.png";
import videoIcon from "@/assets/videoicon.png";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import VideoV2 from "../AfricanLanguages/VideosV2/VideoV2";
import AudiobooksV2 from "../AudioBooks/AudiobooksV2/AudiobooksV2";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { useLocation } from "react-router-dom";
const HomTab = () => {
  const [user] = useStore(getUserState);

  const [activeTab, setActiveTab] = useState<string>(
    `${user?.role === "user" ? "/parent" : "/school"}`
  );
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToMiddle = () => {
    // Get the height of the viewport
    console.log("working--------");
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Calculate the middle position
    const middle = viewportHeight / 3;

    // Scroll to the middle position
    console.log("middle", middle);
    window.scrollTo({
      top: middle,
      behavior: "smooth", // Optional: animated scrolling
    });
  };

  const onChanged = (val: string) => {
    setActiveTab(val);
    navigate(val);
    console.log("val", val);
    scrollToMiddle();
  };
  useEffect(() => {
    const secondPath =
      location.pathname.split("/")[2] ??
      `${user?.role === "user" ? "/parent" : "/school"}`;
    setActiveTab(secondPath);
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div className="  px-10 sticky top-[70px] z-50">
      <Tabs value={activeTab} onTabChange={onChanged}>
        <div className="px-10 sticky    bg-white">
          <h1 className="text-center font-bold text30 pt-14 font-Recoleta my-10  ">
            Our Library
          </h1>
          <Tabs.List className="flex justify-between">
            <Tabs.Tab
              value={`${user?.role === "user" ? "/parent" : "/school"}`}

              //    leftSection={<IconPhoto style={iconStyle} />}
            >
              <div className="flex gap-3 justify-center items-center cursor-pointer">
                <span>
                  <FaThumbsUp color="#8530C1" size={40} />
                </span>
                <p className="font-semibold  font-Hanken text1">Recommended</p>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              //   onClick={() => navigate("stories")}
              value="stories"
              // leftSection={<IconMessageCircle style={iconStyle} />}
            >
              <div className="flex gap-3 justify-center items-center cursor-pointer">
                <span>
                  <img
                    loading="lazy"
                    src={BookIcon}
                    alt="image"
                    className="w-[70px] h-[70px]"
                  />
                </span>
                <p className="font-semibold  font-Hanken text1">Stories</p>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              //   onClick={() => navigate("audiobooks")}
              value="audiobooks"
              // leftSection={<IconSettings style={iconStyle} />}
            >
              <div className="flex gap-3 justify-center items-center cursor-pointer">
                <span>
                  <img
                    loading="lazy"
                    src={musicIcon}
                    alt="image"
                    className="w-[70px] h-[70px]"
                  />
                </span>
                <p className="font-semibold  font-Hanken text1">Audiobooks</p>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              //   onClick={() => navigate("africanlanguages")}
              value="languages"
              // leftSection={<IconSettings style={iconStyle} />}
            >
              <div className="flex gap-3 justify-center items-center cursor-pointer">
                <span>
                  <img
                    loading="lazy"
                    src={videoIcon}
                    alt="image"
                    className="w-[70px] h-[70px]"
                  />
                </span>
                <p className="font-semibold  font-Hanken text1">
                  African Languages
                </p>
              </div>
            </Tabs.Tab>
          </Tabs.List>
        </div>

        {/* <Tabs.Panel value="home">
          <DefaultTab />
        </Tabs.Panel>

        <Tabs.Panel value="stories">
          <StoriesV2 />
        </Tabs.Panel>

        <Tabs.Panel value="audiobooks">
          <AudiobooksV2 />
        </Tabs.Panel>

        <Tabs.Panel value="africanlanguages">
          <VideoV2 />
        </Tabs.Panel> */}
      </Tabs>
    </div>
  );
};

export default HomTab;
