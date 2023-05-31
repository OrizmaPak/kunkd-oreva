import React from "react";
import Dele from "@/assets/Dele.svg";
import Louisa from "@/assets/Louisa.svg";
import Chike from "@/assets/Chike.svg";
import Chidera from "@/assets/Chidera.svg";
import Toni from "@/assets/Toni.svg";

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
        <div className="flex gap-14 my-8">
          <img src={Dele} alt="Dele" />
          <img src={Louisa} alt="Louisa" />
        </div>
        <div className="flex gap-6 mb-16">
          <img src={Chike} alt="Chike" />
          <img src={Chidera} alt="Chidera" />
          <img src={Toni} alt="Toni" />
        </div>
      </div>
    </div>
  );
};

export default OurTeamContent;
