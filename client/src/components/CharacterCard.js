import React from "react";

import HayamiImg from "../assets/images/example_YasukiHayami.png";

const CharacterCard = ({
  rank,
  name,
  clan,
  family,
  school,
  job,
  img,
  campaign,
  specialTitle,
}) => {
  return (
    <div className="character-card">
      <div className="character-card__name-banner">
        <div className="character-card__rank-container">
          <p className="character-card__rank-heading">Rank:</p>
          <h2 className="character-card__rank">{rank}</h2>
        </div>
        <h3 className="character-card__name">{name}</h3>
      </div>
      {/* <div className="character-card__triangle"></div> */}
      <img
        src={img}
        alt=""
        className="character-card__card-art"
        // style={{ width: "80vw" }}
      />
      <div className="character-card__bottom-container">
        <div className="character-card__mon-container">
          <img
            src={`${process.env.PUBLIC_URL}/images/mons-colour/Mon_${clan}_colour.png`}
            alt=""
            className="character-card__mon-image"
            // style={{ width: "20vw" }}
          />
        </div>
        <div className="character-card__description">
          {specialTitle ? (
            <p className="character-card__special-title">{specialTitle}</p>
          ) : null}
          <ul className="character-card__desc-items">
            <li className="character-card__desc-item">{job}</li>
            <li className="character-card__desc-item">
              Member of the {family.name} family
            </li>
            <li className="character-card__desc-item">
              Student of the {school.name} school
            </li>
          </ul>
        </div>
        <p className="character-card__campaign-text">Campaign: {campaign}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
