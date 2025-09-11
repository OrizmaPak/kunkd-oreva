import { useGetTeacherList } from "@/api/queries";
// import ArrowDown from "@/assets/arrowdown.svg";
// import { STEP_1, STEP_3 } from "@/utils/constants";
import { Modal, Pagination, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
// import EditClassTeacher from "./EditTeacher";
import NewTeacher from "./NewTeacher";
// import Profile from "./Profile";
import Row from "./Row";
import SchoolNotificationModal from "@/components/SchoolNotificationModal";
import SearchFilter from "../SearchFilter";
import EmptyState from "@/assets/connectionEmpty.png";

export type DashBoardDataType = {
  noOfTeacher: number;
  noOfStudents: number;
  classCode: string;
  classs: string;
  id: number;
  name: string;
  email: string;
  gender: string;
  image: string;
};

export type TTeacherList = {
  user: {
    class_id: number;
    class_name: string;
    email: string;
    firstname: string;
    gender: string;
    id: number;
    image: string;
    lastname: string;
    status_name: string;
  };
};

const Teachers = () => {
  const [status, setStatus] = useState("active");
  const [activePage, setPage] = useState(1);

  const { data, isLoading, refetch } = useGetTeacherList(
    status,
    activePage?.toString()
  );

  const [searchValue, setSearchValue] = useState("");

  const teacherList: TTeacherList[] = data?.data?.data?.records || [];
  const totalPage = data?.data?.data?.number_pages || 1;

  const [
    openedSchNotifications,
    { open: openSchNotifications, close: closeSchNotifications },
  ] = useDisclosure(false);

  // ✅ Client-side filter: matches "firstname lastname" OR "class_name"
  const filteredTeachers = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return teacherList;

    return teacherList.filter((t) => {
      const fn = t?.user?.firstname || "";
      const ln = t?.user?.lastname || "";
      const fullName = `${fn} ${ln}`.toLowerCase();
      const cls = (t?.user?.class_name || "").toLowerCase();

      return fullName.includes(q) || cls.includes(q);
    });
  }, [teacherList, searchValue]);

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <Modal
        radius={10}
        size="md"
        opened={openedSchNotifications}
        onClose={closeSchNotifications}
        closeButtonProps={{ size: "lg" }}
        centered
      >
        <SchoolNotificationModal
          onCancel={closeSchNotifications}
          label="teachers"
        />
      </Modal>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[25px]  font-Inter">
          Teachers
          <span className="text-[#667185] bg-[#C2DBB0] rounded-2xl p-2 ml-5">
            {teacherList?.length || 0}
          </span>
        </h1>
        <div className="flex gap-3 justify-end">
          <NewTeacher openSchNotifications={openSchNotifications} />
        </div>
      </div>

      <div className=" flex-grow flex flex-col rounded-3xl py-4 bg-white border-[2px] border-[#E4E7EC]">
        <div>
          {/* 🔧 Pass the setter, not the value */}
          <SearchFilter
            setSearchValue={setSearchValue}
            setFilterValue={setStatus}
            filterValue={status}
          />
        </div>

        <div>
          <div className="grid  grid-cols-[1fr_1fr_200px_200px_200px] mt-5  px-8 text-[#101928]  font-semibold py-4 border-b-2 bg-[#F9FAFB] border-[#E4E7EC]">
            <div>Name</div>
            <div className="">Email</div>
            <div>Class</div>
            <div>Last Active</div>
            <div className="flex justify-end   items-center">
              <span></span>{" "}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          {isLoading ? (
            new Array(10).fill(1).map((_, index) => (
              <Skeleton key={index} height={60} my={10} visible={true}>
                <h1 className="w-full"></h1>
              </Skeleton>
            ))
          ) : filteredTeachers.length > 0 ? (
            filteredTeachers.map((item: TTeacherList, index: number) => (
              <Row
                status={item?.user?.status_name}
                currentClicked={item?.user?.id}
                onClick={() => {
                  // NOTE: you previously called `open()` here, but the disclosure is commented out.
                  // Leave as-is to avoid changing behavior. Uncomment your disclosure if you want a modal.
                  // open();
                }}
                key={index}
                data={item}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full mt-24 flex-col">
              <img
                src={EmptyState}
                alt="No teachers"
                className="w-[150px] h-[150px] object-contain"
              />
              <p className="font-Inter text-[18px]">No teachers found</p>
              <p className="font-Baloo text-[14px]">
                Try another name or class.
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex  justify-end mt-2 px-4">
          {totalPage > 1 && (
            <div className="px-10  mr-2 flex justify-end  pb-8">
              <Pagination
                total={totalPage}
                value={activePage}
                onChange={setPage}
                onClick={() => {
                  refetch();
                }}
                styles={() => ({
                  control: {
                    "&[data-active]": {
                      backgroundColor: "#8530C1 !important",
                    },
                  },
                })}
              />
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          ::-webkit-scrollbar {
            width: 0;
            background: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default Teachers;
