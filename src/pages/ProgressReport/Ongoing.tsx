import { data } from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import ProgressCard from "./ProgressCard";

const Ongoing = () => {
  return (
    <div>
      <div className="p-8 grid grid-cols-3 gap-4 gap-x-14">
        {data &&
          data.slice(5).map((data, index) => {
            return <ProgressCard key={index} {...data} />;
          })}
      </div>
    </div>
  );
};

export default Ongoing;
