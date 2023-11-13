// import DeleteIcon from "@/assets/deleteicon.svg";
// import ArrowDown from "@/assets/arrowdown.svg";
import Button from "@/components/Button";

import { useGetTeacherList } from "@/api/queries";
import { TTeacherList } from "../Teachers/Teachers";

const EditClassTeachers = ({ editClose }: { editClose: () => void }) => {
  const { data } = useGetTeacherList();
  const teacherList = data?.data.data.records;
  console.log("HI", teacherList );

  return (
    <div className="px-10">
      <div>
        <form>
          <div>
            {/* <label htmlFor="assigntoclass"> Edit Class Teachers</label> */}
            <p className="border border-[#F3DAFF] py-3 mb-12 mt-10 px-8 rounded-full flex items-center gap-2   ">
              <select
                name="classid"
                id="classid"
                className="w-full  h-full flex-1  focus:outline-none"
              >
                <option value="">Select Teacher</option>
                {teacherList
                  ?.filter((data: TTeacherList) => data.class?.class_name === "" )
                  .map((data: TTeacherList) => (
                    <option value={data?.user?.id}>{data?.user.firstname } {data?.user?.lastname}</option>
                  ))}
                {/* <option value="classA">Class A</option>
                <option value="classB">Class B</option> */}
              </select>
            </p>
          </div>
          <p className="my-5">
            <Button onClick={editClose}>Assign</Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EditClassTeachers;
