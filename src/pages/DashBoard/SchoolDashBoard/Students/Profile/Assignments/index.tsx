import Header from "./Header";
import Chisom from "@/assets/Chisom.svg";
import Row from "./Row";

const data = [
  {
    title: "Chisom's Book Quis",
    image: Chisom,
    duration: "30 mins",
    range: 90,
    date: "3rd June",
  },
  {
    title: "Chisom's Book Quis",
    image: Chisom,
    duration: "30 mins",
    range: 50,
    date: "3rd June",
  },
];

const index = () => {
  return (
    <div className="mt-5 bg-white rounded-3xl mx-4">
      <Header />
      {data.map((data, index) => {
        return <Row key={index} {...data} />;
      })}
    </div>
  );
};

export default index;
