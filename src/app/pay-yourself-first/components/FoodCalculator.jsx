import { useEffect, useState } from "react";
import RangeSlider from "./RangeSlider";

import FoodIconWhite from "/public/images/food-icon-white.svg";
import ToolTip from "/public/images/tooltip.svg";
import HeaderBackground from "/public/images/food-header.jpg";
let activeSections = [];

const FoodCalculator = ({ onSectionUpdate, notificationShown, setNotificationShown }) => {
  const [sectionBudget, setSectionBudget] = useState(0);
  const [savingGroceries, setSavingGroceries] = useState(0);
  const [savingShopping, setSavingShopping] = useState(0);
  const [savingMeals, setSavingMeals] = useState(0);
  const [savingMeat, setSavingMeat] = useState(0);

  const handleGroceries = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingGroceries(saving);
    if (saving > 0 && !activeSections.includes("groceries")) {
      activeSections.push("groceries");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("groceries"), 1);
    }
  };
  const handleShopping = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingShopping(saving);
    if (saving > 0 && !activeSections.includes("shopping")) {
      activeSections.push("shopping");
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("shopping"), 1);
    }
  };

  const handleMeals = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingMeals(saving);
    if (saving > 0 && !activeSections.includes("meals")) {
      activeSections = [...activeSections, "meals"];
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("meals"), 1);
    }
  };

  const handleMeat = (value) => {
    const saving = Math.floor((value / 100) * sectionBudget);
    setSavingMeat(saving);
    if (saving > 0 && !activeSections.includes("meat")) {
      activeSections = [...activeSections, "meat"];
    } else if (saving === 0) {
      activeSections.splice(activeSections.indexOf("meat"), 1);
    }
  };

  const updateBudget = (e) => {
    const result = Number(e.target.value.replace(/\D/g, '').slice(0, 6));
	e.target.value = result;
    setSectionBudget(result);
  };

  useEffect(() => {
    onSectionUpdate(
      savingGroceries + savingShopping + savingMeals + savingMeat,
      activeSections
    );
  }, [savingGroceries, savingShopping, savingMeals, savingMeat]);

  return (
    <>
      <section id="Food" className="font-montserrat pt-20">
        <div className="bg-food-header bg-center bg-cover max-w-full h-[280px] flex flex-col justify-end font-montserrat" style={{ backgroundImage: `url(${HeaderBackground.src})`, backgroundPosition:'top' }}>
          <div className="py-12 px-16  bg-gradient-to-t from-[#62B64F] to-transparent">
            <img
              className="w-[63px] mb-2"
              src={FoodIconWhite.src}
              alt="Food Icon"
            />
            <h2 className="text-white text-[36px] leading-[36px]">Food</h2>
            <div className="img_header_content flex items-center justify-between space-x-7 -mt-3">
              <h3 className="text-white text-[22px] font-light mt-2">
                How much do you spend on groceries every month?
              </h3>
              <div className="shadow-xl flex items-center bg-white" style={{borderRadius:'3px'}}>
                <span className="text-2xl text-brandGreen px-3">R</span>
                <input
                  type="text"
                  onKeyDown={(event) => {
                    if (/[-+]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  className="no-arrows outline-none border-none text-2xl text-brandGreen text-right max-w-[150px] py-[10px] px-[16px]"
                  onChange={updateBudget}
                  style={{borderRadius:'3px'}}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative group">
            {activeSections.length >= 2 &&
              !activeSections.includes("groceries") && (
                <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                  <p className="text-sm font-light">
                    Select just two tips per category to focus your saving
                    efforts. To change to another tip, zero one you have
                    selected already.
                  </p>
                </div>
              )}

            <div className="savings_container flex items-center justify-between space-x-12 xl:space-x-32 border-b border-[#DDDDDD] py-12 px-5">
              <div className="savings_copy_and_slider block xl:flex xl:space-x-32 items-center justify-between w-full">
                <div className="w-full xl:w-1/3">
                  <div
                    className={`text-base font-light w-[90%] xl:w-[270px] ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("groceries") &&
                      "text-disabled"
                    }`}
                  >
                    <span className="text-[19px] font-normal">
                      Save up to 25%
                    </span>
                    <br />
                    on groceries by switching to a more affordable brand.
                    <div
                      className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("groceries") &&
                        "opacity-20"
                      }`}
                    >
                      <img src={ToolTip.src} className="cursor-pointer " alt="" />
                      {activeSections.length >= 2 &&
                      !activeSections.includes("groceries") ? null : (
                        <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                          <p className="text-sm font-light">
                            Research shows that switching from the most
                            expensive brand to a more cost-effective or no-name
                            brand could save you up to 25%.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                  {activeSections.length >= 2 &&
                  !activeSections.includes("groceries") ? (
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
                      max={25}
                      onUpdate={handleGroceries}
                      theme="green"
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
                  !activeSections.includes("groceries") &&
                  "text-disabled"
                }`}
              >
                <p className="text-xl font-light">Save</p>
                <p className="text-3xl font-normal">R{savingGroceries}</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            {activeSections.length >= 2 &&
              !activeSections.includes("shopping") && (
                <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                  <p className="text-sm font-light">
                    Select just two tips per category to focus your saving
                    efforts. To change to another tip, zero one you have
                    selected already.
                  </p>
                </div>
              )}

            <div className="savings_container flex items-center justify-between space-x-12 xl:space-x-32 border-b border-[#DDDDDD] py-12 px-5">
              <div className="savings_copy_and_slider block xl:flex xl:space-x-32 items-center justify-between w-full">
                <div className="w-full xl:w-1/3">
                  <div
                    className={`text-base font-light w-[90%] xl:w-[270px] ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("shopping") &&
                      "text-disabled"
                    }`}
                  >
                    <span className="text-[19px] font-normal">
                      Save up to 23%
                    </span>
                    <br />
                    by using a shopping list and sticking to it.
                    <div
                      className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("shopping") &&
                        "opacity-20"
                      }`}
                    >
                      <img src={ToolTip.src} className="cursor-pointer " alt="" />
                      {activeSections.length >= 2 &&
                      !activeSections.includes("shopping") ? null : (
                        <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                          <p className="text-sm font-light">
                            Avoid impulse buying. Think carefully before you buy
                            an extra item.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                  {activeSections.length >= 2 &&
                  !activeSections.includes("shopping") ? (
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
                      max={23}
                      onUpdate={handleShopping}
                      theme="green"
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
                  !activeSections.includes("shopping") &&
                  "text-disabled"
                }`}
              >
                <p className="text-xl font-light">Save</p>
                <p className="text-3xl font-normal">R{savingShopping}</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            {activeSections.length >= 2 &&
              !activeSections.includes("meals") && (
                <div className="p-5 bg-[#F7F7F7] rounded-lg shadow-xl absolute w-[300px] hidden group-hover:block z-10 top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                  <p className="text-sm font-light">
                    Select just two tips per category to focus your saving
                    efforts. To change to another tip, zero one you have
                    selected already.
                  </p>
                </div>
              )}

            <div className="savings_container flex items-center justify-between space-x-12 xl:space-x-32 border-b border-[#DDDDDD] py-12 px-5">
              <div className="savings_copy_and_slider block xl:flex xl:space-x-32 items-center justify-between w-full">
                <div className="w-full xl:w-1/3">
                  <div
                    className={`text-base font-light w-[90%] xl:w-[270px] ${
                      activeSections.length >= 2 &&
                      !activeSections.includes("meals") &&
                      "text-disabled"
                    }`}
                  >
                    <span className="text-[19px] font-normal">
                      Save up to 20%
                    </span>
                    <br />
                    on groceries by planning your meals.
                    <div
                      className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("meals") &&
                        "opacity-20"
                      }`}
                    >
                      <img src={ToolTip.src} className="cursor-pointer " alt="" />
                      {activeSections.length >= 2 &&
                      !activeSections.includes("meals") ? null : (
                        <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                          <p className="text-sm font-light">
                            Do a weekly meal plan and buy only what you need.
                            You&apos;ll end up wasting less food and less money.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                  {activeSections.length >= 2 &&
                  !activeSections.includes("meals") ? (
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
                      onUpdate={handleMeals}
                      theme="green"
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
                  !activeSections.includes("meals") &&
                  "text-disabled"
                }`}
              >
                <p className="text-xl font-light">Save</p>
                <p className="text-3xl font-normal">R{savingMeals}</p>
              </div>
            </div>
          </div>
          <div className="relative group">
            {activeSections.length >= 2 && !activeSections.includes("meat") && (
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
                      !activeSections.includes("meat") &&
                      "text-disabled"
                    }`}
                  >
                    <span className="text-[19px] font-normal">
                      Save up to 5%
                    </span>
                    <br />
                    by doing a no-meat-Mondays – and help save the planet.
                    <div
                      className={`inline-block ml-1 relative group/tooltip top-1 z-10 ${
                        activeSections.length >= 2 &&
                        !activeSections.includes("meat") &&
                        "opacity-20"
                      }`}
                    >
                      <img src={ToolTip.src} className="cursor-pointer " alt="" />
                      {activeSections.length >= 2 &&
                      !activeSections.includes("meat") ? null : (
                        <div className="p-5 bg-[#F7F7F7] top-5 left-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
                          <p className="text-sm font-light">
                            Meat is expensive. You can save by going meatless
                            for one night a week. And it&apos;s generally
                            healthier for you too.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="savings_slider w-[90%] mt-[50px] xl:mt-0 xl:w-2/3">
                  {activeSections.length >= 2 &&
                  !activeSections.includes("meat") ? (
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
                      onUpdate={handleMeat}
                      theme="green"
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
                  !activeSections.includes("meat") &&
                  "text-disabled"
                }`}
              >
                <p className="text-xl font-light">Save</p>
                <p className="text-3xl font-normal">R{savingMeat}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoodCalculator;
