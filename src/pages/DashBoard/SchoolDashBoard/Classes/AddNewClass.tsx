import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
const AddNewClass = () => {
  return (
    <div className="px-10">
      <h1 className="text-center font-Recoleta text-[30px]">Add new class</h1>
      <div>
        <form action="">
          <p className="my-5  mb-8">
            <label htmlFor="classname">Class name</label>
            <InputFormat type="text" placeholder="Enter classs name" />
          </p>
          <p className="my-5 mb-8">
            <label htmlFor="assignteacher">Assign teacher</label>
            <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                className="w-full  h-full flex-1  focus:outline-none"
              >
                <option value="teacherone">Select teacher</option>
                <option value="teacherone">Teacher one</option>
                <option value="teachertwo">Teacher two</option>
                <option value="teacherthree">Teacher three</option>
              </select>
            </p>
          </p>
          <p className="my-5">
            <Button>Done</Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddNewClass;

<p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
  <select
    name=""
    id=""
    placeholder="Select gender"
    className="w-full  h-full flex-1  focus:outline-none"
  ></select>
</p>;
