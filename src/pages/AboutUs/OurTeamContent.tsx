import Dele from "@/assets/Dele1.svg";
import Louisa from "@/assets/Louisa1.svg";
import Chike from "@/assets/Chike1.svg";
import Chidera from "@/assets/Chidera1.svg";
import Toni from "@/assets/Toni1.svg";
import Peter from "@/assets/Peter1.svg";
import TeamCard from "./TeamCard";

const data = [
  {
    image: Dele,
    name: "Dele Olafuyi",
    title: "Co-founder, CEO",
    message:
      "Dele oversees business strategy and operations at Kunda Kids. He is a marketing strategic and an MBA Alumni from Cambridge University Press, with former experience leading marketing in Africa for World Remit.",
  },
  {
    image: Louisa,
    name: "Louisa Olafuyi",
    title: "Co-founder, COO",
    message:
      "Louisa oversees creative and strategic development at Kunda Kids. She is a consumer insight expert with experience leading marketing and product innovation at Cambridge University Press and Unilever.",
  },
  {
    image: Toni,
    name: "Oluwatoni Ajewole",
    title: "Head of Product",
    message:
      "Toni leads digital and product marketing and performance at Kunda Kids. He is a digital marketing expert with previous experience leading marketing and sales strategy for ULessons Education.",
  },
  {
    image: Chike,
    name: "Chike Obasi",
    title: "Art Director",
    message:
      "Chike oversees art, animation and creative strategy at Kunda Kids. He is a widely acclaimed Nigerian illustrator and animator with former experience leading animation at Scroll Entertainment Studio.",
  },
  {
    image: Chidera,
    name: "Chidera Monde",
    title: "Content & Strategy Director",
    message:
      "Chiderah leads content and creative strategy for Kunda Kids' animation IPs. She is a content and storytelling expert with former experience leading content curation at Twitter (Africa).",
  },
  {
    image: Peter,
    name: "Peter Ogedengbe",
    title: "Chief Technology Officer",
    message:
      "Peter oversees creative and strategic development at Kunda Kids. She is a consumer insight expert with experience leading marketing and product innovation at Cambridge University Press and Unilever.",
  },
];

const OurTeamContent = () => {
  return (
    <div className="max-w-[1000px] w-full mx-auto text-center">
      <h1 className="font-bold font-Recoleta text-[40px] text-black text-center mb-4">
        Our Amazing Team
      </h1>
      <p className="mb-4">
        Our team is made up of passionate team of artists, writers, producers,
        and content and business leaders who share our vision for creating{" "}
        <br />
        diverse and inclusive children's literature. Together, we work to create
        engaging and inspiring <br /> stories that celebrate African culture and
        promote essential soft skills.
      </p>

      <div>
        <p>
          <strong className="pr-6">Meet The Heads</strong> - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - -- - - - - - - - - - - - - - - - - - - - - - - - - - -
        </p>
        <div className="grid grid-cols-3 gap-14 my-8">
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
