import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Loader } from "semantic-ui-react";

class WizardPage2 extends React.Component {
  // const WizardPage2 = ({ skills, currentClan, currentFamily, currentSchool }) => {
  state = {
    formSkillFields: [],
    skillOptions: [],
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

  setSkills = () => {
    let skillOptions = [];
    for (let skill in this.props.skills) {
      if (this.props.currentSchool.length !== 0) {
        for (let schoolSkill of this.props.currentSchool[0].skills.core) {
          if (skill !== schoolSkill[0]) {
            skillOptions.push({
              key: skill,
              text: skill,
              value: skill,
              description: this.props.skills[skill].type,
            });
          }
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
    const skillFieldNum =
      this.state.formSkillFields.length > 0
        ? this.state.formSkillFields[this.state.formSkillFields.length - 1] + 1
        : 1;

    this.setState({
      formSkillFields: [...this.state.formSkillFields, skillFieldNum],
    });
  };

  removeSkillField = (index) => {
    let formSkillFields = this.state.formSkillFields;
    formSkillFields.splice(index, 1);
    this.setState({
      formSkillFields,
    });
  };

  render() {
    return (
      <div className="wizard__part-two-container">
        <div className="wizard__form-container">
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Family Name"
                value={
                  this.props.character.lastName
                    ? this.props.character.lastName
                    : ""
                }
                onChange={this.props.updateLastName}
              />
              <Form.Input placeholder="Given Name" />
            </Form.Group>
            <Button
              circular
              content="Add a new skill"
              icon="add"
              color="blue"
              inverted
              size="tiny"
              onClick={this.addSkillField}
            />
            {this.state.skillOptions.length > 0 ? (
              this.state.formSkillFields.map((num, index) => {
                return (
                  <div
                    className="wizard__form-add-skill"
                    key={`add-skill-${num}`}
                  >
                    <Form.Select
                      options={this.state.skillOptions}
                      placeholder="Select a skill..."
                      // onChange={this.disableSkillOption}
                    />
                    <Button
                      circular
                      size="mini"
                      icon="remove"
                      color="red"
                      inverted
                      onClick={() => this.removeSkillField(index)}
                    />
                  </div>
                );
              })
            ) : (
              <Loader active inline />
            )}
          </Form>
        </div>

        <Button
          as={Link}
          to="/build-character/page1"
          content="Back"
          icon="left arrow"
          labelPosition="left"
          color="olive"
          circular
          size="tiny"
        />

        <Button.Group size="tiny">
          <Button>Cancel</Button>
          <Button.Or />
          <Button color="teal">Save</Button>
        </Button.Group>
      </div>
    );
  }
}

export default WizardPage2;
