import React from "react";

import { StoriesType } from "./Stories1";
const SideMenu = ({
  image,
  title,
  author,
  aboutAuthor,
  overview,
}: StoriesType) => {
  return (
    <div>
      <div>
        <img src={image} alt="" className=" w-[50%]" />
      </div>

      <h1>{title}</h1>
      <p>{author}</p>
      <div>
        <h1>About Author</h1>
        <p>{aboutAuthor}</p>

        <h1>Overview</h1>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default SideMenu;
