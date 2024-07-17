import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  // useMantineTheme,
} from "@mantine/core";
// import KundaLogo from "@/assets/schoolIcon.svg";
import Logo from "@/assets/KundaLogo.svg";
import { useNavigate } from "react-router-dom";

import { useDisclosure } from "@mantine/hooks";

import classes from "./HomeHeader2.module.css";

function HomeHeader2() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const navigate = useNavigate();
  // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  // const theme = useMantineTheme();
  // const openInNewTab = (url: string) => {
  //   const newWindow: Window | null = window.open(url, "_blank");
  //   if (newWindow) {
  //     newWindow.opener = null; // Ensure no access to the current window
  //   }
  // };
  return (
    <Box className="p-4">
      <header className={`${classes.header}  `}>
        <Group
          className="flex justify-between max-w-[1440px] mx-auto"
          h="100%  "
        >
          <img src={Logo} alt="logo" className={`${classes.logow}`} />

          {/* <Group h="100%" className="hidden lg:flex">
            <div className="flex justify-between cursor-pointer pl-2 flex-grow text2 font-medium  w-[800px]">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? " text-[#8530C1]" : "text-black"
                }
              >
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/parents"
                className={({ isActive }) =>
                  isActive ? " text-[#8530C1]" : "text-black"
                }
              >
                <span>Parents</span>
              </NavLink>
              <NavLink
                to="/schools"
                className={({ isActive }) =>
                  isActive ? " text-[#8530C1]" : "text-black"
                }
              >
                <span>Schools</span>
              </NavLink>
              <NavLink
                to="#"
                onClick={() => openInNewTab("https://kundakids.com/en-ng")}
                className={({ isActive }) =>
                  isActive ? " text-black" : "text-black"
                }
              >
                <span>Animation</span>
              </NavLink>
              <NavLink
                to="#"
                onClick={() => openInNewTab("https://kundakids.com/en-ng")}
                className={({ isActive }) =>
                  isActive ? " text-black" : "text-black"
                }
              >
                <span>Publishing</span>
              </NavLink>
              <NavLink
                to="#"
                onClick={() => openInNewTab("https://kundakids.com/en-ng")}
                className={({ isActive }) =>
                  isActive ? " text-black" : "text-black"
                }
              >
                <span>Shop</span>
              </NavLink>

              <NavLink
                to="/aboutus"
                className={({ isActive }) =>
                  isActive ? " text-[#8530C1]" : "text-black"
                }
              >
                <span>About Us</span>
              </NavLink>
              <NavLink
                to="/summer-chanllenge"
                className={({ isActive }) =>
                  isActive ? " text-[#8530C1]" : "text-black"
                }
              >
                <span>Summer Reading Challenge</span>
              </NavLink>
           
            </div>
          </Group> */}

          <Group className="hidden lg:flex ">
            <Button
              onClick={() => navigate("/login")}
              variant="default"
              className="text-[#8530C1] text1 font-Inter "
            >
              Log in
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="bg-[#8530C1] hover:bg-[#8530C1] text1 font-Inter"
            >
              Enroll
            </Button>
          </Group>

          <Burger
            className="lg:hidden "
            opened={drawerOpened}
            onClick={toggleDrawer}
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        // title="Navigation"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {/* <a href="/dev" className={`${classes.link} px-3 py-1 `}>
            Home
          </a>

          <a href="/dev" className={`${classes.link} px-3 py-1 `}>
            Parents
          </a>
          <a href="/dev" className={`${classes.link} px-3 py-1 `}>
            Schools
          </a>
          <a href="/dev" className={`${classes.link} px-3 py-1 `}>
            Animation
          </a>
          <a href="/dev" className={`${classes.link} px-3 py-1 `}>
            Publishing
          </a>
          <a href="/dev" className={`${classes.link} px-3 py-1 `}>
            Shop
          </a>
          <a href="/summer-chanllenge" className={`${classes.link} px-3 py-1 `}>
            Summer Reading Chanllenge
          </a> */}

          <Divider my="sm" />

          <Group className="center" grow pb="xl" px="md">
            <Button
              onClick={() => navigate("/dev")}
              variant="default"
              className="text-[#8530C1]"
            >
              Log in
            </Button>
            <Button
              onClick={() => navigate("/dev")}
              className="bg-[#8530C1] hover:bg-[#8530C1]"
            >
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default HomeHeader2;
