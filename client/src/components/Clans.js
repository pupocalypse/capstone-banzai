import React from "react";

import Families from "./Families";
import Schools from "./Schools";

const Clans = ({ clans, schools, selectedClan, handleClick, open }) => {
  const clansList = clans.map((clan) => {
    return (
      <button
        className="clan__clan-button"
        key={clan.clan}
        onClick={() => handleClick(clan)}
      >
        <h3 className="clan__clan-name">{clan.clan}</h3>
      </button>
    );
  });

  return (
    <>
      <div className="clans-list">
        <h2 className="clans__heading">Select Your Clan</h2>
        {clansList}
      </div>
      {/* <Families clan={selectedClan} open={open} /> */}
      <Schools clan={selectedClan} schools={schools} />
    </>
  );
};

export default Clans;
