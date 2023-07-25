import PackageCard from "@/common/PackageCard";
import MarkGreen from "@/assets/markgreen.svg";
import CancelGray from "@/assets/cancelgray.svg";
import MarkWhite from "@/assets/markwhite.svg";

const ChoosePlanContent = () => {
  return (
    <div>
      <div className="mx-auto  flex items-center justify-center">
        <div className="flex gap-10 mt-16 ">
          <PackageCard
            title={<div className=" opacity-0">a</div>}
            price={<div className=" opacity-0">a</div>}
            noBorder={true}
            content={[
              "Learning Content ",
              "50K books & videos",
              "Unlimited daily reading",
              "Up to 4 child profiles",
              "Offline reading ",
            ]}
          ></PackageCard>
          <PackageCard
            isIcon={true}
            title="Forever"
            btn="Choose "
            price="Free"
            content={[
              MarkGreen,
              CancelGray,
              CancelGray,
              CancelGray,
              CancelGray,
            ]}
          ></PackageCard>

          <PackageCard
            isIcon={true}
            title="1 Month"
            btn="Choose"
            price="$4.99/m"
            content={[MarkGreen, MarkGreen, MarkGreen, MarkGreen, MarkGreen]}
          ></PackageCard>
          <PackageCard
            recommended={true}
            isIcon={true}
            title="12 Months"
            noBorder={true}
            btn="Start Trial"
            price="$59.88/y"
            content={[MarkWhite, MarkWhite, MarkWhite, MarkWhite, MarkWhite]}
          ></PackageCard>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlanContent;
