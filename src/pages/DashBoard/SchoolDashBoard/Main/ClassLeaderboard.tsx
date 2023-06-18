import DateRadio from "./Dwmy";
import Teacher1 from "@/assets/usericon.svg";
import Teacher2 from "@/assets/Male01.svg";
import Teacher3 from "@/assets/Female03.svg";
import { Pagination } from "@mantine/core";

const arrayOfTopTeacher = [
  {
    name: "Chul Lins",
    image: Teacher1,
    grade: "Grade 1",
  },
  {
    name: "Cora Zoni",
    image: Teacher2,
    grade: "Grade 2",
  },
  {
    name: "Gwen Ayo",
    image: Teacher3,
    grade: "Grade 3",
  },
  {
    name: "Fabiola  Davi",
    image: Teacher3,
    grade: "Grade 4",
  },
];

const ClassLeaderboard = () => {
  return (
    <div className="p-4 bg-white rounded-3xl mt-3">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold">Class Leaderboard</h1>
      </div>

      <div className="flex justify-between my-2 ">
        <span>Classes</span>
        <span>Teacher</span>
      </div>
      <hr className="my-3" />
      <div>
        {arrayOfTopTeacher.map((data) => {
          return <Row {...data} />;
        })}
      </div>
      <div className="flex  justify-end h-8">
        <Pagination
          total={4}
          size="sm"
          styles={() => ({
            control: {
              "&[data-active]": {
                backgroundColor: "#8530C1 !important",
              },
            },
          })}
        />
      </div>
    </div>
  );
};

export default ClassLeaderboard;

const Row = ({
  image,
  name,
  grade,
}: {
  image: string;
  name: string;
  grade: string;
}) => {
  return (
    <div className="flex justify-between items-center my-3">
      <span className="flex gap-2 items-center justify-center">
        <img src={image} alt="image" className="w-[30px]" />
        <span>{grade}</span>
      </span>
      <span>{name}</span>
    </div>
  );
};
