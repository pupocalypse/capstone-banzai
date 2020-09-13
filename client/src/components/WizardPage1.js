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
  updateClan,
  updateFamily,
  updateSchool,
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
      />

      <Link to="/build-character/page2">
        <Button
          content="Next"
          icon="right arrow"
          labelPosition="right"
          color="olive"
          circular
          size="tiny"
        />
      </Link>
    </div>
  );
};

export default WizardPage1;
