import { useEffect, useState } from "react";
import RangeSlider from "./RangeSlider";
import BulbIcon from "/public/bulb-icon-white.svg";
import ToolTip from "/public/tooltip.svg";
import HeaderBackground from "/public/energy-header.jpg";
let activeSections = [];

const EnergyCalculator = ({ onSectionUpdate, notificationShown, setNotificationShown }) => {
  const [sectionBudget, setSectionBudget] = useState(0);
  const [savingVampires, setSavingVampires] = useState(0);
  const [savingGeyser, setSavingGeyser] = useState(0);
  const [savingLED, setSavingLED] = useState(0);
  const [savingHeater, setSavingHeater] = useState(0);

  const handleVampires = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingVampires(saving);

    if (saving > 0 && !activeSections.includes("vampires")) {
      activeSections.push("vampires");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("vampires"), 1);
    }
  };

  const handleGeyser = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingGeyser(saving);

    if (saving > 0 && !activeSections.includes("geyser")) {
      activeSections.push("geyser");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("geyser"), 1);
    }
  };

  const handleLED = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingLED(saving);

    if (saving > 0 && !activeSections.includes("led")) {
      activeSections.push("led");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("led"), 1);
    }
  };

  const handleHeater = (value) => {
    const saving = Math.floor(value * 14);
    setSavingHeater(saving);

    if (saving > 0 && !activeSections.includes("heater")) {
      activeSections.push("heater");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("heater"), 1);
    }
  };

  const updateBudget = (e) => {
    const result = Number(e.target.value.replace(/\D/g, '').slice(0, 6));
	e.target.value = result;
    setSectionBudget(result);
  };

  useEffect(() => {
    onSectionUpdate(
      savingVampires + savingGeyser + savingLED + savingHeater,
      activeSections
    );
  }, [savingGeyser, savingHeater, savingLED, savingVampires]);

  return (
    <section id="Energy" className="pt-20">
      <div className="bg-energy-header bg-center bg-cover max-w-full h-[280px]  flex flex-col justify-end font-montserrat" style={{ backgroundImage: `url(${HeaderBackground.src})`, backgroundPosition:'top' }}>
        <div className="py-12 px-16  bg-gradient-to-t from-brandOrange to-transparent">
          <img className="w-[35px] mb-2" src={BulbIcon.src} alt="Energy Icon" />
          <h2 className="text-white text-[36px] leading-[36px]">Energy</h2>
          <div className="img_header_content flex items-center justify-between space-x-7 -mt-3">
            <h3 className="text-white text-[22px] font-light mt-2">
              How much do you spend on electricity every month?
            </h3>
            <div className="shadow-xl flex items-center bg-white" style={{borderRadius:'3px', overflow:'hidden'}}>
              <span className="text-2xl text-orange px-3">R</span>
              <input
                type="text"
                onKeyDown={(event) => {
                  if (/[-+]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                className="no-arrows outline-none border-none text-2xl text-orange text-right max-w-[150px] py-[10px] px-[16px]"
                onChange={updateBudget}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative group">
          {activeSections.length >= 2 &&
            !activeSections.includes("vampires") && (
              <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                <p className="text-sm font-light">
                  Select just two tips per category to focus your saving
                  efforts. To change to another tip, zero one you have selected
                  already.
                </p>
              </div>
            )}

          <div className="savings_container flex items-center justify-between space-x-12 xl:space-x-32 border-b border-[#DDDDDD] py-12 px-5">
            <div className="savings_copy_and_slider block xl:flex xl:space-x-32 items-center justify-between w-full">
              <div className="w-full xl:w-1/3">
                <div
                  className={`text-base font-light w-[90%] xl:w-[270px] ${
                    activeSections.length >= 2 &&
                    !activeSections.includes("vampires") &&
                    "text-disabled"
                  }`}
                >
                  <span className="text-[19px] font-normal">Save up to 6%</span>
                  <br />
                  by switching off vampire appliances at the wall and pulling
                  out chargers.
                  <div
                    className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("vampires") &&
                      "opacity-20"
                    }`}
                  >
                    <img src={ToolTip.src} className="cursor-pointer " />
                    {activeSections.length >= 2 &&
                    !activeSections.includes("vampires") ? null : (
                      <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                        <p className="text-sm font-light">
                          Vampire appliances continue to use power even when
                          they are switched off at the wall socket. They use
                          standby power and can include devices such as your tv,
                          computer, electric clock and anything with a remote,
                          power light or timer.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                {activeSections.length >= 2 &&
                !activeSections.includes("vampires") ? (
                  <RangeSlider
                    min={0}
                    max={0}
                    theme="grey"
                    symbol="%"
                    disabled={true}
                    budget={sectionBudget}
					notificationShown={notificationShown}
					setNotificationShown={setNotificationShown}
                  />
                ) : (
                  <RangeSlider
                    min={0}
                    max={6}
                    onUpdate={handleVampires}
                    theme="orange"
                    symbol="%"
                    budget={sectionBudget}
					notificationShown={notificationShown}
					setNotificationShown={setNotificationShown}
                  />
                )}
              </div>
            </div>
            <div
              className={`savings_value text-right self-end ${
                activeSections.length >= 2 &&
                !activeSections.includes("vampires") &&
                "text-disabled"
              }`}
            >
              <p className="text-xl font-light">Save</p>
              <p className="text-3xl font-normal">R{savingVampires}</p>
            </div>
          </div>
        </div>
        <div className="relative group">
          {activeSections.length >= 2 && !activeSections.includes("geyser") && (
            <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
              <p className="text-sm font-light">
                Select just two tips per category to focus your saving efforts.
                To change to another tip, zero one you have selected already.
              </p>
            </div>
          )}

          <div className="savings_container flex items-center justify-between space-x-12 xl:space-x-32 border-b border-[#DDDDDD] py-12 px-5">
            <div className="savings_copy_and_slider block xl:flex xl:space-x-32 items-center justify-between w-full">
              <div className="w-full xl:w-1/3">
                <div
                  className={`text-base font-light w-[90%] xl:w-[270px] ${
                    activeSections.length >= 2 &&
                    !activeSections.includes("geyser") &&
                    "text-disabled"
                  }`}
                >
                  <span className="text-[19px] font-normal">Save up to 5%</span>
                  <br />
                  by turning down your geyser temperature.
                  <div
                    className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("geyser") &&
                      "opacity-20"
                    }`}
                  >
                    <img src={ToolTip.src} className="cursor-pointer " />
                    {activeSections.length >= 2 &&
                    !activeSections.includes("geyser") ? null : (
                      <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                        <p className="text-sm font-light">
                          According to Eskom, switching the geyser&apos;s
                          thermostat temperature down by 10 degrees helps you
                          save up to 5%.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                {activeSections.length >= 2 &&
                !activeSections.includes("geyser") ? (
                  <RangeSlider
                    min={0}
                    max={0}
                    theme="grey"
                    symbol="%"
                    disabled={true}
                    budget={sectionBudget}
					notificationShown={notificationShown}
					setNotificationShown={setNotificationShown}
                  />
                ) : (
                  <RangeSlider
                    min={0}
                    max={5}
                    onUpdate={handleGeyser}
                    theme="orange"
                    symbol="%"
                    budget={sectionBudget}
					notificationShown={notificationShown}
					setNotificationShown={setNotificationShown}
                  />
                )}
              </div>
            </div>
            <div
              className={`savings_value text-right self-end ${
                activeSections.length >= 2 &&
                !activeSections.includes("geyser") &&
                "text-disabled"
              }`}
            >
              <p className="text-xl font-light">Save</p>
              <p className="text-3xl font-normal">R{savingGeyser}</p>
            </div>
          </div>
        </div>
        <div className="relative group">
          {activeSections.length >= 2 && !activeSections.includes("led") && (
            <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
              <p className="text-sm font-light">
                Select just two tips per category to focus your saving efforts.
                To change to another tip, zero one you have selected already.
              </p>
            </div>
          )}

          <div className="savings_container flex items-center justify-between space-x-12 xl:space-x-32 border-b border-[#DDDDDD] py-12 px-5">
            <div className="savings_copy_and_slider block xl:flex xl:space-x-32 items-center justify-between w-full">
              <div className="w-full xl:w-1/3">
                <div
                  className={`text-base font-light w-[90%] xl:w-[270px] ${
                    activeSections.length >= 2 &&
                    !activeSections.includes("led") &&
                    "text-disabled"
                  }`}
                >
                  <span className="text-[19px] font-normal">
                    Save up to 12%
                  </span>
                  <br />
                  by switching to LED lightbulbs.
                  <div
                    className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("led") &&
                      "opacity-20"
                    }`}
                  >
                    <img src={ToolTip.src} className="cursor-pointer " />
                    {activeSections.length >= 2 &&
                    !activeSections.includes("led") ? null : (
                      <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                        <p className="text-sm font-light">
                          On average 14% of your electricity bill is for
                          lighting. You can save 85% of that 14% by changing to
                          LED lighting.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                {activeSections.length >= 2 &&
                !activeSections.includes("led") ? (
                  <RangeSlider
                    min={0}
                    max={0}
                    theme="grey"
                    symbol="%"
                    disabled={true}
                    budget={sectionBudget}
					notificationShown={notificationShown}
					setNotificationShown={setNotificationShown}
                  />
                ) : (
                  <RangeSlider
                    min={0}
                    max={12}
                    onUpdate={handleLED}
                    theme="orange"
                    symbol="%"
                    budget={sectionBudget}
					notificationShown={notificationShown}
					setNotificationShown={setNotificationShown}
                  />
                )}
              </div>
            </div>
            <div
              className={`savings_value text-right self-end ${
                activeSections.length >= 2 &&
                !activeSections.includes("led") &&
                "text-disabled"
              }`}
            >
              <p className="text-xl font-light">Save</p>
              <p className="text-3xl font-normal">R{savingLED}</p>
            </div>
          </div>
        </div>
        <div className="relative group">
          {activeSections.length >= 2 && !activeSections.includes("heater") && (
            <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
              <p className="text-sm font-light">
                Select just two tips per category to focus your saving efforts.
                To change to another tip, zero one you have selected already.
              </p>
            </div>
          )}

          <div className="savings_container flex items-center justify-between space-x-12 xl:space-x-32 border-b border-[#DDDDDD] py-12 px-5">
            <div className="savings_copy_and_slider block xl:flex xl:space-x-32 items-center justify-between w-full">
              <div className="w-full xl:w-1/3">
                <div
                  className={`text-base font-light w-[90%] xl:w-[270px] ${
                    activeSections.length >= 2 &&
                    !activeSections.includes("heater") &&
                    "text-disabled"
                  }`}
                >
                  <span className="text-[19px] font-normal">
                    Save up to R14/day
                  </span>
                  <br />
                  by not using a heater and dressing warmer.
                  <div
                    className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("heater") &&
                      "opacity-20"
                    }`}
                  >
                    <img src={ToolTip.src} className="cursor-pointer " />
                    {activeSections.length >= 2 &&
                    !activeSections.includes("heater") ? null : (
                      <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                        <p className="text-sm font-light">
                          Heating uses a lot of power. The average 1 000 watt
                          heater (that is on for 5 hours) will cost you R14 per
                          day.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                {activeSections.length >= 2 &&
                !activeSections.includes("heater") ? (
                  <RangeSlider
                    min={0}
                    max={0}
                    theme="grey"
                    symbol="days"
                    disabled={true}
                    budget={sectionBudget}
					notificationShown={notificationShown}
					setNotificationShown={setNotificationShown}
                  />
                ) : (
                  <RangeSlider
                    min={0}
                    max={30}
                    onUpdate={handleHeater}
                    theme="orange"
                    symbol="days"
                    budget={sectionBudget}
					notificationShown={notificationShown}
					setNotificationShown={setNotificationShown}
                  />
                )}
              </div>
            </div>
            <div
              className={`savings_value text-right self-end ${
                activeSections.length >= 2 &&
                !activeSections.includes("heater") &&
                "text-disabled"
              }`}
            >
              <p className="text-xl font-light">Save</p>
              <p className="text-3xl font-normal">R{savingHeater}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyCalculator;
