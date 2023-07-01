import InputFormat from "@/common/InputFormat";
import Button from "@/components/Button";
import PlusIcon from "@/assets/plusIcon2.svg";
import VisaIcon from "@/assets/visa.svg";
import Marked from "@/assets/colorMarked.svg";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { motion } from "framer-motion";

const Billing = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Modal
          radius={"xl"}
          size="lg"
          opened={opened}
          onClose={close}
          closeButtonProps={{ size: "lg" }}
          centered
        >
          <AddCard />
        </Modal>

        <div className="px-20">
          <h1 className="text-[25px] font-bold my-8">Billing</h1>
          <form>
            <div className="grid grid-cols-[400px_1fr] mt-4">
              <div>
                <p>Card Details</p>
              </div>

              <div>
                <div className="flex gap-8 border rounded-3xl p-4 border-[#8530C1] px-8">
                  <div>
                    <h1>
                      <img loading="lazy" src={VisaIcon} alt="visa" />
                    </h1>
                  </div>
                  <div className="text-[#8530C1]  flex-grow">
                    <p>Visa ending in 1992</p>
                    <p>Expiry 12/2028</p>
                    <p>
                      Set as default <span className="font-bold">Edit</span>
                    </p>
                  </div>
                  <div className=" ">
                    <img
                      loading="lazy"
                      src={Marked}
                      alt="marked"
                      className="    "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 my-8">
              <span onClick={open} className="flex gap-2 cursor-pointer">
                <img loading="lazy" src={PlusIcon} alt="plusIcon" /> Add payment
                method
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
                <p className="border border-[#F3DAFF] py-4 px-8 rounded-full flex items-center gap-2 mt-2  mb-2 ">
                  <select
                    name=""
                    id=""
                    className="w-full  h-full flex-1  focus:outline-none"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                  </select>
                </p>
              </span>
            </div>

            <p className="flex justify-center items-center  px-48">
              <Button>Save</Button>
            </p>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default Billing;

const AddCard = () => {
  return (
    <div className="px-10">
      <h1 className="text-[30px] font-Recoleta font-bold text-center">
        Add New Card
      </h1>
      <form>
        <div className="">
          <p className="my-5">
            <span>Name on card</span>
            <InputFormat type="text" placeholder="Name" />
          </p>
          <p className="my-5">
            <span>Card Number</span>
            <InputFormat type="number" placeholder="5456 34322 4542" />
          </p>
        </div>
        <div className="grid grid-cols-[1fr_250px] gap-4">
          <p>
            <span>Expiry</span>
            <InputFormat type="date" placeholder="2 / 3" />
          </p>
          <p>
            <span>CVC</span>
            <InputFormat type="number" placeholder="* * *" />
          </p>
        </div>
        <p className="my-5">
          <Button>Pay now</Button>
        </p>
      </form>
    </div>
  );
};
