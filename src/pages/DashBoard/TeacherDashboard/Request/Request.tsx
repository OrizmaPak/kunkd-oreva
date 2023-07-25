import Chiks from "@/assets/chiks.svg";
import Jessica from "@/assets/jessica.svg";
import Grease from "@/assets/grease.svg";
import Blxst from "@/assets/Blxst.svg";
// import Godwin from "@/assets/godwin.svg";
// import Mitchel from "@/assets/godwin.svg";
// import Pemela from "@/assets/pamela.svg";
// import Spa from "@/assets/spa.svg";
import Bella from "@/assets/bella.svg";

type resquestT = {
  image: string;
  name: string;
  request: string;
};

const Request = () => {
  const requestArray = [
    {
      image: Chiks,
      name: "Pemela Azunda",
      request: " is requesting for her child to join your class",
    },
    {
      image: Jessica,
      name: "Mitchel Obi",
      request: "is requesting for her child to join your class.",
    },
    {
      image: Grease,
      name: "Jessica Deji",
      request: " is requesting for her child to join your class.",
    },
    {
      image: Blxst,
      name: "Kim Maybe",
      request: "  is requesting for her child to join your class.",
    },
    {
      image: Bella,
      name: "BellaMaybe",
      request: "  is requesting for her child to join your class.",
    },
  ];

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <div className=" flex-grow flex flex-col rounded-3xl p-4 bg-white">
        <div className="flex  justify-between items-center w-full px-8 ">
          <div>
            <h1 className="text-[24px] font-semibold">Request (35)</h1>
          </div>
          <div className="flex gap-8 font-semibold">
            <span className="text-[16px] text-[#8530C1]">Pending</span>
            <span className="text-[16px] text-[#B5B5C3]">Accepted</span>
          </div>
        </div>
        <div>
          {requestArray.map((res: resquestT, index) => (
            <Row key={index} {...res} />
          ))}
        </div>
      </div>
      <style>
        {`
       ::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
        `}
      </style>
    </div>
  );
};

export default Request;

const Row = ({
  image,
  request,
  time,
  name,
}: {
  image: string;
  request: string;
  time?: string;
  name: string;
}) => {
  return (
    <div className="grid grid-cols-[1fr_200px] my-2">
      <div className="flex">
        <p>
          <img src={image} alt="image" />
        </p>
        <p>
          <span>
            <span className="text-[#8530C1]">{name}</span>
            {request}
          </span>
          <span>{time}</span>
        </p>
      </div>

      <div>
        <button className="p-[15px] text-[16px] rounded-3xl text-[#E2B6FF]">
          Decline
        </button>
        <button className="p-[15px] text-[16px] rounded-3xl text-[#8530C1]">
          Accept
        </button>
      </div>
    </div>
  );
};
