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
      rings: {
        air: {
          rank: 2,
          traits: {
            reflexes: {
              rank: 2,
              type: "physical",
              isVoid: false,
            },
            awareness: {
              rank: 2,
              type: "mental",
              isVoid: false,
            },
          },
        },
        earth: {
          rank: 2,
          traits: {
            stamina: {
              rank: 2,
              type: "physical",
              isVoid: false,
            },
            willpower: {
              rank: 2,
              type: "mental",
              isVoid: false,
            },
          },
        },
        fire: {
          rank: 2,
          traits: {
            agility: {
              rank: 2,
              type: "physical",
              isVoid: false,
            },
            intelligence: {
              rank: 2,
              type: "mental",
              isVoid: false,
            },
          },
        },
        water: {
          rank: 2,
          traits: {
            strength: {
              rank: 2,
              type: "physical",
              isVoid: false,
            },
            perception: {
              rank: 2,
              type: "mental",
              isVoid: false,
            },
          },
        },
        void: {
          rank: 2,
          traits: {
            void: {
              rank: 2,
              type: "mental",
              isVoid: true,
            },
          },
        },
      },
    },
  };

  // componentDidMount() {
  //   console.log("Wizard component mounted");
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.character !== this.state.character) {
      localStorage.setItem(
        "new character",
        JSON.stringify(this.state.character)
      );
    }
    // console.log("Wizard component updated");
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
    let rings = { ...this.state.character.rings };
    const { elementRing, bonusRank } = this.applyRingBonus(
      currentFamily[0].bonus
    );
    rings[elementRing].traits[currentFamily[0].bonus].rank = bonusRank;

    this.setState(
      {
        currentFamily,
        character: {
          ...this.state.character,
          family: currentFamily[0],
          lastName: currentFamily[0].name,
          rings,
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

    let rings = { ...this.state.character.rings };
    const { elementRing, bonusRank } = this.applyRingBonus(
      currentSchool[0].bonus
    );
    rings[elementRing].traits[currentSchool[0].bonus].rank = bonusRank;

    this.setState(
      {
        currentSchool: schoolDetails,
        selectSkills,
        character: {
          ...this.state.character,
          job: currentSchool[0].type,
          school: schoolDetails[0],
          skills: schoolDetails[0].skills.core,
          rings,
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
        // console.log("character's skills:", this.state.character.skills);
        localStorage.setItem("new character", this.state.character);
      }
    );
  };

  // receives specified trait bonus based on family & school,
  // applies the bonus
  applyRingBonus = (trait) => {
    const character = { ...this.state.character };
    let elementRing = "";
    let bonusRank = 0;
    for (let ring in character.rings) {
      if (ring.traits.hasOwnProperty(trait)) {
        elementRing = ring;
        bonusRank = ring.traits[trait].rank + 1;
      }
    }

    // character.rings[elementRing].traits[trait].rank = bonusRank;

    // this.setState({ character });
    return { elementRing, bonusRank };
  };

  // provided an element ring, search that ring for its trait
  // ranks and calculate minimum of the two for element ring rank
  calculateElementRingRank = (element) => {
    const character = { ...this.state.character };
    let ringRank = 0;
    for (let ring in this.state.character.rings) {
      if (ring === element) {
        let traitRanks = [];
        for (let trait in ring.traits) {
          traitRanks.push(trait.rank);
        }
        ringRank = Math.min(...traitRanks);
      }
    }

    character.rings[element].rank = ringRank;

    this.setState({ character });
  };

  // page two functions
  // addNewSkillName = () => {
  //   const newSkillArray
  // }

  // prepares character object for final phase, including ring calculations
  nextPageClick = () => {};

  resetInputs = () => {
    localStorage.removeItem("new character");
    localStorage.removeItem("current clan");
    localStorage.removeItem("current family");
    localStorage.removeItem("current school");
  };

  render() {
    return (
      <main className="wizard">
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
      </main>
    );
  }
}

export default Wizard;
