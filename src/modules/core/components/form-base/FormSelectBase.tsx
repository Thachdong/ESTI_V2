import React from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDownRounded";

type TProps = {
  selectProps?: Select;
};

const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => (
  <components.DropdownIndicator {...props}>
    <ArrowDownIcon />
  </components.DropdownIndicator>
);

export const FormSelectBase: React.FC<TProps> = ({ selectProps }) => {
  return <Select />;
};
