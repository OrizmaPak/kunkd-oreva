import { CiSearch } from "react-icons/ci";
import { CgSortAz } from "react-icons/cg";
import { Menu } from "@mantine/core";
const RequestSearch = () => {
  return (
    <div className="flex justify-end items-center gap-5  px-8">
      <div className="flex items-center justify-between relative border-[2px] border-gray-300 rounded-lg ">
        <p className="absolute left-3">
          <CiSearch size={30} color="#667185" />
        </p>
        <input
          type="text"
          name=""
          id=""
          className="w-[400px] h-full  p-3 px-5 pl-14 rounded-lg outline-none"
        />
      </div>
      <Menu width={200} shadow="md">
        <Menu.Target>
          <div className="flex items-center gap-2 border border-gray-300 rounded-[8px]  p-[6px] cursor-pointer">
            <CgSortAz size={35} />
            <p>Sort By</p>
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Active</Menu.Item>
          <Menu.Item>Inactive</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default RequestSearch;
