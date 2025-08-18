import Button from "@/components/Button";
import InputFormat from "@/common/InputFormat";
import EmailIcon from "@/assets/emaillogo.svg";

const AddStudentForm = ({ handleContinue }: { handleContinue: () => void }) => {
  return (
    <div className="p-4">
      <div>
        <h1 className="font-bold  font-Recoleta text-center mb-8">
          Add New Student
        </h1>
      </div>
      <form>
        <div className="flex gap-2 mb-2">
          <div className="flex-grow">
            <label htmlFor="firstname">Enter first Name</label>
            <InputFormat placeholder="First name" type="text" />
          </div>
          <div className="flex-grow">
            <label htmlFor="lastname">Enter Last name</label>
            <InputFormat placeholder="Last name" type="text" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email">Enter Email Address</label>
          <InputFormat
            type="email"
            placeholder="Email"
            leftIcon={<img loading="lazy" src={EmailIcon} alt="icon" />}
          />
        </div>
        <div className=" mb-4">
          <label htmlFor="email">Assign Unique code</label>
          <InputFormat
            type="number"
            placeholder="Unique code"
            leftIcon={<img loading="lazy" src={EmailIcon} alt="icon" />}
          />
        </div>

        <div className="flex gap-2 mb-2">
          <div className="flex-grow">
            <label htmlFor="class">Assign to a class</label>
            <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                // placeholder="Select class"
                className="w-full  h-full flex-1  focus:outline-none"
              ></select>
            </p>
          </div>
          <div className="flex-grow">
            <label htmlFor="class">Select gender</label>
            <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
              <select
                name=""
                id=""
                // placeholder="Select gender"
                className="w-full  h-full flex-1  focus:outline-none"
              ></select>
            </p>
          </div>
        </div>
        <div className="max-w-[60%] mx-auto my-4">
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
