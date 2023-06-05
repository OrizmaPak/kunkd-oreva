import NextIcon from "@/assets/nexticon.svg";

const StoriesNav = ({
  first,
  second,
  third,
}: {
  first: string;
  second: string;
  third: string;
}) => {
  return (
    <div className="py-4 rounded-full bg-white gap-8 flex px-8">
      <div className="flex gap-4  font-bold">
        <span>{first}</span>
        <img src={NextIcon} alt="nextIcon" />
      </div>
      <div className="flex gap-4  font-bold">
        <span>{second}</span>
        <img src={NextIcon} alt="nextIcon" />
      </div>
      <div className=" ">
        <span>{third}</span>
      </div>
    </div>
  );
};

export default StoriesNav;
