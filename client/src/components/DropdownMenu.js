import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownMenu = ({ title, dropdownOptions, handleChange }) => {
  return (
    <Dropdown
      placeholder={`Select Your ${title}`}
      selection
      options={dropdownOptions}
      onChange={handleChange}
    />
  );
};

export default DropdownMenu;
