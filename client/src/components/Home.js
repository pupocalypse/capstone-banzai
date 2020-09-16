import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Home = () => {
  return (
    <main className="home">
      <div className="home__header">
        <h1 className="home__main-heading">
          <span className="home__main-heading--kanji">万歳</span> Banzai!
        </h1>
        <h3 className="home__sub-heading">
          A{" "}
          <span className="home__sub-heading--pop">
            Legend of the Five Rings
          </span>{" "}
          character sheet builder and management tool.
        </h3>
      </div>
      <div className="home__inset-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/l5r_logo.png`}
          alt=""
          className="home__image"
        />
        <Button
          as={Link}
          to="/build-character/page1"
          color="olive"
          circular
          content="Create New Character"
          className="home__button"
        />
        <Button
          as={Link}
          to="/characters"
          color="teal"
          circular
          content="View Saved Characters"
          className="home__button"
        />
        <p className="home__body-text">
          Legend of the Five Rings is a table-top role-playing game published by{" "}
          <a href="https://www.alderac.com/" target="_blank" className="link">
            Alderac Entertainment Group
          </a>{" "}
          in 1997 and acquired by{" "}
          <a
            href="https://www.fantasyflightgames.com/en/index/"
            target="_blank"
            className="link"
          >
            Fantasy Flight Games
          </a>{" "}
          in 2015. It is set in the feudal Japan-inspired setting of Rokugan,
          ruled by seven Great Clans, each consisting of a number of families
          for whom any given samurai may serve. Players create personas in one
          of three main classes: Bushi, traditionally combat-focused samurai;
          Shugenja, the priests and spell-casters; and Courtiers, those who duel
          at court with crafted words and political negotiations.
        </p>
        <p className="home__body-text">
          L5R uses a 'roll and keep' system for dice-rolling, which determines
          how many 10-sided dice a player rolls for a skill or ability check.
          The number of rolled dice is determined by a player's rank in a skill
          plus their matching trait ring, and the number of dice to keep is
          determined by the rank of that trait ring.
        </p>
        <p className="home__body-text">
          For example, a game master may ask a player to roll their Etiquette
          skill to avoid offending a direct lord with some rash words. The
          player's Etiquette rank is 3, and belongs to their Awareness ring,
          which is at rank 2. The player will then roll 5, keep 2 (or 5k2). The
          player chooses the two dice to keep (usually the highest) to attempt
          to beat&mdash;or deliberately fail&mdash;the Target Number set by the
          GM.
        </p>
      </div>
    </main>
  );
};

export default Home;
