import React from "react";
import Wrapper from "../../../common/User/Wrapper";
import StoriesNav from "./StoriesNav";
import Poster1 from "@/assets/Chisom.svg";
import { useParams, useLocation } from "react-router-dom";
import { DataType } from "@/pages/AfterSchoolSignIn/User/NewlyRegisterUser/NewlyRegisteredUser";
import SideMenu from "./SideMenu";

export type StoriesType = {
  image?: string;
  title?: string;
  author?: string;
  aboutAuthor?: string;
  overview?: string;
  content?: string;
};
const data = [
  {
    id: 1,
    image: Poster1,
    title: "Chisom's Eco-Friendly Visit",
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis perspiciatis aliquam, atque excepturi nemo harum, nulla doloremque nisi distinctio provident impedit sint odit? Asperiores, quod excepturi vel aliquam, dignissimos doloribus at magnam ducimus doloremque voluptate possimus officia aperiam repellat blanditiis omnis alias qui provident, ut deleniti assumenda aliquid! Facere, reprehenderit. ",

    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem facere suscipit, quidem fuga quaerat illum temporibus ut, magni explicabo molestiae in ullam? Nam voluptatem excepturi minima sunt. Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    id: 2,
    image: Poster1,
    title: "Chisom's Eco-Friendly Visit",
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis perspiciatis aliquam, atque excepturi nemo harum, nulla doloremque nisi distinctio provident impedit sint odit? Asperiores, quod excepturi vel aliquam, dignissimos doloribus at magnam ducimus doloremque voluptate possimus officia aperiam repellat blanditiis omnis alias qui provident, ut deleniti assumenda aliquid! Facere, reprehenderit. ",

    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem facere suscipit, quidem fuga quaerat illum temporibus ut, magni explicabo molestiae in ullam? Nam voluptatem excepturi minima sunt. Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    id: 3,
    image: Poster1,
    title: "Chisom's Eco-Friendly Visit",
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis perspiciatis aliquam, atque excepturi nemo harum, nulla doloremque nisi distinctio provident impedit sint odit? Asperiores, quod excepturi vel aliquam, dignissimos doloribus at magnam ducimus doloremque voluptate possimus officia aperiam repellat blanditiis omnis alias qui provident, ut deleniti assumenda aliquid! Facere, reprehenderit. ",

    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem facere suscipit, quidem fuga quaerat illum temporibus ut, magni explicabo molestiae in ullam? Nam voluptatem excepturi minima sunt. Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
  {
    id: 4,
    image: Poster1,
    title: "Chisom's Eco-Friendly Visit",
    author: "Dele and Louisa Olatuyi",
    aboutAuthor:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis perspiciatis aliquam, atque excepturi nemo harum, nulla doloremque nisi distinctio provident impedit sint odit? Asperiores, quod excepturi vel aliquam, dignissimos doloribus at magnam ducimus doloremque voluptate possimus officia aperiam repellat blanditiis omnis alias qui provident, ut deleniti assumenda aliquid! Facere, reprehenderit. ",

    overview:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatem facere suscipit, quidem fuga quaerat illum temporibus ut, magni explicabo molestiae in ullam? Nam voluptatem excepturi minima sunt. Quae illum nam quam vero error est eum adipisci repellendus necessitatibus, omnis assumenda, aperiam quaerat non voluptas amet. Delectus, nostrum molestias! Cum? ",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi minima, beatae voluptatibus inventore amet vero, possimus sequi ex modi totam assumenda rerum et, placeat vitae obcaecati quae quisquam? Illo repellat deserunt eum, hic accusantium in, nesciunt perspiciatis fugit facere vel aspernatur nihil saepe laborum! Mollitia voluptates laborum officiis facilis explicabo maiores impedit. Dicta ut amet laboriosam cumque consequatur incidunt voluptas veritatis quibusdam. Repudiandae natus saepe totam porro, deleniti dicta?  ",
  },
];
const Stories1 = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);
  const story = data.find((el) => `${el.id}` === id);
  return (
    <div className="  bg-blue-400   w-[100%]">
      <Wrapper>
        <div className="h-[calc(100vh-80px-8vh)] flex flex-col bg ">
          <StoriesNav
            first="Stories"
            second="Bedtime Stories"
            third="Chisom's Eco-Friendly Visit"
          />

          <div className="flex h-full gap-4 mt-10  flex-grow-1 ">
            <div className=" basis-2/4 bg-slate-500">
              {story ? (
                <SideMenu
                  image={story.image}
                  author={story.author}
                  aboutAuthor={story.title}
                  title={story.title}
                />
              ) : null}
            </div>
            <div className="b basis-full h-[100%] bg-yellow-400 w-[100%] block"></div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Stories1;
