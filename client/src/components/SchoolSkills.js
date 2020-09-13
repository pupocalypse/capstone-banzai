import React from "react";

const SchoolSkills = ({ currentSchool }) => {
  let skillList = currentSchool[0].skills.core.map((skill) => {
    return (
      <li
        className="skill"
        key={`${currentSchool[0].name.split(" ").join("")}-${skill[0]}`}
      >
        {skill[0]} {skill[1]}
      </li>
    );
  });

  return (
    <ul className="school-skills">
      <h4 className="school-skills__list-heading">Starting Skills</h4>
      {skillList}
    </ul>
  );
};

export default SchoolSkills;
