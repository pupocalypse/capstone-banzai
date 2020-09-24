import React from "react";
import { Dropdown } from "semantic-ui-react";

const SchoolSkillDropdown = ({
  currentSchool,
  skills,
  schoolSkillsSelected,
}) => {
  const freeSkillsDropdown = currentSchool[0].skills.freePickType.map(
    (skillType, index) => {
      let dropdownHeading;
      // most schools have one free pick skill
      // that skill will either have a specified type or allow for any skill to be picked
      // some schools have more than one free pick skill, same rules for type
      if (skillType.length === 1 && skillType.includes("any")) {
        dropdownHeading = "Select any skill";
      } else if (skillType.length === 1) {
        dropdownHeading = `Select any ${skillType[0]} skill`;
      } else if (skillType.length > 1) {
        dropdownHeading = `Select any ${skillType[0]} or ${skillType[1]} skill`;
      }

      // remember skills is not an array, but an object!
      let skillList = {};
      let skillTypeItems = [];
      // render multiple drop downs if there are multiple free picks
      if (skillType.length > 1) {
        for (let type of skillType) {
          for (let skill in skills) {
            if (
              skills[skill].type.toLowerCase() === type &&
              !currentSchool[0].skills.core.flat().includes(skill)
            ) {
              skillList[skill] = skills[skill];
              skillTypeItems.push({
                key: skill,
                text: skill,
                value: skill,
                description: skills[skill].type,
              });
            }
          }
        }
        // render all skills for free picks of 'any' type
      } else if (skillType.includes("any")) {
        for (let skill in skills) {
          if (!currentSchool[0].skills.core.flat().includes(skill)) {
            skillList[skill] = skills[skill];
            skillTypeItems.push({
              key: skill,
              text: skill,
              value: skill,
              description: skills[skill].type,
            });
          }
        }
        // take skills of matching type, as long as the school does not already offer them
      } else {
        for (let skill in skills) {
          if (
            skills[skill].type.toLowerCase() === skillType[0] &&
            !currentSchool[0].skills.core.flat().includes(skill)
          ) {
            skillList[skill] = skills[skill];
            skillTypeItems.push({
              key: skill,
              text: skill,
              value: skill,
              description: skills[skill].type,
            });
          }
        }
      }

      return (
        <div
          className="wizard__skills-pick-dropdown"
          key={`free-pick-${index}`}
        >
          <label className="wizard__skills-pick-label">{dropdownHeading}</label>
          <Dropdown
            placeholder={"Select skill"}
            selection
            search
            scrolling
            options={skillTypeItems}
            onChange={(e, data) => schoolSkillsSelected(e, data, index)}
          ></Dropdown>
        </div>
      );
    }
  );

  return (
    <div className="wizard__skills-pick-container">
      {!currentSchool ? <p>Loading...</p> : freeSkillsDropdown}
    </div>
  );
};

export default SchoolSkillDropdown;
