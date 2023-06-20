import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";
import Header from "./Header";
import { useMatch, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import DeleteAccount from "./DeleteAccount";
import { userContext } from "@/Context/StateProvider";

const baseUrl = "/parentaccount";

const links = [
  {
    name: "profile",
    route: baseUrl,
    href: "",
    isSchool: true,
    isTeacher: true,
    isParent: true,
  },

  {
    name: "My kids",
    route: baseUrl + "/mykids",
    href: "mykids",
    isParent: true,
  },
  {
    name: "subscription plan",
    route: baseUrl + "/subscriptionplan",
    href: "subscriptionplan",
    isParent: true,
    isSchool: true,
  },
  {
    name: "Billing",
    route: baseUrl + "/billing",
    href: "billing",
    isSchool: true,
  },
  {
    name: "Password",
    route: baseUrl + "/accountpassword",
    href: "accountpassword",
    isTeacher: true,
    isSchool: true,
    isParent: true,
  },
];

const SettingsLayout = () => {
  const [{ email, userType }, dispatch] = userContext();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Wrapper bgColor="#FFF7FD">
      <InnerWrapper>
        <Modal
          radius={"xl"}
          size="lg"
          opened={opened}
          onClose={close}
          closeButtonProps={{ size: "lg" }}
          centered
        >
          <DeleteAccount onCancel={close} />
        </Modal>
        <div className="min-h-[calc(100vh-80px-8vh)] h-auto w-full flex flex-col px-20 py-6">
          <div>
            <Header></Header>
          </div>
          <div className="flex flex-grow  w-full">
            <div className="flex basis-1/4 flex-col">
              <div className="  h-full p-2 flex-grow w-full ">
                {links &&
                  links.map((link, index) => {
                    if (userType === "teacher" && !link.isTeacher) {
                      return null;
                    }
                    if (userType === "school" && !link.isSchool) {
                      return null;
                    }

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
              </div>
              <div className="mb-28">
                <button onClick={open} className="p-2 px-10 text-red-600">
                  Delete Account
                </button>
              </div>
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
    <div className="my-8 w-[100%]">
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
