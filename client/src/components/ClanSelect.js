import React from "react";
import DropdownMenu from "./DropdownMenu";

// receives currentClan as prop
const ClanSelect = ({ clans, currentClan, handleChange }) => {
  const localStorageClan = JSON.parse(localStorage.getItem("current clan"));

  return (
    <section className="wizard__clan-container">
      <div className="wizard__clan-left-container">
        <h2 className="wizard__clan-left-heading">Select Clan</h2>
        <DropdownMenu
          title={"Clan"}
          dropdownOptions={clans.map((clan) => {
            return {
              key: clan.clan,
              text: clan.clan,
              value: clan.clan,
              image: {
                avatar: true,
                src: `${process.env.PUBLIC_URL}/images/mons-colour/Mon_${clan.clan}_colour.png`,
              },
            };
          })}
          handleChange={handleChange}
        />
      </div>

      <div className="wizard__clan-middle-container">
        <h2 className="wizard__clan-mon-heading">Clan Mon</h2>
        {!currentClan ? null : (
          <img
            className="wizard__clan-mon-image"
            alt={`${currentClan[0].clan} mon`}
            src={`${process.env.PUBLIC_URL}/images/mons-detail/${currentClan[0].clan}_Clan_mon.png`}
            style={{
              height: "7rem",
              // filter: "drop-shadow(0px 3px 1px rgba(0,0,0,0.3))",
            }}
          />
        )}
      </div>

      <div className="wizard__clan-right-container">
        <h2 className="wizard__clan-details-heading">Clan Details</h2>
        {!currentClan ? null : (
          <p className="wizard__clan-details-text">
            {/* A brief description of the {currentClan[0].clan} */}
            {currentClan[0].description}
          </p>
        )}
      </div>
    </section>
  );
};

export default ClanSelect;
