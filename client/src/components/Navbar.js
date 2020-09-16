import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    activeItem: "",
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <header className="header">
        <h3 className="header__logo-heading">
          <span className="header__logo-heading--kanji">万歳</span> Banzai
          <span className="font-fix">!</span>
        </h3>
        <nav className="header__nav-links">
          <Link to="/" className="header__link">
            <span className="header__nav-link">Home</span>
          </Link>
          <Link to="/build-character/page1" className="header__link">
            <span className="header__nav-link">Wizard</span>
          </Link>
          <Link to="/characters" className="header__link">
            <span className="header__nav-link">Characters</span>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Navbar;
