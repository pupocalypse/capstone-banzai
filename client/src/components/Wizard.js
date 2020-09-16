import React from "react";
import { Route, Switch } from "react-router-dom";
// import { Button } from "semantic-ui-react";

// import UITest from "./UI-Test";
// import DropdownMenu from "./DropdownMenu";
// import ClanSelect from "./ClanSelect";
// import FamilySelect from "./FamilySelect";
// import SchoolSelect from "./SchoolSelect";
import WizardPage1 from "./WizardPage1";
import WizardPage2 from "./WizardPage2";
import WizardHeader from "./WizardHeader";

import { Character } from "./CharacterClasses";

class Wizard extends React.Component {
  state = {
    currentClan: "",
    currentFamily: "",
    currentSchool: "",
    selectSkills: [],
    character: {
      firstName: "",
      lastName: "",
      clan: "",
      family: {}, // family name, bonus
      school: {}, // school name, bonus
      job: "",
      skills: {},
      rings: {},
    },
    buttonColour: "",
  };

  componentDidMount() {
    console.log("Wizard component mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.character !== this.state.character) {
      localStorage.setItem(
        "new character",
        JSON.stringify(this.state.character)
      );
    }
    console.log("Wizard component updated");
  }

  updateCurrentClan = (e, { value }) => {
    const currentClan = this.props.clans.filter((clan) => clan.clan === value);

    this.setState(
      {
        currentClan,
      },
      () => {
        localStorage.setItem(
          "current clan",
          JSON.stringify(this.state.currentClan)
        );
        this.buttonColour();
      }
    );
  };

  updateCurrentFamily = (e, { value }) => {
    const currentFamily = this.state.currentClan[0].families.filter(
      (family) => family.name === value
    );

    this.setState(
      {
        currentFamily,
      },
      () =>
        localStorage.setItem(
          "current family",
          JSON.stringify(this.state.currentFamily)
        )
    );
  };

  updateCurrentSchool = (e, { value }) => {
    const currentSchool = this.state.currentClan[0].schools.filter(
      (school) => school.name === value
    );
    const schoolDetails = this.props.schools.filter(
      (school) => school.name === currentSchool[0].name
    );

    let selectSkills = [];
    for (let i = 0; i < schoolDetails[0].skills.freePickType.length; i++) {
      selectSkills.push(false);
      // console.log("selectSkills setting:", selectSkills);
    }

    this.setState(
      {
        currentSchool: schoolDetails,
        selectSkills,
        character: {
          ...this.state.character,
          job: currentSchool[0].type,
        },
      },
      () =>
        localStorage.setItem(
          "current school",
          JSON.stringify(this.state.currentSchool)
        )
    );
  };

  updateLastName = (e, { value }) => {
    // receives Form.Input value on change,
    // updated character.lastName in state
    this.setState({
      character: {
        ...this.state.character,
        lastName: value,
      },
    });
  };

  schoolSkillsSelected = (index) => {
    console.log("index:", index);
    let selectedSkill = this.state.selectSkills;
    selectedSkill[index] = true;
    this.setState({
      selectSkills: selectedSkill,
    });
    console.log("this.state.selectSkills:", this.state.selectSkills);
  };

  nextPageClick = () => {
    // add current selections to character object, pass to page 2 component
    const clan = this.state.currentClan[0].clan;
    const family = this.state.currentFamily[0];
    const school = this.state.currentSchool[0];

    this.setState({
      character: {
        ...this.state.character,
        clan,
        family,
        school,
        lastName: family.name,
      },
    });
    // localStorage.setItem("new character", JSON.stringify(this.state.character));
  };

  resetInputs = () => {
    localStorage.removeItem("new character");
  };

  buttonColour = () => {
    // when clan is selected, update button colours :)
    let colour;
    const clan = this.state.currentClan[0].clan;
    switch (clan) {
      case "Crab":
        colour = "blue";
        break;
      case "Crane":
        colour = "teal";
        break;
      case "Dragon":
        colour = "green";
        break;
      case "Lion":
        colour = "yellow";
        break;
      case "Phoenix":
        colour = "orange";
        break;
      case "Scorpion":
        colour = "red";
        break;
      case "Unicorn":
        colour = "violet";
        break;
      default:
        colour = "olive";
        break;
    }
    return colour;
  };

  render() {
    return (
      <main className="wizard">
        {/* <UITest clans={this.props.clans} /> */}
        <WizardHeader />

        <div className="wizard__inset-container">
          <Switch>
            <Route
              path="/build-character/page1"
              render={() => {
                return (
                  <WizardPage1
                    clans={this.props.clans}
                    skills={this.props.skills}
                    currentClan={this.state.currentClan}
                    currentFamily={this.state.currentFamily}
                    currentSchool={this.state.currentSchool}
                    selectSkills={this.state.selectSkills}
                    updateClan={this.updateCurrentClan}
                    updateFamily={this.updateCurrentFamily}
                    updateSchool={this.updateCurrentSchool}
                    schoolSkillsSelected={this.schoolSkillsSelected}
                    nextPageClick={this.nextPageClick}
                    resetInputs={this.resetInputs}
                    // buttonColour={this.state.buttonColour}
                  />
                );
              }}
            />

            <Route
              path="/build-character/page2"
              render={() => {
                return (
                  <WizardPage2
                    skills={this.props.skills}
                    currentClan={this.state.currentClan}
                    currentFamily={this.state.currentFamily}
                    currentSchool={this.state.currentSchool}
                    character={this.state.character}
                    updateLastName={this.updateLastName}
                  />
                );
              }}
            />
          </Switch>
        </div>

        {/* page one component: */}
        {/* WizardHeader component with hero image */}
        {/* ClanSelect component with dropdown */}
        {/* FamilySelect component with dropdown */}
        {/* SchoolSelect component with dropdown */}
        {/* free school skill pick */}

        {/* page two component: */}
        {/* experience spending: new skills, skill ranks, trait ranks */}
        {/* input for character name */}
      </main>
    );
  }
}

export default Wizard;
