import Grease from "@/assets/grease.svg";

const MyTeacher = () => {
  return (
    <div className="py-2 bg-white px-12 rounded-3xl flex-grow">
      <h1 className="font-bold text-[20px] mb-4">My Teacher</h1>
      <div className="flex gap-4">
        <p>
          <img src={Grease} alt="fgrase" className=" w-[120px]" />
        </p>
        <p className="flex flex-col">
          <p className="font-bold mb-3">Grease Kemma</p>
          <p>grease@pampers.school</p>
        </p>
      </div>
    </div>
  );
};

export default MyTeacher;
