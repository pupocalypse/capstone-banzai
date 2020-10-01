import React from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Loader,
  Statistic,
  Icon,
  Modal,
  Message,
} from "semantic-ui-react";

import WizardRingsTable from "./WizardRingsTable";

class WizardPage2 extends React.Component {
  state = {
    formSkillFields: [],
    skillOptions: [],
    artworkFile: "",
    open: false, // for modal, not using hooks
  };

  componentDidMount() {
    this.setSkills();
    this.addSkillField();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.skills !== this.props.skills) {
      this.setSkills();
    }
  }

  // get available options by eliminating already chosen skills
  setSkills = () => {
    let skillOptions = [];
    for (let skill in this.props.skills) {
      if (this.props.currentSchool.length !== 0) {
        let noMatches = true;
        for (let schoolSkill of this.props.character.skills) {
          if (skill === schoolSkill[0]) {
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

  addSkillField = () => {
    const skillFieldKey =
      this.state.formSkillFields.length > 0
        ? this.state.formSkillFields[this.state.formSkillFields.length - 1][0] +
          1
        : 1;

    this.setState({
      formSkillFields: [
        ...this.state.formSkillFields,
        // key for list, skill, rank, trait
        [skillFieldKey, "", 1, ""],
      ],
    });
    this.props.updateCurrentExp(1);
  };

  removeSkillField = (index) => {
    let formSkillFields = this.state.formSkillFields;
    formSkillFields.splice(index, 1);
    this.setState({
      formSkillFields,
    });
  };

  updateSelectedSkill = (e, { value }, index) => {
    const skillName = value;
    let trait = this.props.skills[skillName].trait;

    const updatedSkills = this.state.formSkillFields;
    updatedSkills[index][1] = skillName;
    updatedSkills[index][3] = trait;

    this.setState({
      formSkillFields: updatedSkills,
    });
  };

  // receives new value of rank dropdown, calculates the difference
  // in previous formSkillField rank, adds exp cost to expModifiers array
  spendSkillExp = (e, { value }, index) => {
    const formSkillFields = [...this.state.formSkillFields];
    const currentRank = formSkillFields[index][2];
    let requiredExp = 0;
    if (value > currentRank) {
      for (let i = currentRank; i < value; i++) {
        requiredExp += i + 1;
      }
    } else if (value < currentRank) {
      for (let i = currentRank; i > value; i--) {
        requiredExp -= i;
      }
    }
    if (requiredExp > this.props.character.currentExp) {
      alert(`You do not have enough experience for this upgrade\n
      Required Experience: ${requiredExp}\n
      Current Experience: ${this.props.character.currentExp}`);
      return;
    }

    formSkillFields[index][2] = value;
    this.setState({ formSkillFields });
    this.props.updateCurrentExp(requiredExp);
  };

  changeArtwork = (e) => {
    this.setState({
      artworkFile: e.target.files[0],
      tempFile: URL.createObjectURL(e.target.files[0]),
    });
  };

  resetChanges = () => {
    this.setState({ formSkillFields: [], artworkFile: "" });
  };

  // callback for passed onSubmit function
  createCharacter = () => {
    let boughtSkills;
    boughtSkills = this.state.formSkillFields.reduce(
      (acc, [key, skillName, rank, trait]) => {
        if (skillName) {
          acc.push([skillName, rank]);
        }
        return acc;
      },
      []
    );

    return { boughtSkills, artworkFile: this.state.artworkFile };
  };

  render() {
    return (
      <div className="wizard__part-two-container">
        <div className="wizard__form-container">
          <Form
            onSubmit={(e) =>
              this.props.submitCharacter(e, this.createCharacter)
            }
            encType="multipart/form-data"
            error={this.props.character.firstName ? false : true}
          >
            <Form.Group widths="equal">
              <h4 className="wizard__form-details">
                You now have {this.props.character.totalExp} starting experience
                points to spend. You may purchase additional skills, or higher
                ranks in existing skills (which contribute to your 'roll' dice)
                or your trait rings (these control your 'kept' dice). Once
                you've made your choices and named your character, click 'Save'
                to generate your character sheet.
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
              <Form.Input
                placeholder="Given Name"
                label="Given Name"
                onChange={this.props.updateFirstName}
              />
              <div className="wizard__form-selections-container">
                <table className="wizard__form-selections-table">
                  <thead>
                    <tr>
                      <td colSpan="4" className="wizard__selections-header">
                        Current Selections
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        rowSpan="4"
                        className="wizard__selections-table-mon"
                        style={{
                          background: `url(${process.env.PUBLIC_URL}/images/mons-detail/${this.props.character.clan}_Clan_mon.png) no-repeat`,
                          backgroundSize: "contain",
                          backgroundPosition: "top",
                        }}
                      ></td>
                      <td className="wizard__selections-table-category">
                        Clan:
                      </td>
                      <td className="wizard__selections-table-item">
                        {this.props.character.clan}
                      </td>
                    </tr>
                    <tr>
                      <td className="wizard__selections-table-category">
                        Class:
                      </td>
                      <td className="wizard__selections-table-item">
                        {this.props.character.job}
                      </td>
                    </tr>
                    <tr>
                      <td className="wizard__selections-table-category">
                        Family:
                      </td>
                      <td className="wizard__selections-table-item">
                        {this.props.character.family.name}
                      </td>
                      <td className="wizard__selections-table-bonus">
                        +1 {this.props.character.family.bonus}
                      </td>
                    </tr>
                    <tr>
                      <td className="wizard__selections-table-category">
                        School:
                      </td>
                      <td className="wizard__selections-table-item">
                        {this.props.character.school.name}
                      </td>
                      <td className="wizard__selections-table-bonus">
                        +1 {this.props.character.school.bonus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                    <Statistic.Value>
                      {this.props.character.currentExp}
                    </Statistic.Value>
                    <Statistic.Label>XP</Statistic.Label>
                  </Statistic>
                </div>
              </div>

              <WizardRingsTable
                rings={this.props.character.rings}
                spendTraitExp={this.props.spendTraitExp}
              />
              <p className="wizard__form-rings-details">
                Element rings take the lesser rank of their two traits
              </p>
              <p className="wizard__form-rings-details">
                Upgrading trait rings costs{" "}
                <strong className="pop-text-2">next rank &times; 4</strong>
              </p>
              <p className="wizard__form-rings-details">
                Upgrading Void ring costs{" "}
                <strong className="pop-text-2">next rank &times; 6</strong>
              </p>
            </div>
            <div className="wizard__form-skills">
              <h2 className="wizard__skills-heading">School Skills</h2>
              {this.props.character.skills.length > 0 ? (
                this.props.character.skills.map((skill, index) => {
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
                    <div
                      className="wizard__form-school-skill"
                      key={`school-skill-${skill[0]}`}
                    >
                      <h4 className="wizard__form-school-skill-name">
                        {skill[0]}
                      </h4>
                      <Form.Select
                        name={`skill-rank-${skill}`}
                        options={ranks.map((item) => {
                          return { key: item, text: item, value: item };
                        })}
                        placeholder="Rank..."
                        // defaultValue={ranks[0]}
                        value={
                          this.props.character.skills[index][2]
                            ? this.props.character.skills[index][2]
                            : this.props.character.skills[index][1]
                        }
                        compact
                        className="wizard__form-skill-rank-select"
                        onChange={(e, data) =>
                          this.props.spendSchoolSkillExp(e, data, index)
                        }
                      />
                      <p className="wizard__form-school-skill-trait">
                        Trait: {trait}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="wizard__form-add-skill loading">
                  <Loader active inline />
                </div>
              )}
            </div>
            <div className="wizard__form-button-container">
              <p className="wizard__form-skills-details">
                Upgrading skills costs{" "}
                <strong className="pop-text-2">next rank</strong> in experience
              </p>
              <div className="wizard__form-add-skill-button">
                <Button
                  circular
                  content="Add a new skill"
                  icon="add"
                  size="tiny"
                  onClick={this.addSkillField}
                  type="button"
                />
              </div>
            </div>

            {this.state.skillOptions.length > 0 ? (
              this.state.formSkillFields.map((key, index) => {
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
                        // defaultValue={this.state.skillOptions[0]}
                        className="wizard__form-skill-select"
                        onChange={(e, data) =>
                          this.updateSelectedSkill(e, data, index)
                        }
                      />
                      {!this.state.formSkillFields[index][1] ? (
                        <Form.Select
                          name={`skill-${key}-rank`}
                          options={[1, 2, 3, 4].map((item) => {
                            return { key: item, text: item, value: item };
                          })}
                          placeholder="Rank..."
                          defaultValue={1}
                          compact
                          className="wizard__form-skill-rank-select"
                          disabled
                        />
                      ) : (
                        <Form.Select
                          name={`skill-${key}-rank`}
                          options={[1, 2, 3, 4].map((item) => {
                            return { key: item, text: item, value: item };
                          })}
                          placeholder="Rank..."
                          defaultValue={1}
                          compact
                          className="wizard__form-skill-rank-select"
                          onChange={(e, data) =>
                            this.spendSkillExp(e, data, index)
                          }
                        />
                      )}
                      {!key[3] ? null : (
                        <p className="wizard__form-add-skill-trait">
                          Trait: {key[3]}
                        </p>
                      )}
                    </div>
                    <Button
                      circular
                      size="mini"
                      icon="remove"
                      negative
                      onClick={() => this.removeSkillField(index)}
                      className="wizard__form-skill-delete"
                      type="button"
                    />
                  </div>
                );
              })
            ) : (
              <div className="wizard__form-add-skill loading">
                <Loader active inline />
              </div>
            )}

            <div className="wizard__form-upload-container">
              <div className="wizard__form-upload-text-container">
                <h3 className="wizard__form-upload-heading">
                  Upload Character Artwork
                </h3>
                <p className="wizard__form-upload-details">
                  Provide an image that you feel represents your character. Try
                  to use something where the important details of the character
                  are the main focus of the artwork and roughly centred.
                </p>
                <div className="wizard__form-input-container">
                  <Button
                    as="label"
                    htmlFor="artworkFile"
                    circular
                    size="tiny"
                    className="wizard__form-upload-label"
                    type="button"
                  >
                    <Icon name="file image"></Icon>
                    Upload
                    <input
                      type="file"
                      id="artworkFile"
                      name="artworkFile"
                      className="wizard__form-upload-input"
                      onChange={(e) => this.changeArtwork(e)}
                    />
                  </Button>
                  <p className="wizard__form-upload-filename">
                    {this.state.artworkFile.name
                      ? this.state.artworkFile.name
                      : "Select a file..."}
                  </p>
                </div>
              </div>
              <div className="wizard__form-upload-image-container">
                {this.state.tempFile ? (
                  <img
                    src={this.state.tempFile}
                    className="wizard__form-upload-image"
                    alt=""
                  />
                ) : (
                  <Icon
                    name="file image"
                    className="wizard__form-upload-icon"
                    size="huge"
                  ></Icon>
                )}
              </div>
            </div>

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
                onClick={this.props.backButtonClick}
                type="button"
              />
              <Button
                content="Reset"
                icon="exclamation circle"
                circular
                size="tiny"
                onClick={() => this.props.resetExpSpent(this.resetChanges)}
                negative
                type="button"
              />
              <Button.Group size="tiny" floated="right">
                <Button negative type="button">
                  Cancel
                </Button>
                <Button.Or />
                <Modal
                  basic
                  trigger={
                    <Button
                      primary
                      type="submit"
                      disabled={this.props.character.firstName ? false : true}
                    >
                      Save
                    </Button>
                  }
                  onClose={() => this.setState({ open: false })}
                  onOpen={() => this.setState({ open: true })}
                  open={this.state.open}
                  size="small"
                >
                  <Modal.Content>
                    {this.state.tempFile ? (
                      <img
                        src={this.state.tempFile}
                        alt=""
                        className="wizard__modal-image"
                      />
                    ) : (
                      <Icon
                        name="file text"
                        size="massive"
                        className="wizard__modal-icon"
                      />
                    )}
                    <div className="wizard__modal-description">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/mons-colour/Mon_${this.props.character.clan}_colour.png`}
                        alt=""
                        className="wizard__modal-mon"
                      />
                      <h1 className="wizard__modal-heading">
                        Character Saved!
                      </h1>
                      <p>
                        You may now view your completed character sheet and
                        continue editing as desired.
                      </p>
                    </div>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button circular as={Link} to="/build-character/page1">
                      Return to Start
                    </Button>
                    <Button
                      primary
                      circular
                      as={Link}
                      to={`/characters/${this.props.id}`}
                    >
                      View Character Sheet
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Button.Group>
            </div>
            <Message
              error
              content="You must enter a name for your character before submitting"
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default WizardPage2;
