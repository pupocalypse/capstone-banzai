import React from "react";
import { Statistic } from "semantic-ui-react";
import axios from "axios";

const URL = "http://localhost:8000";

class CharacterSheet extends React.Component {
  state = {
    activeCharacter: {},
    voidSlots: {
      // slot1: false,
      // slot2: false,
    },
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

  render() {
    return (
      <main className="character-sheet">
        <section className="character-sheet__info-container">
          <div className="character-sheet__artwork"></div>
          <div className="character-sheet__info">
            <h1 className="character-sheet__name-heading">Yasuki Hayami</h1>
            <div className="character-sheet__details-container">
              <span className="character-sheet__info-text character-sheet__info-text--identifier">
                Clan
              </span>
              <p className="character-sheet__info-text">Crab</p>
            </div>
            <div className="character-sheet__details-container">
              <span className="character-sheet__info-text character-sheet__info-text--identifier">
                Family
              </span>
              <p className="character-sheet__info-text">Yasuki</p>
            </div>
            <div className="character-sheet__details-container">
              <span className="character-sheet__info-text character-sheet__info-text--identifier">
                School
              </span>
              <p className="character-sheet__info-text">Hiruma Bushi</p>
              <p className="character-sheet__info-text character-sheet__info-text--rank">
                Rank: 1
              </p>
            </div>

            <div className="character-sheet__info-experience-container">
              <div className="character-sheet__info-xp">
                <Statistic>
                  <Statistic.Value>4</Statistic.Value>
                  <Statistic.Label className="character-sheet__rank-label">
                    XP
                    <br />
                    Current
                  </Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>79</Statistic.Value>
                  <Statistic.Label className="character-sheet__rank-label">
                    XP
                    <br />
                    Total
                  </Statistic.Label>
                </Statistic>
              </div>
              <Statistic>
                <Statistic.Value>1</Statistic.Value>
                <Statistic.Label className="character-sheet__rank-label">
                  Insight
                  <br />
                  Rank
                </Statistic.Label>
              </Statistic>
            </div>
          </div>
        </section>

        <section className="character-sheet__status-outer-container">
          <div className="character-sheet__status-borders-horizontal"></div>
          <div className="character-sheet__status-borders-vertical"></div>
          <div className="character-sheet__status-round-corner corner-top-left"></div>
          <div className="character-sheet__status-round-corner corner-top-right"></div>
          <div className="character-sheet__status-round-corner corner-bottom-left"></div>
          <div className="character-sheet__status-round-corner corner-bottom-right"></div>

          <div className="character-sheet__initiative-karma-container">
            <div className="character-sheet__initiative-container">
              <h1 className="character-sheet__initiative-count">5k3</h1>
              <p className="character-sheet__initiative-label">
                Initiative Roll
              </p>
            </div>

            <div className="character-sheet__karma-container">
              <h1 className="character-sheet__karma-count">1</h1>
              <p className="character-sheet__karma-label">Karma Points</p>
            </div>
          </div>

          <div className="character-sheet__stats-container">
            <div className="character-sheet__honor-container">
              <p className="character-sheet__honor-text">Honor: 4.5</p>
              <div className="character-sheet__honor-slots">
                <div className="character-sheet__slots-image honor-point"></div>
                <div className="character-sheet__slots-image honor-point"></div>
                <div className="character-sheet__slots-image honor-point"></div>
                <div className="character-sheet__slots-image honor-point"></div>
                <div className="character-sheet__slots-image honor-point"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
              </div>
            </div>

            <div className="character-sheet__glory-container">
              <p className="character-sheet__glory-text">Glory: 0</p>
              <div className="character-sheet__glory-slots">
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
              </div>
            </div>

            <div className="character-sheet__status-container">
              <p className="character-sheet__status-text">Status: 1</p>
              <div className="character-sheet__status-slots">
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
                <div className="character-sheet__slots-image"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="character-sheet__rings-container">
          <div className="character-sheet__all-rings-container">
            <div className="character-sheet__rings-image">
              {/* element rings */}
              <div className="character-sheet__ring-rank-container earth">
                <h3 className="character-sheet__trait-rank">3</h3>
              </div>
              <div className="character-sheet__ring-rank-container air">
                <h3 className="character-sheet__trait-rank">2</h3>
              </div>
              <div className="character-sheet__ring-rank-container water">
                <h3 className="character-sheet__trait-rank">2</h3>
              </div>
              <div className="character-sheet__ring-rank-container fire">
                <h3 className="character-sheet__trait-rank">3</h3>
              </div>
              <div className="character-sheet__ring-rank-container void">
                <h3 className="character-sheet__trait-rank">2</h3>
              </div>

              {/* trait rings */}
              <div className="character-sheet__ring-rank-container stamina">
                <h3 className="character-sheet__trait-rank">3</h3>
                <p className="character-sheet__trait-text stamina-text">
                  Stamina
                </p>
              </div>
              <div className="character-sheet__ring-rank-container willpower">
                <h3 className="character-sheet__trait-rank">3</h3>
                <p className="character-sheet__trait-text willpower-text">
                  Willpower
                </p>
              </div>
              <div className="character-sheet__ring-rank-container strength">
                <h3 className="character-sheet__trait-rank">2</h3>
                <p className="character-sheet__trait-text strength-text">
                  Strength
                </p>
              </div>
              <div className="character-sheet__ring-rank-container perception">
                <h3 className="character-sheet__trait-rank">2</h3>
                <p className="character-sheet__trait-text perception-text">
                  Perception
                </p>
              </div>
              <div className="character-sheet__ring-rank-container agility">
                <h3 className="character-sheet__trait-rank">3</h3>
                <p className="character-sheet__trait-text agility-text">
                  Agility
                </p>
              </div>
              <div className="character-sheet__ring-rank-container intelligence">
                <h3 className="character-sheet__trait-rank">3</h3>
                <p className="character-sheet__trait-text intelligence-text">
                  Intelligence
                </p>
              </div>
              <div className="character-sheet__ring-rank-container reflexes">
                <h3 className="character-sheet__trait-rank">2</h3>
                <p className="character-sheet__trait-text reflexes-text">
                  Reflexes
                </p>
              </div>
              <div className="character-sheet__ring-rank-container awareness">
                <h3 className="character-sheet__trait-rank">3</h3>
                <p className="character-sheet__trait-text awareness-text">
                  Awareness
                </p>
              </div>
            </div>
          </div>
          <div className="character-sheet__void-container">
            <p className="character-sheet__void-text">Void Slots</p>
            <div className="character-sheet__void-slots">
              <div
                className={
                  this.state.voidSlots.slot1
                    ? "character-sheet__void-slots-image void-spent"
                    : "character-sheet__void-slots-image"
                }
                onClick={() => this.handleVoidClick("slot1")}
              ></div>
              <div
                className={
                  this.state.voidSlots.slot2
                    ? "character-sheet__void-slots-image void-spent"
                    : "character-sheet__void-slots-image"
                }
                onClick={() => this.handleVoidClick("slot2")}
              ></div>
              <div className="character-sheet__void-slots-image unavailable"></div>
              <div className="character-sheet__void-slots-image unavailable"></div>
              <div className="character-sheet__void-slots-image unavailable"></div>
              <div className="character-sheet__void-slots-image unavailable"></div>
              <div className="character-sheet__void-slots-image unavailable"></div>
              <div className="character-sheet__void-slots-image unavailable"></div>
              <div className="character-sheet__void-slots-image unavailable"></div>
              <div className="character-sheet__void-slots-image unavailable"></div>
            </div>
          </div>
        </section>

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
                <td className="character-sheet__skill-types">School, Bugei</td>
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
                <td className="character-sheet__skill-types">School, Bugei</td>
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
                <td className="character-sheet__skill-types">School, Bugei</td>
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
                <td className="character-sheet__skill-types">School, Bugei</td>
              </tr>

              <tr className="character-sheet__skills-item">
                <td className="character-sheet__skill-name pop-text-2">
                  Lore: Shadowlands
                </td>
                <td className="character-sheet__skill-rank">1</td>
                <td className="character-sheet__skill-trait">Intelligence</td>
                <td className="character-sheet__skill-roll">
                  <span className="skill-roll">4k3</span>
                </td>
                <td className="character-sheet__skill-types">School, Low</td>
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
                <td className="character-sheet__skill-types">School, Low</td>
              </tr>

              <tr className="character-sheet__skills-item">
                <td className="character-sheet__skill-name pop-text-2">
                  Medicine
                </td>
                <td className="character-sheet__skill-rank">3</td>
                <td className="character-sheet__skill-trait">Intelligence</td>
                <td className="character-sheet__skill-roll">
                  <span className="skill-roll">6k3</span>
                </td>
                <td className="character-sheet__skill-types">School, High</td>
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
                <td className="character-sheet__skill-types">High, Social</td>
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
                <td className="character-sheet__skill-types">High, Social</td>
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
                <td className="character-sheet__skill-types">Low, Social</td>
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
          {/* <div className="character-sheet__skills-header">
            <p className="character-sheet__skills-heading">Skill Name</p>
            <p className="character-sheet__skills-heading">Rank</p>
            <p className="character-sheet__skills-heading">Trait</p>
            <p className="character-sheet__skills-heading">Roll</p>
            <p className="character-sheet__skills-heading">Types</p>
          </div>
  
          <div className="character-sheet__skills-item">
            <h4 className="character-sheet__skill-name">Athletics</h4>
            <p className="character-sheet__skill-rank">1</p>
            <p className="character-sheet__skill-trait">Strength</p>
            <p className="character-sheet__skill-roll">3k2</p>
            <p className="character-sheet__skill-types">School, Bugei</p>
          </div>
          <div className="character-sheet__skills-item">
            <h4 className="character-sheet__skill-name">Hunting</h4>
            <p className="character-sheet__skill-rank">2</p>
            <p className="character-sheet__skill-trait">Perception</p>
            <p className="character-sheet__skill-roll">4k2</p>
            <p className="character-sheet__skill-types">School, Bugei</p>
          </div>
          <div className="character-sheet__skills-item">
            <h4 className="character-sheet__skill-name">Kenjutsu</h4>
            <p className="character-sheet__skill-rank">3</p>
            <p className="character-sheet__skill-trait">Reflexes</p>
            <p className="character-sheet__skill-roll">6k3</p>
            <p className="character-sheet__skill-types">School, Bugei</p>
          </div>
          <div className="character-sheet__skills-item">
            <h4 className="character-sheet__skill-name">Kyujutsu</h4>
            <p className="character-sheet__skill-rank">1</p>
            <p className="character-sheet__skill-trait">Reflexes</p>
            <p className="character-sheet__skill-roll">4k3</p>
            <p className="character-sheet__skill-types">School, Bugei</p>
          </div>
          <div className="character-sheet__skills-item">
            <h4 className="character-sheet__skill-name">Lore: Shadowlands</h4>
            <p className="character-sheet__skill-rank">1</p>
            <p className="character-sheet__skill-trait">Intelligence</p>
            <p className="character-sheet__skill-roll">4k3</p>
            <p className="character-sheet__skill-types">School, Low</p>
          </div>
          <div className="character-sheet__skills-item">
            <h4 className="character-sheet__skill-name">Stealth</h4>
            <p className="character-sheet__skill-rank">2</p>
            <p className="character-sheet__skill-trait">Agility</p>
            <p className="character-sheet__skill-roll">5k3</p>
            <p className="character-sheet__skill-types">School, Low</p>
          </div>
          <div className="character-sheet__skills-item">
            <h4 className="character-sheet__skill-name">Medicine</h4>
            <p className="character-sheet__skill-rank">3</p>
            <p className="character-sheet__skill-trait">Intelligence</p>
            <p className="character-sheet__skill-roll">6k3</p>
            <p className="character-sheet__skill-types">School, High</p>
          </div> */}
          {/* skill name */}
          {/* rank */}
          {/* trait */}
          {/* roll */}
        </section>
      </main>
    );
  }
}

export default CharacterSheet;
