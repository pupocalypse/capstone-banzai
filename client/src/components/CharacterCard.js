import React from "react";

import placeholderImage from "../assets/images/noface_samurai.png";

const IMAGE_URL = "http://localhost:8000/characters/images";

const CharacterCard = ({
  charData: char,
  // rank,
  // name,
  // clan,
  // family,
  // school,
  // job,
  // img,
  // campaign,
  // specialTitle,
}) => {
  // insight equals (element rings * 10) + skill ranks
  const insightRankCalculator = () => {
    // const { activeCharacter: char } = this.state;
    let baseRingRanksArray = [];
    for (let ring in char.rings) {
      let traitRanks = [];
      for (let trait in char.rings[ring].traits) {
        traitRanks.push(char.rings[ring].traits[trait].rank);
      }
      baseRingRanksArray.push(Math.min(...traitRanks));
    }

    let skillRanksArray = [];
    for (let skill in char.skills) {
      skillRanksArray.push(char.skills[skill].rank);
    }
    const ringsTotal = baseRingRanksArray.reduce((acc, curr) => acc + curr);
    const skillsTotal = skillRanksArray.reduce((acc, curr) => acc + curr);
    const insight = ringsTotal * 10 + skillsTotal;

    const insightRank = Math.max(Math.floor((insight - 125) / 25 + 1), 1);
    return insightRank;
  };

  const capitalize = (string) => {
    if (string.includes(" ")) {
      return string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="character-card">
      <div className="character-card__name-art-container">
        <div className="character-card__name-banner">
          <div className="character-card__rank-container">
            <p className="character-card__rank-heading">Rank:</p>
            <h2 className="character-card__rank">{insightRankCalculator()}</h2>
          </div>
          <h3 className="character-card__name">
            {char.lastName} {char.firstName}
          </h3>
        </div>
        <img
          src={char.artwork ? `${IMAGE_URL}/${char.artwork}` : placeholderImage}
          alt=""
          className="character-card__card-art"
        />
        <div className="character-card__card-art-shadow"></div>
      </div>
      <div className="character-card__bottom-container">
        <div className="character-card__mon-container">
          <img
            src={`${process.env.PUBLIC_URL}/images/mons-colour/Mon_${char.clan}_colour.png`}
            alt=""
            className="character-card__mon-image"
          />
        </div>
        <div className="character-card__description">
          {char.specialTitle !== "" ? (
            <div className="character-card__special-banner">
              <p className="character-card__special-title">
                {char.specialTitle}
              </p>
            </div>
          ) : null}
          <ul className="character-card__desc-items">
            <li className="character-card__desc-item">
              {capitalize(char.job)}
            </li>
            <li className="character-card__desc-item">
              Member of the {char.family.name} family
            </li>
            <li className="character-card__desc-item">
              Student of the {char.school.name} school
            </li>
          </ul>
        </div>
        <p className="character-card__campaign-text">
          Campaign: {char.campaign}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
