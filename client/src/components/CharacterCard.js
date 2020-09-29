import React from "react";

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

    let insightRank;
    switch (insight) {
      case insight < 150:
        insightRank = 1;
        break;
      case insight < 175:
        insightRank = 2;
        break;
      case insight < 200:
        insightRank = 3;
        break;
      case insight < 225:
        insightRank = 4;
        break;
      case insight < 250:
        insightRank = 5;
        break;
      case insight < 275:
        insightRank = 6;
        break;
      case insight < 300:
        insightRank = 7;
        break;
      case insight < 325:
        insightRank = 8;
        break;
      default:
        insightRank = 1;
        break;
    }
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
          src={`${IMAGE_URL}/${char.artwork}`}
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
          {char.hasOwnProperty("specialTitle") ? (
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
        <p className="character-card__campaign-text">Campaign: none</p>
      </div>
    </div>
  );
};

export default CharacterCard;
