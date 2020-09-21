import React from "react";
import { Button } from "semantic-ui-react";

const WizardRingsTable = () => {
  return (
    <table className="wizard__form-rings-table">
      <tbody>
        <tr>
          <td rowSpan="2" className="element">
            Air
          </td>
          <td rowSpan="2" className="element-rank">
            2
          </td>
          <td className="trait">Reflexes</td>
          <td className="trait-rank">2</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>
        <tr>
          <td className="trait">Awareness</td>
          <td className="trait-rank">2</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>

        <tr>
          <td rowSpan="2" className="element">
            Earth
          </td>
          <td rowSpan="2" className="element-rank">
            2
          </td>
          <td className="trait">Stamina</td>
          <td className="trait-rank">2</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>
        <tr>
          <td className="trait">Willpower</td>
          <td className="trait-rank">2</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>

        <tr>
          <td rowSpan="2" className="element">
            Fire
          </td>
          <td rowSpan="2" className="element-rank">
            2
          </td>
          <td className="trait">Agility</td>
          <td className="trait-rank">2</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>
        <tr>
          <td className="trait">Intelligence</td>
          <td className="trait-rank">2</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>

        <tr>
          <td rowSpan="2" className="element">
            Water
          </td>
          <td rowSpan="2" className="element-rank">
            2
          </td>
          <td className="trait">Strength</td>
          <td className="trait-rank">2</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>
        <tr>
          <td className="trait">Perception</td>
          <td className="trait-rank">2</td>
          <td className="upgrade-button-cell">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>

        <tr>
          <td className="element void">Void</td>
          <td className="element-rank void">2</td>
          <td className="trait void"></td>
          <td className="trait-rank void"></td>
          <td className="upgrade-button-cell void">
            <Button
              primary
              icon="angle double up"
              circular
              size="mini"
            ></Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WizardRingsTable;
