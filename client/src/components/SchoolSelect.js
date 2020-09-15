import React from "react";
import DropdownMenu from "./DropdownMenu";
import SchoolSkills from "./SchoolSkills";
import SchoolSkillDropdown from "./SchoolSkillDropdown";

const SchoolSelect = ({
  currentClan,
  currentSchool,
  skills,
  handleChange,
  schoolSkillsSelected,
}) => {
  return (
    <section className="wizard__school-container">
      <div className="wizard__school-left-container">
        <h2 className="school__left-heading">Select School</h2>
        <DropdownMenu
          title={"School"}
          dropdownOptions={
            currentClan.length <= 0
              ? null
              : currentClan[0].schools
                  .filter((school) => school.type === "bushi")
                  .map((school) => {
                    return {
                      key: school.name,
                      text: school.name,
                      value: school.name,
                    };
                  })
          }
          handleChange={handleChange}
        />
      </div>

      <div className="wizard__school-middle-container">
        <h2 className="school__bonus-heading">School Bonus & Skills</h2>
        {!currentSchool ? null : (
          <>
            <p className="school__bonus-text">
              Bonus: +1 {currentSchool[0].bonus}
            </p>
            <SchoolSkills currentSchool={currentSchool} skills={skills} />
            <SchoolSkillDropdown
              currentSchool={currentSchool}
              skills={skills}
              schoolSkillsSelected={schoolSkillsSelected}
            />
          </>
        )}
      </div>

      <div className="wizard__school-right-container">
        <h2 className="school__details-heading">School Details</h2>
        {!currentSchool ? null : (
          <p className="clan__details-text">
            A brief description of the {currentSchool[0].name} school
          </p>
        )}
      </div>
    </section>
  );
};

export default SchoolSelect;
