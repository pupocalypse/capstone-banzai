import React from "react";

const CharRingsCard = ({ char, voidSlots, handleVoidClick }) => {
  return (
    <section className="character-sheet__rings-container">
      <div className="character-sheet__all-rings-container">
        <div className="character-sheet__rings-image">
          {/* element rings */}
          <div className="character-sheet__ring-rank-container earth">
            <h3 className="character-sheet__trait-rank">
              {Math.min(
                char.rings.earth.traits.stamina.rank,
                char.rings.earth.traits.willpower.rank
              )}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container air">
            <h3 className="character-sheet__trait-rank">
              {Math.min(
                char.rings.air.traits.reflexes.rank,
                char.rings.air.traits.awareness.rank
              )}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container water">
            <h3 className="character-sheet__trait-rank">
              {Math.min(
                char.rings.water.traits.strength.rank,
                char.rings.water.traits.perception.rank
              )}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container fire">
            <h3 className="character-sheet__trait-rank">
              {Math.min(
                char.rings.fire.traits.agility.rank,
                char.rings.fire.traits.intelligence.rank
              )}
            </h3>
          </div>
          <div className="character-sheet__ring-rank-container void">
            <h3 className="character-sheet__trait-rank">
              {char.rings.void.traits.void.rank}
            </h3>
          </div>

          {/* trait rings */}
          <div className="character-sheet__ring-rank-container stamina">
            <h3 className="character-sheet__trait-rank">
              {char.rings.earth.traits.stamina.rank}
            </h3>
            <p className="character-sheet__trait-text stamina-text">Stamina</p>
          </div>
          <div className="character-sheet__ring-rank-container willpower">
            <h3 className="character-sheet__trait-rank">
              {char.rings.earth.traits.willpower.rank}
            </h3>
            <p className="character-sheet__trait-text willpower-text">
              Willpower
            </p>
          </div>
          <div className="character-sheet__ring-rank-container strength">
            <h3 className="character-sheet__trait-rank">
              {char.rings.water.traits.strength.rank}
            </h3>
            <p className="character-sheet__trait-text strength-text">
              Strength
            </p>
          </div>
          <div className="character-sheet__ring-rank-container perception">
            <h3 className="character-sheet__trait-rank">
              {char.rings.water.traits.perception.rank}
            </h3>
            <p className="character-sheet__trait-text perception-text">
              Perception
            </p>
          </div>
          <div className="character-sheet__ring-rank-container agility">
            <h3 className="character-sheet__trait-rank">
              {char.rings.fire.traits.agility.rank}
            </h3>
            <p className="character-sheet__trait-text agility-text">Agility</p>
          </div>
          <div className="character-sheet__ring-rank-container intelligence">
            <h3 className="character-sheet__trait-rank">
              {char.rings.fire.traits.intelligence.rank}
            </h3>
            <p className="character-sheet__trait-text intelligence-text">
              Intelligence
            </p>
          </div>
          <div className="character-sheet__ring-rank-container reflexes">
            <h3 className="character-sheet__trait-rank">
              {char.rings.air.traits.reflexes.rank}
            </h3>
            <p className="character-sheet__trait-text reflexes-text">
              Reflexes
            </p>
          </div>
          <div className="character-sheet__ring-rank-container awareness">
            <h3 className="character-sheet__trait-rank">
              {char.rings.air.traits.awareness.rank}
            </h3>
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
              voidSlots.slot1
                ? "character-sheet__void-slots-image void-spent"
                : "character-sheet__void-slots-image"
            }
            onClick={() => handleVoidClick("slot1")}
          ></div>
          <div
            className={
              voidSlots.slot2
                ? "character-sheet__void-slots-image void-spent"
                : "character-sheet__void-slots-image"
            }
            onClick={() => handleVoidClick("slot2")}
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
  );
};

export default CharRingsCard;
