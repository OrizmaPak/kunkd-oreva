import { Progress } from "@chakra-ui/react";

type Props = {
  image?: string;
  range?: number;
};

const CardNdRange = ({ range, image }: Props) => {
  return (
    <div className="w-[200px]">
      <span>
        <img src={image} alt="image" className="" />
      </span>
      <p className="mt-[10px] font-bold font-Hanken flex justify-between items-center gap-4 px-4 ">
        <span>{range}%</span>
        <p className="rounded-3xl flex-1">
          <Progress
            value={range}
            size="sm"
            className="w-full h-full rounded-3xl"
          />

          {/* <Progress value={20} size="xs" colorScheme="pink" /> */}
        </p>
      </p>
    </div>
  );
};

export default CardNdRange;
