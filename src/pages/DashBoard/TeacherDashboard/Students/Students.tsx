import { useNavigate } from "react-router-dom";
import Studentss from "../../SchoolDashBoard/Students/Students";

const Students = () => {
  const navigate = useNavigate();
  return (
    // <div className=" rounded-3xl  bg-white">
    <Studentss />
    // </div>
  );
};

export default Students;
