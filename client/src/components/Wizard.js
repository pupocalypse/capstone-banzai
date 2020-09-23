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
    // let rings = { ...this.state.character.rings };
    // const { elementRing, traitRank, ringRank } = this.upgradeTraitRing(
    //   currentFamily[0].bonus
    // );
    // rings[elementRing].rank = ringRank;
    // rings[elementRing].traits[currentFamily[0].bonus].rank = traitRank;

    this.setState(
      {
        currentFamily,
        character: {
          ...this.state.character,
          family: currentFamily[0],
          lastName: currentFamily[0].name,
          // rings,
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

    // let rings = { ...this.state.character.rings };
    // const { elementRing, traitRank, ringRank } = this.upgradeTraitRing(
    //   schoolDetails[0].bonus
    // );
    // rings[elementRing].rank = ringRank;
    // rings[elementRing].traits[schoolDetails[0].bonus].rank = traitRank;

    this.setState(
      {
        currentSchool: schoolDetails,
        selectSkills,
        character: {
          ...this.state.character,
          job: currentSchool[0].type,
          school: schoolDetails[0],
          skills: schoolDetails[0].skills.core,
          // rings,
        },
      }
      // () =>
      //   localStorage.setItem(
      //     "current school",
      //     JSON.stringify(this.state.currentSchool)
      //   )
    );
  };

  // receives Form.Input value on change (from second page),
  // updates character.lastName in state
  updateLastName = (e, { value }) => {
    this.setState({
      character: {
        ...this.state.character,
        lastName: value,
      },
    });
  };

  // gatekeeping for disabled 'next' button
  // checks that ALL free pick skills have been selected
  schoolSkillsSelected = (e, { value }, index) => {
    // console.log("index:", index);
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

  // receives onChange data, updates LAST item in
  // character.skills array (so it doesn't keep
  // adding if user changes their mind)
  addSelectedSkill = (value, skillsIndex) => {
    // console.log("skillsIndex:", skillsIndex);
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
  // applies the bonus to the starting rank of the trait
  upgradeTraitRing = (trait) => {
    const character = { ...this.state.character };
    let elementRing = "";
    // let traitRank = startingRank + 1;
    let traitRank;
    for (let ring in character.rings) {
      if (character.rings[ring].traits.hasOwnProperty(trait)) {
        elementRing = ring;
        traitRank = character.rings[ring].traits[trait].rank + 1;
      }
    }
    const ringRank = this.calculateElementRingRank(
      character.rings,
      elementRing
    );

    // character.rings[elementRing].traits[trait].rank = traitRank;
    // this.setState({ character });
    return { elementRing, traitRank, ringRank };
  };

  // provided an element ring, search that ring for its updated trait
  // ranks and calculate minimum of the two for element ring rank
  calculateElementRingRank = (rings, element) => {
    // const character = { ...this.state.character };
    let ringRank = 0;
    for (let ring in rings) {
      if (ring === element) {
        let traitRanks = [];
        for (let trait in rings[ring].traits) {
          traitRanks.push(rings[ring].traits[trait].rank);
        }
        ringRank = Math.min(...traitRanks);
      }
    }

    // character.rings[element].rank = ringRank;
    // this.setState({ character });
    return ringRank;
  };

  // page two functions
  // addNewSkillName = () => {
  //   const newSkillArray
  // }

  // prepares character object for final phase, including ring calculations
  nextPageClick = () => {
    let character = { ...this.state.character };
    const familyBonus = character.family.bonus;
    const schoolBonus = character.school.bonus;
    // returns elementRing, traitRank, ringRank
    const familyBonusRing = this.upgradeTraitRing(familyBonus);
    const schoolBonusRing = this.upgradeTraitRing(schoolBonus);
    console.log("familyBonusRing:", familyBonusRing);
    console.log("schoolBonusRing:", schoolBonusRing);

    character.rings[familyBonusRing.elementRing].traits[familyBonus].rank =
      familyBonusRing.traitRank;
    character.rings[familyBonusRing.elementRing].rank =
      familyBonusRing.ringRank;

    character.rings[schoolBonusRing.elementRing].traits[schoolBonus].rank =
      schoolBonusRing.traitRank;
    character.rings[schoolBonusRing.elementRing].rank =
      schoolBonusRing.ringRank;

    this.setState({ character });
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
