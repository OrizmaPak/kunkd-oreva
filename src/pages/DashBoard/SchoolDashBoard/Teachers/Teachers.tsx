import { useGetTeacherList } from "@/api/queries";
// import ArrowDown from "@/assets/arrowdown.svg";
// import { STEP_1, STEP_3 } from "@/utils/constants";
import { Modal, Pagination, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
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

  // const [status, setStatus] = useState("active");

  const teacherList: TTeacherList[] = data?.data.data.records;
  const totalPage = data?.data.data.number_pages;

  // const [opened, { open, close }] = useDisclosure(false);
  // const [modalStep, setModalStep] = useState(STEP_1);
  const [
    openedSchNotifications,
    { open: openSchNotifications, close: closeSchNotifications },
  ] = useDisclosure(false);

  // const [currentClicked, setCucrrentClicked] = useState(0);
  // const currentClickedProfile = teacherList?.find(
  //   (el) => el?.user?.id == currentClicked
  // );
  // const activeClassTeacher = teacherList?.filter(data=> data?.user?.class_name !== "")
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
          <SearchFilter setFilterValue={setStatus} filterValue={status} />
        </div>

        <div>
          <div className="grid  grid-cols-[1fr_1fr_200px_200px_200px] mt-5  px-8 text-[#101928]  font-semibold py-4 border-b-2 bg-[#F9FAFB] border-[#E4E7EC]">
            {/* <div className="flex justify-start items-center">
              <span className=" ">
                <img loading="lazy" src={Rectangle} alt="" />
              </span>
            </div> */}
            <div>Name</div>
            <div className="">Email</div>
            <div>Class</div>
            <div>Last Active</div>
            {/* <div>Gender</div> */}
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
          ) : teacherList?.length > 0 ? (
            teacherList.map((data: TTeacherList, index: number) => (
              <Row
                status={data?.user?.status_name}
                currentClicked={data?.user?.id}
                onClick={() => {
                  open();
                  // setCucrrentClicked(data?.user?.id);
                  // setModalStep(STEP_1);
                }}
                key={index}
                data={data}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full mt-24 flex-col">
              <img
                src={EmptyState}
                alt="No teachers"
                className="w-[150px] h-[150px] object-contain"
              />
              <p className="font-Inter text-[18px]">No teachers available</p>
              <p className="font-Baloo text-[14px]">
                Teachers will appear here once added.
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex  justify-end mt-2 px-4">
          {/* <span>
          Showing <span className="text-[#8530C1]"> 1-9 </span> from
          <span className="text-[#8530C1]"> {totalPage * 5} </span> data
        </span> */}
          {totalPage > 1 && (
            <div className="px-10  mr-2 flex justify-end  pb-8">
              <Pagination
                total={totalPage}
                value={activePage}
                defaultChecked={true}
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
