import { useEffect, useState } from "react";
import RangeSlider from "./RangeSlider";

import FuelIconWhite from "/public/images/fuel-icon-white.svg";
import ToolTip from "/public/images/tooltip.svg";
import HeaderBackground from "/public/images/fuel-header.jpg";
let activeSections = [];
const FuelCalculator = ({ onSectionUpdate, notificationShown, setNotificationShown }) => {
  const [sectionBudget, setSectionBudget] = useState(0);
  const [savingTyres, setSavingTyres] = useState(0);
  const [savingSpeed, setSavingSpeed] = useState(0);
  const [savingFreeway, setSavingFreeway] = useState(0);
  const [savingMaintenance, setSavingMaintenance] = useState(0);

  const handleTyres = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingTyres(saving);

    if (saving > 0 && !activeSections.includes("tyres")) {
      activeSections.push("tyres");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("tyres"), 1);
    }
  };

  const handleSpeed = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingSpeed(saving);

    if (saving > 0 && !activeSections.includes("speed")) {
      activeSections.push("speed");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("speed"), 1);
    }
  };

  const handleFreeway = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingFreeway(saving);

    if (saving > 0 && !activeSections.includes("freeway")) {
      activeSections.push("freeway");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("freeway"), 1);
    }
  };

  const handleMaintenance = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingMaintenance(saving);

    if (saving > 0 && !activeSections.includes("maintenance")) {
      activeSections.push("maintenance");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("maintenance"), 1);
    }
  };

  const updateBudget = (e) => {
    const result = Number(e.target.value.replace(/\D/g, '').slice(0, 6));
	e.target.value = result;
    setSectionBudget(result);
  };

  useEffect(() => {
    onSectionUpdate(
      savingTyres + savingSpeed + savingFreeway + savingMaintenance,
      activeSections
    );
  }, [savingFreeway, savingMaintenance, savingSpeed, savingTyres]);

  return (
    <section id="Fuel" className="pt-20">
      <div className="bg-fuel-header bg-center bg-cover max-w-full h-[280px]  flex flex-col justify-end font-montserrat" style={{ backgroundImage: `url(${HeaderBackground.src})`, backgroundPosition:'top' }}>
        <div className="py-12 px-16  bg-gradient-to-t from-brandPink to-transparent">
          <img className="w-[65px] mb-2" src={FuelIconWhite.src} alt="Fuel Icon" />
          <h2 className="text-white text-[36px] leading-[36px]">Fuel</h2>
          <div className="img_header_content flex items-center justify-between space-x-7 -mt-3">
            <h3 className="text-white text-[22px] font-light mt-2">
              How much do you spend on fuel every month?
            </h3>
            <div className="shadow-xl flex items-center bg-white" style={{borderRadius:'3px', overflow:'hidden'}}>
              <span className="text-2xl text-pink px-3">R</span>
              <input
                type="text"
                onKeyDown={(event) => {
                  if (/[-+]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                className="no-arrows outline-none border-none text-2xl text-pink text-right max-w-[150px] py-[10px] px-[16px]"
                onChange={updateBudget}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="relative group">
          {activeSections.length >= 2 && !activeSections.includes("tyres") && (
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
                    !activeSections.includes("tyres") &&
                    "text-disabled"
                  }`}
                >
                  <span className="text-[19px] font-normal">
                    Save up to 10%
                  </span>
                  <br />
                  by maintaining your tyre pressure.
                  <div
                    className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("tyres") &&
                      "opacity-20"
                    }`}
                  >
                    <img src={ToolTip.src} className="cursor-pointer " />
                    {activeSections.length >= 2 &&
                    !activeSections.includes("tyres") ? null : (
                      <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                        <p className="text-sm font-light">
                          Tyres that are underinflated have a higher rolling
                          resistance on the road. This generates more friction
                          and can increase fuel consumption by up to 10%. Check
                          your car&apos;s manual for the correct tyre pressure.
                          It also makes for safer driving.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                {activeSections.length >= 2 &&
                !activeSections.includes("tyres") ? (
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
                    max={10}
                    onUpdate={handleTyres}
                    theme="pink"
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
                !activeSections.includes("tyres") &&
                "text-disabled"
              }`}
            >
              <p className="text-xl font-light">Save</p>
              <p className="text-3xl font-normal">R{savingTyres}</p>
            </div>
          </div>
        </div>
        <div className="relative group">
          {activeSections.length >= 2 && !activeSections.includes("speed") && (
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
                    !activeSections.includes("speed") &&
                    "text-disabled"
                  }`}
                >
                  <span className="text-[19px] font-normal">
                    Save up to 33%
                  </span>
                  <br />
                  by accelerating and braking gently and reading the road ahead.
                </div>
              </div>
              <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                {activeSections.length >= 2 &&
                !activeSections.includes("speed") ? (
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
                    max={33}
                    onUpdate={handleSpeed}
                    theme="pink"
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
                !activeSections.includes("speed") &&
                "text-disabled"
              }`}
            >
              <p className="text-xl font-light">Save</p>
              <p className="text-3xl font-normal">R{savingSpeed}</p>
            </div>
          </div>
        </div>
        <div className="relative group">
          {activeSections.length >= 2 &&
            !activeSections.includes("freeway") && (
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
                    !activeSections.includes("freeway") &&
                    "text-disabled"
                  }`}
                >
                  <span className="text-[19px] font-normal">
                    Save up to 20%
                  </span>
                  <br />
                  by maintaining a freeway speed of roughly 88.5 km/h.
                </div>
              </div>
              <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                {activeSections.length >= 2 &&
                !activeSections.includes("freeway") ? (
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
                    max={20}
                    onUpdate={handleFreeway}
                    theme="pink"
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
                !activeSections.includes("freeway") &&
                "text-disabled"
              }`}
            >
              <p className="text-xl font-light">Save</p>
              <p className="text-3xl font-normal">R{savingFreeway}</p>
            </div>
          </div>
        </div>
        <div className="relative group">
          {activeSections.length >= 2 &&
            !activeSections.includes("maintenance") && (
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
                    !activeSections.includes("maintenance") &&
                    "text-disabled"
                  }`}
                >
                  <span className="text-[19px] font-normal">
                    Save up to 30%
                  </span>
                  <br />
                  on fuel with good car maintenance.
                  <div
                    className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("maintenance") &&
                      "opacity-20"
                    }`}
                  >
                    <img src={ToolTip.src} className="cursor-pointer " />
                    {activeSections.length >= 2 &&
                    !activeSections.includes("maintenance") ? null : (
                      <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                        <p className="text-sm font-light">
                          Regularly fix and maintain spark plugs, rings,
                          injectors, brakes, coolant levels, oil and filters.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                {activeSections.length >= 2 &&
                !activeSections.includes("maintenance") ? (
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
                    max={30}
                    onUpdate={handleMaintenance}
                    theme="pink"
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
                !activeSections.includes("maintenance") &&
                "text-disabled"
              }`}
            >
              <p className="text-xl font-light">Save</p>
              <p className="text-3xl font-normal">R{savingMaintenance}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuelCalculator;
