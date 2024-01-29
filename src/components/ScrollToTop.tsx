import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const base = ["/parent", "/school"];
const arrayOfPath = ["stories", "languages", "audiobooks"];

const routes = arrayOfPath?.reduce<string[]>((acc, curr) => {
  return [...base.map((item) => item + "/" + curr), ...acc];
}, []);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (routes.includes(pathname)) {
      window.scrollTo({
        top: 460,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
