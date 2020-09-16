import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

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
        {/* <Menu color="red" inverted>
          <Menu.Item>
            <h3 className="header__logo-heading">万歳 Banzai!</h3>
          </Menu.Item>

          <Menu.Item
            name="features"
            active={this.state.activeItem === "features"}
            onClick={this.handleItemClick}
          >
            Features
          </Menu.Item>

          <Menu.Item
            name="testimonials"
            active={this.state.activeItem === "testimonials"}
            onClick={this.handleItemClick}
          >
            Testimonials
          </Menu.Item>

          <Menu.Item
            name="sign-in"
            active={this.state.activeItem === "sign-in"}
            onClick={this.handleItemClick}
          >
            Sign-in
          </Menu.Item>
        </Menu> */}
      </header>
    );
  }
}

export default Navbar;
