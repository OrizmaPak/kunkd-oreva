// ScrollToSection.jsx

import React from "react";
import { Link } from "react-scroll";
import classNames from "classnames";

const ScrollToSection = ({
  sectionId,
  buttonText,
  textColor,
}: {
  sectionId: string;
  buttonText: string;
  textColor?: string;
}) => {
  return (
    <div className=" cursor-pointer">
      <Link
        to={sectionId}
        spy={true}
        smooth={true}
        offset={-70} // Adjust this offset based on your header height or any fixed header
        duration={500}
        className={`
         p-2  ${
           textColor ? `color-${textColor}` : "text-[#8530C1]"
         } rounded-full cursor-pointer",
       
      `}
      >
        {buttonText || "Scroll to Section"}
      </Link>
    </div>
  );
};

export default ScrollToSection;
