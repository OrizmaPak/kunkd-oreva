import Lulu from "@/assets/LuluLearns.svg";
import Astronaut from "@/assets/AstronautstothemooN.svg";
import Afam from "@/assets/Afam-04 1.svg";
import AisforAfrica from "@/assets/AisforAfrica.svg";
import Sara from "@/assets/Sarai_s-Culture-Day.svg";
import QueenMoremi from "@/assets/Queen-Moremi.svg";
import QueenYaa from "@/assets/Queen-Yaa.svg";
import KingAlboury from "@/assets/King-Alboury.svg";
import QueenAmina from "@/assets/Queen-Amina.svg";
import Shaka from "@/assets/Shaka-Zulu.svg";
import QueenKitami from "@/assets/Queen-Kitami.svg";
import Mansa from "@/assets/Mansa-Musa.svg";
import AfricanStory from "@/assets/AfricanStory.svg";

import Hero from "./Hero";
import NewRelease from "./NewRelease";
import AfricanHsitory from "./AfricanHistory";
import BookTrailer from "./BookTrailer";
import PaymentType from "./PaymentType";

const datas = [
  {
    title: "Lulu Learns",
    price: "#2,900.00 ",
    image: Lulu,
  },
  {
    title: "Astronauts to the Moon",
    price: "#2,900.00 ",
    image: Astronaut,
  },
  {
    title: "Afam and the New yam Festival",
    price: "#2,900.00 ",
    image: Afam,
  },
  {
    title: "Kunda Kids, A is a Africa",
    price: "#3,500.00 ",
    image: AfricanStory,
  },
  {
    title: "Sara's Culture Day",
    price: "#3,500.00 ",
    image: Sara,
  },
  {
    title: "Queen Moremi Makes a Promise",
    price: "#2,900.00 ",
    image: QueenMoremi,
  },
  {
    title: "Queen yaa Saves the Golden Stool",
    price: "#2,900.00 ",
    image: QueenYaa,
  },
  {
    title: "King Alboury Cooks the best Jolly",
    price: "#2,900.00",
    image: KingAlboury,
  },
  {
    title: "Queen Amina and the Zazzau Games",
    price: "#2,900.00 ",
    image: QueenAmina,
  },
  {
    title: "Shaka Zulu Learn's to Dance",
    price: "#2,900.00 ",
    image: Shaka,
  },
  {
    title: "Queen Kitami Makes friends",
    price: "#2,900.00 ",
    image: QueenKitami,
  },
  {
    title: "Mansa musa Makes Builds a school",
    price: "#2,900.00 ",
    image: Mansa,
  },
  {
    title: "The African Story Bundle",
    price: "#2,900.00 ",
    image: AfricanStory,
  },
];

const Shop = () => {
  return (
    <div>
      <Hero />
      <NewRelease data={datas} />
      <AfricanHsitory data={datas} />
      <BookTrailer />
      <PaymentType />
    </div>
  );
};

export default Shop;
