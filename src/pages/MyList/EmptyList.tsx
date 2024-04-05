import EmptyIcon from "@/assets/emptylist.svg";

const EmptyList = () => {
  return (
    <div>
      <hr className=" mx-24 my-8" />

      <div className="flex justify-center items-center  pb-6">
        <div className="">
          <div className="px-4  flex justify-center items-center ">
            <img
              loading="lazy"
              src={EmptyIcon}
              alt="Empty"
              className="w-[200px]"
            />
          </div>
          <h1 className="font-bold font-Recoleta text30  text-center my-5">
            Your List is Empty
          </h1>
          <p className=" text-[#7E7E89]  text2">
            It seems that you haven't added any stories to the list
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
