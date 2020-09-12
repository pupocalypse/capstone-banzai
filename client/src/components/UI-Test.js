import React from "react";
import { Button, Dropdown } from "semantic-ui-react";

class UITest extends React.Component {
  // const clanList = clans.map((clan) => {
  //   return <Dropdown.Item>{clan.clan}</Dropdown.Item>;
  // });

  // const familyList = clans.map((clan) => {
  //   const families = clan.families.map((family) => {
  //     return <Dropdown.Item>{family.name}</Dropdown.Item>;
  //   });

  //   return (
  //     <>
  //       <Dropdown.Header content={clan.clan} />
  //       <Dropdown.Divider />
  //       {families}
  //     </>
  //   );
  // });

  // const schoolList = clans.map((clan) => {
  //   // const schools = clans.schools.map((school) => {
  //   //   return <Dropdown.Item>{school.name}</Dropdown.Item>;
  //   // });

  //   return (
  //     <>
  //       <Dropdown.Header content={clan.clan} />
  //       <Dropdown.Divider />
  //       {/* {schools} */}
  //     </>
  //   );
  // });

  // return (
  //   <>
  //     <div className="clans">
  //       <Button.Group color="red">
  //         <Button>Select Your Clan</Button>
  //         <Dropdown
  //           // text="Select Your Clan"
  //           // icon="filter"
  //           floating
  //           // labeled
  //           // button
  //           className="button icon"
  //           // className="icon"
  //         >
  //           <Dropdown.Menu>{clanList}</Dropdown.Menu>
  //         </Dropdown>
  //       </Button.Group>
  //     </div>

  //     <div className="families">
  //       <Button.Group color="red">
  //         <Button>Select Your Family</Button>
  //         <Dropdown
  //           // text="Select Your Clan"
  //           // icon="filter"
  //           floating
  //           // labeled
  //           // button
  //           className="button icon"
  //           // className="icon"
  //         >
  //           <Dropdown.Menu scrolling>{familyList}</Dropdown.Menu>
  //         </Dropdown>
  //       </Button.Group>
  //     </div>

  //     <div className="schools">
  //       <Button.Group color="red">
  //         <Button>Select Your School</Button>
  //         <Dropdown
  //           // text="Select Your Clan"
  //           // icon="filter"
  //           floating
  //           // labeled
  //           // button
  //           className="button icon"
  //           // className="icon"
  //         >
  //           <Dropdown.Menu scrolling>{schoolList}</Dropdown.Menu>
  //         </Dropdown>
  //       </Button.Group>
  //     </div>
  //   </>
  // );

  state = {
    selectedClan: [],
  };

  updateCurrentClan = (e, { value }) => {
    // console.log("onChange clans:", clans);
    const currentClan = this.props.clans.filter((clan) => clan.clan === value);

    this.setState({
      selectedClan: currentClan,
    });
  };

  render() {
    const currentClan = this.state.selectedClan;

    const clanOptions = this.props.clans.map((clan) => {
      return {
        key: clan.clan,
        text: clan.clan,
        value: clan.clan,
        image: { avatar: true, src: `./images/mons/Mon_${clan.clan}.gif` },
      };
    });

    const familyOptions =
      currentClan.length <= 0
        ? null
        : currentClan[0].families.map((family) => {
            return {
              key: family.name,
              text: family.name,
              value: family.name,
            };
          });

    const schoolOptions =
      currentClan.length <= 0
        ? null
        : currentClan[0].schools
            .filter((school) => school.type === "bushi")
            .map((school) => {
              return {
                key: school.name,
                text: school.name,
                value: school.name,
              };
            });

    // console.log("clanOptions:", clanOptions);
    // console.log("familyOptions:", familyOptions);
    // console.log("schoolOptions:", schoolOptions);
    // console.log("this.state.selectedClan:", this.state.selectedClan);

    // {
    //   key: "Justen Kitsune",
    //   text: "Justen Kitsune",
    //   value: "Justen Kitsune",
    //   image: { avatar: false, src: "/images/avatar/small/justen.jpg" },
    // },

    return (
      <>
        <Dropdown
          placeholder="Select Your Clan"
          selection
          search
          options={clanOptions}
          onChange={this.updateCurrentClan}
        />

        <Dropdown
          placeholder="Select Your Family"
          selection
          search
          options={familyOptions}
        />

        <Dropdown
          placeholder="Select Your School"
          selection
          search
          options={schoolOptions}
        />
      </>
    );
  }
}

export default UITest;
