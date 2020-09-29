import React from "react";
import axios from "axios";

import CharInfoCard from "./CharInfoCard";
import CharStatusCard from "./CharStatusCard";
import CharRingsCard from "./CharRingsCard";

const URL = "http://localhost:8000";

class CharacterSheet extends React.Component {
  state = {
    activeCharacter: "",
    voidSlots:
      {
        // slot1: false,
        // slot2: false,
      } || null,
    karmaPoints: 1,
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
        this.setState({ activeCharacter });
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

  render() {
    const { activeCharacter: char } = this.state;
    return (
      <main className="character-sheet">
        {!char ? (
          "Loading..."
        ) : (
          <>
            <CharInfoCard
              char={char}
              insightRank={this.insightRankCalculator(char)}
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

            <section className="character-sheet__skills-container">
              <table className="character-sheet__skills-table">
                <thead>
                  <tr className="character-sheet__skills-header-row">
                    <th className="character-sheet_skills-heading heading-name">
                      Skill Name
                    </th>
                    <th className="character-sheet_skills-heading heading-rank">
                      Rank
                    </th>
                    <th className="character-sheet_skills-heading heading-trait">
                      Trait
                    </th>
                    <th className="character-sheet_skills-heading heading-roll">
                      Roll
                    </th>
                    <th className="character-sheet_skills-heading heading-types">
                      Types
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Athletics
                    </td>
                    <td className="character-sheet__skill-rank">1</td>
                    <td className="character-sheet__skill-trait">Strength</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">3k2</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      School, Bugei
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Hunting
                    </td>
                    <td className="character-sheet__skill-rank">2</td>
                    <td className="character-sheet__skill-trait">Perception</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">4k2</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      School, Bugei
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Kenjutsu
                    </td>
                    <td className="character-sheet__skill-rank">3</td>
                    <td className="character-sheet__skill-trait">Reflexes</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">6k3</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      School, Bugei
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Kyujutsu
                    </td>
                    <td className="character-sheet__skill-rank">1</td>
                    <td className="character-sheet__skill-trait">Reflexes</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">4k2</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      School, Bugei
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Lore: Shadowlands
                    </td>
                    <td className="character-sheet__skill-rank">1</td>
                    <td className="character-sheet__skill-trait">
                      Intelligence
                    </td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">4k3</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      School, Low
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Stealth
                    </td>
                    <td className="character-sheet__skill-rank">2</td>
                    <td className="character-sheet__skill-trait">Agility</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">5k3</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      School, Low
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Medicine
                    </td>
                    <td className="character-sheet__skill-rank">3</td>
                    <td className="character-sheet__skill-trait">
                      Intelligence
                    </td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">6k3</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      School, High
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Defense
                    </td>
                    <td className="character-sheet__skill-rank">1</td>
                    <td className="character-sheet__skill-trait">Reflexes</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">3k2</span>
                    </td>
                    <td className="character-sheet__skill-types">Bugei</td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Meditation
                    </td>
                    <td className="character-sheet__skill-rank">2</td>
                    <td className="character-sheet__skill-trait">Void</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">4k2</span>
                    </td>
                    <td className="character-sheet__skill-types">High</td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Investigation
                    </td>
                    <td className="character-sheet__skill-rank">1</td>
                    <td className="character-sheet__skill-trait">Perception</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">3k2</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      High, Social
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Courtier
                    </td>
                    <td className="character-sheet__skill-rank">2</td>
                    <td className="character-sheet__skill-trait">Awareness</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">5k3</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      High, Social
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Sincerity
                    </td>
                    <td className="character-sheet__skill-rank">1</td>
                    <td className="character-sheet__skill-trait">Awareness</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">4k3</span>
                    </td>
                    <td className="character-sheet__skill-types">
                      Low, Social
                    </td>
                  </tr>

                  <tr className="character-sheet__skills-item">
                    <td className="character-sheet__skill-name pop-text-2">
                      Iaijitsu
                    </td>
                    <td className="character-sheet__skill-rank">1</td>
                    <td className="character-sheet__skill-trait">Agility</td>
                    <td className="character-sheet__skill-roll">
                      <span className="skill-roll">4k3</span>
                    </td>
                    <td className="character-sheet__skill-types">Bugei</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    );
  }
}

export default CharacterSheet;
