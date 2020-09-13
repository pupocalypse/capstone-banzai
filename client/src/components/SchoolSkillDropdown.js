import React from "react";
import { Dropdown } from "semantic-ui-react";

// receives currentSchool prop
const SchoolSkillDropdown = ({ currentSchool, skills }) => {
  const freeSkillsDropdown = currentSchool[0].skills.freePickType.map(
    (skillType) => {
      let dropdownHeading;
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
      if (skillType.length > 1) {
        for (let type of skillType) {
          // skillTypeItems.push(
          //   <Dropdown.Divider />,
          //   <Dropdown.Header
          //     content={`Type: ${type}`}
          //     key={`${type}-header`}
          //   />,
          //   <Dropdown.Divider />
          // );
          for (let skill in skills) {
            // console.log("free skill:", skills[skill]);
            if (
              skills[skill].type.toLowerCase() === type &&
              !currentSchool[0].skills.core.flat().includes(skill)
            ) {
              skillList[skill] = skills[skill];
              skillTypeItems.push(
                // <Dropdown.Item key={skill}>{skill}</Dropdown.Item>
                {
                  key: skill,
                  text: skill,
                  value: skill,
                  description: skills[skill].type,
                }
              );
            }
          }
        }
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
        <>
          <label className="skills__pick-label">{dropdownHeading}</label>
          <Dropdown
            placeholder={"Select skill"}
            selection
            search
            scrolling
            options={skillTypeItems}
          ></Dropdown>
        </>
      );
    }
  );

  return (
    <div className="skills__pick-container">
      {!currentSchool ? <p>Loading...</p> : freeSkillsDropdown}
    </div>
  );
};

export default SchoolSkillDropdown;
