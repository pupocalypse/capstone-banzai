import React from "react";
import axios from "axios";
import { Route, Switch, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Wizard from "./components/Wizard";
import CharactersPage from "./components/CharactersPage";
import CharacterSheet from "./components/CharacterSheet";
// import Clans from "./components/Clans";
// import UITest from "./components/UI-Test";

const URL = "http://localhost:8000";

class App extends React.Component {
  state = {
    clans: [],
    schools: [],
    skills: {},
    // selectedClan: {},
    // open: true,
  };

  componentDidMount() {
    this.getData("clans");
    this.getData("schools");
    this.getData("skills");
    console.log("App component mounted");
  }

  // componentDidUpdate(_prevProps, prevState) {
  //   // console.log("prevState:", prevState);
  //   // console.log("this.state:", this.state);
  //   if (prevState.clans !== this.state.clans) {
  //     this.setState({
  //       selectedClan: this.state.clans[0],
  //     });
  //   }
  //   if (prevState.selectedClan !== this.state.selectedClan) {
  //     this.setState({
  //       open: true,
  //     });
  //   }
  //   console.log("App component updated");
  // }

  getData(stateProp) {
    // pass in clans, schools, skills as string
    axios
      .get(`${URL}/${stateProp}`)
      .then(({ data }) => {
        // console.log(data);
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
        {/* <h1>万歳 Banzai! Homepage</h1> */}
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
              return <CharactersPage />;
            }}
            exact
          />
          <Route
            path="/characters/YasukiHayami"
            render={() => {
              return <CharacterSheet />;
            }}
          />
        </Switch>
        {/* <UITest clans={this.state.clans} /> */}
        {/* <Clans
          clans={this.state.clans}
          schools={this.state.schools}
          selectedClan={this.state.selectedClan}
          handleClick={this.handleClick}
          open={this.state.open}
        /> */}
      </div>
    );
  }
}

export default App;
