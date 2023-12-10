import { TSchoolStudentStat } from ".";

const TopSubCategories = ({schoolStudentStat}:{schoolStudentStat:TSchoolStudentStat}) => {
  return (
    <div className=" py-4 bg-white rounded-3xl px-6 flex-grow">
      <h1 className="font-bold text-[20px] mb-2">Top Interest</h1>
      <div className="flex  flex-col">
      {/* <p className="mt-4 font-bold ">Oops!!! No data😤 </p> */}
      {schoolStudentStat?.top_interest_contents && schoolStudentStat?.top_interest_contents?.length === 0 && <p className="mt-4 font-bold "> Oops!!! No data😤 </p>}

       {
        schoolStudentStat?.top_interest_contents?.slice(0,4).map((data, index)=> <p key={index}>{data?.name}</p>)
       }
      </div>
    </div>
  );
};

export default TopSubCategories;
