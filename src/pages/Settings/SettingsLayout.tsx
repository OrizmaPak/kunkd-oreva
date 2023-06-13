import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";
import Header from "./Header";
import { useMatch, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const baseUrl = "/settings";

const links = [
  {
    name: "profile",
    route: baseUrl,
    href: "",
  },
  {
    name: "subscription plan",
    route: baseUrl + "/subscriptionplan",
    href: "subscriptionplan",
  },
  {
    name: "Payment method",
    route: baseUrl + "/paymentmethod",
    href: "paymentmethod",
  },
  {
    name: "Notification",
    route: baseUrl + "/notification",
    href: "notification",
  },
];

const SettingsLayout = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <InnerWrapper>
        <div className="min-h-[calc(100vh-80px-8vh)] h-auto w-full flex flex-col px-20 py-6">
          <div>
            <Header></Header>
          </div>
          <div className="flex flex-grow  w-full">
            <div className="basis-1/4  h-full p-4">
              {links &&
                links.map((link, index) => {
                  return (
                    <SideMenuButton
                      key={index}
                      {...link}
                      onClick={() => {
                        navigate(link.href);
                      }}
                    />
                  );
                })}
              <hr className="my-10 mr-8" />
              <SideMenuButton route="help" name="Help" />
              <button className="p-2 px-4 text-red-600">Logout</button>
            </div>
            <div className="basis-full  h-full">{<Outlet />}</div>
          </div>
        </div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default SettingsLayout;

const SideMenuButton = ({
  name,
  href,
  route,
  onClick,
}: {
  name?: string;
  href?: string;
  route: string;
  onClick?: () => void;
}) => {
  const active = useMatch(route);
  return (
    <div className="my-8">
      <button
        onClick={onClick}
        className={`py-3 px-10 rounded-full ${
          active ? "bg-[#FFF7FD] text-[#8530C1]" : "text-[#B5B5C3] "
        }  `}
      >
        {name}
      </button>
    </div>
  );
};
