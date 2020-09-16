import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Divider } from "semantic-ui-react";

// receives currentClan as prop
const ClanSelect = ({ clans, currentClan, handleChange }) => {
  const localStorageClan = JSON.parse(localStorage.getItem("current clan"));

  return (
    <section className="wizard__clan-container">
      <div className="wizard__left-container">
        <h2 className="wizard__heading">Select Clan</h2>
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

      <Divider horizontal>
        <span className="wizard__divider-text">万歳</span>
      </Divider>

      <div className="wizard__middle-container">
        <h2 className="wizard__heading">Clan Mon</h2>
        {!currentClan ? null : (
          <img
            className="wizard__clan-mon-image"
            alt={`${currentClan[0].clan} mon`}
            src={`${process.env.PUBLIC_URL}/images/mons-detail/${currentClan[0].clan}_Clan_mon.png`}
            style={{
              height: "7rem",
              width: "auto",
              // filter: "drop-shadow(0px 3px 1px rgba(0,0,0,0.3))",
            }}
          />
        )}
      </div>

      <Divider horizontal>
        <span className="wizard__divider-text">万歳</span>
      </Divider>

      <div className="wizard__right-container">
        <h2 className="wizard__heading">Clan Details</h2>
        {!currentClan ? null : (
          <p className="wizard__details-text">
            {/* A brief description of the {currentClan[0].clan} */}
            {currentClan[0].description}
          </p>
        )}
      </div>
    </section>
  );
};

export default ClanSelect;
