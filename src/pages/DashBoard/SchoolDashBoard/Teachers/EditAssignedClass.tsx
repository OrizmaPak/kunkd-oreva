import Button from "@/components/Button";
import React from "react";

const EditAssignedClass = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="px-20">
      <h1 className="fon-bold text-center font-Recoleta text-[30px] my-10">
        Edit Assigned Class
      </h1>
      <div>
        <form>
          <div>
            <label htmlFor="assigntoclass">Assign to a class</label>
            <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                className="w-full  h-full flex-1  focus:outline-none"
              >
                <option value="classA">Class A</option>
                <option value="classB">Class B</option>
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
