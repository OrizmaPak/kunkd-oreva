import { Image, Container, Title, Text, Button } from "@mantine/core";
// import image from './image.svg';
import classes from "./NotFound.module.css";
import Error404 from "@/assets/error404.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container className={classes.root}>
      <div className="flex justify-center items-center h-screen ">
        {/* <Image src={image.src} className={classes.mobileImage} /> */}
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                location.reload();
              }}
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
            >
              Refresh
            </Button>
            <div className=" flex justify-center items-end font-Brico text-[24px]">
              Or
            </div>
            <Button
              onClick={() => {
                sessionStorage.clear();
                navigate("/login");
                location.reload();
              }}
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
            >
              Get back to login page
            </Button>
          </div>
        </div>
        <Image src={Error404} className={classes.desktopImage} />
      </div>
    </Container>
  );
};

export default NotFound;
