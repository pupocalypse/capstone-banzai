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

class Wizard extends React.Component {
  state = {
    currentClan: "",
    currentFamily: "",
    currentSchool: "",
    character: {
      firstName: "",
      lastName: "",
      clan: "",
      family: {}, // family name, bonus
      school: {}, // school name, bonus
      skills: {},
      rings: {},
    },
  };

  componentDidMount() {
    console.log("Wizard component mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Wizard component updated");
  }

  // getDropdownsWithoutClan = (array) => {
  //   // eg: this.props.clans.families array
  //   // let allItems;

  //   let allItems = this.props.clans.map((clan) => {
  //     clan[array].map((item) => {
  //       return {
  //         key: item.name,
  //         text: item.name,
  //         value: item.name,
  //       };
  //     });
  //   });
  //   return allItems;
  // };

  updateCurrentClan = (e, { value }) => {
    const currentClan = this.props.clans.filter((clan) => clan.clan === value);

    this.setState({
      currentClan,
    });
  };

  updateCurrentFamily = (e, { value }) => {
    const currentFamily = this.state.currentClan[0].families.filter(
      (family) => family.name === value
    );

    this.setState({
      currentFamily,
    });
  };

  updateCurrentSchool = (e, { value }) => {
    const currentSchool = this.state.currentClan[0].schools.filter(
      (school) => school.name === value
    );
    const schoolDetails = this.props.schools.filter(
      (school) => school.name === currentSchool[0].name
    );

    this.setState({
      currentSchool: schoolDetails,
    });
  };

  render() {
    return (
      <main className="wizard-container">
        {/* <UITest clans={this.props.clans} /> */}
        <WizardHeader />
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
                  updateClan={this.updateCurrentClan}
                  updateFamily={this.updateCurrentFamily}
                  updateSchool={this.updateCurrentSchool}
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
                />
              );
            }}
          />
        </Switch>

        {/* page one component: */}
        {/* WizardHeader component with hero image */}
        {/* ClanSelect component with dropdown */}
        {/* FamilySelect component with dropdown */}
        {/* SchoolSelect component with dropdown */}
        {/* free school skill pick */}
        {/* <ClanSelect
          clans={this.props.clans}
          currentClan={this.state.currentClan}
          handleChange={this.updateCurrentClan}
        />

        <FamilySelect
          currentClan={this.state.currentClan}
          currentFamily={this.state.currentFamily}
          handleChange={this.updateCurrentFamily}
        />

        <SchoolSelect
          currentClan={this.state.currentClan}
          currentSchool={this.state.currentSchool}
          skills={this.props.skills}
          handleChange={this.updateCurrentSchool}
        />

        <Button content="Next" icon="right arrow" labelPosition="right" /> */}

        {/* page two component: */}
        {/* experience spending: new skills, skill ranks, trait ranks */}
        {/* input for character name */}

        {/* <DropdownMenu
          title={"Clan"}
          dropdownOptions={this.props.clans.map((clan) => {
            return {
              key: clan.clan,
              text: clan.clan,
              value: clan.clan,
              image: {
                avatar: true,
                src: `./images/mons/Mon_${clan.clan}.gif`,
              },
            };
          })}
          handleChange={this.updateCurrentClan}
        /> */}
        {/* <DropdownMenu
          title={"Family"}
          dropdownOptions={
            this.state.currentClan.length <= 0
              ? null
              : this.state.currentClan[0].families.map((family) => {
                  return {
                    key: family.name,
                    text: family.name,
                    value: family.name,
                  };
                })
          }
          handleChange={this.updateCurrentFamily}
        /> */}
        {/* <DropdownMenu
          title={"School"}
          dropdownOptions={
            this.state.currentClan.length <= 0
              ? null
              : this.state.currentClan[0].schools
                  .filter((school) => school.type === "bushi")
                  .map((school) => {
                    return {
                      key: school.name,
                      text: school.name,
                      value: school.name,
                    };
                  })
          }
          handleChange={this.updateCurrentSchool}
        /> */}
      </main>
    );
  }
}

export default Wizard;
