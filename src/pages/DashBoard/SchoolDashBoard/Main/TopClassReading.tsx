import DateRadio from "./Dwmy";
import Teacher1 from "@/assets/usericon.svg";
import Teacher2 from "@/assets/Male01.svg";
import Teacher3 from "@/assets/Female03.svg";

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
    grade: "Grade 1",
  },
];

const TopClassReading = () => {
  return (
    <div className="p-4 bg-white rounded-3xl mt-3">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold">Top Class Reading</h1>
        <div>
          <DateRadio
            onChange={(value: string) => {
              console.log(value);
            }}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <span>Classes</span>
        <span>Teacher</span>
      </div>
      <hr className="my-3" />
      <div>
        {arrayOfTopTeacher.map((data) => {
          return <Row {...data} />;
        })}
      </div>
    </div>
  );
};

export default TopClassReading;

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
    <div className="flex justify-between items-center my-2">
      <span className="flex gap-2 items-center justify-center">
        <img src={image} alt="image" className="w-[30px]" />
        <span>{grade}</span>
      </span>
      <span>{name}</span>
    </div>
  );
};
