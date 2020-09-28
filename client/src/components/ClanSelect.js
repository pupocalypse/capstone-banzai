import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Divider } from "semantic-ui-react";

const ClanSelect = ({ clans, currentClan, handleChange }) => {
  return (
    <>
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

        {/* <Divider horizontal>
        <span className="wizard__divider-text">万歳</span>
      </Divider> */}

        <div className="wizard__middle-container">
          <h2 className="wizard__heading">Clan Mon</h2>
          {!currentClan ? (
            <p className="wizard__waiting-text">Please select a clan</p>
          ) : (
            <img
              className="wizard__clan-mon-image"
              alt={`${currentClan[0].clan} mon`}
              src={`${process.env.PUBLIC_URL}/images/mons-detail/${currentClan[0].clan}_Clan_mon.png`}
              style={{
                height: "7rem",
                width: "auto",
              }}
            />
          )}
        </div>

        <Divider horizontal>
          <span className="wizard__divider-text">万歳</span>
        </Divider>

        <div className="wizard__right-container">
          <h2 className="wizard__heading">Clan Details</h2>
          {!currentClan ? (
            <p className="wizard__waiting-text">Please select a clan</p>
          ) : (
            <p className="wizard__details-text">{currentClan[0].description}</p>
          )}
        </div>
      </section>

      {/* <Divider horizontal>
        <span className="wizard__divider-text">万歳</span>
      </Divider> */}
    </>
  );
};

export default ClanSelect;
