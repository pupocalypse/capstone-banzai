import React from "react";

const CharStatusCard = ({ char, initiativeRoll, karmaPoints }) => {
  const honorPointsList = () => {
    console.log("char:", char);
    const honorPoints = char.school.honor.toString().split(".")[1];
    let honorArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
      if (num <= honorPoints) {
        return <div className="character-sheet__slots-image honor-point"></div>;
      } else {
        return <div className="character-sheet__slots-image"></div>;
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
          <h1 className="character-sheet__initiative-count">
            {initiativeRoll()}
          </h1>
          <p className="character-sheet__initiative-label">Initiative Roll</p>
        </div>

        <div className="character-sheet__karma-container">
          <h1 className="character-sheet__karma-count">{karmaPoints}</h1>
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
          <p className="character-sheet__glory-text">Glory: 0</p>
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
          <p className="character-sheet__status-text">Status: 1</p>
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
