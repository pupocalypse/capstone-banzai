import React from "react";
import { Route, Switch } from "react-router-dom";

import WizardPage1 from "./WizardPage1";
import WizardPage2 from "./WizardPage2";
import WizardHeader from "./WizardHeader";

// import { Character } from "./CharacterClasses";

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
      family: {}, // family name, bonus, description
      school: {}, // school name, bonus
      job: "",
      skills: {},
      rings: {},
    },
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
        currentFamily: "",
        currentSchool: "",
        character: {
          ...this.state.character,
          clan: currentClan[0].clan,
        },
      }
      // () => {
      //   localStorage.setItem(
      //     "current clan",
      //     JSON.stringify(this.state.currentClan)
      //   );
      // }
    );
  };

  updateCurrentFamily = (e, { value }) => {
    const currentFamily = this.state.currentClan[0].families.filter(
      (family) => family.name === value
    );

    this.setState(
      {
        currentFamily,
        character: {
          ...this.state.character,
          family: currentFamily[0],
          lastName: currentFamily[0].name,
        },
      }
      // () =>
      //   localStorage.setItem(
      //     "current family",
      //     JSON.stringify(this.state.currentFamily)
      //   )
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
    }

    this.setState(
      {
        currentSchool: schoolDetails,
        selectSkills,
        character: {
          ...this.state.character,
          job: currentSchool[0].type,
          school: schoolDetails[0],
          skills: schoolDetails[0].skills.core,
        },
      }
      // () =>
      //   localStorage.setItem(
      //     "current school",
      //     JSON.stringify(this.state.currentSchool)
      //   )
    );
  };

  updateLastName = (e, { value }) => {
    // receives Form.Input value on change (from second page),
    // updates character.lastName in state
    this.setState({
      character: {
        ...this.state.character,
        lastName: value,
      },
    });
  };

  schoolSkillsSelected = (e, { value }, index) => {
    // gatekeeping for disabled 'next' button
    // checks that ALL free pick skills have been selected
    console.log("index:", index);
    let selectedSkill = this.state.selectSkills;
    selectedSkill[index] = true;
    this.setState({
      selectSkills: selectedSkill,
    });
    const originalSkills = this.state.currentSchool[0].skills.core;
    const skillsIndex = originalSkills.length + index;
    this.addSelectedSkill(value, skillsIndex);
    // console.log("this.state.selectSkills:", this.state.selectSkills);
  };

  addSelectedSkill = (value, skillsIndex) => {
    // receives onChange data, updates LAST item in
    // character.skills array (so it doesn't keep
    // adding if user changes their mind)
    console.log("skillsIndex:", skillsIndex);
    const currentSkills = [...this.state.character.skills];
    currentSkills[skillsIndex] = [value, "1"];

    this.setState(
      {
        character: {
          ...this.state.character,
          skills: currentSkills,
        },
      },
      () => {
        console.log("character's skills:", this.state.character.skills);
        localStorage.setItem("new character", this.state.character);
      }
    );
  };

  // page two functions
  // addNewSkillName = () => {
  //   const newSkillArray
  // }

  nextPageClick = () => {
    // add current selections to character object, pass to page 2 component
    // const clan = this.state.currentClan[0].clan;
    // const family = this.state.currentFamily[0];
    // const school = this.state.currentSchool[0];
    // this.setState({
    //   character: {
    //     ...this.state.character,
    //     clan,
    //     family,
    //     school,
    //     lastName: family.name,
    //   },
    // });
    // localStorage.setItem("new character", JSON.stringify(this.state.character));
  };

  resetInputs = () => {
    localStorage.removeItem("new character");
    localStorage.removeItem("current clan");
    localStorage.removeItem("current family");
    localStorage.removeItem("current school");
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
