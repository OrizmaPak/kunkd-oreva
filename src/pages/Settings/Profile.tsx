import Button from "@/components/Button";
import SamOwen from "@/assets/Male14.svg";
import EditPencil from "@/assets/editPencil.svg";
import Starr from "@/assets/starr.svg";

const data = {
  image: SamOwen,
  name: "Samuel Owen",
  email: "samuelowen@gmail.com",
  phone: "+1442023052906",
  country: "United Kingdom",
  city: "Leeds East london",
};

const Profile = () => {
  return (
    <div className="px-20 ">
      <h1 className="text-[25px] font-bold">Profile</h1>

      <Card {...data} />
      <PersonalInfomation {...data} />
    </div>
  );
};

export default Profile;

const Card = ({
  image,
  email,
  onclick,
  name,
}: {
  image?: string;
  name?: string;
  email?: string;
  onclick?: () => void;
}) => {
  return (
    <div className="flex justify-between p-6 border border-[#8530C1]  rounded-3xl">
      <div className="flex justify-center items-center gap-14">
        <img src={image} alt="image" />
        <p>
          <p className="font-bold text-[35px] font-Recoleta">{name}</p>
          <p className="text-[#B5B5C3]">{email}</p>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Button size="md">
          <p className="flex justify-center items-center gap-2">
            <img src={Starr} alt="starr" />
            <span>Upgrade Plan</span>
          </p>
        </Button>
      </div>
    </div>
  );
};

const PersonalInfomation = ({
  name,
  phone,
  email,
  country,
  city,
}: {
  name?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: string;
}) => {
  return (
    <div className="p-6 border border-[#8530C1]  rounded-3xl mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-[25px]">Personal Information</h1>
        <Button size="sm" varient="outlined">
          <p className="gap-4 flex">
            <img src={EditPencil} alt="pencil" />{" "}
            <span className="text-[#8530C1]">Edit</span>
          </p>
        </Button>
      </div>
      <div className="grid grid-cols-[1fr_1fr_400px] my-1 text-[#B5B5C3]">
        <span>Name</span>
        <span>Phone</span>
        <span>Email</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_400px] mb-4">
        <span>{name}</span>
        <span>{phone}</span>
        <span>{email}</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_400px] text-[#B5B5C3]">
        <span>Country</span>
        <span>City/Sate</span>
        <span></span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_400px]">
        <span>{country}</span>
        <span>{city}</span>
        <span></span>
      </div>
    </div>
  );
};
