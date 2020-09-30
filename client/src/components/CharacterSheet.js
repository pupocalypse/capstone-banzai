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
  insightRankCalculator = (char) => {
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

    let insightRank;
    switch (insight) {
      case insight < 150:
        insightRank = 1;
        break;
      case insight < 175:
        insightRank = 2;
        break;
      case insight < 200:
        insightRank = 3;
        break;
      case insight < 225:
        insightRank = 4;
        break;
      case insight < 250:
        insightRank = 5;
        break;
      case insight < 275:
        insightRank = 6;
        break;
      case insight < 300:
        insightRank = 7;
        break;
      case insight < 325:
        insightRank = 8;
        break;
      default:
        insightRank = 1;
        break;
    }
    return insightRank;
  };

  // insight rank / reflexes
  initiativeRoll = () => {
    const insightRank = this.insightRankCalculator(this.state.activeCharacter);
    const reflexes = this.state.activeCharacter.rings.air.traits.reflexes.rank;
    return `${insightRank + reflexes}k${reflexes}`;
  };

  // increases current & total exp
  onClickAddExp = () => {
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
  onClickMinusExp = () => {
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
              insightRank={this.insightRankCalculator(char)}
              onClickAddExp={this.onClickAddExp}
              onClickMinusExp={this.onClickMinusExp}
            />
            <CharStatusCard
              char={char}
              initiativeRoll={this.initiativeRoll}
              karmaPoints={this.state.karmaPoints}
            />
            <CharRingsCard
              char={char}
              voidSlots={this.state.voidSlots}
              handleVoidClick={this.handleVoidClick}
            />
            <CharSkillsTable char={char} />
          </>
        )}
      </main>
    );
  }
}

export default CharacterSheet;
