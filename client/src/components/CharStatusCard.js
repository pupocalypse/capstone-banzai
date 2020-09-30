import React from "react";
import { Popup, Icon } from "semantic-ui-react";

const CharStatusCard = ({ char, initiativeRoll, karmaPoints }) => {
  const honorPointsList = () => {
    const honorPoints = char.school.honor.toString().split(".")[1];
    let honorArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
      if (num <= honorPoints) {
        return (
          <div
            className="character-sheet__slots-image honor-point"
            key={`honor-${num}`}
          ></div>
        );
      } else {
        return (
          <div
            className="character-sheet__slots-image"
            key={`honor-${num}`}
          ></div>
        );
      }
    });
    return honorArray;
  };

  return (
    <section className="character-sheet__status-outer-container">
      <div className="character-sheet__status-borders-horizontal"></div>
      <div className="character-sheet__status-borders-vertical"></div>
      <div className="character-sheet__status-round-corner corner-top-left"></div>
      <div className="character-sheet__status-round-corner corner-top-right"></div>
      <div className="character-sheet__status-round-corner corner-bottom-left"></div>
      <div className="character-sheet__status-round-corner corner-bottom-right"></div>

      <div className="character-sheet__initiative-karma-container">
        <div className="character-sheet__initiative-container">
          <Popup
            trigger={
              <h1 className="character-sheet__initiative-count">
                {initiativeRoll()}
              </h1>
            }
            position="top center"
            wide
            mouseEnterDelay={500}
            mouseLeaveDelay={250}
          >
            <div className="character-sheet__popup">
              <span className="character-sheet__popup-roll">
                Insight Rank + Reflexes
              </span>{" "}
              / <span className="character-sheet__popup-keep">Reflexes</span>
            </div>
          </Popup>
          <p className="character-sheet__initiative-label">Initiative Roll</p>
        </div>

        <div className="character-sheet__karma-container">
          <h1 className="character-sheet__karma-count">{karmaPoints}</h1>
          <div className="character-sheet__karma-icons">
            <button className="character-sheet__icon-button">
              <Icon name="caret up" />
            </button>
            <button className="character-sheet__icon-button">
              <Icon name="caret down" />
            </button>
          </div>
          <p className="character-sheet__karma-label">Karma Points</p>
        </div>
      </div>

      <div className="character-sheet__stats-container">
        <div className="character-sheet__honor-container">
          <p className="character-sheet__honor-text">
            Honor: {char.school.honor}
          </p>
          <div className="character-sheet__honor-slots">
            {honorPointsList()}
          </div>
        </div>

        <div className="character-sheet__glory-container">
          <p className="character-sheet__glory-text">Glory: 1.0</p>
          <div className="character-sheet__glory-slots">
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
          </div>
        </div>

        <div className="character-sheet__status-container">
          <p className="character-sheet__status-text">Status: 1.0</p>
          <div className="character-sheet__status-slots">
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
            <div className="character-sheet__slots-image"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharStatusCard;
