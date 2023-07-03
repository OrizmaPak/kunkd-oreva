import Button from "@/components/Button";
type Props = {
  image?: string;
  title?: string;
  body?: string;
};

const ShopCard = ({ image, title, body }: Props) => {
  return (
    <div className="  w-[900px] max-h-[305px] h-full  mx-auto relative mt-[100px]">
      <img
        loading="lazy"
        src={image}
        alt=""
        className=" w-[50%] top-[-55px] absolute  left-[-45px] z-50 "
      />
      <div className="  flex justify-between  bg-[#F3DAFF]  rounded-2xl h-[400px] w-[100%] ml-auto  mb-[100px] leading-12  ">
        <div className="basis-1/2">
          <span></span>
        </div>
        <div className="basis-1/2 pl-12 pr-4">
          <h1 className="pt-8 text-[40px] font-bold font-Secondary">{title}</h1>
          <p>{body}</p>
          <p className="mt-[40px]">
            <Button size="sm">Visit Website</Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
