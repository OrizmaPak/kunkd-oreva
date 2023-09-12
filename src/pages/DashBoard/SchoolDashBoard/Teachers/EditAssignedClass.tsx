import Button from "@/components/Button";
import { useGetClassList } from "@/api/queries";
import { TClassList } from "../Classes/Classes";

const EditAssignedClass = ({ onClose }: { onClose: () => void }) => {
  const { data } = useGetClassList();
  const classList = data?.data.data.records;
  return (
    <div className="px-10 mt-12">
      <div>
        <form>
          <div>
            <label htmlFor="assigntoclass">Assign to a class</label>
            <p className="border border-[#F3DAFF] py-3 mb-10 px-8 rounded-full flex items-center gap-2 mt-2   ">
              <select
                name="classid"
                id="classid"
                className="w-full  h-full flex-1  focus:outline-none"
              >
                <option value="">Select Class</option>
                {classList
                  ?.filter((data: TClassList) => data.teacher_count === 0)
                  .map((data: TClassList) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
              </select>
            </p>
          </div>
          <p className="my-5">
            <Button onClick={onClose}>Assign</Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EditAssignedClass;
