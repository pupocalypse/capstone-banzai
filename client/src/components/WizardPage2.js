import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Loader, Statistic } from "semantic-ui-react";

import WizardRingsTable from "./WizardRingsTable";

class WizardPage2 extends React.Component {
  // const WizardPage2 = ({ skills, currentClan, currentFamily, currentSchool }) => {
  state = {
    formSkillFields: [],
    skillOptions: [],
    // currentSelections: [], // an array of only skills that gets added below
  };

  componentDidMount() {
    this.setSkills();
    this.addSkillField();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.skills !== this.props.skills) {
      this.setSkills();
    }
  }

  getNonSchoolSkills = () => {};

  setSkills = () => {
    // get available options by eliminating already chosen skills
    // const allSkills = this.props.skills;
    let skillOptions = [];
    for (let skill in this.props.skills) {
      if (this.props.currentSchool.length !== 0) {
        let noMatches = true;
        for (let schoolSkill of this.props.character.skills) {
          // console.log("skill:", skill);
          // console.log("schoolSkill:", schoolSkill[0]);
          if (skill === schoolSkill[0]) {
            // console.log("skill:", skill);
            // console.log("schoolSkill[0]:", schoolSkill[0]);
            noMatches = false;
          }
        }
        if (noMatches) {
          skillOptions.push({
            key: skill,
            text: skill,
            value: skill,
            description: this.props.skills[skill].type,
          });
        }
      }
    }
    this.setState({
      skillOptions,
    });
  };

  // disableSkillOption = (e, { value }) => {
  //   // loop through skillOptions object, find match for value
  //   // delete skillOptions[value]
  //   console.log("data.value:", value);
  //   const updatedOptions = this.state.skillOptions.map((skill) => {
  //     if (skill.name === value) {
  //       skill.disabled = true;
  //     }
  //   });
  //   this.setState({
  //     skillOptions: updatedOptions,
  //   });
  // };

  addSkillField = () => {
    const skillFieldKey =
      this.state.formSkillFields.length > 0
        ? this.state.formSkillFields[this.state.formSkillFields.length - 1][0] +
          1
        : 1;

    this.setState({
      formSkillFields: [
        ...this.state.formSkillFields,
        [skillFieldKey, "", 1, ""],
      ],
    });
  };

  removeSkillField = (index) => {
    let formSkillFields = this.state.formSkillFields;
    formSkillFields.splice(index, 1);
    this.setState({
      formSkillFields,
    });
  };

  updateSelectedSkill = (e, { value }, index) => {
    console.log("data.value:", value);
    const skillName = value;
    let trait = this.props.skills[skillName].trait;
    // for (let key in this.props.skills) {
    //   if (key === skillName) {
    //     trait = this.props.skills[key].trait;
    //   }
    // }

    const updatedSkills = this.state.formSkillFields;
    updatedSkills[index][1] = skillName;
    updatedSkills[index][3] = trait;
    console.log("updatedSkills:", updatedSkills);

    this.setState({
      formSkillFields: updatedSkills,
    });
  };

  updateSkillRank = (e, index) => {};

  createCharacter = (e) => {
    // console.log("form:", e.target);
  };

  render() {
    return (
      <div className="wizard__part-two-container">
        <div className="wizard__form-container">
          <Form onSubmit={this.createCharacter}>
            <Form.Group widths="equal">
              <h4 className="wizard__form-details">
                You now have 20 starting experience points to spend. You may
                purchase additional skills, or higher ranks in existing skills
                (which contribute to your 'roll' dice) or your trait rings
                (these control your 'kept' dice). Once you've made your choices
                and named your character, click 'Save' to generate your
                character sheet.
                <br />
                <br />
                Note that some rank purchases may be at your GM's
                discretion&mdash;always check with them first!
              </h4>
              <Form.Input
                placeholder="Family Name"
                value={
                  this.props.character.lastName
                    ? this.props.character.lastName
                    : ""
                }
                onChange={this.props.updateLastName}
                label="Family Name"
              />
              <Form.Input placeholder="Given Name" label="Given Name" />
            </Form.Group>
            <div className="wizard__form-xp-rings-container">
              <div className="wizard__form-rings-borders-horizontal"></div>
              <div className="wizard__form-rings-borders-vertical"></div>
              <div className="wizard__form-rings-round-corner corner-top-left"></div>
              <div className="wizard__form-rings-round-corner corner-top-right"></div>
              <div className="wizard__form-rings-round-corner corner-bottom-left"></div>
              <div className="wizard__form-rings-round-corner corner-bottom-right"></div>

              <div className="wizard__form-rings-header-container">
                <h2 className="wizard__form-rings-heading">Rings</h2>
                <div className="wizard__form-xp-container">
                  <Statistic>
                    <Statistic.Value>20</Statistic.Value>
                    <Statistic.Label>XP</Statistic.Label>
                  </Statistic>
                </div>
              </div>

              <WizardRingsTable />
            </div>
            <div className="wizard__form-skills">
              <h2 className="wizard__skills-heading">School Skills</h2>
              {this.props.character.skills.length > 0 ? (
                this.props.character.skills.map((skill) => {
                  let ranks = [];
                  for (let i = skill[1]; i < 5; i++) {
                    ranks.push(i);
                  }
                  let trait = "";
                  for (let key in this.props.skills) {
                    if (key === skill[0]) {
                      trait = this.props.skills[key].trait;
                    }
                  }

                  return (
                    <div className="wizard__form-school-skill">
                      <h4 className="wizard__form-school-skill-name">
                        {skill[0]}
                      </h4>
                      <Form.Select
                        name={`skill-rank-${skill}`}
                        options={ranks.map((item) => {
                          return { key: item, text: item, value: item };
                        })}
                        placeholder="Rank..."
                        // label="Rank"
                        defaultValue={ranks[0]}
                        compact
                        className="wizard__form-skill-rank-select"
                        onChange={this.updateSkillRank}
                      />
                      <p className="wizard__form-school-skill-trait">
                        Trait: {trait}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="wizard__form-add-skill">
                  <Loader active inline />
                </div>
              )}
            </div>
            <div className="wizard__form-button-container">
              <div className="wizard__form-add-skill-button">
                <Button
                  circular
                  content="Add a new skill"
                  icon="add"
                  size="tiny"
                  onClick={this.addSkillField}
                />
              </div>
            </div>

            {/* {this.state.skillOptions.length > 0 ? ( */}
            {this.state.formSkillFields.map((key, index) => {
              console.log("form field key:", key);
              // console.log("form field index:", index);
              return (
                <div
                  className="wizard__form-add-skill"
                  key={`add-skill-${key[0]}`}
                >
                  <div className="wizard__form-add-skill-dropdowns">
                    <Form.Select
                      name={`skill-${key}`}
                      options={this.state.skillOptions}
                      placeholder="Select a skill..."
                      // label="Skill Name & Types"
                      defaultValue={this.state.skillOptions[0]}
                      className="wizard__form-skill-select"
                      onChange={(e, data) =>
                        this.updateSelectedSkill(e, data, index)
                      }
                    />
                    <Form.Select
                      name={`skill-${key}-rank`}
                      options={[1, 2, 3, 4].map((item) => {
                        return { key: item, text: item, value: item };
                      })}
                      placeholder="Rank..."
                      // label="Rank"
                      defaultValue={1}
                      compact
                      className="wizard__form-skill-rank-select"
                      onChange={this.updateSkillRank}
                    />
                    {!key[3] ? null : (
                      <p className="wizard__form-add-skill-trait">
                        Trait: {key[3]}
                      </p>
                    )}
                  </div>
                  {/* <div className="wizard__form-skill-details">{trait}</div> */}
                  <Button
                    circular
                    size="mini"
                    icon="remove"
                    negative
                    onClick={() => this.removeSkillField(index)}
                    className="wizard__form-skill-delete"
                  />
                </div>
              );
            })}
            {/* ) : (
              <div className="wizard__form-add-skill">
                <Loader active inline />
              </div>
            )} */}
            <div className="wizard__form-buttons">
              <Button
                as={Link}
                to="/build-character/page1"
                content="Back"
                icon="left arrow"
                labelPosition="left"
                floated="left"
                circular
                size="tiny"
              />
              <Button.Group size="tiny" floated="right">
                <Button negative>Cancel</Button>
                <Button.Or />
                <Button primary type="submit">
                  Save
                </Button>
              </Button.Group>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default WizardPage2;
