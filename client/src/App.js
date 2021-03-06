import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Wizard from "./components/Wizard";
import CharactersPage from "./components/CharactersPage";
import CharacterSheet from "./components/CharacterSheet";

const URL = "http://localhost:8000";

class App extends React.Component {
  state = {
    clans: [],
    schools: [],
    skills: {},
    characters: [],
  };

  componentDidMount() {
    this.getData("clans");
    this.getData("schools");
    this.getData("skills");
    this.getData("characters");
  }

  // pass in clans, schools, skills as string
  getData(stateProp) {
    axios
      .get(`${URL}/${stateProp}`)
      .then(({ data }) => {
        let sevenClans;
        if (stateProp === "clans" || stateProp === "schools") {
          sevenClans = data.filter((clanData) => clanData.clan !== "Mantis");
        }
        this.setState({
          [stateProp]: sevenClans || data,
        });
      })
      .catch((error) => console.log(error));
  }

  handleClick = (clanObj) => {
    this.setState({
      selectedClan: clanObj,
      open: !this.state.open,
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            path="/"
            render={() => {
              return <Home />;
            }}
            exact
          />
          <Route
            path="/build-character"
            render={() => {
              return (
                <Wizard
                  clans={this.state.clans}
                  schools={this.state.schools}
                  skills={this.state.skills}
                />
              );
            }}
          />
          <Route
            path="/characters"
            render={() => {
              return <CharactersPage characters={this.state.characters} />;
            }}
            exact
          />
          <Route
            path="/characters/:id"
            render={(renderProps) => {
              return (
                <CharacterSheet
                  activeCharacter={this.state.activeCharacter}
                  {...renderProps}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
