import { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import RangeSlider from "./RangeSlider";
import ToolTip from "/public/images/tooltip.svg";
import EntIconWhite from "/public/images/entertainment-icon-white.svg";
import HeaderBackground from "/public/images/entertainment-header.jpg";
let activeSections = [];

const EntertainmentCalculator = ({ onSectionUpdate, notificationShown, setNotificationShown }) => {
  const [outBudget, setOutBudget] = useState(0);
  const [savingOut, setSavingOut] = useState(0);
  const [dataBudget, setDataBudget] = useState(0);
  const [savingData, setSavingData] = useState(0);
  const [coffeeBudget, setCoffeeBudget] = useState(0);
  const [savingCoffee, setSavingCoffee] = useState(0);
  const [lunchesBudget, setLunchesBudget] = useState(0);
  const [lunchesSaving, setLunchesSaving] = useState(0);
  const [wineBudget, setWineBudget] = useState(0);
  const [wineSaving, setWineSaving] = useState(0);
  const [cigarettesBudget, setCigarettesBudget] = useState(0);
  const [cigarettesSaving, setCigarettesSaving] = useState(0);
  const [luxuriesSaving, setLuxuriesSaving] = useState(0);

  const handleOutBudget = (e) => {
    setOutBudget(e.target.value);
  };

  const handleOut = (value) => {
    const saving = Math.floor(value * outBudget);
    setSavingOut(saving);

    if (saving > 0 && !activeSections.includes("out")) {
      activeSections.push("out");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("out"), 1);
    }
  };

  const handleDataBudget = (e) => {
    setDataBudget(e.target.value);
  };

  const handleData = (value) => {
    const saving = Math.floor((value / 100) * dataBudget);
    setSavingData(saving);

    if (saving > 0 && !activeSections.includes("data")) {
      activeSections.push("data");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("data"), 1);
    }
  };

  const handleCoffeeAmount = (e) => {
    setCoffeeBudget(e.target.value);
  };

  const handleCoffee = (value) => {
    const saving = Math.floor(value * 25);
    setSavingCoffee(saving);

    if (saving > 0 && !activeSections.includes("coffee")) {
      activeSections.push("coffee");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("coffee"), 1);
    }
  };

  const handleLunchesBudget = (e) => {
    setLunchesBudget(e.target.value);
  };

  const handleLunches = (value) => {
    const saving = Math.floor(value * lunchesBudget);
    setLunchesSaving(saving);

    if (saving > 0 && !activeSections.includes("luxuries")) {
      activeSections.push("luxuries");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("luxuries"), 1);
    }
  };

  const handleWineBudget = (e) => {
    setWineBudget(e.target.value);
  };

  const handleWine = (value) => {
    const saving = Math.floor(value * wineBudget);
    setWineSaving(saving);

    if (saving > 0 && !activeSections.includes("luxuries")) {
      activeSections.push("luxuries");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("luxuries"), 1);
    }
  };

  const handleCigarettesBudget = (e) => {
    setCigarettesBudget(e.target.value);
  };

  const handleCigarettes = (value) => {
    const saving = Math.floor(value * cigarettesBudget);
    setCigarettesSaving(saving);

    if (saving > 0 && !activeSections.includes("luxuries")) {
      activeSections.push("luxuries");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("luxuries"), 1);
    }
  };

  useEffect(() => {
    setLuxuriesSaving(lunchesSaving + wineSaving + cigarettesSaving);
    onSectionUpdate(
      luxuriesSaving + savingOut + savingData + savingCoffee,
      activeSections
    );
  }, [
    savingOut,
    savingData,
    savingCoffee,
    luxuriesSaving,
    lunchesSaving,
    wineSaving,
    cigarettesSaving,
  ]);

  return (
    <>
      <section id="Entertainment" className="pt-20">
        <div className="bg-entertainment-header bg-center bg-cover max-w-full h-[280px]  flex flex-col justify-end font-montserrat" style={{ backgroundImage: `url(${HeaderBackground.src})`, backgroundPosition:'top' }}>
          <div className="py-12 px-16  bg-gradient-to-t from-brandBlue to-transparent">
            <img className="w-[65px] mb-2" src={EntIconWhite.src} alt="Entertainment Icon" />
            <h2 className="text-white text-[36px] leading-[36px]">
              Entertainment
            </h2>
            <div className="img_header_content flex items-center justify-between space-x-7 -mt-2">
              <h3 className="text-white text-[22px] font-light mt-2">
                Save on entertainment and luxuries
              </h3>
            </div>
          </div>
        </div>
        <div>
          <div className="relative group w-full">
            {activeSections.length >= 2 && !activeSections.includes("out") && (
              <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                <p className="text-sm font-light">
                  Select just two tips per category to focus your saving
                  efforts. To change to another tip, zero one you have selected
                  already.
                </p>
              </div>
            )}
            <div className="savings_container flex items-center justify-between space-x-12  border-b border-[#DDDDDD] py-6 px-5">
              <div className="savings_copy_and_slider block xl:flex xl:space-x-12 items-center w-[90%]">
                <div className="w-full xl:flex items-center xl:w-2/5">
                  <div
                    className={`text-base font-light w-[90%] xl:w-2/3 pr-3 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("out") &&
                      "text-disabled"
                    }`}
                  >
                    <span className="text-[22px] font-normal">Night out</span>
                    <br />
                    What do you spend on an average night out?
                  </div>
                  <div className="savings_slider flex items-center bg-white border border-[#E4E4E4] mt-5 xl:mt-0 w-fit" style={{borderRadius:'3px', overflow:'hidden'}}>
                    <span
                      className={`text-xl ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("out")
                          ? "text-disabled"
                          : "text-blue"
                      } px-3`}
                    >
                      R
                    </span>
                    <input
                      type="number"
                      onKeyDown={(event) => {
                        if (/[-+]/.test(event.key)) {
                          event.preventDefault();
                        }
                        if (event.target.value.length >= 6) {
                          event.target.value = event.target.value.slice(0, 5);
                        }
                      }}
                      className={`no-arrows outline-none border-none text-xl ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("out")
                          ? "text-disabled"
                          : "text-blue"
                      } text-right max-w-[80px] py-2 px-2`}
                      onChange={handleOutBudget}
                    />
                  </div>
                </div>
                <div className="savings_slider w-[90%] pt-[10px] pb-[20px] xl:mt-0 xl:w-3/5">
                  {activeSections.length >= 2 &&
                  !activeSections.includes("out") ? (
                    <RangeSlider
                      min={0}
                      max={0}
                      theme="grey"
                      disabled={true}
                      budget={outBudget}
					  notificationShown={notificationShown}
					  setNotificationShown={setNotificationShown}
                    />
                  ) : (
                    <RangeSlider
                      min={0}
                      max={5}
                      onUpdate={handleOut}
                      theme="blue"
                      budget={outBudget}
					  notificationShown={notificationShown}
					  setNotificationShown={setNotificationShown}
                    />
                  )}
                  <p
                    className={`${
                      activeSections.length >= 2 &&
                      !activeSections.includes("out")
                        ? "text-disabled"
                        : "text-blue"
                    } text-[13px] mt-[16px]`}
                  >
                    How many nights out could you swap for a fun night in every
                    month?
                  </p>
                </div>
              </div>
              <div
                className={`savings_value text-right md:self-end xl:self-center w-[100px] ${
                  activeSections.length >= 2 && !activeSections.includes("out")
                    ? "text-disabled"
                    : "text-digreysabled"
                }`}
              >
                <p className="text-xl font-light">Save</p>
                <p className="text-3xl font-normal">R{savingOut}</p>
              </div>
            </div>
          </div>
          <div className="relative group w-full">
            {activeSections.length >= 2 && !activeSections.includes("data") && (
              <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                <p className="text-sm font-light">
                  Select just two tips per category to focus your saving
                  efforts. To change to another tip, zero one you have selected
                  already.
                </p>
              </div>
            )}
            <div className="savings_container flex items-center justify-between space-x-12  border-b border-[#DDDDDD] py-6 px-5">
              <div className="savings_copy_and_slider block xl:flex xl:space-x-12 items-center w-[90%]">
                <div className="w-full xl:flex items-center xl:w-2/5">
                  <div
                    className={`text-base font-light w-[90%] xl:w-2/3 pr-3 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("data") &&
                      "text-disabled"
                    }`}
                  >
                    <span className="text-[22px] font-normal">Data</span>
                    <br />
                    How much out-of-bundle data are you buying?
                    <div
                      className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("data") &&
                        "opacity-20"
                      }`}
                    >
                      <img src={ToolTip.src} className="cursor-pointer " />
                      {activeSections.length >= 2 &&
                      !activeSections.includes("tyres") ? null : (
                        <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                          <p className="text-sm font-light">
                            Avoid using out-of-bundle data, as this is much more
                            expensive than cellphone contract data.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="savings_slider flex items-center bg-white border border-[#E4E4E4] mt-5 xl:mt-0 w-fit" style={{borderRadius:'3px', overflow:'hidden'}}>
                    <span
                      className={`text-xl ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("data")
                          ? "text-disabled"
                          : "text-blue"
                      } px-3`}
                    >
                      R
                    </span>
                    <input
                      type="number"
                      onKeyDown={(event) => {
                        if (/[-+]/.test(event.key)) {
                          event.preventDefault();
                        }
                        if (event.target.value.length >= 6) {
                          event.target.value = event.target.value.slice(0, 5);
                        }
                      }}
                      className={`no-arrows outline-none border-none text-xl ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("data")
                          ? "text-disabled"
                          : "text-blue"
                      } text-right max-w-[80px] py-2 px-2`}
                      onChange={handleDataBudget}
                    />
                  </div>
                </div>
                <div className="savings_slider w-[90%] pt-[10px] pb-[20px] xl:mt-0 xl:w-3/5">
                  {activeSections.length >= 2 &&
                  !activeSections.includes("data") ? (
                    <RangeSlider
                      min={0}
                      max={0}
                      theme="grey"
                      disabled={true}
                      budget={dataBudget}
					  notificationShown={notificationShown}
					  setNotificationShown={setNotificationShown}
                    />
                  ) : (
                    <RangeSlider
                      min={0}
                      max={100}
                      onUpdate={handleData}
                      theme="blue"
                      symbol="%"
                      budget={dataBudget}
					  notificationShown={notificationShown}
					  setNotificationShown={setNotificationShown}
                    />
                  )}
                  <p
                    className={`${
                      activeSections.length >= 2 &&
                      !activeSections.includes("data")
                        ? "text-disabled"
                        : "text-blue"
                    } text-[13px] mt-[16px]`}
                  >
                    What percentage of this unnecessary expense could you save
                    by using Wi-Fi?
                  </p>
                </div>
              </div>
              <div
                className={`savings_value text-right md:self-end xl:self-center w-[100px] ${
                  activeSections.length >= 2 && !activeSections.includes("data")
                    ? "text-disabled"
                    : "text-grey"
                }`}
              >
                <p className="text-xl font-light">Save</p>
                <p className="text-3xl font-normal">R{savingData}</p>
              </div>
            </div>
          </div>
          <div className="relative group w-full">
            {activeSections.length >= 2 &&
              !activeSections.includes("coffee") && (
                <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                  <p className="text-sm font-light">
                    Select just two tips per category to focus your saving
                    efforts. To change to another tip, zero one you have
                    selected already.
                  </p>
                </div>
              )}
            <div className="savings_container flex items-center justify-between space-x-12  border-b border-[#DDDDDD] py-6 px-5">
              <div className="savings_copy_and_slider block xl:flex xl:space-x-12 items-center w-[90%]">
                <div className="w-full xl:flex items-center xl:w-2/5">
                  <div
                    className={`text-base font-light w-[90%] xl:w-2/3 pr-3 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("coffee") &&
                      "text-disabled"
                    }`}
                  >
                    <span className="text-[22px] font-normal">Coffee</span>
                    <br />
                    How many take-away coffees do you buy in a month?
                  </div>
                  <div className="savings_slider flex items-center bg-white border border-[#E4E4E4] mt-5 xl:mt-0 w-fit" style={{borderRadius:'3px', overflow:'hidden'}}>
                    <input
                      type="number"
                      onKeyDown={(event) => {
                        if (/[-+]/.test(event.key)) {
                          event.preventDefault();
                        }
                        if (event.target.value.length >= 6) {
                          event.target.value = event.target.value.slice(0, 5);
                        }
                      }}
                      className={`no-arrows outline-none border-none text-xl ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("coffee")
                          ? "text-disabled"
                          : "text-blue"
                      } text-right max-w-[120px] py-2 px-2`}
                      onChange={handleCoffeeAmount}
                    />
                  </div>
                </div>
                <div className="savings_slider w-[90%] pt-[10px] pb-[20px] xl:mt-0 xl:w-3/5">
                  {activeSections.length >= 2 &&
                  !activeSections.includes("coffee") ? (
                    <RangeSlider
                      min={0}
                      max={0}
                      theme="grey"
                      disabled={true}
                      budget={60}
					  notificationShown={notificationShown}
					  setNotificationShown={setNotificationShown}
                    />
                  ) : (
                    <RangeSlider
                      min={0}
                      max={60}
                      onUpdate={handleCoffee}
                      theme="blue"
                      budget={60}
					  notificationShown={notificationShown}
					  setNotificationShown={setNotificationShown}
                    />
                  )}
                  <p
                    className={`${
                      activeSections.length >= 2 &&
                      !activeSections.includes("coffee")
                        ? "text-disabled"
                        : "text-blue"
                    } text-[13px] mt-[16px]`}
                  >
                    How many could you skip every month? (R25 per coffee on
                    average)
                  </p>
                </div>
              </div>
              <div
                className={`savings_value text-right md:self-end xl:self-center w-[100px] ${
                  activeSections.length >= 2 &&
                  !activeSections.includes("coffee")
                    ? "text-disabled"
                    : "text-grey"
                }`}
              >
                <p className="text-xl font-light">Save</p>
                <p className="text-3xl font-normal">R{savingCoffee}</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            {activeSections.length >= 2 &&
              !activeSections.includes("luxuries") && (
                <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                  <p className="text-sm font-light">
                    Select just two tips per category to focus your saving
                    efforts. To change to another tip, zero one you have
                    selected already.
                  </p>
                </div>
              )}
            <div className="savings_container flex items-center justify-between space-x-12 xl:space-x-32 py-12 px-5">
              <div className="savings_copy_and_slider block xl:flex xl:space-x-16 items-center justify-between w-full">
                <div className="w-full md:pb-5 xl:pb-0 xl:w-1/5">
                  <div
                    className={`text-base font-light w-[90%] xl:w-[220px] ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("luxuries") &&
                      "text-disabled"
                    }`}
                  >
                    <span className="text-[22px] font-normal">Luxuries</span>
                    <br />
                    What do the following items cost you?
                  </div>
                </div>
                <div className="flex xl:w-4/5 justify-between">
                  <div>
                    <div className="luxuries-mobile-spacer savings_slider flex items-center bg-white border border-[#E4E4E4] mb-2" style={{borderRadius:'3px', overflow:'hidden'}}>
                      <span
                        className={`text-xl ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled"
                            : "text-blue"
                        } px-3`}
                      >
                        R
                      </span>
                      <input
                        type="number"
                        onKeyDown={(event) => {
                          if (/[-+]/.test(event.key)) {
                            event.preventDefault();
                          }
                          if (event.target.value.length >= 6) {
                            event.target.value = event.target.value.slice(0, 5);
                          }
                        }}
                        className={`no-arrows outline-none border-none text-xl ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled pointer-events-none"
                            : "text-blue"
                        } text-right max-w-[80px] py-1 px-2`}
                        onChange={handleLunchesBudget}
                      />
                    </div>
                    <div className="luxuries-mobile-spacer savings_slider flex items-center bg-white border border-[#E4E4E4] mb-2" style={{borderRadius:'3px', overflow:'hidden'}}>
                      <span
                        className={`text-xl ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled"
                            : "text-blue"
                        } px-3`}
                      >
                        R
                      </span>
                      <input
                        type="number"
                        onKeyDown={(event) => {
                          if (/[-+]/.test(event.key)) {
                            event.preventDefault();
                          }
                          if (event.target.value.length >= 6) {
                            event.target.value = event.target.value.slice(0, 5);
                          }
                        }}
                        className={`no-arrows outline-none border-none text-xl ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled pointer-events-none"
                            : "text-blue"
                        } text-right max-w-[80px] py-1 px-2`}
                        onChange={handleWineBudget}
                      />
                    </div>
                    <div className="luxuries-mobile-spacer savings_slider flex items-center bg-white border border-[#E4E4E4]" style={{borderRadius:'3px', overflow:'hidden'}}>
                      <span
                        className={`text-xl ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled"
                            : "text-blue"
                        } px-3`}
                      >
                        R
                      </span>
                      <input
                        type="number"
                        onKeyDown={(event) => {
                          if (/[-+]/.test(event.key)) {
                            event.preventDefault();
                          }
                          if (event.target.value.length >= 6) {
                            event.target.value = event.target.value.slice(0, 5);
                          }
                        }}
                        className={`no-arrows outline-none border-none text-xl ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled pointer-events-none"
                            : "text-blue"
                        } text-right max-w-[80px] py-1 px-2`}
                        onChange={handleCigarettesBudget}
                      />
                    </div>

                    <p
                      className={`${
                        activeSections.length >= 2 &&
                        !activeSections.includes("luxuries")
                          ? "text-disabled"
                          : "text-blue"
                      } text-[13px] mt-5 text-right`}
                    >
                      Per item
                    </p>
                  </div>
                  <div className="w-full ml-8 mr-6 text-left">
                    <div className="luxuries-mobile-spacer savings_slider flex justify-between h-[38px] mb-2">
                      <p
                        className={`${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled"
                            : "text-grey"
                        } text-sm flex items-center h-[38px] mb-2`}
                      >
                        On-the-go lunches
                      </p>
                      <span
                        className={`luxury_selector flex items-center ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries") &&
                          "pointer-events-none"
                        }`}
                      >
                        {activeSections.length >= 2 &&
                        !activeSections.includes("luxuries") ? (
                          <CustomSelect
                            onSelectUpdate={handleLunches}
                            disabled={true}
                          />
                        ) : (
                          <CustomSelect onSelectUpdate={handleLunches} />
                        )}
                      </span>
                    </div>
                    <div className="luxuries-mobile-spacer savings_slider flex justify-between h-[38px] mb-2">
                      <p
                        className={`${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled"
                            : "text-grey"
                        } text-sm flex items-center h-[38px] mb-2`}
                      >
                        Bottles of favorite beverage
                      </p>
                      <span
                        className={`luxury_selector flex items-center ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries") &&
                          "pointer-events-none"
                        }`}
                      >
                        {activeSections.length >= 2 &&
                        !activeSections.includes("luxuries") ? (
                          <CustomSelect
                            onSelectUpdate={handleWine}
                            disabled={true}
                          />
                        ) : (
                          <CustomSelect onSelectUpdate={handleWine} />
                        )}
                      </span>
                    </div>
                    <div className="luxuries-mobile-spacer savings_slider flex justify-between h-[38px] mb-2">
                      <p
                        className={`${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries")
                            ? "text-disabled"
                            : "text-grey"
                        } text-sm flex items-center h-[38px] mb-2`}
                      >
                        Any other luxuries
                      </p>
                      <span
                        className={`luxury_selector flex items-center ${
                          activeSections.length >= 2 &&
                          !activeSections.includes("luxuries") &&
                          "pointer-events-none"
                        }`}
                      >
                        {activeSections.length >= 2 &&
                        !activeSections.includes("luxuries") ? (
                          <CustomSelect
                            onSelectUpdate={handleCigarettes}
                            disabled={true}
                          />
                        ) : (
                          <CustomSelect onSelectUpdate={handleCigarettes} />
                        )}
                      </span>
                    </div>
                    <p
                      className={`${
                        activeSections.length >= 2 &&
                        !activeSections.includes("luxuries")
                          ? "text-disabled"
                          : "text-blue"
                      } text-[13px] mt-5 text-right`}
                    >
                      How many luxuries could you skip in a month?
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`savings_value text-right md:self-end xl:self-center ${
                  activeSections.length >= 2 &&
                  !activeSections.includes("luxuries") &&
                  "text-disabled"
                }`}
              >
                <p className="text-xl font-light">Save</p>
                <p className="text-3xl font-normal">R{luxuriesSaving}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EntertainmentCalculator;
