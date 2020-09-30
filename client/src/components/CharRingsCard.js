import React from "react";

const CharRingsCard = ({ char, voidSlots, handleVoidClick }) => {
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
          <img
            src="../assets/images/rings_noBG.png"
            alt=""
            className="character-sheet_rings-clipped"
          />
          {/* element rings */}
          <div className="character-sheet__ring-rank-container earth">
            <h3 className="character-sheet__trait-rank earth-rank">
              {Math.min(
                char.rings.earth.traits.stamina.rank,
                char.rings.earth.traits.willpower.rank
              )}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container air">
            <h3 className="character-sheet__trait-rank air-rank">
              {Math.min(
                char.rings.air.traits.reflexes.rank,
                char.rings.air.traits.awareness.rank
              )}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container water">
            <h3 className="character-sheet__trait-rank water-rank">
              {Math.min(
                char.rings.water.traits.strength.rank,
                char.rings.water.traits.perception.rank
              )}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container fire">
            <h3 className="character-sheet__trait-rank fire-rank">
              {Math.min(
                char.rings.fire.traits.agility.rank,
                char.rings.fire.traits.intelligence.rank
              )}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container void">
            <h3 className="character-sheet__trait-rank void-rank">
              {char.rings.void.traits.void.rank}
            </h3>
          </div>

          {/* trait rings */}
          <button className="character-sheet__ring-rank-container stamina">
            <h3 className="character-sheet__trait-rank earth-rank">
              {char.rings.earth.traits.stamina.rank}
            </h3>
            <p className="character-sheet__trait-text stamina-text">Stamina</p>
          </button>
          <button className="character-sheet__ring-rank-container willpower">
            <h3 className="character-sheet__trait-rank earth-rank">
              {char.rings.earth.traits.willpower.rank}
            </h3>
            <p className="character-sheet__trait-text willpower-text">
              Willpower
            </p>
          </button>
          <button className="character-sheet__ring-rank-container strength">
            <h3 className="character-sheet__trait-rank water-rank">
              {char.rings.water.traits.strength.rank}
            </h3>
            <p className="character-sheet__trait-text strength-text">
              Strength
            </p>
          </button>
          <button className="character-sheet__ring-rank-container perception">
            <h3 className="character-sheet__trait-rank water-rank">
              {char.rings.water.traits.perception.rank}
            </h3>
            <p className="character-sheet__trait-text perception-text">
              Perception
            </p>
          </button>
          <button className="character-sheet__ring-rank-container reflexes">
            <h3 className="character-sheet__trait-rank air-rank">
              {char.rings.air.traits.reflexes.rank}
            </h3>
            <p className="character-sheet__trait-text reflexes-text">
              Reflexes
            </p>
          </button>
          <button className="character-sheet__ring-rank-container awareness">
            <h3 className="character-sheet__trait-rank air-rank">
              {char.rings.air.traits.awareness.rank}
            </h3>
            <p className="character-sheet__trait-text awareness-text">
              Awareness
            </p>
          </button>
          <button className="character-sheet__ring-rank-container agility">
            <h3 className="character-sheet__trait-rank fire-rank">
              {char.rings.fire.traits.agility.rank}
            </h3>
            <p className="character-sheet__trait-text agility-text">Agility</p>
          </button>
          <button className="character-sheet__ring-rank-container intelligence">
            <h3 className="character-sheet__trait-rank fire-rank">
              {char.rings.fire.traits.intelligence.rank}
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
