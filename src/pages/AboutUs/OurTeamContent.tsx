import Chidera from "@/assets/Chidera1.svg";
import ChideraBlur from "@/assets/Chiderablur.jpg";
import Chike from "@/assets/Chike1.svg";
import ChikeBlur from "@/assets/Chikeblur.jpg";
import Dele from "@/assets/Dele1.svg";
import DeleBlur from "@/assets/Deleblur.jpg";
import Louisa from "@/assets/Louisa1.svg";
import LouisaBlur from "@/assets/Louisablur.jpg";
import Peter from "@/assets/Peter1.svg";
import PeterBlur from "@/assets/Peterblur.jpg";
import Toni from "@/assets/Toni1.svg";
import ToniBlur from "@/assets/Toniblur.jpg";
import TeamCard from "./TeamCard";

const data = [
  {
    image: Dele,
    imageBlur: DeleBlur,

    name: "Dele Olafuyi",
    title: "Co-founder, CEO",
    message:
      "Dele oversees business strategy and operations at Kunda Kids. He is a marketing strategic and an MBA Alumni from Cambridge University Press, with former experience leading marketing in Africa for World Remit.",
  },
  {
    image: Louisa,
    imageBlur: LouisaBlur,

    name: "Louisa Olafuyi",
    title: "Co-founder, COO",
    message:
      "Louisa oversees creative and strategic development at Kunda Kids. She is a consumer insight expert with experience leading marketing and product innovation at Cambridge University Press and Unilever.",
  },
  {
    image: Toni,
    imageBlur: ToniBlur,

    name: "Oluwatoni Ajewole",
    title: "Head of Product",
    message:
      "Toni leads digital and product marketing and performance at Kunda Kids. He is a digital marketing expert with previous experience leading marketing and sales strategy for ULessons Education.",
  },
  {
    image: Chike,
    imageBlur: ChikeBlur,

    name: "Chike Obasi",
    title: "Art Director",
    message:
      "Chike oversees art, animation and creative strategy at Kunda Kids. He is a widely acclaimed Nigerian illustrator and animator with former experience leading animation at Scroll Entertainment Studio.",
  },
  {
    image: Chidera,
    imageBlur: ChideraBlur,

    name: "Chidera Monde",
    title: "Content & Strategy Director",
    message:
      "Chiderah leads content and creative strategy for Kunda Kids' animation IPs. She is a content and storytelling expert with former experience leading content curation at Twitter (Africa).",
  },
  {
    image: Peter,
    imageBlur: PeterBlur,
    name: "Peter Ogedengbe",
    title: "Chief Technology Officer",
    message:
      "Peter oversees creative and strategic development at Kunda Kids. She is a consumer insight expert with experience leading marketing and product innovation at Cambridge University Press and Unilever.",
  },
];

const OurTeamContent = () => {
  return (
    <div className="max-w-[1000px] w-full mx-auto text-center">
      <h1 className=" font-Inter header2  text-[#101828] font-semibold text-center mb-8">
        Our Amazing Team
      </h1>
      <p className=" text1 leading-[30px] mb-20 font-InterReg text-[#667085]">
        Our team is made up of passionate team of artists, writers, producers,
        and content and business leaders who share our vision for creating
        diverse and inclusive children's literature. Together, we work to create
        engaging and inspiring <br /> stories that celebrate African culture and
        promote essential soft skills.
      </p>

      <div>
        <div className="grid grid-cols-3 gap-x-28  gap-y-10 my-8">
          {data &&
            data.map((data, index) => {
              return <TeamCard key={index} {...data} />;
            })}
        </div>
        {/* <div className="flex gap-6 mb-16">
          <img loading="lazy" src={Chike} alt="Chike" />
          <img loading="lazy" src={Chidera} alt="Chidera" />
          <img loading="lazy" src={Toni} alt="Toni" />
        </div> */}
      </div>
    </div>
  );
};

export default OurTeamContent;
