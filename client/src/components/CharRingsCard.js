import React from "react";
import { Popup, Button } from "semantic-ui-react";

const CharRingsCard = ({ char, voidSlots, handleVoidClick }) => {
  // trait ranks
  const reflexesRank = char.rings.air.traits.reflexes.rank;
  const awarenessRank = char.rings.air.traits.awareness.rank;
  const staminaRank = char.rings.earth.traits.stamina.rank;
  const willpowerRank = char.rings.earth.traits.willpower.rank;
  const agilityRank = char.rings.fire.traits.agility.rank;
  const intelligenceRank = char.rings.fire.traits.intelligence.rank;
  const strengthRank = char.rings.water.traits.strength.rank;
  const perceptionRank = char.rings.water.traits.perception.rank;

  // ring ranks
  const airRank = Math.min(reflexesRank, awarenessRank);
  const earthRank = Math.min(staminaRank, willpowerRank);
  const fireRank = Math.min(agilityRank, intelligenceRank);
  const waterRank = Math.min(strengthRank, perceptionRank);
  const voidRank = char.rings.void.traits.void.rank;

  const voidSlotsList = () => {
    let remaining = 10;
    if (remaining === 0) {
      return;
    }
    let voidSlotsJSX = Object.keys(voidSlots).map((slot) => {
      remaining--;
      return (
        <button
          className={
            voidSlots[slot]
              ? "character-sheet__void-slots-image void-spent"
              : "character-sheet__void-slots-image"
          }
          onClick={() => handleVoidClick(slot)}
        ></button>
      );
    });
    for (let i = 0; i < remaining; i++) {
      voidSlotsJSX.push(
        <div className="character-sheet__void-slots-image unavailable"></div>
      );
    }
    return voidSlotsJSX;
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
          <Popup
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
                <>
                  <p className="character-sheet__trait-popup-text">
                    You need{" "}
                    <span className="pop-text-2">{(staminaRank + 1) * 4}</span>{" "}
                    experience to purchase{" "}
                    <span className="pop-text-2">
                      Stamina {staminaRank + 1}
                    </span>
                  </p>
                  {/* <Button circular size="mini" fluid disabled>
                    Upgrade Stamina
                  </Button> */}
                </>
              )
            }
          />
          {/* <button className="character-sheet__ring-rank-container stamina">
            <h3 className="character-sheet__trait-rank earth-rank">
              {char.rings.earth.traits.stamina.rank}
            </h3>
            <p className="character-sheet__trait-text stamina-text">Stamina</p>
          </button> */}
          <button className="character-sheet__ring-rank-container willpower">
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
          </button>
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
