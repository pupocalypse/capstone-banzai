import React from "react";
import { Statistic, Icon } from "semantic-ui-react";

const IMAGE_URL = "http://localhost:8000/characters/images";

const CharInfoCard = ({ char, insightRank, handleAddExp, handleMinusExp }) => {
  const artworkPath = char.artwork
    ? `${IMAGE_URL}/${char.artwork}`
    : `${process.env.PUBLIC_URL}/images/noface_samurai.png`;

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
          <Statistic>
            <Statistic.Value>{insightRank}</Statistic.Value>
            <Statistic.Label className="character-sheet__rank-label">
              Insight
              <br />
              Rank
            </Statistic.Label>
          </Statistic>
        </div>
      </div>
    </section>
  );
};

export default CharInfoCard;
