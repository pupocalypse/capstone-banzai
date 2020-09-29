import React from "react";

const CharSkillsTable = ({ char }) => {
  const skillRollCalculator = (rank, trait) => {
    let traitRank;
    for (let ring in char.rings) {
      if (char.rings[ring].traits.hasOwnProperty(trait)) {
        traitRank = char.rings[ring].traits[trait].rank;
      }
    }
    return `${rank + traitRank}k${traitRank}`;
  };

  const capitalize = (string) => {
    if (string.includes(" ")) {
      return string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const skillList = () => {
    const { skills } = char;
    let skillRows = [];
    for (let s in skills) {
      const skill = skills[s];
      const skillTypes = [skill.type, skill.subTypes].flat();
      skillTypes.join(", ");

      skillRows.push(
        <tr className="character-sheet__skills-item" key={`skill-${s}`}>
          <td className="character-sheet__skill-name pop-text-2">
            {capitalize(s)}
          </td>
          <td className="character-sheet__skill-rank">{skill.rank}</td>
          <td className="character-sheet__skill-trait">
            {capitalize(skill.trait)}
          </td>
          <td className="character-sheet__skill-roll">
            <span className="skill-roll">
              {skillRollCalculator(skill.rank, skill.trait)}
            </span>
          </td>
          <td className="character-sheet__skill-types">{skillTypes}</td>
        </tr>
      );
    }
    return skillRows;
  };

  return (
    <section className="character-sheet__skills-container">
      <table className="character-sheet__skills-table">
        <thead>
          <tr className="character-sheet__skills-header-row">
            <th className="character-sheet_skills-heading heading-name">
              Skill Name
            </th>
            <th className="character-sheet_skills-heading heading-rank">
              Rank
            </th>
            <th className="character-sheet_skills-heading heading-trait">
              Trait
            </th>
            <th className="character-sheet_skills-heading heading-roll">
              Roll
            </th>
            <th className="character-sheet_skills-heading heading-types">
              Types
            </th>
          </tr>
        </thead>
        <tbody>{skillList()}</tbody>
      </table>
    </section>
  );
};

export default CharSkillsTable;
