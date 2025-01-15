import {
  Circle,
  Defs,
  Document,
  Font,
  Image,
  LinearGradient,
  PDFDownloadLink,
  Page,
  Path,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { useState } from "react";
import PDFHeaderGraphic1 from "/public/pdf-graphic-1.png";
import PDFHeaderGraphic2 from "/public/pdf-graphic-2.png";
import PDFHeaderGraphic from "/public/pdf-header-graphic.png";
import PDFLogo from "/public/pdf-logo.png";
import PYFBanner from "/public/pdf-pyf.png";

import MontserratLight from "/public/fonts/montserrat-v25-latin-200.ttf";
import MontserratSemiBold from "/public/fonts/montserrat-v25-latin-600.ttf";
import MontserratRegular from "/public/fonts/montserrat-v25-latin-700.ttf";
import MontserratBold from "/public/fonts/montserrat-v25-latin-regular.ttf";

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: MontserratRegular,
      fontWeight: "400",
    },
    {
      src: MontserratLight,
      fontWeight: "300",
    },
    {
      src: MontserratSemiBold,
      fontWeight: "600",
    },
    {
      src: MontserratBold,
      fontWeight: "700",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "col",
  },
  info: {
    flexDirection: "row",
    marginTop: 30,
  },
  col: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#F7F7F7",
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "10px",
  },
  headerLeft: {
    padding: 20,
  },
  headerRight: {
    flexDirection: "row",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    flexGrow: 0,
  },
  largeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#009677",
    fontFamily: "Montserrat",
  },
  titleGreen13: {
    fontSize: 13,
    color: "#009677",
    fontFamily: "Montserrat",
    fontWeight: "600",
  },
  titleGreen: {
    fontSize: 11,
    color: "#009677",
    fontFamily: "Montserrat",
    fontWeight: "600",
  },
  titleDark: {
    fontSize: 11,
    color: "#282828",
    fontFamily: "Montserrat",
    fontWeight: "600",
  },
  titleGreenLight: {
    fontSize: 14,
    fontWeight: "300",
    color: "#009677",
    fontFamily: "Montserrat",
  },
  titleText: {
    fontSize: 13,
    color: "#282828",
    fontFamily: "Montserrat",
    fontWeight: "600",
  },
  bodyGreenLight: {
    fontSize: 11,
    color: "#009677",
    fontFamily: "Montserrat",
    fontWeight: "300",
  },
  body: {
    fontSize: 11,
    margin: 0,
    padding: 0,
    color: "#282828",
    fontFamily: "Montserrat",
    fontWeight: "300",
  },
  bodyGrey: {
    fontSize: 11,
    margin: 0,
    padding: 0,
    color: "#DBDBDB",
    fontFamily: "Montserrat",
    fontWeight: "300",
  },
  bodySmall: {
    fontSize: 9,
    margin: 0,
    padding: 0,
    color: "#282828",
    fontFamily: "Montserrat",
    paddingBottom: "3px",
    fontWeight: "300",
  },
  logo: {
    width: 200,
    marginTop: "10px",
  },
  headerGraphic: {
    width: 130,
    paddingLeft: 50,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#D0D0D0",
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  spaceRight: {
    paddingRight: "20px",
  },
  spaceLeft: {
    paddingLeft: "20px",
  },
  spaceTop: {
    paddingTop: "20px",
  },
  spaceTop10: {
    paddingTop: "10px",
  },
  spaceBottom: {
    marginBottom: "5px",
  },
  spaceBottom3: {
    marginBottom: "3px",
  },
  greenBG: {
    backgroundColor: "#009677",
    fontSize: 18,
    fontWeight: "light",
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    padding: "8px 15px",
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  fontLight: {
    fontWeight: "light",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  semiBold: {
    fontWeight: "600",
    fontFamily: "Montserrat",
  },
  align: {
    paddingTop: "10px",
  },
});

const tickIcon = (
  <Svg width="10" height="12" viewBox="0 0 40.163 30.663">
    <Path
      id="Subtraction_14"
      data-name="Subtraction 14"
      d="M14,30.663h0l-14-14,4.5-4.5,9.5,9.5L35.666,0l4.5,4.5L14,30.663Z"
      fill="#159677"
    />
  </Svg>
);

const tickIconGrey = (
  <Svg width="10" height="12" viewBox="0 0 40.163 30.663">
    <Path
      id="Subtraction_14"
      data-name="Subtraction 14"
      d="M14,30.663h0l-14-14,4.5-4.5,9.5,9.5L35.666,0l4.5,4.5L14,30.663Z"
      fill="#DBDBDB"
    />
  </Svg>
);

const retirementIcon = (
  <Svg width="20" height="20" viewBox="0 0 63.219 63.154">
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <Stop offset="0" stopColor="#3688e7" />
        <Stop offset="1" stopColor="#e91582" />
      </LinearGradient>
    </Defs>
    <Path
      id="beach_access"
      d="M35.81,1.51c1.04,0,2.111.044,3.181.131A35.557,35.557,0,0,1,51.064,4.633a34.2,34.2,0,0,1,10.082,7.041l1.208,1.208-11.8,11.8-1.207-1.207a37.755,37.755,0,0,0-7.93-6.111,34.9,34.9,0,0,0-9.039-3.594,35.559,35.559,0,0,0-5.739-.921q1.692.567,3.426,1.306A53.91,53.91,0,0,1,46.985,25.825l1.207,1.207-7,7L64.673,57.678l-7.219,6.986L34.007,41.218l-7,7L25.8,47.012A53.908,53.908,0,0,1,14.126,30.088q-.738-1.733-1.3-3.424a35.525,35.525,0,0,0,.921,5.737,34.9,34.9,0,0,0,3.594,9.041,37.718,37.718,0,0,0,6.111,7.928l1.208,1.207-11.8,11.8-1.207-1.207A34.671,34.671,0,0,1,4.007,49.9,34.916,34.916,0,0,1,1.454,36.5,34.916,34.916,0,0,1,4.007,23.1a34.572,34.572,0,0,1,7.4-11.029,1.825,1.825,0,0,1,.628-.628A34.946,34.946,0,0,1,22.876,4.061,32.948,32.948,0,0,1,35.81,1.51Zm21.683,11.4a30.4,30.4,0,0,0-7.837-5.168,32.16,32.16,0,0,0-10.924-2.7H38.72c-.98-.08-1.959-.121-2.909-.121a29.554,29.554,0,0,0-11.6,2.281,29.075,29.075,0,0,0-4.525,2.418,35.343,35.343,0,0,1,4.479-.286A38.77,38.77,0,0,1,43.108,14.4a40.62,40.62,0,0,1,7.42,5.477ZM43.346,27.05A49.809,49.809,0,0,0,28.723,17.3a32.493,32.493,0,0,0-12.6-2.891c-.564,0-1.127.021-1.681.062A30.929,30.929,0,0,0,17.268,28.75a49.808,49.808,0,0,0,9.755,14.623Zm-23.5,23.5a40.581,40.581,0,0,1-5.477-7.418,38.309,38.309,0,0,1-3.946-9.925,36.989,36.989,0,0,1-.832-13.452A29.313,29.313,0,0,0,7.163,24.4,31.522,31.522,0,0,0,4.869,36.5,31.522,31.522,0,0,0,7.163,48.6a30.743,30.743,0,0,0,5.721,8.92ZM59.813,57.63,41.158,38.839l-2.35,2.35L57.493,59.874Z"
      transform="translate(-1.454 -1.51)"
      fill="url(#linear-gradient)"
    />
  </Svg>
);

const educationIcon = (
  <Svg width="20" height="20" viewBox="0 0 66.004 61.17">
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <Stop offset="0" stopColor="#3688e7" />
        <Stop offset="1" stopColor="#e91582" />
      </LinearGradient>
    </Defs>
    <Path
      id="education"
      d="M28.836-1.749,60.588,17.3,28.837,36.352,4.185,21.569H27.336V18.8H-5.416ZM54.757,17.3,28.836,1.749,5.416,15.8H30.336v8.767H15.02l13.816,8.285ZM-1.5,20.419l30.336,18.2L50.522,25.61v20.8L28.836,59.421,7.151,46.41V40.441l-8.651,9.6Zm5.767,6.959L1.5,25.718V42.231L4.267,39.16ZM28.836,42.119,10.151,30.908v13.8L28.836,55.922,47.522,44.711v-13.8Z"
      transform="translate(5.416 1.75)"
      fill="url(#linear-gradient)"
    />
  </Svg>
);

const goalIcon = (
  <Svg width="20" height="20" viewBox="0 0 98.971 98.971">
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <Stop offset="0" stopColor="#3688e7" />
        <Stop offset="1" stopColor="#e91582" />
      </LinearGradient>
    </Defs>
    <Path
      id="plane"
      d="M36.035,1.91A6.173,6.173,0,0,1,42.2,8.076V28.492L69.974,45.85v11.36L42.2,47.836V58.8l5.663,5.636,0,9.391L36.041,69.9,24.331,73.86l.067-9.722,5.3-5.177.036-11.1L1.957,57.405,2.046,45.85,29.832,28.321l.042-20.25a6.159,6.159,0,0,1,6.16-6.16ZM65.974,48.067,38.2,30.709V8.076a2.165,2.165,0,0,0-3.7-1.53,2.135,2.135,0,0,0-.629,1.523v.009L33.828,30.53,6.029,48.067,6,51.786l27.752-9.539-.059,18.4-5.308,5.183-.017,2.437,7.66-2.592,7.833,2.6V66.1L38.2,60.462v-18.2l27.773,9.373Z"
      transform="translate(-2.735 48.128) rotate(-45)"
      fill="url(#linear-gradient)"
    />
  </Svg>
);

const FoodIcon = (
  <Svg width="30" height="30" viewBox="0 0 115.214 115.213">
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <Stop offset="0" stopColor="#3688e7" />
        <Stop offset="1" stopColor="#e91582" />
      </LinearGradient>
    </Defs>
    <Path
      id="food"
      d="M106.212,75.609H96.523c-.162-.86-.36-1.7-.576-2.542l17.278-8.637A3.6,3.6,0,0,0,110,57.988L93.52,66.226A39.551,39.551,0,0,0,18.69,75.609H9a9.011,9.011,0,0,0-9,9,7.209,7.209,0,0,0,1.818,4.785L14.4,103.551v2.661a9.011,9.011,0,0,0,9,9H91.81a9.009,9.009,0,0,0,9-9v-2.661l12.58-14.157a7.194,7.194,0,0,0,1.822-4.785A9.009,9.009,0,0,0,106.212,75.609Zm-13.325,0H90.863l1.793-.9c.068.3.166.594.23.9Zm-35.28-28.8a36.02,36.02,0,0,1,32.7,21.03l-3.208,1.6a32.374,32.374,0,0,0-61.066,6.171h-3.7A36.062,36.062,0,0,1,57.606,46.805Zm16.475,28.8a17.966,17.966,0,0,0-32.951,0H37.264a21.577,21.577,0,0,1,40.173-1.343Zm-16.475-3.6a10.746,10.746,0,0,0-7.993,3.6H45.207a14.273,14.273,0,0,1,24.8,0h-4.41A10.718,10.718,0,0,0,57.606,72.008Zm0-14.4a25.235,25.235,0,0,0-24.141,18H29.75A28.76,28.76,0,0,1,83.871,71.05l-3.215,1.606A25.243,25.243,0,0,0,57.606,57.607Zm36,43.2v5.4a1.8,1.8,0,0,1-1.8,1.8H23.4a1.8,1.8,0,0,1-1.8-1.8v-5.4L7.2,84.61a1.8,1.8,0,0,1,1.8-1.8h97.211a1.8,1.8,0,0,1,1.8,1.8ZM28.72,42.168c-.025-.05-.043-.1-.065-.151-1.869-4.511-.011-8.936,1.667-12.929,1.588-3.788,3-7.143,1.541-10.416-.007-.014-.011-.029-.018-.043l-.011-.032a.046.046,0,0,1,0-.022,1.708,1.708,0,0,1-.115-.608,1.762,1.762,0,0,1,3.406-.637c2.009,4.576.184,9.077-1.519,13.131-1.577,3.752-2.859,7.237-1.509,10.412a.123.123,0,0,1,0,.072,1.7,1.7,0,0,1,.065.45A1.812,1.812,0,0,1,30.351,43.2a1.792,1.792,0,0,1-1.595-.972h-.007c-.011-.022-.018-.043-.029-.065Zm43.842-.526c-.022-.047-.04-.1-.058-.144-1.869-4.511-.014-8.94,1.66-12.933,1.591-3.788,3-7.143,1.541-10.416a.1.1,0,0,0-.014-.043.283.283,0,0,0-.014-.032v-.022a1.794,1.794,0,0,1-.119-.608,1.764,1.764,0,0,1,3.41-.637c2.009,4.576.184,9.077-1.519,13.131-1.577,3.752-2.855,7.237-1.512,10.412a.085.085,0,0,1,.007.072,1.861,1.861,0,0,1,.065.45,1.806,1.806,0,0,1-3.41.835h-.007a.256.256,0,0,0-.029-.065ZM54.074,25.966c-.025-.05-.043-.1-.068-.148-1.872-4.511-.014-8.94,1.663-12.933,1.588-3.788,3-7.143,1.541-10.416,0-.014-.011-.029-.014-.043l-.011-.032a.046.046,0,0,1,0-.022,1.708,1.708,0,0,1-.115-.608,1.764,1.764,0,0,1,3.41-.634c2.009,4.576.184,9.077-1.519,13.131C57.379,18.013,56.1,21.5,57.448,24.674a.123.123,0,0,1,0,.072,1.7,1.7,0,0,1,.065.45,1.8,1.8,0,0,1-3.4.835H54.1c-.011-.022-.018-.043-.029-.065Z"
      fill="url(#linear-gradient)"
    />
  </Svg>
);

const energyIcon = (
  <Svg width="20" height="30" viewBox="0 0 64 93">
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <Stop offset="0" stopColor="#3688e7" />
        <Stop offset="1" stopColor="#e91582" />
      </LinearGradient>
    </Defs>
    <Path
      id="bulb"
      d="M37.022,0A32.019,32.019,0,0,0,5,32.022C5,43.756,15.736,56.193,19.646,67.115c5.831,16.287,5.185,26.04,17.376,26.04,12.372,0,11.542-9.706,17.376-25.973,3.921-10.946,14.646-23.516,14.646-35.16A32.022,32.022,0,0,0,37.022,0Zm7.546,79.111-14.433,1.8c-.515-1.49-1.068-3.234-1.741-5.511-.009-.029-.02-.061-.026-.09l18.014-2.25c-.256.859-.53,1.761-.769,2.57-.381,1.307-.722,2.442-1.045,3.479Zm-17.047-6.6c-.53-1.752-1.127-3.6-1.79-5.554H48.337c-.358,1.045-.716,2.093-1.025,3.083L27.52,72.509Zm9.5,14.823c-2.949,0-4.305-.341-5.813-3.639l12.337-1.546c-1.787,4.815-3.089,5.185-6.524,5.185Zm13.6-26.2H23.453c-1.45-3.144-3.191-6.288-4.908-9.365-3.8-6.8-7.723-13.828-7.723-19.746a26.2,26.2,0,0,1,52.4,0c0,5.875-3.93,12.943-7.732,19.781-1.7,3.065-3.429,6.2-4.867,9.33Zm-13.6-46.577a1.456,1.456,0,0,1,0,2.911A14.572,14.572,0,0,0,22.466,32.022a1.456,1.456,0,1,1-2.911,0A17.484,17.484,0,0,1,37.022,14.555Z"
      transform="translate(-5 0)"
      fill="url(#linear-gradient)"
    />
  </Svg>
);

const fuelIcon = (
  <Svg width="30" height="30" viewBox="0 0 97.087 84.377">
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <Stop offset="0" stopColor="#3688e7" />
        <Stop offset="1" stopColor="#e91582" />
      </LinearGradient>
    </Defs>
    <Path
      id="Union_14"
      data-name="Union 14"
      d="M3.364,84.377a3.365,3.365,0,0,1,0-6.73H9.729V10.376A10.392,10.392,0,0,1,20.111,0H55.163A10.391,10.391,0,0,1,65.54,10.376V31.548H72.69A10.391,10.391,0,0,1,83.066,41.924V59.457a3.645,3.645,0,0,0,7.291,0V23.793a3.652,3.652,0,0,0-1.079-2.578l-8.456-8.457A3.366,3.366,0,0,1,85.584,8l8.456,8.455a10.344,10.344,0,0,1,3.048,7.315V59.457a10.376,10.376,0,0,1-20.752,0V41.924a3.65,3.65,0,0,0-3.645-3.64H65.54V77.648h8.139a3.365,3.365,0,0,1,0,6.73Zm55.445-6.73V10.376a3.651,3.651,0,0,0-3.646-3.64H20.111a3.647,3.647,0,0,0-3.645,3.64V77.648ZM25.8,38a3.366,3.366,0,0,1,0-6.731h22.44a3.366,3.366,0,0,1,0,6.731Z"
      fill="url(#linear-gradient)"
    />
  </Svg>
);

const entIcon = (
  <Svg width="30" height="30" viewBox="0 0 97.358 84.377">
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1="0.5"
        x2="0.5"
        y2="1"
        gradientUnits="objectBoundingBox"
      >
        <Stop offset="0" stopColor="#3688e7" />
        <Stop offset="1" stopColor="#e91582" />
      </LinearGradient>
    </Defs>
    <Path
      id="film"
      d="M19.472,76.641V70.15a3.267,3.267,0,0,0-3.245-3.245H9.736A3.267,3.267,0,0,0,6.491,70.15v6.491a3.267,3.267,0,0,0,3.245,3.245h6.491A3.267,3.267,0,0,0,19.472,76.641Zm0-19.472V50.679a3.267,3.267,0,0,0-3.245-3.245H9.736a3.267,3.267,0,0,0-3.245,3.245v6.491a3.267,3.267,0,0,0,3.245,3.245h6.491A3.267,3.267,0,0,0,19.472,57.169Zm0-19.472V31.207a3.267,3.267,0,0,0-3.245-3.245H9.736a3.267,3.267,0,0,0-3.245,3.245V37.7a3.267,3.267,0,0,0,3.245,3.245h6.491A3.267,3.267,0,0,0,19.472,37.7ZM71.4,76.641V50.679a3.267,3.267,0,0,0-3.245-3.245H29.207a3.267,3.267,0,0,0-3.245,3.245V76.641a3.267,3.267,0,0,0,3.245,3.245H68.15A3.267,3.267,0,0,0,71.4,76.641ZM19.472,18.226V11.736a3.267,3.267,0,0,0-3.245-3.245H9.736a3.267,3.267,0,0,0-3.245,3.245v6.491a3.267,3.267,0,0,0,3.245,3.245h6.491A3.267,3.267,0,0,0,19.472,18.226Zm71.4,58.415V70.15a3.267,3.267,0,0,0-3.245-3.245H81.131a3.267,3.267,0,0,0-3.245,3.245v6.491a3.267,3.267,0,0,0,3.245,3.245h6.491A3.267,3.267,0,0,0,90.867,76.641ZM71.4,37.7V11.736A3.267,3.267,0,0,0,68.15,8.491H29.207a3.267,3.267,0,0,0-3.245,3.245V37.7a3.267,3.267,0,0,0,3.245,3.245H68.15A3.267,3.267,0,0,0,71.4,37.7ZM90.867,57.169V50.679a3.267,3.267,0,0,0-3.245-3.245H81.131a3.267,3.267,0,0,0-3.245,3.245v6.491a3.267,3.267,0,0,0,3.245,3.245h6.491A3.267,3.267,0,0,0,90.867,57.169Zm0-19.472V31.207a3.267,3.267,0,0,0-3.245-3.245H81.131a3.267,3.267,0,0,0-3.245,3.245V37.7a3.267,3.267,0,0,0,3.245,3.245h6.491A3.267,3.267,0,0,0,90.867,37.7Zm0-19.472V11.736a3.267,3.267,0,0,0-3.245-3.245H81.131a3.267,3.267,0,0,0-3.245,3.245v6.491a3.267,3.267,0,0,0,3.245,3.245h6.491A3.267,3.267,0,0,0,90.867,18.226Zm6.491-8.113v68.15a8.137,8.137,0,0,1-8.113,8.113H8.113A8.137,8.137,0,0,1,0,78.263V10.113A8.137,8.137,0,0,1,8.113,2H89.244A8.137,8.137,0,0,1,97.358,10.113Z"
      transform="translate(0 -2)"
      fill="url(#linear-gradient)"
    />
  </Svg>
);

const dotIcon = (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="3"
    height="10"
    viewBox="0 0 6 6"
  >
    <Circle
      id="Ellipse_454"
      data-name="Ellipse 454"
      cx="3"
      cy="3"
      r="3"
      fill="#159677"
    />
  </Svg>
);

const Report = ({
  amount,
  originalAmount,
  type,
  advisorName,
  advisorCell,
  advisorEmail,
  customerName,
  customerCell,
  customerEmail,
  food,
  energy,
  fuel,
  entertainment,
  months,
  strategy,
  saved,
  sections,
}) => {
  const date = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  let variableText;
  if (type === "Retirement") {
    variableText =
      "Preparing for retirement means taking steps to ensure that you have a reliable source of income to last you the rest of your life. The sooner you start saving, the better off you’ll be when you stop working.";
  }
  if (type === "Education") {
    variableText =
      "We all have big dreams for our kids. You can get them the future they deserve by starting to save today for the best education you can afford. Find out what school fees you can expect to pay and start saving as soon as possible.";
  }
  if (type === "A Goal") {
    variableText =
      "It’s great to have a goal to save up for. Be it a new home, a new car – or a new debt-free future, setting your sights on it and take the first few steps will make it happen easier than you think.";
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={PDFLogo.src} style={styles.logo} />
            <View style={styles.info}>
              <View style={{ width: 200 }}>
                <Text style={styles.titleGreen}>Name</Text>
                <Text style={styles.body}>{customerName}</Text>
                <Text style={styles.body}>{customerCell}</Text>
                <Text style={styles.body}>{customerEmail}</Text>
              </View>
              <View style={{ width: 200 }}>
                <Text style={styles.titleGreen}>Adviser</Text>
                <Text style={styles.body}>{advisorName === '' && '-'}</Text>
                <Text style={styles.body}>{advisorCell}</Text>
                <Text style={styles.body}>{advisorEmail}</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text
              style={{
                paddingTop: 45,
                color: "#8DC63F",
                fontSize: 11,
                fontFamily: "Montserrat",
              }}
            >
              {formattedDate}
            </Text>
            <Image src={PDFHeaderGraphic.src} style={styles.headerGraphic} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={{ paddingTop: "10px" }}></View>
          <Text style={[styles.titleText, styles.spaceBottom]}>
            Hi {customerName}, your small steps to great things
          </Text>
          <Text style={styles.body}>
            Now that you&apos;ve experienced the Pay Yourself First tool, you
            can see how small changes every day can make a massive difference to
            your financial future. Make these savings work for you and call me
            today. Great things always start with one small step.
          </Text>
          <View style={{ paddingTop: "10px" }}></View>
        </View>
        <View
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#D0D0D0",
            margin: "10px 0px",
          }}
        ></View>

        <View style={[styles.col, styles.section]}>
          <View>
            <View styles={{ textAlign: "left" }}>
              <Text style={[styles.titleText, styles.semiBold]}>
                Your monthly savings
              </Text>
              <View style={{ paddingBottom: "10px" }}></View>
            </View>

            <View style={styles.col}>
              <View>
                <Text
                  style={[
                    styles.titleGreen,
                    styles.borderBottom,
                    styles.spaceRight,
                  ]}
                >
                  Where you can save
                </Text>
                <Text
                  style={[styles.body, styles.borderBottom, styles.spaceRight]}
                >
                  Saving on Food
                </Text>
                <Text
                  style={[styles.body, styles.borderBottom, styles.spaceRight]}
                >
                  Saving on Energy
                </Text>
                <Text
                  style={[styles.body, styles.borderBottom, styles.spaceRight]}
                >
                  Saving on Fuel
                </Text>
                <Text
                  style={[styles.body, styles.borderBottom, styles.spaceRight]}
                >
                  Saving on Entertainment
                </Text>
                <Text
                  style={[
                    styles.bodyGreenLight,
                    styles.spaceRight,
                    styles.spaceTop10,
                  ]}
                >
                  Total saving for the month
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.titleGreen,
                    styles.borderBottom,
                    styles.paddingLeft,
                  ]}
                >
                  Amount
                </Text>
                <Text
                  style={[styles.body, styles.borderBottom, styles.paddingLeft]}
                >
                  R{numberWithSpaces(food)}
                </Text>
                <Text
                  style={[styles.body, styles.borderBottom, styles.paddingLeft]}
                >
                  R{numberWithSpaces(energy)}
                </Text>
                <Text
                  style={[styles.body, styles.borderBottom, styles.paddingLeft]}
                >
                  R{numberWithSpaces(fuel)}
                </Text>
                <Text
                  style={[styles.body, styles.borderBottom, styles.paddingLeft]}
                >
                  R{numberWithSpaces(entertainment)}
                </Text>
                <Text
                  style={[
                    styles.bodyGreenLight,
                    styles.paddingLeft,
                    styles.spaceTop10,
                  ]}
                >
                  R{numberWithSpaces(originalAmount)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderLeft: "1px solid #D0D0D0",
              paddingLeft: "20px",
              marginLeft: "20px",
            }}
          >
            <View
              style={{
                paddingBottom: "10px",
                marginLeft: "20px",
                marginRight: "20px",
                textAlign: "center",
                width: 200,
              }}
            >
              <Text style={[styles.titleText, styles.semiBold]}>
                How your savings can grow
              </Text>
            </View>
            <View
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                textAlign: "center",
                width: 200,
              }}
            >
              <Text
                style={[styles.titleGreen, styles.spaceBottom, styles.align]}
              >
                Investable savings
              </Text>

              <Text style={[styles.titleGreenLight, styles.spaceBottom3]}>
                R{numberWithSpaces(amount)}
              </Text>

              <Text style={[styles.greenBG, styles.spaceBottom3]}>
                {months / 12} YEARS
              </Text>
              <Text
                style={[
                  styles.titleGreen,
                  styles.uppercase,
                  styles.largeText,
                  styles.spaceBottom3,
                ]}
              >
                R{numberWithSpaces(saved)}
              </Text>
              <Text style={[styles.titleGreenLight, styles.spaceBottom3]}>
                TOWARDS MY GOAL
              </Text>
              <Text
                style={[
                  styles.titleGreen,
                  styles.uppercase,
                  styles.largeText,
                  styles.spaceBottom3,
                ]}
              >
                {type}
              </Text>
              <Text style={[styles.bodySmall]}>INVESTMENT STRATEGY</Text>
              <Text style={styles.body}>{strategy}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#D0D0D0",
            margin: "10px 0px",
          }}
        ></View>
        <View style={{ marginTop: "10px", marginBottom: "10px" }}>
          <View style={styles.col}>
            <View>
              <Image
                src={PDFHeaderGraphic1.src}
                style={{ width: "70px", height: "115px" }}
              />
            </View>

            <View
              style={{
                marginLeft: "30px",
                marginTop: "20px",
                marginRight: "120pt",
                width: "500pt",
              }}
            >
              <View style={styles.col}>
                <View style={{ marginRight: "20px" }}>
                  {type === "Retirement" && retirementIcon}
                  {type === "Education" && educationIcon}
                  {type === "A Goal" && goalIcon}
                </View>
                <View>
                  <Text style={[styles.titleText, styles.spaceBottom]}>
                    {type}
                  </Text>
                  <Text style={styles.body}>{variableText}</Text>
                </View>
              </View>
              <View style={{ paddingTop: "10px" }}></View>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: "10px" }}></View>
        <View
          style={{
            backgroundColor: "#F7F7F7",
            padding: "20px 20px",
          }}
        >
          <Text
            style={{ color: "#727272", fontSize: "9px", marginBottom: "0px" }}
          >
            DISCLAIMER:
          </Text>
          <Text
            style={{ color: "#727272", fontSize: "9px", marginBottom: "7px" }}
          >
            The information in this tool is intended for illustrative purposes
            only and the values shown aren&apos;t guaranteed. This isn&apos;t an
            offer and it&apos;s not part of a contractual undertaking by Old
            Mutual Limited, Old Mutual Life Assurance Company (South Africa) Ltd
            or any of Old Mutual Limited&apos;s subsidiaries. The tool also
            doesn&apos;t represent financial advice by any of the companies in
            the Old Mutual Limited Group. Inflation is assumed to be 5% per year
            and investment strategies are taken at their target midpoint.
          </Text>
          <Text
            style={{ color: "#727272", fontSize: "9px", marginBottom: "7px" }}
          >
            The personal information provided will only be used to generate a
            report and no personal information provided will be stored during
            this process.
          </Text>
          <Text style={{ color: "#727272", fontSize: "9px" }}>
            Old Mutual Life Assurance Company (SA) Limited is a licensed FSP and
            life insurer.
          </Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={PDFLogo.src} style={styles.logo} />
            <View style={styles.spaceTop}>
              <Text
                style={[
                  styles.titleGreen,
                  styles.spaceBottom,
                  styles.largeText,
                ]}
              >
                MY SAVINGS REMINDERS
              </Text>
              <Text style={[styles.titleText, styles.spaceBottom]}>
                You&apos;ve chosen to save R{numberWithSpaces(originalAmount)}{" "}
                each month by making small adjustments
              </Text>
              <Text style={[styles.bodyGreenLight, styles.spaceBottom]}>
                Well done {customerName} on finding ways to save in your
                day-to-day life! Print out and place onto your fridge to track
                your savings progress to build a brighter financial future!
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Image
              style={{ width: "400px", height: "25px", marginTop: "28px" }}
              src={PYFBanner.src}
            />
          </View>
          <View style={{ padding: "10px" }}></View>
        </View>
        <View style={{ padding: "5px" }}></View>
        <View style={[styles.col, styles.section]}>
          <View style={{ width: 250 }}>
            <View style={{ marginBottom: "10px" }}>{FoodIcon}</View>
            <Text style={styles.titleText}>
              You&apos;ll be saving{" "}
              <Text style={styles.titleGreen13}>R{food}</Text> on{" "}
              <Text style={styles.titleGreen13}>food</Text> every month by:
            </Text>
            <View style={{ padding: "5px" }}></View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
                margin: 0,
                padding: 0,
              }}
            >
              {sections.food.includes("groceries") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.food.includes("groceries")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                switching to an affordable brand
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.food.includes("shopping") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.food.includes("shopping")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                using a shopping list
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.food.includes("meals") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.food.includes("meals")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                planning your meals
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.food.includes("meat") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.food.includes("meat") ? styles.body : styles.bodyGrey
                }
              >
                incorporating meatless Mondays
              </Text>
            </View>
          </View>
          <View style={{ width: 250 }}>
            <View style={{ marginBottom: "10px" }}>{energyIcon}</View>
            <Text style={styles.titleText}>
              You&apos;ll be saving{" "}
              <Text style={styles.titleGreen13}>R{energy}</Text> on{" "}
              <Text style={styles.titleGreen13}>energy</Text> every month by:
            </Text>
            <View style={{ padding: "5px" }}></View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.energy.includes("vampires") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.energy.includes("vampires")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                switching off vampire appliances
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.energy.includes("geyser") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.energy.includes("geyser")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                turning down your geyser temperature
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.energy.includes("led") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.energy.includes("led")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                switching to LED lightbulbs
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.energy.includes("heater") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.energy.includes("heater")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                reducing heater usage
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: "5px" }}></View>
        <View style={[styles.col, styles.section]}>
          <View style={{ width: 250 }}>
            <View style={{ marginBottom: "10px" }}>{fuelIcon}</View>
            <Text style={styles.titleText}>
              You&apos;ll be saving{" "}
              <Text style={styles.titleGreen13}>R{fuel}</Text> on{" "}
              <Text style={styles.titleGreen13}>fuel</Text> every month by:
            </Text>
            <View style={{ padding: "5px" }}></View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.fuel.includes("tyres") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.fuel.includes("tyres")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                maintaining your tyre inflation
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.fuel.includes("speed") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.fuel.includes("speed")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                obeying the speed limit
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.fuel.includes("freeway") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.fuel.includes("freeway")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                maintaining a freeway speed of 88.5 km/hour
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.fuel.includes("maintenance") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.fuel.includes("maintenance")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                keeping up with your car maintainance
              </Text>
            </View>
          </View>
          <View style={{ width: 250 }}>
            <View style={{ marginBottom: "10px" }}>{entIcon}</View>
            <Text style={styles.titleText}>
              You&apos;ll be saving{" "}
              <Text style={styles.titleGreen13}>R{entertainment}</Text> on{" "}
              <Text style={styles.titleGreen13}>entertainment </Text>
              every month by:
            </Text>
            <View style={{ padding: "5px" }}></View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.entertainment.includes("out") ? tickIcon : tickIconGrey}
              <Text
                style={
                  sections.entertainment.includes("out")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                swopping a night out for a fun night in
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.entertainment.includes("luxuries")
                ? tickIcon
                : tickIconGrey}
              <Text
                style={
                  sections.entertainment.includes("luxuries")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                skipping on certain luxuries
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.entertainment.includes("coffee")
                ? tickIcon
                : tickIconGrey}
              <Text
                style={
                  sections.entertainment.includes("coffee")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                less take-away coffees
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "7px",
              }}
            >
              {sections.entertainment.includes("data")
                ? tickIcon
                : tickIconGrey}
              <Text
                style={
                  sections.entertainment.includes("data")
                    ? styles.body
                    : styles.bodyGrey
                }
              >
                using Wi-Fi and hotspots
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: "5px" }}></View>
        <View
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#D0D0D0",
            margin: "10px 0px",
          }}
        ></View>
        <View>
          <View style={styles.col}>
            <View>
              <Image
                src={PDFHeaderGraphic2.src}
                style={{ width: "50px", height: "150px" }}
              />
            </View>

            <View
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                marginRight: "20px",
                width: "500pt",
              }}
            >
              <View>
                <Text style={styles.titleText}>
                  Save even more with these tips:
                </Text>
                <View style={{ padding: "5px" }}></View>
                <View style={styles.col}>
                  <View style={{ width: 270, marginRight: 20 }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Check your bank statement for fees, bank charges and
                        unwanted debit orders.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Check out specials, daily deals, discounts and coupons
                        offered online and compare online and in-store costs.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Grow your own vegetables, fruit and herbs.
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Use your leftovers creatively for new meals.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Wait until your dishwasher and laundry{"\n"}machines are
                        full before using them.
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: 270, marginLeft: 20, marginRight: 30 }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Make sure your refrigerator and freezer doors have tight
                        seals.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Set the time switches on pool pumps.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Limit your use of air conditioning.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Keep a record of fuel consumption.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Borrow books from friends and family (just be sure to
                        return it!).
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
                        Attend low-cost or free sporting events.
                      </Text>
                    </View>
					<View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        columnGap: "7px",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {dotIcon}
                      <Text style={styles.bodySmall}>
						Get your family involved in saving too.
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={{ padding: "5px 10px" }}></View>
                  <Text style={styles.titleGreen}>
                    BONUS SAVING TIP! JOIN OLD MUTUAL REWARDS
                  </Text>
                  <View style={{ marginRight: "30px" }}>
                    <Text style={styles.body}>
                      <Text style={styles.titleDark}>Join for free </Text>
                      and earn points right away! Plus, you earn points for
                      saving towards your future and improving your financial
                      know-how online. Use your points for food, entertainment
                      and more.
                    </Text>
                  </View>
                </View>
                <View style={{ padding: "5px" }}></View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#F7F7F7",
            padding: "10px 20px",
            marginTop: "5px",
          }}
        >
          <Text
            style={{
              color: "#727272",
              fontFamily: "Montserrat",
              fontSize: "9px",
              marginLeft: "55px",
            }}
          >
            Please see disclaimer on previous page
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const GeneratePDF = ({
  amount,
  originalAmount,
  type,
  months,
  food,
  energy,
  fuel,
  entertainment,
  saved,
  strategy,
  sections,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [customerCell, setCustomerCell] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [advisorName, setadvisorName] = useState("");
  const [advisorCell, setadvisorCell] = useState("");
  const [advisorEmail, setadvisorEmail] = useState("");
  const [readyPDF, setReadyPDF] = useState(false);

  let strat = "";
  if (strategy === 100.52617) {
    strat = "Inflation + 1% - 2%";
  }
  if (strategy === 100.60449) {
    strat = "Inflation + 2% - 3%";
  }
  if (strategy === 100.68215) {
    strat = "Inflation + 3% - 4%";
  }
  if (strategy === 100.75915) {
    strat = "Inflation + 4% - 5%";
  }
  if (strategy === 100.87346) {
    strat = "Inflation + 5% - 7%";
  }
  if (strategy === 101.02368) {
    strat = "Inflation + 7% - 9%";
  }

  const handleSubmit = (event) => {
    if (
      customerName /*&&
      customerCell &&
      customerEmail &&
      advisorName &&
      advisorCell &&
      advisorEmail*/
    ) {
      event.preventDefault();
      setReadyPDF(true);
    }
  };
  return (
    <div className="generate-pdf-form-container w-2/5" style={{marginTop: "30px"}}>
      <p className="text-base font-light" style={{textAlign:"left"}}>
        Complete these fields to generate a PDF of the results.
      </p>
      <div className="title-gradient w-full h-1"></div>
      <form className="my-8" onSubmit={handleSubmit}>
        <input
          className="border border-[#E4E4E4] w-full mb-2 text-lg text-brandGreen placeholder:text-brandGreen placeholder:font-light py-2 px-2"
          type="text"
          maxLength="20"
          onChange={(event) => setCustomerName(event.target.value)}
          placeholder="Name"
          required
          style={{borderRadius:"3px"}}
        />
        <input
          className="border border-[#E4E4E4] w-full mb-2 text-lg text-brandGreen placeholder:text-brandGreen placeholder:font-light  py-2 px-2"
          type="tel"
          maxLength="10"
          onChange={(event) => setCustomerCell(event.target.value)}
          placeholder="Cell No.*"
          style={{borderRadius:"3px"}}
        />
        <input
          className="border border-[#E4E4E4] w-full mb-2 text-lg text-brandGreen placeholder:text-brandGreen placeholder:font-light  py-2 px-2"
          type="email"
          maxLength="40"
          onChange={(event) => setCustomerEmail(event.target.value)}
          placeholder="Email *"
          style={{borderRadius:"3px"}}
        />
        <input
          className="border border-[#E4E4E4] w-full mb-2 text-lg text-brandGreen placeholder:text-brandGreen placeholder:font-light  py-2 px-2"
          type="text"
          maxLength="20"
          onChange={(event) => setadvisorName(event.target.value)}
          placeholder="Adviser name *"
          style={{borderRadius:"3px"}}
        />
        <input
          className="border border-[#E4E4E4] w-full mb-2 text-lg text-brandGreen placeholder:text-brandGreen placeholder:font-light  py-2 px-2"
          type="tel"
          maxLength="10"
          onChange={(event) => setadvisorCell(event.target.value)}
          placeholder="Adviser cell *"
          style={{borderRadius:"3px"}}
        />
        <input
          className="border border-[#E4E4E4] w-full mb-2 text-lg text-brandGreen placeholder:text-brandGreen placeholder:font-light py-2 px-2"
          type="email"
          maxLength="40"
          onChange={(event) => setadvisorEmail(event.target.value)}
          placeholder="Adviser email *"
          style={{borderRadius:"3px"}}
        />
        <div className="mb-10 text-base font-light"> * Optional</div>       
        {readyPDF ? (
          <PDFDownloadLink
            document={
              <Report
                amount={amount}
                originalAmount={originalAmount}
                advisorName={advisorName}
                advisorCell={advisorCell}
                advisorEmail={advisorEmail}
                customerName={customerName}
                customerCell={customerCell}
                customerEmail={customerEmail}
                months={months}
                type={type}
                food={food}
                energy={energy}
                fuel={fuel}
                entertainment={entertainment}
                strategy={strat}
                saved={saved}
                sections={sections}
              />
            }
            fileName="pay-yourself-first.pdf"
            id="PDFLink"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <span className="text-base font-semibold w-full tracking-[0.4px] flex justify-center items-center bg-gradient-to-r from-brandGreen to-[#60B849] rounded-full px-11 py-4 text-white">
                  LOADING...
                </span>
              ) : (
                <span className="text-base font-semibold w-full tracking-[0.4px] flex justify-center  items-center bg-gradient-to-r from-brandGreen to-[#60B849] rounded-full px-11 py-4 text-white">
                  DOWNLOAD
                </span>
              )
            }
          </PDFDownloadLink>
        ) : (
          <button
            type="submit"
            className="text-base font-semibold tracking-[0.4px] w-full text-center bg-gradient-to-r from-[#009677] to-[#50B848] rounded-full px-11 py-4 text-white"
          >
            GENERATE PDF NOW
          </button>
        )}
      </form>
    </div>
  );
};

export default GeneratePDF;
