import { Progress } from "@mantine/core";

type Props = {
  image?: string;
  range?: number;
};

const CardNdRange = ({ range, image }: Props) => {
  return (
    <div className="w-[200px]">
      <span>
        <img loading="lazy" src={image} alt="image" className="" />
      </span>
      <p className="mt-[10px] font-bold font-Hanken flex justify-between items-center gap-4 px-4 ">
        <span>{range}%</span>
        <p className="rounded-3xl flex-1 bg-red-500">
          {range && range < 20 ? (
            <Progress value={range} color="red" />
          ) : range && range < 50 ? (
            <Progress value={range} color="yellow" />
          ) : (
            <Progress value={range} color="green" />
          )}

          {/* <Progress value={20} size="xs" colorScheme="pink" /> */}
        </p>
      </p>
    </div>
  );
};

export default CardNdRange;
