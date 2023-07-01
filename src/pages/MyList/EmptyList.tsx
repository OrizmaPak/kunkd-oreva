import EmptyIcon from "@/assets/emptylist.svg";

const EmptyList = () => {
  return (
    <div>
      <hr className=" mx-24 my-14" />

      <div className="flex justify-center items-center pb-10">
        <div>
          <span>
            <img
              loading="lazy"
              src={EmptyIcon}
              alt="Empty"
              className="w-[70%]"
            />
          </span>
          <h1 className="font-bold font-Recoleta text-[30px]  text-center my-8">
            Your List is Empty
          </h1>
          <p className=" text-[#7E7E89] text center">
            It seems that you haven't added any stories to the list
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
