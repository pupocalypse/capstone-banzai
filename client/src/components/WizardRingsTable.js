import React from "react";
import { Button } from "semantic-ui-react";

const WizardRingsTable = ({ rings, spendTraitExp }) => {
  return (
    <table className="wizard__form-rings-table">
      <tbody>
        <tr>
          <td rowSpan="2" className="element">
            Air
          </td>
          <td rowSpan="2" className="element-rank">
            {Math.min(
              rings.air.traits.reflexes.rank,
              rings.air.traits.awareness.rank
            )}
          </td>
          <td className="trait">Reflexes</td>
          <td className="trait-rank">{rings.air.traits.reflexes.rank}</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("air", "reflexes")}
              type="button"
            />
          </td>
        </tr>
        <tr>
          <td className="trait">Awareness</td>
          <td className="trait-rank">{rings.air.traits.awareness.rank}</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("air", "awareness")}
              type="button"
            />
          </td>
        </tr>

        <tr>
          <td rowSpan="2" className="element">
            Earth
          </td>
          <td rowSpan="2" className="element-rank">
            {Math.min(
              rings.earth.traits.stamina.rank,
              rings.earth.traits.willpower.rank
            )}
          </td>
          <td className="trait">Stamina</td>
          <td className="trait-rank">{rings.earth.traits.stamina.rank}</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("earth", "stamina")}
              type="button"
            />
          </td>
        </tr>
        <tr>
          <td className="trait">Willpower</td>
          <td className="trait-rank">{rings.earth.traits.willpower.rank}</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("earth", "willpower")}
              type="button"
            />
          </td>
        </tr>

        <tr>
          <td rowSpan="2" className="element">
            Fire
          </td>
          <td rowSpan="2" className="element-rank">
            {Math.min(
              rings.fire.traits.agility.rank,
              rings.fire.traits.intelligence.rank
            )}
          </td>
          <td className="trait">Agility</td>
          <td className="trait-rank">{rings.fire.traits.agility.rank}</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("fire", "agility")}
              type="button"
            />
          </td>
        </tr>
        <tr>
          <td className="trait">Intelligence</td>
          <td className="trait-rank">{rings.fire.traits.intelligence.rank}</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("fire", "intelligence")}
              type="button"
            />
          </td>
        </tr>

        <tr>
          <td rowSpan="2" className="element">
            Water
          </td>
          <td rowSpan="2" className="element-rank">
            {Math.min(
              rings.water.traits.strength.rank,
              rings.water.traits.perception.rank
            )}
          </td>
          <td className="trait">Strength</td>
          <td className="trait-rank">{rings.water.traits.strength.rank}</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("water", "strength")}
              type="button"
            />
          </td>
        </tr>
        <tr>
          <td className="trait">Perception</td>
          <td className="trait-rank">{rings.water.traits.perception.rank}</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("water", "perception")}
              type="button"
            />
          </td>
        </tr>

        <tr>
          <td className="element void">Void</td>
          <td className="element-rank void">{rings.void.traits.void.rank}</td>
          <td className="trait void"></td>
          <td className="trait-rank void"></td>
          <td className="upgrade-button-cell void">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
              onClick={() => spendTraitExp("void", "void")}
              type="button"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WizardRingsTable;
