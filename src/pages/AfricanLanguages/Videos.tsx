import { useParams } from "react-router-dom";
import AfricanLanguagesNav from "./AfricanLanguagesNav";
import { africanLanguagesData } from "./AfricanLanguages";
import Card from "@/common/User/Card";

const Videos = () => {
  const { lan_type } = useParams();
  return (
    <div className="bg-[#fff7fd] ">
      <AfricanLanguagesNav category="Africanlanguages" lanType={lan_type} />

      <div className="mt-5 bg-white p-5 pt-20 rounded-3xl">
        <h1 className="text-[32px] font-semibold font-Recoleta text-center">
          Learn{" "}
          {lan_type && lan_type?.charAt(0).toUpperCase() + lan_type.slice(1)} -
          with videos created for you
        </h1>
        <p className="text-center text-[#B5B5C3] text-[18px] my-5">
          Learning a new language is so important...
        </p>
        <hr className="my-16 mx-20" />
        <div className="grid grid-cols-5 gap-5 px-20 mt-10">
          {africanLanguagesData.map((data, index) => (
            <Card key={index} clickable {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
