import Grease from "@/assets/grease.svg";

const MyTeacher = () => {
  return (
    <div className="py-2 bg-white px-3 rounded-3xl flex-grow">
      <h1 className="font-bold text-[20px] mb-4">My Teacher</h1>
      <div className="flex  justify-between items-center mt-10 ">
        <img
          loading="lazy"
          src={Grease}
          alt="fgrase"
          className="w-[70px]  rounded-full"
        />

        <p className="flex flex-col ">
          <p className="font-bold mb-3">Grease Kemma</p>
          <p>grease@pampers.school</p>
        </p>
      </div>
    </div>
  );
};

export default MyTeacher;
