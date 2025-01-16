import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SvgIcon from "@mui/material/SvgIcon";

import { useState } from "react";

const CustomSelect = ({ onSelectUpdate, disabled }) => {
  const ChevronIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <KeyboardArrowDownOutlinedIcon
          style={disabled ? { color: "#AFAFAF" } : { color: "#00C0E8" }}
        />
      </SvgIcon>
    );
  };
  const [selectedValue, setSelectedValue] = useState(0);
  return (
    <>
      <Select
        value={selectedValue}
        onChange={(e) => {
          onSelectUpdate(e.target.value);
          setSelectedValue(e.target.value);
        }}
        variant="standard"
        IconComponent={ChevronIcon}
        disableUnderline
        sx={{
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.35)",
          borderRadius: "20px",
          border: "solid 1px #E4E4E4",
          height: "28px",
          "& .MuiSelect-select": {
            padding: "5px 0px 5px 10px",
            color: disabled ? "#AFAFAF" : "#00C0E8",
          },
        }}
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </>
  );
};

export default CustomSelect;
