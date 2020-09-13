import React from "react";
import DropdownMenu from "./DropdownMenu";

const FamilySelect = ({ currentClan, currentFamily, handleChange }) => {
  return (
    <section className="wizard__family-container">
      <div className="wizard__family-left-container">
        <h2 className="family__left-heading">Select Family</h2>
        <DropdownMenu
          title={"Family"}
          dropdownOptions={
            currentClan.length <= 0
              ? null
              : currentClan[0].families.map((family) => {
                  return {
                    key: family.name,
                    text: family.name,
                    value: family.name,
                  };
                })
          }
          handleChange={handleChange}
        />
      </div>

      <div className="wizard__family-middle-container">
        <h2 className="family__bonus-heading">Family Bonus</h2>
        {!currentFamily ? null : (
          <p className="family__bonus-text">
            Bonus: +1 {currentFamily[0].bonus}
          </p>
        )}
      </div>

      <div className="wizard__family-right-container">
        <h2 className="family__details-heading">Family Details</h2>
        {!currentFamily ? null : (
          <p className="clan__details-text">
            A brief description of the {currentFamily[0].name} family
          </p>
        )}
      </div>
    </section>
  );
};

export default FamilySelect;
