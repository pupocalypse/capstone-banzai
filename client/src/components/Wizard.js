import React from "react";
import UITest from "./UI-Test";
import DropdownMenu from "./Dropdown";

class Wizard extends React.Component {
  state = {
    currentClan: "",
    currentFamily: "",
    currentSchool: "",
  };

  componentDidMount() {
    console.log("Wizard component mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Wizard component updated");
  }

  updateCurrentClan = (e, { value }) => {
    const currentClan = this.props.clans.filter((clan) => clan.clan === value);

    this.setState({
      currentClan,
    });
  };

  updateCurrentFamily = (e, { value }) => {
    console.log("update value:", value);
    const currentFamily = this.state.currentClan[0].families.filter(
      (family) => family.name === value
    );

    this.setState({
      currentFamily,
    });
  };

  updateCurrentSchool = (e, { value }) => {
    console.log("update value:", value);
    const currentSchool = this.state.currentClan[0].schools.filter(
      (school) => school.name === value
    );

    this.setState({
      currentSchool,
    });
  };

  render() {
    return (
      <main className="wizard-container">
        {/* <UITest clans={this.props.clans} /> */}

        {/* page one component: */}
        {/* WizardHeader component with hero image */}
        {/* ClanSelect component with dropdown */}
        {/* FamilySelect component with dropdown */}
        {/* SchoolSelect component with dropdown */}
        {/* free school skill pick */}

        {/* page two component: */}
        {/* experience spending: new skills, skill ranks, trait ranks */}
        {/* input for character name */}

        <DropdownMenu
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
        />
        <DropdownMenu
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
        />
        <DropdownMenu
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
        />
      </main>
    );
  }
}

export default Wizard;
