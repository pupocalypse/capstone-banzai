import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

import ClanSelect from "./ClanSelect";
import FamilySelect from "./FamilySelect";
import SchoolSelect from "./SchoolSelect";

const WizardPage1 = ({
  clans,
  skills,
  currentClan,
  currentFamily,
  currentSchool,
  selectSkills,
  updateClan,
  updateFamily,
  updateSchool,
  schoolSkillsSelected,
  nextPageClick,
  resetInputs,
  // buttonColour,
}) => {
  return (
    <div className="wizard__part-one-container">
      <ClanSelect
        clans={clans}
        currentClan={currentClan}
        handleChange={updateClan}
      />

      <FamilySelect
        currentClan={currentClan}
        currentFamily={currentFamily}
        handleChange={updateFamily}
      />

      <SchoolSelect
        currentClan={currentClan}
        currentSchool={currentSchool}
        skills={skills}
        handleChange={updateSchool}
        schoolSkillsSelected={schoolSkillsSelected}
      />

      <Button
        content="Reset"
        icon="exclamation circle"
        labelPosition="left"
        // color="red"
        circular
        size="tiny"
        onClick={resetInputs}
        negative
      />
      {currentFamily &&
      selectSkills.length !== 0 &&
      selectSkills.every((item) => !!item) ? (
        <Button
          as={Link}
          to="/build-character/page2"
          content="Next"
          icon="right arrow"
          labelPosition="right"
          // color="olive"
          circular
          size="tiny"
          onClick={nextPageClick}
          primary
        />
      ) : (
        <Button
          content="Next"
          icon="right arrow"
          labelPosition="right"
          // color="olive"
          circular
          size="tiny"
          primary
          disabled
        />
      )}
    </div>
  );
};

export default WizardPage1;
