import DeleteIcon from "@/assets/deleteicon.svg";
import ArrowDown from "@/assets/arrowdown.svg";
import Button from "@/components/Button";

const EditClassTeachers = ({
  image1,
  image2,
  name1,
  name2,
}: {
  image1?: string;
  image2?: string;
  name1?: string;
  name2?: string;
}) => {
  return (
    <div className="px-10">
      <h1 className="text-center font-bold font-Recoleta text-[25px]">
        Edit Class Teachers
      </h1>
      <div>
        <div>
          <p className="flex  justify-between my-8 ">
            <p className="flex  justify-center items-center">
              <img loading="lazy" src={DeleteIcon} alt="deleteIcon" />
              <p className="flex justify-center items-center ml-5 gap-2">
                <img loading="lazy" src={image1} alt="image1" />
                <span>{name1}</span>
              </p>
            </p>
            <img loading="lazy" src={ArrowDown} alt="arrowdown" />
          </p>
          {name2 && (
            <p className="flex  justify-between  my-8">
              <p className="flex  justify-center items-center">
                <img loading="lazy" src={DeleteIcon} alt="deleteIcon" />
                <p className="flex justify-center items-center ml-5 gap-2">
                  <img loading="lazy" src={image2} alt="image1" />
                  <span>{name2}</span>
                </p>
              </p>
              <img loading="lazy" src={ArrowDown} alt="arrowdown" />
            </p>
          )}
        </div>
      </div>
      <p className=" my-10">
        <Button>Save</Button>
      </p>
    </div>
  );
};

export default EditClassTeachers;
