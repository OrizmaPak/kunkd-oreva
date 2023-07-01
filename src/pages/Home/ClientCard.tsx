export type CardTypes = {
  image?: string;
  name?: string;
  location?: string;
  story?: string;
  title?: string;
  body?: string;
};
const ClientCard = ({ image, name, location, story }: CardTypes) => {
  return (
    <div className="w-[450px] h-[258px] p-7 rounded-xl  bg-[#FFFFFF] shadow-md ml-[20px] mb-8">
      <div className="flex items-center mb-6">
        <img
          loading="lazy"
          src={image}
          alt=""
          className="rounded-[50%] w-[100px] h-[100px]"
        />
        <span className="ml-4 flex flex-col">
          <span className="font-bold">{name}</span>
          <span>{location}</span>
        </span>
      </div>
      <div>
        <p>{story}</p>
      </div>
    </div>
  );
};

export default ClientCard;
