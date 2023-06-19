import { useNavigate } from "react-router-dom";
import Studentss from "../../SchoolDashBoard/Students/Students";

const Students = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full  rounded-3xl p-4 bg-white">
      <Studentss />
    </div>
  );
};

export default Students;
