import React from "react";
import DropdownMenu from "./DropdownMenu";

// receives currentClan as prop
const ClanSelect = ({ clans, currentClan, handleChange }) => {
  return (
    <section className="wizard__clan-container">
      <div className="wizard__clan-left-container">
        <h2 className="clan__left-heading">Select Clan</h2>
        <DropdownMenu
          title={"Clan"}
          dropdownOptions={clans.map((clan) => {
            return {
              key: clan.clan,
              text: clan.clan,
              value: clan.clan,
              image: {
                avatar: true,
                src: `./images/mons-colour/Mon_${clan.clan}_colour.png`,
              },
            };
          })}
          handleChange={handleChange}
        />
      </div>

      <div className="wizard__clan-middle-container">
        <h2 className="clan__mon-heading">Clan Mon</h2>
        {!currentClan ? null : (
          <img
            className="clan__mon-image"
            alt={`${currentClan[0].clan} mon`}
            src={`./images/mons-detail/${currentClan[0].clan}_Clan_mon.png`}
            style={{
              height: "7rem",
              // filter: "drop-shadow(0px 3px 1px rgba(0,0,0,0.3))",
            }}
          />
        )}
      </div>

      <div className="wizard__clan-right-container">
        <h2 className="clan__details-heading">Clan Details</h2>
        {!currentClan ? null : (
          <p className="clan__details-text">
            A brief description of the {currentClan[0].clan}
          </p>
        )}
      </div>
    </section>
  );
};

export default ClanSelect;
