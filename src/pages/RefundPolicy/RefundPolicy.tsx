import KKLogo from "../../assets/KK_Logo_2.avif";
import "../PrivacyPolicy/PrivacyPolicy.css";

const RefundPolicy = () => {
  return (
    <div>
      <div className=" flex  justify-center mb-8 fixed bg-white w-full pt-5 pb-7 border border-b-[1px]">
        <img src={KKLogo} alt="image" className="kkLog" />
      </div>
      <hr />
      <div>
        <p className=" font-DMSans header text-center font-light  tracking-wider mt-[100px] md:mt-[140px]">
          Refund policy
        </p>
      </div>
      <div className=" max-w-[560px] mx-auto text-[14px] md:text-[18px] font-DMSans font-light mt-3 tracking-wide px-6 md:px-0 text-[#404040]">
        <p className="my-5">
          We have a 30-day return policy, which means you have 30 days after
          receiving your item to request a return.
        </p>
        <p className="mt-5  ">
          {" "}
          To be eligible for a return, your item must be in the same condition
          that you received it, unworn or unused, with tags, and in its original
          packaging. You’ll also need the receipt or proof of purchase.
        </p>
        <p className="my-5">
          To start a return, you can contact us at{" "}
          <strong className=" underline"> hello@kundakids.com,</strong> quoting
          your order number in the subject line.{" "}
        </p>
        <p className="my-5">
          If your return is accepted, we’ll send you a return shipping label, as
          well as instructions on how and where to send your package. Items sent
          back to us without first requesting a return will not be accepted.
        </p>
        <p className="my-5">
          You can always contact us for any return question at
          <strong className=" underline"> hello@kundakids.com.</strong>
        </p>

        <div className="my-10">
          <p className=" font-bold">Damages and issues</p>
          <p>
            Damages and issues Please inspect your order upon reception and
            contact us immediately if the item is defective, damaged or if you
            receive the wrong item, so that we can evaluate the issue and make
            it right.
          </p>
        </div>
        <div className="my-10">
          <p className=" font-bold">Exceptions / non-returnable items</p>
          <p className=" my-4">
            Certain types of items cannot be returned, like perishable goods
            (such as food, flowers, or plants), custom products (such as special
            orders or personalized items), and personal care goods (such as
            beauty products). We also do not accept returns for hazardous
            materials, flammable liquids, or gases. Please get in touch if you
            have questions or concerns about your specific item.
          </p>
          <p>
            Unfortunately, we cannot accept returns on sale items or gift cards.
          </p>
        </div>

        <div className="my-10">
          <p className=" font-bold">Exchanges</p>
          <p className="my-4">
            The fastest way to ensure you get what you want is to return the
            item you have, and once the return is accepted, make a separate
            purchase for the new item.
          </p>
        </div>
        <div className="my-10">
          <p className=" font-bold">European Union 14 day cooling off period</p>
          <p className="my-4">
            Notwithstanding the above, if the merchandise is being shipped into
            the European Union, you have the right to cancel or return your
            order within 14 days, for any reason and without a justification. As
            above, your item must be in the same condition that you received it,
            unworn or unused, with tags, and in its original packaging. You’ll
            also need the receipt or proof of purchase.
          </p>
        </div>
        <div className="my-10">
          <p className="font-bold">Refunds</p>
          <p className="mt-4">
            We will notify you once we’ve received and inspected your return,
            and let you know if the refund was approved or not. If approved,
            you’ll be automatically refunded on your original payment method
            within 10 business days. Please remember it can take some time for
            your bank or credit card company to process and post the refund too.
          </p>
          <p>
            If more than 15 business days have passed since we’ve approved your
            return, please contact us at hello@kundakids.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
