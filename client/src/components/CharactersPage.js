import React from "react";
import { Link } from "react-router-dom";
import CharacterCard from "./CharacterCard";

import HayamiImg from "../assets/images/example_YasukiHayami.png";
import RyoImg from "../assets/images/example_GoukimaroRyo.jpg";

const CharactersPage = () => {
  return (
    <main className="characters">
      {/* renders existing character 'card' components, links to character sheet */}
      <div className="characters__header">
        <h1 className="characters__heading">Characters</h1>
      </div>
      <div className="characters__cards-container">
        <Link to="/characters/YasukiHayami">
          <CharacterCard
            rank="1"
            name="Yasuki Hayami"
            clan="Crab"
            family={{ name: "Yasuki" }}
            school={{ name: "Hiruma Bushi" }}
            job="Bushi"
            img={HayamiImg}
            campaign="The Darkest Timeline"
          />
          <CharacterCard
            rank="4"
            name="Goukimaro Ryo"
            clan="Spider"
            family={{ name: "Goukimaro" }}
            school={{ name: "Order of Heroes" }}
            job="Shugenja"
            img={RyoImg}
            campaign="March of the Black Queen"
            specialTitle={"Abbot of the Spider"}
          />
        </Link>
      </div>
    </main>
  );
};

export default CharactersPage;
