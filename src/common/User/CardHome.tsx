// import { useState } from "react";
// import { Skeleton } from "@mantine/core";
import AfamBlur from "@/assets/afamblur.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// import {useGetContentById} from "@/api/queries"

export type CardProps = {
  id?: number;
  name?: string;
  slug?: string;
  thumbnail?: string;
  category?: string;
  theme?: string;
  goTo?: () => void;
};

const CardHome = ({ name, thumbnail, goTo }: CardProps) => {
  // const goto = () => {
  //   navigate(`${category?.toLowerCase()}/${theme?.toLowerCase()}/${id}`, {
  //     // state: { image, title, size },
  //   });
  // };

  return (
    <div
      onClick={goTo}
      className="w-[200px] z-[1] cursor-pointer hover:scale-[102%] transition-all"
    >
      <span>
        <LazyLoadImage
          src={thumbnail}
          placeholderSrc={AfamBlur}
          effect="blur"
          className=" rounded-xl"
          wrapperClassName=""
          width={200}
          height={200}
        />
      </span>
      {name ? (
        <p className="mt-[10px] text-[16px] font-Hanken font-semibold ">
          {name}
        </p>
      ) : null}
    </div>
  );
};

export default CardHome;
