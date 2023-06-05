import Teacher1 from "@/assets/usericon.svg";
import Teacher2 from "@/assets/Male01.svg";
import Teacher3 from "@/assets/Female03.svg";
import Teacher4 from "@/assets/male03.svg";

const data = [
  {
    name: "Chul Lins",
    image: Teacher1,
    id: "chuli@gmail.com",
    timeSpent: "2hr 31min",
  },
  {
    name: "Cora Zoni",
    image: Teacher2,
    id: "zoni@gmail.com",
    timeSpent: "1hr 41min",
  },
  {
    name: "Gwen Ayo",
    image: Teacher3,
    id: "gwuenayo@gmail.com",
    timeSpent: "4hr 3min",
  },
];

const ActiveTeacher = () => {
  return (
    <div className="p-4 bg-white rounded-3xl mt-8">
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold">Top Class Reading</h1>
      </div>

      <div className="grid grid-cols-3 mt-1">
        <span>Teache</span>
        <span>ID</span>
        <span>Time spent</span>
      </div>
      <hr className="my-2" />

      <div>
        {data &&
          data.map((data, index) => {
            return <Row key={index} {...data} />;
          })}
      </div>
    </div>
  );
};

export default ActiveTeacher;

const Row = ({
  image,
  name,
  id,
  timeSpent,
}: {
  image: string;
  name: string;
  id: string;
  timeSpent: string;
}) => {
  return (
    <div className="grid grid-cols-3 justify-between items-center mt-3">
      <span className="flex gap-2 items-center justify-start">
        <img src={image} alt="image" className="w-[30px]" />
        <span>{name}</span>
      </span>
      <span>{id}</span>
      <span>{timeSpent}</span>
    </div>
  );
};
