import Stat from "@/pages/Home/Stat";
import AfricanHistoryContent from "./AfricanHistoryContent";
type Props = {
  data: {
    image?: string;
    title?: string;
    price?: string;
    size?: string;
    addToCart?: () => void;
  }[];
};
const AfricanHsitory = ({ data }: Props) => {
  return (
    <div>
      <Stat>
        <AfricanHistoryContent data={data} />
      </Stat>
    </div>
  );
};

export default AfricanHsitory;
