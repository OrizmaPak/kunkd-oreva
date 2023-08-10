import PackageCard from "@/common/PackageCard";
import MarkGreen from "@/assets/markgreen.svg";
import CancelGray from "@/assets/cancelgray.svg";
import MarkWhite from "@/assets/markwhite.svg";
import { useGetPlans } from "@/api/queries";
import { Skeleton } from "@mantine/core";

const ChoosePlanContent = () => {
  const { isLoading, data } = useGetPlans();

  const plans = data?.data.data.plans;
  return (
    <div>
      <Skeleton visible={isLoading}>
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
              title="Basic"
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
              plan={plans && plans[0]}
              title="1 Month"
              btn="Choose"
              price="$4.99/m"
              content={[MarkGreen, MarkGreen, MarkGreen, MarkGreen, MarkGreen]}
            ></PackageCard>
            <PackageCard
              recommended={true}
              plan={plans && plans[1]}
              isIcon={true}
              title="12 Months"
              noBorder={true}
              btn="Start Trial"
              price="$59.88/y"
              content={[MarkWhite, MarkWhite, MarkWhite, MarkWhite, MarkWhite]}
            ></PackageCard>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default ChoosePlanContent;
