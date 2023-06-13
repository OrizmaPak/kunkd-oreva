import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import PlusIcon from "@/assets/plusIcon2.svg";

const Notification = () => {
  return (
    <div className="px-20">
      <h1 className="text-[25px] font-bold">Subscription Plan</h1>
      <form>
        <div className="grid grid-cols-[400px_1fr] mt-4">
          <div>
            <p>Card Details</p>
          </div>
          <div>
            <div className="grid grid-cols-[1fr_250px] gap-4">
              <p>
                <span>Name on card</span>
                <InputFormat type="text" placeholder="Name" />
              </p>
              <p>
                <span>Expiry</span>
                <InputFormat type="date" placeholder="2 / 3" />
              </p>
            </div>
            <div className="grid grid-cols-[1fr_250px] gap-4">
              <p>
                <span>Card Number</span>
                <InputFormat type="number" placeholder="5456 34322 4542" />
              </p>
              <p>
                <span>CVC</span>
                <InputFormat type="number" placeholder="* * *" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 my-8">
          <span className="flex gap-2">
            <img src={PlusIcon} alt="plusIcon" /> See avalaible plan
          </span>
          <hr className="flex-grow" />
        </div>

        <div className="grid grid-cols-3 gap-4 my-8">
          <p className="flex flex-col">
            <span>Email Address</span>
            <span className="text-[#B5B5C3]">
              Invoice will be sent to this email address
            </span>
          </p>
          <span></span>
          <span>
            <InputFormat type="email" placeholder="email" />
          </span>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-[150px_1fr_1fr] gap-8 my-6 items-center">
          <p className="flex flex-col">
            <span>Street Address</span>
          </p>

          <span>
            <hr className="mr-16" />
          </span>
          <span>
            <InputFormat type="text" placeholder="10 Kunda steet" />
          </span>
        </div>
        <div className="grid grid-cols-[150px_1fr_1fr] gap-8 my-6 items-center">
          <p className="flex flex-col">
            <span>City/State</span>
          </p>

          <span>
            <hr className="mr-16" />
          </span>
          <span>
            <InputFormat type="text" placeholder="10 Kunda steet" />
          </span>
        </div>

        <div className="grid grid-cols-[150px_1fr_1fr] gap-8 my-6 items-center">
          <p className="flex flex-col">
            <span>Country</span>
          </p>

          <span>
            <hr className="mr-16" />
          </span>
          <span>
            <select
              name="country"
              id=""
              placeholder="Select a country"
              className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 w-full"
            ></select>
          </span>
        </div>

        <p className="flex justify-center items-center  px-48">
          <Button>Save</Button>
        </p>
      </form>
    </div>
  );
};

export default Notification;
