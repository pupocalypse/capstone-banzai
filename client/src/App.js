import React from "react";
import axios from "axios";
import "./App.css";

import Clans from "./components/Clans";

const URL = "http://localhost:8000";

class App extends React.Component {
  state = {
    clans: [],
    schools: [],
    skills: {},
    selectedClan: {},
    open: true,
  };

  componentDidMount() {
    this.getData("clans");
    this.getData("schools");
    this.getData("skills");
    console.log("App component mounted");
  }

  componentDidUpdate(_prevProps, prevState) {
    // console.log("prevState:", prevState);
    // console.log("this.state:", this.state);
    if (prevState.clans !== this.state.clans) {
      this.setState({
        selectedClan: this.state.clans[0],
      });
    }
    if (prevState.selectedClan !== this.state.selectedClan) {
      this.setState({
        open: true,
      });
    }
    console.log("App component updated");
  }

  getData(stateProp) {
    // pass in clans, schools, skills as string
    axios
      .get(`${URL}/${stateProp}`)
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          [stateProp]: data,
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
        <h1>万歳 Banzai! Homepage</h1>
        <Clans
          clans={this.state.clans}
          schools={this.state.schools}
          selectedClan={this.state.selectedClan}
          handleClick={this.handleClick}
          open={this.state.open}
        />
      </div>
    );
  }
}

export default App;
