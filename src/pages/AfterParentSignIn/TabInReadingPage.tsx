import { Tabs } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import BookIcon from "@/assets/storiesicon24.png";
import musicIcon from "@/assets/audiobookicon24.png";
import videoIcon from "@/assets/videoicon.png";
import { FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserState } from "@/store/authStore";
import useStore from "@/store/index";
import { useLocation } from "react-router-dom";
const TabInReadingPage = () => {
  const [user] = useStore(getUserState);
  const tabRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>(
    `${user?.role === "user" ? "/parent" : "/school"}`
  );
  const navigate = useNavigate();
  const location = useLocation();

  const onChanged = (val: string) => {
    setActiveTab(val);
    navigate(`${user?.role === "user" ? "/parent" : "/school"}/${val}`, {
      preventScrollReset: false,
    });
    console.log("scrollto", tabRef.current);
    // if (tabRef.current) {
    //   tabRef.current.scrollTo(0, 0);
    // }
  };
  useEffect(() => {
    const secondPath =
      location.pathname.split("/")[2] ??
      `${user?.role === "user" ? "/parent" : "/school"}`;
    setActiveTab(secondPath);
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <div
      ref={tabRef}
      id="tab-container"
      className="  px-10  my-5 bg-white pb-5 rounded-[20px]"
    >
      <Tabs value={activeTab} onTabChange={onChanged}>
        <div className="px-10 sticky    bg-white">
          <Tabs.List className="flex justify-between ">
            <Tabs.Tab
              value={`${user?.role === "user" ? "../parent" : "../school"}`}

              //    leftSection={<IconPhoto style={iconStyle} />}
            >
              <div className="flex gap-3 justify-center items-center cursor-pointer">
                <span>
                  <FaThumbsUp color="#8530C1" size={40} />
                </span>
                <p className="font-semibold  font-Hanken text1">For You</p>
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

export default TabInReadingPage;
