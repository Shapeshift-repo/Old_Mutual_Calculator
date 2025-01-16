import { Slider } from "@mui/material";
import { useEffect, useState } from "react";

const RangeSlider = ({
  min,
  max,
  onUpdate,
  theme,
  symbol,
  defaultValue,
  disabled,
  budget,
  notificationShown,
  setNotificationShown
}) => {
  const [sliderValue, setSliderValue] = useState(min);
  const valuetext = (value) => {
    if (symbol === "R") {
      return `R${value}`;
    }
    if (symbol === "%") {
      return `${value}%`;
    }
    if (symbol === "days") {
      return `${value} days`;
    }
    if (symbol === "years") {
      return `${value} years`;
    }
    return `${value}`;
  };

  let themeColor;
  let themeGradient;
  if (theme === "green") {
    themeColor = "#159677";
    themeGradient =
      "linear-gradient(90deg, rgba(21,151,120,1) 0%, rgba(96,184,73,1) 100%)";
  }
  if (theme === "orange") {
    themeColor = "#F37021";
    themeGradient =
      "linear-gradient(90deg, rgba(242,74,75,1) 0%, rgba(243,112,33,1) 100%)";
  }
  if (theme === "pink") {
    themeColor = "#ED0080";
    themeGradient =
      "linear-gradient(90deg, rgba(234,20,128,1) 0%, rgba(195,45,150,1) 100%)";
  }
  if (theme === "blue") {
    themeColor = "#00C0E8";
    themeGradient =
      "linear-gradient(90deg, rgba(0,192,232,1) 0%, rgba(0,150,181,1) 100%)";
  }
  if (theme === "grey") {
    themeColor = "#AFAFAF";
    themeGradient =
      "linear-gradient(90deg, rgba(90,90,91,1) 0%, rgba(191,192,193,1) 100%)";
  }
  const handleNotification = (value, max) => {
	if(typeof notificationShown !== 'undefined' && !notificationShown && (value / max * 100) >= 50){
		setNotificationShown(true);
	}
  }

  return (
    <div className="w-full group/slider relative">
      {budget === 0 || budget === undefined || budget === "" ? (
        <div className="p-5 bg-[#F7F7F7] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg shadow-xl absolute w-[250px] hidden group-hover/slider:block">
          <p className="text-sm font-light">
            Please set a budget for this section first.
          </p>
        </div>
      ) : null}

      <Slider
        aria-label="Always visible"
        defaultValue={defaultValue}
        valueLabelFormat={valuetext}
        step={1}
        valueLabelDisplay="on"
        min={min}
        max={budget > 0 ? max : 0}
        onChange={(event, value) => {onUpdate(value), handleNotification(value, max)}}
        sx={{
          cursor: disabled ? "not-allowed" : "pointer",
          "& .MuiSlider-thumb": {
            borderWidth: "4px",
            borderRadius: "20px",
            width: "45px",
            height: "30px",
            borderColor: "white",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.35)",
            background: themeGradient,
          },
          "& .MuiSlider-thumb:hover": {
            outline: "none",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.35)",
          },
          "& .MuiSlider-rail": {
            background: "#F1F0F8",
            height: "7px",
            borderRadius: "20px",
          },
          "& .MuiSlider-track": {
            background: themeColor,
            height: "7px",
            borderRadius: "20px",
            borderColor: themeColor,
          },
          "& .MuiSlider-valueLabelOpen": {
            background: "transparent",
            color: themeColor,
            fontSize: "22px",
            fontWeight: symbol === "years" ? "bold" : "light",
            fontFamily: "Montserrat",
          },
        }}
      />
    </div>
  );
};

export default RangeSlider;
