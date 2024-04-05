import DateRadio from "@/pages/DashBoard/SchoolDashBoard/Main/Dwmy";
import Teacher1 from "@/assets/usericon.svg";
import Teacher2 from "@/assets/Male01.svg";
import Teacher3 from "@/assets/Female03.svg";

const arrayOfTopTeacher = [
  {
    name: "Chul Lins",
    image: Teacher1,
  },
  {
    name: "Cora Zoni",
    image: Teacher2,
  },
  {
    name: "Gwen Ayo",
    image: Teacher3,
  },
];

const MyStudents = () => {
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

      <hr className="my-3" />
      <div>
        {arrayOfTopTeacher.map((data) => {
          return <Row {...data} />;
        })}
      </div>
    </div>
  );
};

export default MyStudents;

const Row = ({
  image,
  name,
  grade,
}: {
  image?: string;
  name?: string;
  grade?: string;
}) => {
  return (
    <div className="flex justify-start gap-4 items-center my-2">
      <span className="flex gap-2 items-center justify-center">
        <img loading="lazy" src={image} alt="image" className="w-[50px]" />
        <span>{grade}</span>
      </span>
      <span>{name}</span>
    </div>
  );
};
