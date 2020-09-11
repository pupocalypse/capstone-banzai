import React from "react";

const Families = ({ clan, open }) => {
  const familiesList =
    clan && clan.families ? (
      clan.families.map((family) => {
        return (
          <div className="family-container" key={`${clan.clan}-${family.name}`}>
            <h3 className="family__name">{family.name}</h3>
            <p className="family__bonus">Bonus: +1 {family.bonus}</p>
            <div className="family__about-container">
              <h4 className="family__about-heading">
                About the {family.name} family
              </h4>
              <p className="family__about">Details to come...</p>
            </div>
          </div>
        );
      })
    ) : (
      <div className="family-container">Loading...</div>
    );

  return (
    <div className="families-list">
      <h2 className="families__heading">Select Your Family</h2>
      {clan && clan.families ? (
        familiesList
      ) : (
        <div className="family-container">
          <p className="family__loading">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Families;
