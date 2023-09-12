import PackageCard from "@/common/PackageCard";

import { useGetPlans } from "@/api/queries";
import { Skeleton } from "@mantine/core";
import { BsX, BsCheckLg } from "react-icons/bs";

const ChoosePlanContent = () => {
  const { isLoading, data } = useGetPlans();

  const plans = data?.data.data.plans;
  return (
    <div>
      <Skeleton visible={isLoading}>
        <div className="mx-auto  flex items-center justify-center">
          <div className="flex mt-16 w-full  justify-center  items-center ">
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
                <BsCheckLg size={25} color="green" />,
                <BsX size={25} color="#8530C1" />,
                <BsX size={25} color="#8530C1" />,
                <BsX size={25} color="#8530C1" />,
                <BsX size={25} color="#8530C1" />,
              ]}
            ></PackageCard>

            <PackageCard
              isIcon={true}
              plan={plans && plans[0]}
              title="1 Month"
              btn="Choose"
              price="$4.99/m"
              content={[
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
              ]}
            ></PackageCard>
            <PackageCard
              recommended={true}
              plan={plans && plans[1]}
              isIcon={true}
              title="12 Months"
              noBorder={true}
              btn="Start Trial"
              price="$59.88/y"
              content={[
                <BsCheckLg size={25} color="white" />,
                <BsCheckLg size={25} color="white" />,
                <BsCheckLg size={25} color="white" />,
                <BsCheckLg size={25} color="white" />,
                <BsCheckLg size={25} color="white" />,
              ]}
            ></PackageCard>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default ChoosePlanContent;
