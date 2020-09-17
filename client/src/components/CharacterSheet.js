import React from "react";
import { Statistic } from "semantic-ui-react";

import HayamiImg from "../assets/images/example_YasukiHayami.png";
import ringsImg from "../assets/images/rings/rings_noBG.png";
import emptyRingImg from "../assets/images/rings/rings_empty_whiteBG.png";

const CharacterSheet = () => {
  return (
    <main className="character-sheet">
      <section className="character-sheet__info-container">
        <div className="character-sheet__artwork"></div>
        {/* <img src={HayamiImg} alt="" className="character-sheet__artwork" /> */}
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

      <section className="character-sheet__rings-container">
        <div className="character-sheet__all-rings-container">
          <img src={ringsImg} alt="" className="character-sheet__rings-image" />
        </div>
        <div className="character-sheet__void-container">
          <p className="character-sheet__void-text">Void Slots</p>
          <div className="character-sheet__void-slots">
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
            <img
              src={emptyRingImg}
              alt=""
              className="character-sheet__void-slots-image"
            />
          </div>
        </div>
        {/* all rings */}
        {/* void slots */}
      </section>

      <section className="character-sheet__skills-container">
        <div className="character-sheet__skills-header">
          <p className="character-sheet__skill-heading">Skill Name</p>
          <p className="character-sheet__skill-heading">Rank</p>
          <p className="character-sheet__skill-heading">Trait</p>
          <p className="character-sheet__skill-heading">Roll</p>
          <p className="character-sheet__skill-heading">Types</p>
        </div>

        <div className="character-sheet__skills-item">
          <h4 className="character-sheet__skill-name">Athletics</h4>
          <p className="character-sheet__skill-rank">1</p>
          <p className="character-sheet__skill-trait">Strength</p>
          <p className="character-sheet__skill-roll">3k2</p>
          <p className="character-sheet__skill-types">School, Bugei</p>
        </div>
        <div className="character-sheet__skills-item">
          <h4 className="character-sheet__skill-name">Hnting</h4>
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
        </div>
        {/* skill name */}
        {/* rank */}
        {/* trait */}
        {/* roll */}
      </section>
    </main>
  );
};

export default CharacterSheet;
