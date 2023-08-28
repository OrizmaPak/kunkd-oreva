import { STEP_1, STEP_2, STEP_3 } from "@/utils/constants";

const ProgressAction = ({
  active,
  onClick,
}: {
  active: number;
  onClick: (val: number) => void;
}) => {
  return (
    <div className="rounded-full w-[85%] flex   mx-auto   bg-[#F9F9F9]  my-16">
      <button
        onClick={() => {
          onClick(STEP_1), console.log(active);
        }}
        className={` transition-all duration-300 ${
          active === STEP_1 ? "bg-[#8530C1] text-white " : ""
        } flex-grow p-4 rounded-full`}
      >
        All
      </button>
      <button
        onClick={() => {
          onClick(STEP_2), console.log(active);
        }}
        className={`transition-all duration-300 ${
          active === STEP_2 ? "bg-[#8530C1]  text-white " : ""
        } flex-grow p-4 rounded-full`}
      >
        Ongoing
      </button>
      <button
        onClick={() => onClick(STEP_3)}
        className={` transition-all duration-300 ${
          active === STEP_3 ? "bg-[#8530C1]  text-white " : ""
        } flex-grow p-4 rounded-full`}
      >
        Completed
      </button>
    </div>
  );
};

export default ProgressAction;
