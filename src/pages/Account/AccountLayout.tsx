import Wrapper from "@/common/User/Wrapper";
import InnerWrapper from "@/common/User/InnerWrapper";
import Header from "./Header";
import { useMatch, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import DeleteAccount from "./DeleteAccount";
// import { userContext } from "@/Context/StateProvider";
import useStore from "@/store/index";
import { getUserState } from "@/store/authStore";

const baseUrl = "/account";

const links = [
  {
    name: "Profile",
    route: baseUrl,
    href: "",
    isSchool: true,
    isTeacher: true,
    isParent: true,
  },

  {
    name: "My Kids",
    route: baseUrl + "/mykids",
    href: "mykids",
    isParent: true,
  },
  {
    name: "Subscription Plan",
    route: baseUrl + "/subscriptionplan",
    href: "subscriptionplan",
    isParent: true,
    isSchool: false,
  },
  {
    name: "Billing",
    route: baseUrl + "/billing",
    href: "billing",
    isTeacher: false,
    isSchool: false,
    isParent: true,
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
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [user, ,] = useStore(getUserState);
  return (
    <Wrapper bgColor="#FFF7FD">
      <InnerWrapper>
        <Modal
          radius={"xl"}
          size="lg"
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
        >
          <DeleteAccount onCancel={close} />
        </Modal>
        <div className="min-h-[calc(92vh-40px)] h-auto w-full flex flex-col px-20 py-4">
          <div>
            <Header></Header>
          </div>
          <div className="flex flex-grow  w-full">
            <div className="flex basis-1/4 flex-col">
              <div
                className="  h-full p-2 flex-grow w-full 
              "
              >
                {links &&
                  links.map((link, index) => {
                    if (user?.role === "teacher" && !link.isTeacher) {
                      return null;
                    }
                    if (user?.role === "schoolAdmin" && !link.isSchool) {
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
        className={`py-2 pad-x-40 text3 rounded-full ${
          active ? "bg-[#FFF7FD] text-[#8530C1]" : "text-[#B5B5C3] "
        }  `}
      >
        {name}
      </button>
    </div>
  );
};
