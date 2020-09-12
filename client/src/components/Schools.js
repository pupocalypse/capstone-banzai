import React from "react";

// bonuses = () => {};

// SkillComponent = (name, bonus) => {
//   //
// };

// SchoolComponent = (name, clan, bonus, skills) => {
//   return (
//     <div>
//       ...
//       {skills.core.reduce(bonuses).map((skill) => {
//         return <SkillComponent bonus={skill.bonus} />;
//       })}
//     </div>
//   );
// };

// RenderSchools = (clan, schools) => {
//   clanSchools = schools.filter((school) => school.clan === clan.clan);
//   clanSchools.map((cs) => {
//     return (
//       <SchoolComponent
//         name={cs.name}
//         clan={cs.clan}
//         bonus={cs.bonus}
//         skills={cs.skills}
//       />
//     );
//   });
// };

const SchoolSkills = ({ schoolName, schoolSkills }) => {
  // console.log("schoolSkills prop:", schoolSkills);
  const skills = schoolSkills.map((skill) => {
    return (
      <li
        className="school__skill"
        key={`${schoolName.split(" ").join("")}-${skill[0]}`}
      >
        {skill[0]} {skill[1]}
      </li>
    );
  });
  return skills;
};

const Schools = ({ clan, schools }) => {
  const schoolsList =
    clan && clan.schools ? (
      clan.schools
        .filter((school) => school.type === "bushi")
        .map((school) => {
          for (let schoolDetails of schools) {
            if (schoolDetails.name === school.name) {
              return (
                <div
                  className="school-container"
                  key={`${clan.clan}-${school.name}`}
                >
                  <h3 className="school__name">{school.name}</h3>
                  <p className="school__bonus">
                    Bonus: +1 {schoolDetails.bonus}
                  </p>
                  <div className="school__about-container">
                    <h4 className="school__about-heading">
                      About the {school.name} school
                    </h4>
                    <p className="school__about">Details to come...</p>
                    <ul className="school__skillsList">
                      <SchoolSkills
                        schoolName={school.name}
                        schoolSkills={schoolDetails.skills.core}
                      />
                    </ul>
                  </div>
                </div>
              );
            }
          }
        })
    ) : (
      <div className="family-container">Loading...</div>
    );

  return (
    <div className="schools-list">
      <h2 className="schools__heading">Select Your School</h2>
      {schoolsList}
    </div>
  );
};

export default Schools;
