import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import WizardPage1 from "./WizardPage1";
import WizardPage2 from "./WizardPage2";
import WizardHeader from "./WizardHeader";

const URL = "http://localhost:8000";

class Wizard extends React.Component {
  state = {
    id: null,
    currentClan: "",
    currentFamily: "",
    currentSchool: "",
    selectSkills: [],
    expModifiers: [0],
    defaultRings: {},
    character: {
      totalExp: 40,
      currentExp: 40,
      firstName: "",
      lastName: "",
      clan: "",
      family: {}, // family name, bonus, description
      school: {}, // school name, bonus, description, etc.
      job: "",
      skills: [],
      rings: {
        air: {
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

  updateFirstName = (e, { value }) => {
    this.setState({
      character: {
        ...this.state.character,
        firstName: value,
      },
    });
  };

  // gatekeeping for disabled 'next' button
  // checks that ALL free pick skills have been selected
  schoolSkillsSelected = (e, { value }, index) => {
    let selectedSkill = this.state.selectSkills;
    selectedSkill[index] = true;
    this.setState({
      selectSkills: selectedSkill,
    });
    const originalSkills = this.state.currentSchool[0].skills.core;
    const skillsIndex = originalSkills.length + index;
    this.addSelectedSkill(value, skillsIndex);
  };

  // receives onChange data, updates LAST item in
  // character.skills array (so it doesn't keep
  // adding if user changes their mind)
  addSelectedSkill = (value, skillsIndex) => {
    const currentSkills = [...this.state.character.skills];
    currentSkills[skillsIndex] = [value, 1];

    this.setState(
      {
        character: {
          ...this.state.character,
          skills: currentSkills,
        },
      }
      // () => {
      //   localStorage.setItem("new character", this.state.character);
      // }
    );
  };

  // receives specified trait bonus based on family & school,
  // applies the bonus to the starting rank of the trait
  upgradeTraitRing = (currentRings, trait) => {
    let elementRing = "";
    let traitRank;
    for (let ring in currentRings) {
      if (currentRings[ring].traits.hasOwnProperty(trait)) {
        elementRing = ring;
        traitRank = currentRings[ring].traits[trait].rank + 1;
      }
    }
    return { elementRing, traitRank };
  };

  // provided an element ring, search that ring for its updated trait
  // ranks and calculate minimum of the two for element ring rank
  // calculateElementRingRank = (rings, element) => {
  //   let ringRank = 0;
  //   let traitRanks = [];
  //   for (let trait in rings[element].traits) {
  //     traitRanks.push(rings[element].traits[trait].rank);
  //   }
  //   ringRank = Math.min(...traitRanks);
  //   return ringRank;
  // };

  // for ranking up school skills specifically (purchased
  // skills managed in WizardPage2 component)
  spendSchoolSkillExp = (e, { value }, index) => {
    const schoolSkills = [...this.state.character.skills];
    const currentRank = schoolSkills[index][2] || schoolSkills[index][1];
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
    if (requiredExp > this.state.character.currentExp) {
      alert(`You do not have enough experience for this upgrade\n
      Required Experience: ${requiredExp}\n
      Current Experience: ${this.state.character.currentExp}`);
      return;
    }

    schoolSkills[index][2] = value;
    this.setState({
      character: {
        ...this.state.character,
        skills: schoolSkills,
      },
    });
    this.updateCurrentExp(requiredExp);
  };

  minimumTraitRanks = () => {
    const character = { ...this.state.character };

    // initial setup of default ranks (cannot reset below these values)
    const defaultRings = {
      air: {
        reflexes: 2,
        awareness: 2,
      },
      earth: {
        stamina: 2,
        willpower: 2,
      },
      fire: {
        agility: 2,
        intelligence: 2,
      },
      water: {
        strength: 2,
        perception: 2,
      },
      void: {
        void: 2,
      },
    };
    // modify based on family/school pick bonuses to determine minimum
    for (let element in defaultRings) {
      if (defaultRings[element].hasOwnProperty(character.family.bonus)) {
        defaultRings[element][character.family.bonus] = 3;
      } else if (defaultRings[element].hasOwnProperty(character.school.bonus)) {
        defaultRings[element][character.school.bonus] = 3;
      }
    }

    this.setState({
      defaultRings,
    });
  };

  // calculates required experience cost for a given trait (only void costs more)
  spendTraitExp = (element, trait) => {
    const rings = { ...this.state.character.rings };
    const currentRank = rings[element].traits[trait].rank;
    let requiredExp;
    if (rings[element].traits[trait].isVoid) {
      requiredExp = (currentRank + 1) * 6;
    } else {
      requiredExp = (currentRank + 1) * 4;
    }

    if (requiredExp > this.state.character.currentExp) {
      alert(`You do not have enough experience for this upgrade\n
      Required Experience: ${requiredExp}\n
      Current Experience: ${this.state.character.currentExp}`);
      return;
    }

    rings[element].traits[trait].rank = currentRank + 1;
    this.setState({
      character: {
        ...this.state.character,
        rings,
      },
    });
    this.updateCurrentExp(requiredExp);
  };

  // receives experience to spend, adds (or subtracts) from expModifiers
  // then calculates currentExp after expModifiers
  updateCurrentExp = (requiredExp) => {
    let expModifiers = [...this.state.expModifiers];
    expModifiers.push(requiredExp);
    let currentExp = this.state.character.currentExp;
    for (let i = 0; i < expModifiers.length; i++) {
      currentExp -= expModifiers[i];
    }
    this.setState({
      character: {
        ...this.state.character,
        expModifiers,
        currentExp,
      },
    });
  };

  // prepares character object for final phase, including ring calculations
  nextPageClick = () => {
    let character = { ...this.state.character };
    const familyBonus = character.family.bonus;
    const schoolBonus = character.school.bonus;

    // returns elementRing, traitRank, ringRank
    const familyBonusRing = this.upgradeTraitRing(character.rings, familyBonus);
    character.rings[familyBonusRing.elementRing].traits[familyBonus].rank =
      familyBonusRing.traitRank;
    character.rings[familyBonusRing.elementRing].rank =
      familyBonusRing.ringRank;

    const schoolBonusRing = this.upgradeTraitRing(character.rings, schoolBonus);
    character.rings[schoolBonusRing.elementRing].traits[schoolBonus].rank =
      schoolBonusRing.traitRank;
    character.rings[schoolBonusRing.elementRing].rank =
      schoolBonusRing.ringRank;

    this.setState({ character }, () => this.minimumTraitRanks());
  };

  // for indecisive players :P - undoes the previous
  // trait bonuses so new selections can be made
  backButtonClick = () => {
    let character = { ...this.state.character };
    for (let ring in character.rings) {
      let traitRanks = [];
      for (let trait in character.rings[ring].traits) {
        character.rings[ring].traits[trait].rank = 2;
        traitRanks.push(character.rings[ring].traits[trait]);
      }
      character.currentExp = this.state.character.totalExp;
    }

    this.setState({ character });
  };

  // resets expModifiers, improved skill ranks, improved trait ranks, name, artwork
  // callback resets page 2 specific states
  resetExpSpent = (callback) => {
    const characterRings = { ...this.state.character.rings };
    const defaultRings = { ...this.state.defaultRings };
    for (let element in characterRings) {
      for (let trait in characterRings[element].traits) {
        characterRings[element].traits[trait].rank =
          defaultRings[element][trait];
      }
    }
    const characterSkills = [...this.state.character.skills];
    const skillsReset = characterSkills.map((skill) => {
      console.log("skill:", skill);
      if (skill.length > 2) {
        skill.pop();
      }
      return skill;
    });
    console.log("skillsReset:", skillsReset);

    this.setState({
      character: {
        ...this.state.character,
        firstName: "",
        expModifiers: [],
        currentExp: 20,
        rings: characterRings,
        skills: skillsReset,
      },
    });
    callback();
  };

  resetInputs = () => {
    localStorage.removeItem("new character");
    localStorage.removeItem("current clan");
    localStorage.removeItem("current family");
    localStorage.removeItem("current school");
  };

  // assembles all appropriate character data as formData
  submitCharacter = (e, callback) => {
    e.preventDefault();
    let formData = new FormData();
    const { character } = this.state;
    const { skills } = this.props;
    const { boughtSkills, artworkFile } = callback();

    let skillsObject;
    if (skills) {
      skillsObject = character.skills.reduce((acc, skillArr) => {
        const skillName = skillArr[0];
        const skillRank = skillArr[skillArr.length - 1];
        acc[skillName] = skills[skillName];
        acc[skillName].rank = skillRank;
        acc[skillName].schoolSkill = true;
        return acc;
      }, {});
      if (boughtSkills) {
        skillsObject = boughtSkills.reduce((acc, [skillName, skillRank]) => {
          acc[skillName] = skills[skillName];
          acc[skillName].rank = skillRank;
          return acc;
        }, skillsObject);
      }
    }

    formData.append("firstName", character.firstName);
    formData.append("lastName", character.lastName);
    formData.append("job", character.job);
    formData.append("clan", character.clan);
    formData.append("family", JSON.stringify(character.family));
    formData.append("school", JSON.stringify(character.school));
    formData.append("totalExp", character.totalExp);
    formData.append("currentExp", character.currentExp);
    formData.append("skills", JSON.stringify(skillsObject));
    formData.append("rings", JSON.stringify(character.rings));
    formData.append("artwork", artworkFile);

    axios
      .post(`${URL}/characters`, formData)
      .then((response) => {
        const id = response.data[response.data.length - 1].id;
        this.setState({ id });
      })
      .catch((error) => console.log(error));
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
                    expModifiers={this.state.expModifiers}
                    updateCurrentExp={this.updateCurrentExp}
                    spendSchoolSkillExp={this.spendSchoolSkillExp}
                    spendTraitExp={this.spendTraitExp}
                    updateLastName={this.updateLastName}
                    updateFirstName={this.updateFirstName}
                    resetExpSpent={this.resetExpSpent}
                    backButtonClick={this.backButtonClick}
                    submitCharacter={this.submitCharacter}
                    id={this.state.id}
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
