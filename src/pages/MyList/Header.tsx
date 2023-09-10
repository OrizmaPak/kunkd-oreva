import SearchIcon from "@/assets/searchicon.svg";
import { GoBook } from "react-icons/go";
import { MdOutlineAudiotrack } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { Menu } from "@mantine/core";

const Header = ({
  setMyListType,
  myListType,
}: {
  setMyListType: (val: string) => void;
  myListType: string;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center py-10 px-24">
        <h1 className="font-bold font-Recoleta text30">My List</h1>
        <span>
          <img loading="lazy" src={SearchIcon} alt="SearchIcon " className="" />
        </span>
      </div>

      <div className="flex justify-between items-center p">
        <div className="flex gap-4 pb-4 pl-24">
          <button
            onClick={() => setMyListType("stories")}
            className={`pad-x-40 text2 transition-all duration-300 ${
              myListType === "stories" ? "bg-[#8530C1]" : "bg-[#FBECFF]"
            } flex py-2 px-8 gap-4 rounded-full items-center justify-center`}
          >
            <GoBook
              size={25}
              className={" mx-auto "}
              color={myListType === "stories" ? "white" : "#8530C1"}
            />
            <span
              className={
                myListType === "stories" ? "text-white" : " text-[#8530C1]"
              }
            >
              Stories
            </span>
          </button>
          <button
            onClick={() => setMyListType("audiobooks")}
            className={`pad-x-40 text2 transition-all duration-300  ${
              myListType === "audiobooks" ? "bg-[#8530C1]" : "bg-[#FFEDEA]"
            }   flex py-2 px-8 gap-4 rounded-full items-center justify-center`}
          >
            <MdOutlineAudiotrack
              size={25}
              className={" mx-auto "}
              color={myListType === "audiobooks" ? "white" : "#ED1C24"}
            />
            <span
              className={
                myListType === "audiobooks" ? "text-white" : " text-[#ED1C24]"
              }
            >
              Audiobooks
            </span>
          </button>
          <button
            onClick={() => setMyListType("languages")}
            className={`pad-x-40 text2 transition-all duration-300  ${
              myListType === "languages" ? "bg-[#8530C1]" : "bg-[#EBFFE8]"
            }  flex py-2 px-8 gap-4 rounded-full items-center justify-center`}
          >
            <BsCameraVideo
              size={25}
              className={" mx-auto "}
              color={myListType === "languages" ? "white" : "#2BB457"}
            />
            <span
              className={`
                ${myListType === "languages" ? "text-white" : "text-[#2BB457]"}
              `}
            >
              African Languages
            </span>
          </button>
        </div>

        <div className="text3 flex mr-14  flex-col ">
          <p className="text-end">Sort By :</p>
          <Menu shadow="md" width={150}>
            <Menu.Target>
              <div className="flex gap-2">
                <p>Recently Added</p>
                <IoIosArrowDown size={25} color="#8530C1" />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Title (A - Z)</Menu.Item>
              <Menu.Item>Recently Added</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
