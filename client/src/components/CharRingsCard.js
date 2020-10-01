import React from "react";
import { Popup, Button } from "semantic-ui-react";

const CharRingsCard = ({
  char,
  voidSlots,
  handleVoidClick,
  onClickUpgradeTrait,
}) => {
  // trait ranks
  const traits = {
    reflexes: char.rings.air.traits.reflexes.rank,
    awareness: char.rings.air.traits.awareness.rank,
    stamina: char.rings.earth.traits.stamina.rank,
    willpower: char.rings.earth.traits.willpower.rank,
    agility: char.rings.fire.traits.agility.rank,
    intelligence: char.rings.fire.traits.intelligence.rank,
    strength: char.rings.water.traits.strength.rank,
    perception: char.rings.water.traits.perception.rank,
  };

  // ring ranks
  const airRank = Math.min(traits.reflexes, traits.awareness);
  const earthRank = Math.min(traits.stamina, traits.willpower);
  const fireRank = Math.min(traits.agility, traits.intelligence);
  const waterRank = Math.min(traits.strength, traits.perception);
  const voidRank = char.rings.void.traits.void.rank;

  const capitalize = (string) => {
    if (string.includes(" ")) {
      return string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const voidSlotsList = () => {
    let remaining = 10;
    if (remaining === 0) {
      return;
    }
    let voidSlotsJSX = Object.keys(voidSlots).map((slot) => {
      remaining--;
      return (
        <button
          key={`void-${slot}`}
          className={
            voidSlots[slot]
              ? "character-sheet__void-slots-image void-spent"
              : "character-sheet__void-slots-image"
          }
          onClick={() => handleVoidClick(slot)}
        ></button>
      );
    });
    for (let i = 1; i <= remaining; i++) {
      voidSlotsJSX.push(
        <div
          key={`void-${i}`}
          className="character-sheet__void-slots-image unavailable"
        ></div>
      );
    }
    return voidSlotsJSX;
  };

  const traitRingsList = () => {
    const { rings } = char;
    const traitsJSX = Object.keys(rings).map((ring) => {
      if (ring === "void") {
        return null;
      }
      return Object.keys(rings[ring].traits).map((trait) => {
        return (
          <Popup
            key={trait}
            trigger={
              <button
                className={`character-sheet__ring-rank-container ${trait}`}
              >
                <h3 className={`character-sheet__trait-rank ${ring}-rank`}>
                  {traits[trait]}
                </h3>
                <p className={`character-sheet__trait-text ${trait}-text`}>
                  {capitalize(trait)}
                </p>
              </button>
            }
            position="top center"
            wide
            on="click"
            content={
              (traits[trait] + 1) * 4 <= char.currentExp ? (
                <>
                  <p className="character-sheet__trait-popup-text">
                    Spend{" "}
                    <span className="pop-text-2">
                      {(traits[trait] + 1) * 4}{" "}
                    </span>
                    experience on{" "}
                    <span className="pop-text-2">
                      {capitalize(trait)} {traits[trait] + 1}
                    </span>
                    ?
                  </p>
                  <Button
                    circular
                    size="mini"
                    fluid
                    onClick={() => onClickUpgradeTrait(ring, trait)}
                  >
                    Upgrade {capitalize(trait)}
                  </Button>
                </>
              ) : (
                <p className="character-sheet__trait-popup-text">
                  You need{" "}
                  <span className="pop-text-2">{(traits[trait] + 1) * 4}</span>{" "}
                  experience to purchase{" "}
                  <span className="pop-text-2">
                    {capitalize(trait)} {traits[trait] + 1}
                  </span>
                </p>
              )
            }
          />
        );
      });
    });
    return traitsJSX;
  };

  return (
    <section className="character-sheet__rings-container">
      <div className="character-sheet__all-rings-container">
        <div className="character-sheet__rings-image">
          {/* clipping masks for ring colours */}
          <div className="character-sheet__rings-clipped-earth"></div>
          <div className="character-sheet__rings-clipped-air"></div>
          <div className="character-sheet__rings-clipped-water"></div>
          <div className="character-sheet__rings-clipped-fire"></div>
          <div className="character-sheet__rings-clipped-void"></div>

          {/* element rings */}
          <div className="character-sheet__ring-rank-container earth">
            <h3 className="character-sheet__trait-rank earth-rank">
              {earthRank}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container air">
            <h3 className="character-sheet__trait-rank air-rank">{airRank}</h3>
          </div>
          <div className="character-sheet__ring-rank-container water">
            <h3 className="character-sheet__trait-rank water-rank">
              {waterRank}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container fire">
            <h3 className="character-sheet__trait-rank fire-rank">
              {fireRank}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container void">
            <h3 className="character-sheet__trait-rank void-rank">
              {voidRank}
            </h3>
          </div>

          {/* trait rings */}
          {traitRingsList()}
          {/* <Popup
            trigger={
              <button className="character-sheet__ring-rank-container stamina">
                <h3 className="character-sheet__trait-rank earth-rank">
                  {staminaRank}
                </h3>
                <p className="character-sheet__trait-text stamina-text">
                  Stamina
                </p>
              </button>
            }
            position="top center"
            wide
            on="click"
            content={
              (staminaRank + 1) * 4 <= char.currentExp ? (
                <>
                  <p className="character-sheet__trait-popup-text">
                    Spend{" "}
                    <span className="pop-text-2">{(staminaRank + 1) * 4} </span>
                    experience on{" "}
                    <span className="pop-text-2">
                      Stamina {staminaRank + 1}
                    </span>
                    ?
                  </p>
                  <Button circular size="mini" fluid>
                    Upgrade Stamina
                  </Button>
                </>
              ) : (
                <p className="character-sheet__trait-popup-text">
                  You need{" "}
                  <span className="pop-text-2">{(staminaRank + 1) * 4}</span>{" "}
                  experience to purchase{" "}
                  <span className="pop-text-2">Stamina {staminaRank + 1}</span>
                </p>
              )
            }
          /> */}
          {/* <button className="character-sheet__ring-rank-container stamina">
            <h3 className="character-sheet__trait-rank earth-rank">
              {char.rings.earth.traits.stamina.rank}
            </h3>
            <p className="character-sheet__trait-text stamina-text">Stamina</p>
          </button> */}
          {/* <button className="character-sheet__ring-rank-container willpower">
            <h3 className="character-sheet__trait-rank earth-rank">
              {willpowerRank}
            </h3>
            <p className="character-sheet__trait-text willpower-text">
              Willpower
            </p>
          </button>
          <button className="character-sheet__ring-rank-container strength">
            <h3 className="character-sheet__trait-rank water-rank">
              {strengthRank}
            </h3>
            <p className="character-sheet__trait-text strength-text">
              Strength
            </p>
          </button>
          <button className="character-sheet__ring-rank-container perception">
            <h3 className="character-sheet__trait-rank water-rank">
              {perceptionRank}
            </h3>
            <p className="character-sheet__trait-text perception-text">
              Perception
            </p>
          </button>
          <button className="character-sheet__ring-rank-container reflexes">
            <h3 className="character-sheet__trait-rank air-rank">
              {reflexesRank}
            </h3>
            <p className="character-sheet__trait-text reflexes-text">
              Reflexes
            </p>
          </button>
          <button className="character-sheet__ring-rank-container awareness">
            <h3 className="character-sheet__trait-rank air-rank">
              {awarenessRank}
            </h3>
            <p className="character-sheet__trait-text awareness-text">
              Awareness
            </p>
          </button>
          <button className="character-sheet__ring-rank-container agility">
            <h3 className="character-sheet__trait-rank fire-rank">
              {agilityRank}
            </h3>
            <p className="character-sheet__trait-text agility-text">Agility</p>
          </button>
          <button className="character-sheet__ring-rank-container intelligence">
            <h3 className="character-sheet__trait-rank fire-rank">
              {intelligenceRank}
            </h3>
            <p className="character-sheet__trait-text intelligence-text">
              Intelligence
            </p>
          </button> */}
        </div>
      </div>
      <div className="character-sheet__void-container">
        <p className="character-sheet__void-text">Void Slots</p>
        <div className="character-sheet__void-slots">
          {!voidSlots.hasOwnProperty("slot1") ? "Loading..." : voidSlotsList()}
        </div>
      </div>
    </section>
  );
};

export default CharRingsCard;
