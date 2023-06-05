import { DataType } from "../User/NewlyRegisterUser/NewlyRegisteredUser";
import Card from "../../common/User/Card";
type Props = {
  data: DataType[];
};
const DataList = ({ data }: Props) => {
  return (
    <div className="px-14 my-4">
      <div className="grid grid-cols-5  p-5 gap-10">
        {data.map((data, index) => {
          return <Card key={index} image={data.image} size={250} />;
        })}
      </div>
    </div>
  );
};

export default DataList;
