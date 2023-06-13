import PackageCard from "@/common/PackageCard";
import MarkGreen from "@/assets/markgreen.svg";
import CancelGray from "@/assets/cancelgray.svg";
import MarkWhite from "@/assets/markwhite.svg";

const YearPackage = () => {
  return (
    <div>
      <div className="mx-auto  flex items-center justify-center">
        <div className="flex gap-10 mt-16 ">
          <PackageCard
            title={<div className=" opacity-0">a</div>}
            price={<div className=" opacity-0">a</div>}
            noBorder={true}
            content={[
              "NewsLetter ",
              "Booking",
              "Kunda Kids Mobile and Desktop App ",
              "Confidence Workshop (virtual)",
              "Free Delivery (UK, Europe & USA) ",
              "Access to Events",
              "Storytelling  (African Languages)",
              "African History Classes",
              "Financial Literacy ",
              "Illustration Classes",
              "Digital Gift Box ",
            ]}
          ></PackageCard>
          <PackageCard
            isIcon={true}
            title="Basic"
            btn="Choose Plan"
            price="Free"
            content={[
              MarkGreen,
              MarkGreen,
              MarkGreen,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
            ]}
          ></PackageCard>

          <PackageCard
            isIcon={true}
            title="Bronze"
            btn="Choose Plan"
            price="$59.88/y"
            content={[
              MarkGreen,
              MarkGreen,
              MarkGreen,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
            ]}
          ></PackageCard>

          <PackageCard
            isIcon={true}
            title="Standard Plan"
            btn="Choose Plan"
            price="$119.88/y"
            content={[
              MarkGreen,
              MarkGreen,
              MarkGreen,
              MarkGreen,
              MarkGreen,
              MarkGreen,
              CancelGray,
              MarkGreen,
              CancelGray,
              CancelGray,
              CancelGray,
            ]}
          ></PackageCard>
          <PackageCard
            recommended={true}
            isIcon={true}
            title="Basic"
            noBorder={true}
            btn="Start Trial"
            price="$179.88/y"
            content={[
              MarkWhite,
              MarkWhite,
              MarkWhite,
              MarkWhite,
              MarkWhite,
              MarkWhite,
              MarkWhite,
              MarkWhite,
              MarkWhite,
              MarkWhite,
              MarkWhite,
            ]}
          ></PackageCard>
        </div>
      </div>
    </div>
  );
};

export default YearPackage;
