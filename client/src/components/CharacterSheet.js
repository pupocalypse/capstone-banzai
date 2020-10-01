import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon, Button, Loader } from "semantic-ui-react";

import CharInfoCard from "./CharInfoCard";
import CharStatusCard from "./CharStatusCard";
import CharRingsCard from "./CharRingsCard";
import CharSkillsTable from "./CharSkillsTable";

const URL = "http://localhost:8000";

class CharacterSheet extends React.Component {
  state = {
    activeCharacter: "",
    voidSlots: {} || null,
    karmaPoints: 1,
    startingTotalExp: 40,
    startingCurrentExp: 0,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getActiveCharacter(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeCharacter !== this.state.activeCharacter) {
      this.setVoidSlots();
    }
  }

  getActiveCharacter = (id) => {
    axios
      .get(`${URL}/characters/${id}`)
      .then(({ data }) => {
        let activeCharacter = data;
        this.setState({
          activeCharacter,
          startingCurrentExp: Number(activeCharacter.currentExp),
        });
      })
      .catch((error) => console.log(error));
  };

  setVoidSlots = () => {
    const { activeCharacter, voidSlots } = this.state;
    for (let i = 1; i <= activeCharacter.rings.void.traits.void.rank; i++) {
      let slot = "slot" + i;
      voidSlots[slot] = false;
    }
    this.setState({ voidSlots });
  };

  handleVoidClick = (slotNum) => {
    this.setState({
      voidSlots: {
        ...this.state.voidSlots,
        [slotNum]: !this.state.voidSlots[slotNum],
      },
    });
  };

  // insight equals (element rings * 10) + skill ranks
  insightRankCalculator = () => {
    const { activeCharacter: char } = this.state;
    let baseRingRanksArray = [];
    for (let ring in char.rings) {
      let traitRanks = [];
      for (let trait in char.rings[ring].traits) {
        traitRanks.push(char.rings[ring].traits[trait].rank);
      }
      baseRingRanksArray.push(Math.min(...traitRanks));
    }

    let skillRanksArray = [];
    for (let skill in char.skills) {
      skillRanksArray.push(char.skills[skill].rank);
    }
    const ringsTotal = baseRingRanksArray.reduce((acc, curr) => acc + curr);
    const skillsTotal = skillRanksArray.reduce((acc, curr) => acc + curr);
    const insight = ringsTotal * 10 + skillsTotal;

    const insightRank = Math.max(Math.floor((insight - 125) / 25 + 1), 1);
    return insightRank;
  };

  // insight rank / reflexes
  initiativeRoll = () => {
    const insightRank = this.insightRankCalculator();
    const reflexes = this.state.activeCharacter.rings.air.traits.reflexes.rank;
    return `${insightRank + reflexes}k${reflexes}`;
  };

  // increases current & total exp
  handleAddExp = () => {
    let { currentExp, totalExp } = this.state.activeCharacter;
    currentExp = Number(currentExp) + 1;
    totalExp = Number(totalExp) + 1;
    this.setState({
      activeCharacter: {
        ...this.state.activeCharacter,
        currentExp,
        totalExp,
      },
    });
  };

  // decreases current & total exp (until current is 0)
  handleMinusExp = () => {
    let { currentExp, totalExp } = this.state.activeCharacter;
    let {
      startingCurrentExp: minCurrent,
      startingTotalExp: minTotal,
    } = this.state;
    if (Number(currentExp) === minCurrent || Number(totalExp) === minTotal) {
      return;
    }
    currentExp = Number(currentExp) - 1;
    totalExp = Number(totalExp) - 1;
    this.setState({
      activeCharacter: {
        ...this.state.activeCharacter,
        currentExp,
        totalExp,
      },
    });
  };

  // adds or removes karma points
  handleKarmaPoints = (intent) => {
    let { karmaPoints } = this.state;
    if (intent === "add") {
      karmaPoints++;
    } else if (intent === "minus" && karmaPoints !== 0) {
      karmaPoints--;
    }
    this.setState({ karmaPoints });
  };

  // calculates required experience cost for a given trait (only void costs more)
  handleUpgradeTrait = (element, trait) => {
    let { rings, currentExp } = this.state.activeCharacter;
    const currentRank = rings[element].traits[trait].rank;
    let requiredExp;
    if (rings[element].traits[trait].isVoid) {
      requiredExp = (currentRank + 1) * 6;
    } else {
      requiredExp = (currentRank + 1) * 4;
    }

    rings[element].traits[trait].rank = currentRank + 1;
    currentExp = currentExp - requiredExp;
    this.setState({
      activeCharacter: {
        ...this.state.activeCharacter,
        rings,
        currentExp,
      },
    });
  };

  handleChangeSkillRank = (intent, skill) => {
    let { skills, currentExp, school } = this.state.activeCharacter;
    currentExp = Number(currentExp);
    const nextRank = skills[skill].rank + 1;
    const returnExp = skills[skill].rank; // returnExp is same as currentRank

    const schoolSkillsBase = {};
    school.skills.core.forEach(([skillName, rank]) => {
      schoolSkillsBase[skillName] = rank;
    });

    if (intent === "add" && nextRank > currentExp) {
      return null;
    } else if (intent === "add") {
      skills[skill].rank = nextRank;
      currentExp = currentExp - nextRank;
    } else if (
      intent === "minus" &&
      skills[skill].schoolSkill &&
      returnExp > schoolSkillsBase[skill]
    ) {
      skills[skill].rank = returnExp - 1;
      currentExp = currentExp + returnExp;
    } else if (
      intent === "minus" &&
      skills[skill].schoolSkill &&
      returnExp <= schoolSkillsBase[skill]
    ) {
      alert("You may not reset a school skill below its initial rank");
      return null;
    } else if (intent === "minus" && returnExp > 1) {
      skills[skill].rank = returnExp - 1;
      currentExp = currentExp + returnExp;
    }

    this.setState({
      activeCharacter: {
        ...this.state.activeCharacter,
        skills,
        currentExp,
      },
    });
  };

  render() {
    const { activeCharacter: char } = this.state;
    return (
      <main className="character-sheet">
        <div className="character-sheet__navbar">
          <Link to="/characters" className="character-sheet__navbar-left-link">
            <Icon
              name="arrow circle left"
              size="large"
              className="character-sheet__navbar-icon"
            />
            <p className="character-sheet__navbar-text">Back to Characters</p>
          </Link>
          <Button circular negative size="mini">
            <Icon name="exclamation circle" />
            <span className="character-sheet__navbar-button-text">
              Delete Character
            </span>
          </Button>
        </div>
        {!char ? (
          <Loader active inline />
        ) : (
          <>
            <CharInfoCard
              char={char}
              insightRank={this.insightRankCalculator()}
              handleAddExp={this.handleAddExp}
              handleMinusExp={this.handleMinusExp}
            />
            <CharStatusCard
              char={char}
              initiativeRoll={this.initiativeRoll}
              karmaPoints={this.state.karmaPoints}
              handleKarmaPoints={this.handleKarmaPoints}
            />
            <CharRingsCard
              char={char}
              voidSlots={this.state.voidSlots}
              handleVoidClick={this.handleVoidClick}
              handleUpgradeTrait={this.handleUpgradeTrait}
            />
            <CharSkillsTable
              char={char}
              handleChangeSkillRank={this.handleChangeSkillRank}
            />
          </>
        )}
      </main>
    );
  }
}

export default CharacterSheet;
