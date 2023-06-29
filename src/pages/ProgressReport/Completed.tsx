import { data } from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import ProgressCard from "./ProgressCard";

const data2 = data.map((el) => ({ ...el, isCompleted: true }));
const Completed = () => {
  return (
    <div>
      <div className="p-8 grid grid-cols-3 gap-4 gap-x-14">
        {data2 &&
          data2.slice(7).map((data, index) => {
            return <ProgressCard key={index} {...data} />;
          })}
      </div>
    </div>
  );
};

export default Completed;
