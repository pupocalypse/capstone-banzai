import React from "react";
import DropdownMenu from "./DropdownMenu";
import { Divider } from "semantic-ui-react";

const FamilySelect = ({ currentClan, currentFamily, handleChange }) => {
  return (
    <>
      <section className="wizard__family-container">
        <div className="wizard__left-container">
          <h2 className="wizard__heading">Select Family</h2>
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

        {/* <Divider horizontal>
        <span className="wizard__divider-text">万歳</span>
      </Divider> */}

        <div className="wizard__middle-container">
          <h2 className="wizard__heading">Family Bonus</h2>
          {!currentFamily ? (
            <p className="wizard__waiting-text">
              Please select a clan, then family
            </p>
          ) : (
            <p className="wizard__bonus-text">
              Bonus: +1 {currentFamily[0].bonus}
            </p>
          )}
        </div>

        <Divider horizontal>
          <span className="wizard__divider-text">万歳</span>
        </Divider>

        <div className="wizard__right-container">
          <h2 className="wizard__heading">Family Details</h2>
          {!currentFamily ? (
            <p className="wizard__waiting-text">
              Please select a clan, then family
            </p>
          ) : (
            <p className="wizard__details-text">
              {/* A brief description of the {currentFamily[0].name} family */}
              {currentFamily[0].description}
            </p>
          )}
        </div>
      </section>

      {/* <Divider horizontal>
        <span className="wizard__divider-text">万歳</span>
      </Divider> */}
    </>
  );
};

export default FamilySelect;
