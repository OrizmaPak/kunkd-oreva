// import DeleteIcon from "@/assets/deleteicon.svg";
// import ArrowDown from "@/assets/arrowdown.svg";
import Button from "@/components/Button";

import { useGetTeacherList } from "@/api/queries";
import { TClassList } from "../Classes/Classes";
import { TTeacherList } from "../Teachers/Teachers";

const EditClassTeachers = ({ editClose }: { editClose: () => void }) => {
  const { data } = useGetTeacherList();
  const teacherList = data?.data.data.records;
  // console.log("HI", classList);

  return (
    <div className="px-10">
      {/* <h1 className="text-center font-bold font-Recoleta text-[25px]">
        Edit Class Teachers
      </h1> */}
      {/* <div>
      <div>
        <div>
          <p className="flex  justify-between my-8 ">
            <p className="flex  justify-center items-center">
              <img loading="lazy" src={DeleteIcon} alt="deleteIcon" />
              <p className="flex justify-center items-center ml-5 gap-2">
                <img loading="lazy" src={image1} alt="image1" />
                <span>{name1}</span>
              </p>
            </p>
            <img loading="lazy" src={ArrowDown} alt="arrowdown" />
          </p>
          {name2 && (
            <p className="flex  justify-between  my-8">
              <p className="flex  justify-center items-center">
                <img loading="lazy" src={DeleteIcon} alt="deleteIcon" />
                <p className="flex justify-center items-center ml-5 gap-2">
                  <img loading="lazy" src={image2} alt="image1" />
                  <span>{name2}</span>
                </p>
              </p>
              <img loading="lazy" src={ArrowDown} alt="arrowdown" />
            </p>
          )}
        </div>
      </div>
      <p className=" my-10">
        <Button>Save</Button>
      </p>
      </div> */}

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
                <option value="">Select Class</option>
                {teacherList
                  ?.filter((data: TTeacherList) => data.class === undefined)
                  .map((data: TClassList) => (
                    <option value={data.id}>{data.name}</option>
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
