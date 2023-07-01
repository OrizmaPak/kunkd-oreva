import Visa from "@/assets/visa.svg";
import Cancel from "@/assets/Cancel.svg";
import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { FormEvent } from "react";

const MakePaymentContent = ({ onSubmit }: { onSubmit: () => void }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    console.log("matthew");
    // Form submission logic here
  };

  return (
    <div className="w-[100%] max-w-[500px] mx-auto relative  h-full flex">
      <Link to="/">
        <span className="absolute right-[-150px] top-[40px]">
          <img loading="lazy" src={Cancel} alt="cancel" />
        </span>
      </Link>
      <div className="w-[100%]  my-auto ">
        <span></span>
        <h1 className="font-bold text-[40px] font-Reloc  font-Recoleta">
          Make payment
        </h1>
        <p className="text-[15px] text-[#A7A7A7] font-Hanken">
          Kindly complete your payment using a valid credit card.
        </p>
        <form onSubmit={handleSubmit}>
          <p className="text-[15px] text-[#A7A7A7] my-4">
            <span>Card number</span>
            <InputFormat
              type="number"
              placeholder="54737 347373 34774"
              leftIcon={<img loading="lazy" src={Visa} alt=" visa icon" />}
            />
          </p>
          <div className="flex justify-between">
            <p className="text-[15px] text-[#A7A7A7] my-4">
              <span>Expiry</span>
              <InputFormat type="date" placeholder="12 / 28" />
            </p>

            <p className="text-[15px] text-[#A7A7A7] my-4">
              <span>CVC</span>
              <InputFormat type="number" placeholder="* * *" />
            </p>
          </div>
          <p className="mt-10">
            <Button type="submit" size="full">
              Pay now
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default MakePaymentContent;
