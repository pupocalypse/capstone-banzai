import React from "react";
import { Statistic, Icon, Popup } from "semantic-ui-react";

const IMAGE_URL = "http://localhost:8000/characters/images";

const CharInfoCard = ({ char, insightRank, handleAddExp, handleMinusExp }) => {
  const artworkPath = char.artwork
    ? `${IMAGE_URL}/${char.artwork}`
    : `${process.env.PUBLIC_URL}/images/noface_samurai.png`;

  let ringRanks = [];
  for (let ring in char.rings) {
    let traitRanks = [];
    for (let trait in char.rings[ring].traits) {
      traitRanks.push(char.rings[ring].traits[trait].rank);
    }
    ringRanks.push(Math.min(...traitRanks));
  }
  const ringsTotal = ringRanks.reduce((acc, curr) => acc + curr) * 10;

  let skillRanks = [];
  for (let skill in char.skills) {
    skillRanks.push(char.skills[skill].rank);
  }
  const skillsTotal = skillRanks.reduce((acc, curr) => acc + curr);

  return (
    <section className="character-sheet__info-container">
      <div
        className="character-sheet__info-mon"
        style={{
          background: `url(${process.env.PUBLIC_URL}/images/mons-colour/Mon_${char.clan}_colour.png) no-repeat`,
          backgroundSize: "contain",
          backgroundPosition: "right",
        }}
      ></div>
      <div
        className="character-sheet__artwork"
        style={{
          background: `url(${artworkPath}) no-repeat`,
          backgroundSize: "cover",
          backgroundPosition: "52%",
        }}
      ></div>
      <div className="character-sheet__info">
        <h1 className="character-sheet__name-heading">
          {char.lastName} {char.firstName}
        </h1>
        <div className="character-sheet__details-container">
          <span className="character-sheet__info-text character-sheet__info-text--identifier">
            Clan
          </span>
          <p className="character-sheet__info-text">{char.clan}</p>
        </div>
        <div className="character-sheet__details-container">
          <span className="character-sheet__info-text character-sheet__info-text--identifier">
            Family
          </span>
          <p className="character-sheet__info-text">{char.family.name}</p>
        </div>
        <div className="character-sheet__details-container">
          <span className="character-sheet__info-text character-sheet__info-text--identifier">
            School
          </span>
          <p className="character-sheet__info-text">{char.school.name}</p>
          <p className="character-sheet__info-text character-sheet__info-text--rank">
            Rank: {insightRank}
          </p>
        </div>

        <div className="character-sheet__info-experience-container">
          <div className="character-sheet__info-xp">
            <Statistic>
              <Statistic.Value>{char.currentExp}</Statistic.Value>
              <Statistic.Label className="character-sheet__rank-label">
                XP
                <br />
                Current
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{char.totalExp}</Statistic.Value>
              <Statistic.Label className="character-sheet__rank-label">
                XP
                <br />
                Total
              </Statistic.Label>
            </Statistic>
            <div className="character-sheet__exp-icons">
              <button
                className="character-sheet__icon-button"
                onClick={handleAddExp}
              >
                <Icon name="caret up" />
              </button>
              <button
                className="character-sheet__icon-button"
                onClick={handleMinusExp}
              >
                <Icon name="caret down" />
              </button>
            </div>
          </div>
          <Popup
            trigger={
              <Statistic>
                <Statistic.Value>{insightRank}</Statistic.Value>
                <Statistic.Label className="character-sheet__rank-label">
                  Insight
                  <br />
                  Rank
                </Statistic.Label>
              </Statistic>
            }
            position="top center"
            wide
            mouseEnterDelay={500}
            mouseLeaveDelay={250}
          >
            <div className="character-sheet__insight-popup">
              <span className="character-sheet__insight-popup-text">
                Rings &times; 10 ({ringsTotal}) + Skills ({skillsTotal})
              </span>
            </div>
          </Popup>
        </div>
      </div>
    </section>
  );
};

export default CharInfoCard;
