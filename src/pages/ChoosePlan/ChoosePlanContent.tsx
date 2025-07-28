import PackageCard from "@/common/PackageCard";

import { useGetPlans } from "@/api/queries";
import { Skeleton } from "@mantine/core";
import { BsCheckLg, BsX } from "react-icons/bs";

const ChoosePlanContent = () => {
  const { isLoading, data } = useGetPlans();

  const planData = data?.data.data;

  return (
    <div>
      <Skeleton visible={isLoading}>
        <div className="mx-auto  flex items-center justify-center">
          <div className="flex mt-16 w-full  justify-center  items-center ">


<table>
<tbody>
  <th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>

  </th>
  <tr>
    <td> Safe, ad-free content,</td>
    <td>Access unlimited quality content,</td>
    <td>New content every week,</td>
    <td>Multiple children's profiles,</td>
    <td>Monitor child's progress,</td>
    <td></td>
  </tr>
  <tr>

  </tr>
</tbody>
</table>

            <PackageCard
              title={<div className="  opacity-0">a</div>}
              price={<div className=" opacity-0 mt-2">a</div>}
              noBorder={true}
              content={[
                "Safe, ad-free content",
                "Access unlimited quality content",
                "New content every week",
                "Multiple children's profiles",
                "Monitor child's progress",
              ]}
            ></PackageCard>
            <PackageCard
              countryCode={planData && planData.countryCode}
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

            {/* <PackageCard
              countryCode={planData && planData.countryCode}
              isIcon={true}
              plan={planData && planData?.plans[2]}
              title="A day"
              btn="Subscribe"
              price={
                planData && planData?.countryCode === "NG"
                  ? planData?.plans[2]?.naira_value
                  : planData?.plans[2]?.dollar_value
              }
              content={[
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
              ]}
            ></PackageCard> */}

            <PackageCard
              countryCode={planData && planData.countryCode}
              isIcon={true}
              plan={planData && planData?.plans[0]}
              title="1 Month"
              btn="Subscribe"
              price={
                planData && planData?.countryCode == "NG"
                  ? planData?.plans[0]?.naira_discount_value
                  : planData?.countryCode == "GB"
                  ? planData?.plans[0]?.pounds_discount_value
                  : planData?.plans[0]?.dollar_discount_value
              }
              discountPrice={
                planData && planData?.countryCode == "NG"
                  ? planData?.plans[0]?.naira_value
                  : planData?.countryCode == "GB"
                  ? planData?.plans[0]?.pounds_value
                  : planData?.plans[0]?.dollar_value
              }
              content={[
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
                <BsCheckLg size={25} color="green" />,
              ]}
            ></PackageCard>
            <PackageCard
              countryCode={planData && planData.countryCode}
              recommended={true}
              plan={planData && planData?.plans[1]}
              isIcon={true}
              title="12 Months"
              noBorder={true}
              btn="Subscribe"
              price={
                planData && planData?.countryCode == "NG"
                  ? planData?.plans[1]?.naira_discount_value
                  : planData?.countryCode == "GB"
                  ? planData?.plans[1]?.pounds_discount_value
                  : planData?.plans[1]?.dollar_discount_value
              }
              discountPrice={
                planData && planData?.countryCode == "NG"
                  ? planData?.plans[1]?.naira_value
                  : planData?.countryCode == "GB"
                  ? planData?.plans[1]?.pounds_value
                  : planData?.plans[1]?.dollar_value
              }
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
