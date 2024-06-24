import Medal from "@/assets/Medal.png";
import Button from "@/components/Button";

const JoinChanllengeModal = ({ close }: { close: () => void }) => {
  return (
    <div className="p-3">
      <div className="flex justify-center items-center">
        <img src={Medal} alt="image" className="w-[100px] h-[100px]" />
      </div>
      <p className="text25 text-center font-medium ">
        Ready to Join the Summer Reading Challenge?
      </p>
      <div className="flex flex-col gap-5 mt-8">
        <Button onClick={close}>Yes</Button>
        <Button varient="outlined" onClick={close}>
          <strong className=" text-[#8530C1]">No</strong>
        </Button>
      </div>
    </div>
  );
};

export default JoinChanllengeModal;
