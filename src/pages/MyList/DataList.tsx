// import { DataType } from "../AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
// import Card from "../../common/User/Card";
import { TStoryContent } from "@/pages/Stories/Stories1/Stories1";
import CardHome from "@/common/User/CardHome";
import { useNavigate } from "react-router-dom";
import EmptyList from "./EmptyList";

const DataList = ({ data }: { data: TStoryContent[] }) => {
  const navigate = useNavigate();

  const userInLocalStr = localStorage.getItem("user");
  const user = JSON.parse(userInLocalStr!);
  console.log("user", user?.role);
  return (
    <div className="px-14 my-4 pb-10 ">
      {data && data.length < 1 && <EmptyList />}
      {data ? (
        data.length > 0 && (
          <div className="grid grid-cols-5  p-5 gap-10">
            {data?.map((data, index) => {
              if (data.category === "Stories") {
                return (
                  <CardHome
                    key={index}
                    {...data}
                    goTo={() => {
                      navigate(
                        `../${
                          user.role === "parent" ? "parent" : "school"
                        }/${data.category?.toLowerCase()}/sub/${data.slug
                          ?.toLocaleLowerCase()
                          .replace(/\s/g, "-")}`
                      );
                    }}
                  />
                );
              } else if (data.category === "Audiobooks") {
                return (
                  <CardHome
                    key={index}
                    {...data}
                    goTo={() => {
                      navigate(
                        `../${
                          user.role === "parent" ? "parent" : "school"
                        }/${data.category?.toLowerCase()}/${data.slug
                          ?.toLocaleLowerCase()
                          .replace(/\s/g, "-")}`
                      );
                    }}
                  />
                );
              } else if (data.category === "Languages") {
                return (
                  <CardHome
                    key={index}
                    {...data}
                    goTo={() =>
                      navigate(
                        `../${
                          user.role === "parent" ? "parent" : "school"
                        }/africanlanguages/${data.slug}/${data.name}`
                      )
                    }
                  />
                );
              }
            })}
          </div>
        )
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default DataList;
