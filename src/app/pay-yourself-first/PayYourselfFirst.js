"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./assets/css/styles.min.css";
import EnergyCalculator from "./components/EnergyCalculator";
import EntertainmentCalculator from "./components/EntertainmentCalculator";
import FinalStep from "./components/FinalStep";
import FoodCalculator from "./components/FoodCalculator";
import FuelCalculator from "./components/FuelCalculator";
import Modal from "./components/Modal";
import SavingType from "./components/SavingType";
import ArrowDownWhite from "/public/images/arrow-down-white.svg";
import HeaderBgLeft from "/public/images/pay-yourself-first-bg-left.png";
import HeaderBgRight from "/public/images/pay-yourself-first-bg-right.png";
import RewardsIconPDF from "/public/images/rewards-icon-PDF.png";
import SectionIcons from "/public/images/section-icons.png";

const CalculatorSections = ["Food", "Energy", "Fuel", "Entertainment"];
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const PayYourselfFirst = () => {
  useEffect(() => {
    document.addEventListener("wheel", function (event) {
      if (document.activeElement.type === "number") {
        document.activeElement.blur();
      }
    });
  }, []);

  const [currentSection, setCurrentSection] = useState("Food");
  const [activeSections, setActiveSections] = useState(["Food"]);
  const [foodSaving, setFoodSaving] = useState(0);
  const [energySaving, setEnergySaving] = useState(0);
  const [fuelSaving, setFuelSaving] = useState(0);
  const [entertainmentSaving, setEntertainmentSaving] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [savingTypeSectionShow, setsavingTypeSectionShow] = useState(false);
  const [showLastSection, setShowLastSection] = useState(false);
  const [savingType, setSavingType] = useState();
  const [showModal, setShowModal] = useState(false);
  const [activeSavingsSections, setActiveSavingsSections] = useState({});

  const [notificationShown, setNotificationShown] = useState(false);
  const [notificationShownPrev, setNotificationShownPrev] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [sectionCount, setSectionCount] = useState(1);

  useEffect(() => {
    setTotalSavings(
      foodSaving + energySaving + fuelSaving + entertainmentSaving,
    );
    const isInViewport = (section) => {
      let element = document.getElementById(section);
      let rect = element.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    document.onscroll = () => {
      if (isInViewport("Food")) {
        setCurrentSection("Food");
      }
      if (activeSections.includes("Energy")) {
        if (isInViewport("Energy")) {
          setCurrentSection("Energy");
        }
      }
      if (activeSections.includes("Fuel")) {
        if (isInViewport("Fuel")) {
          setCurrentSection("Fuel");
        }
      }
      if (activeSections.includes("Entertainment")) {
        if (isInViewport("Entertainment")) {
          setCurrentSection("Entertainment");
        }
      }
    };
  }, [
    foodSaving,
    energySaving,
    fuelSaving,
    entertainmentSaving,
    currentSection,
    activeSections,
  ]);

  const handleSectionNavigation = (section) => {
    if (activeSections.includes(section)) {
      let change = setTimeout(() => {
        setCurrentSection(section);
      }, 500);
      clearTimeout(change);
    }
  };

  const handleSectionIncrement = () => {
    setSectionCount((current) => {
      let sections = current + 1;
      setActiveSections((activeSections) => [
        CalculatorSections[sections - 1],
        ...activeSections,
      ]);
      setCurrentSection(CalculatorSections[sections - 1]);

      return sections;
    });
    setTimeout(() => {
      document
        .getElementById(CalculatorSections[sectionCount])
        .scrollIntoView();
    }, 100);
  };

  const handleFinalSetting = (value) => {
    setSavingType(value);
    if (typeof document !== "undefined") {
      setTimeout(() => {
        document.getElementById("final_savings_otion").scrollIntoView();
      }, 100);
    }
  };

  const handleModalToggle = () => {
    setShowModal((current) => !current);
  };

  const handleFoodSavingsUpdate = (value, sections) => {
    setFoodSaving(value);
    setActiveSavingsSections((prev) => {
      return { ...prev, food: sections };
    });
  };
  const handleEnergySavingsUpdate = (value, sections) => {
    setEnergySaving(value);
    setActiveSavingsSections((prev) => {
      return { ...prev, energy: sections };
    });
  };
  const handleFuelSavingsUpdate = (value, sections) => {
    setFuelSaving(value);
    setActiveSavingsSections((prev) => {
      return { ...prev, fuel: sections };
    });
  };
  const handleEntertainmentSavingsUpdate = (value, sections) => {
    setEntertainmentSaving(value);
    setActiveSavingsSections((prev) => {
      return { ...prev, entertainment: sections };
    });
  };

  const handleSavingTypeShow = () => {
    setsavingTypeSectionShow((current) => !current);
    if (typeof document !== "undefined") {
      setTimeout(() => {
        document.getElementById("SavingType").scrollIntoView();
      }, 100);
    }
  };

  const handleLastStep = () => {
    setsavingTypeSectionShow((current) => !current);
    setShowLastSection((current) => !current);
  };

	useEffect(()=>{
		if(notificationShown != notificationShownPrev){
			setNotificationShownPrev(notificationShown);
			setNotificationOpen(true);
			setTimeout(() => {setNotificationOpen(false)}, 15000);
		}
	},[notificationShown])

	const Notification = ({ text, closeNotification }) => {
		return (
			<div className="notification cms-message bg-gradient-to-r from-[#009677] to-[#50B848] ">
			<h5>Please note:</h5>
			<p>Although it is possible to reach the full savings percentage, it takes extreme discipline. Be realistic with what you think you can achieve.</p>
			<span onClick={closeNotification}></span>
			</div>
		);
	};

  return (
    <>
      {showModal && <Modal onClose={handleModalToggle} />}
      <div id="pay-yourself-first-calc">
        <div className="font-montserrat mx-auto flex max-w-[1600px] flex-row items-start justify-start px-10">
          <img className="header-part-right" src={HeaderBgRight.src} alt="" />
          <div className="header-content mx-auto mt-[150px] w-full max-w-[1000px]">
            <img
              src={RewardsIconPDF.src}
              alt=""
              width="120px"
              height="auto"
              className="mb-[50px]"
            />
            <h1 className="mb-[30px] bg-gradient-to-t from-[#50B848] to-[#009677] bg-clip-text text-5xl font-bold text-transparent md:text-6xl sm:from-20% sm:text-left sm:uppercase">
              PAY YOURSELF FIRST
              <br />
              <span className="mobile_font_resize font-light">CALCULATOR</span>
            </h1>
            <div className="mb-[30px] font-bold" style={{ color: "#009677" }}>
              Four expenses you can reduce
            </div>
            <img
              src={SectionIcons.src}
              alt="section icons"
              className="mb-[30px]"
              width="300px"
              height="auto"
            />
            <div className="mb-[50px]">
              <p className="text-lg font-light">
                The Pay Yourself First calculator will guide you towards saving
                money on daily and monthly expenses such as food, energy, fuel
                and entertainment.
              </p>
            </div>

            <Link
              href={`/pay-yourself-first/#Food`}
              className="flex w-[320px] items-center rounded-full bg-gradient-to-r from-[#009677] to-[#50B848] px-11 py-4 text-base font-semibold tracking-[0.4px] text-white"
            >
              SAVINGS CALCULATOR{" "}
              <img
                src={ArrowDownWhite.src}
                alt="Arrow down"
                className="pl-[20px]"
              />
            </Link>
          </div>
          <img className="header-part-left" src={HeaderBgLeft.src} alt="" />
        </div>

        <div className="font-montserrat mx-auto flex max-w-[1600px] flex-row items-start justify-start px-10">
          <div className="menu sticky top-[110px] mt-36 pt-5">
            <nav>
              <ul>
                {CalculatorSections.map((section, index) => {
                  return (
                    <li
                      className={`flex text-2xl ${
                        currentSection === section
                          ? "font-normal"
                          : "font-light"
                      } ${
                        activeSections.includes(section)
                          ? "opacity-100"
                          : "opacity-20"
                      }`}
                      key={index}
                      onClick={() => handleSectionNavigation(section)}
                    >
                      <div
                        className={`inline-block h-auto w-[3px] ${
                          currentSection === section
                            ? "bg-gradient-to-b from-[#3688E7] to-[#E91582]"
                            : "bg-[#CCC]"
                        }  mr-6`}
                      ></div>

                      <Link
                        href={`/pay-yourself-first/#${section}`}
                        className={`py-1 ${
                          activeSections.includes(section)
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        }`}
                      >
                        {section}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              onClick={handleModalToggle}
              className="font-regular mt-10 flex  items-center rounded-full bg-gradient-to-r from-[#009677] to-[#50B848] px-11 py-4 text-base tracking-[0.4px] text-white"
            >
              USER GUIDE
            </button>
            <p
              className="font-regular animate-bounce-short bounce-text max-w-[280px] px-5 pb-[20px] pt-[16px] text-base"
              style={{ color: "#009677" }}
            >
              Select two tips per category to start saving
            </p>
          </div>
          <div className="font-montserrat content-holder w-full max-w-[1400px] pt-[67px]">
            <FoodCalculator onSectionUpdate={handleFoodSavingsUpdate} notificationShown={notificationShown} setNotificationShown={setNotificationShown} />
            {activeSections.includes("Energy") && (
              <EnergyCalculator onSectionUpdate={handleEnergySavingsUpdate} notificationShown={notificationShown} setNotificationShown={setNotificationShown} />
            )}
            {activeSections.includes("Fuel") && (
              <FuelCalculator onSectionUpdate={handleFuelSavingsUpdate} notificationShown={notificationShown} setNotificationShown={setNotificationShown} />
            )}
            {activeSections.includes("Entertainment") && (
              <EntertainmentCalculator
                onSectionUpdate={handleEntertainmentSavingsUpdate} notificationShown={notificationShown} setNotificationShown={setNotificationShown}
              />
            )}

            {sectionCount < 4 ? (
              <div className="flex justify-center pb-10 pt-7">
                <button
                  onClick={handleSectionIncrement}
                  className="mb-12 flex items-center  rounded-full bg-gradient-to-r from-[#009677] to-[#50B848] px-11 py-4 text-base font-semibold tracking-[0.4px] text-white"
                >
                  NEXT
                </button>
              </div>
            ) : (
              !savingTypeSectionShow &&
              !showLastSection && (
                <div className="flex justify-center pb-20">
                  <button
                    onClick={handleSavingTypeShow}
                    className="flex items-center rounded-full bg-gradient-to-r from-[#009677] to-[#50B848] px-11 py-4 text-base font-semibold tracking-[0.4px] text-white"
                  >
                    NEXT
                  </button>
                </div>
              )
            )}
            {savingTypeSectionShow && (
              <SavingType
                onSavingChange={(value) => handleFinalSetting(value)}
              />
            )}
            {savingType && !showLastSection && (
              <div className="font-montserrat flex justify-center">
                <button
                  id="final"
                  onClick={handleLastStep}
                  className="mb-20 flex items-center rounded-full bg-gradient-to-r from-[#009677] to-[#50B848] px-11 py-4 text-base font-semibold tracking-[0.4px] text-white"
                >
                  FINALISE
                </button>
              </div>
            )}
            {showLastSection && (
              <FinalStep
                totalSavings={totalSavings}
                type={savingType}
                food={foodSaving}
                energy={energySaving}
                fuel={fuelSaving}
                entertainment={entertainmentSaving}
                sections={activeSavingsSections}
              />
            )}
          </div>
        </div>

		<div className={notificationOpen ? 'cms-notification open' : 'cms-notification'}><Notification text="" closeNotification={() => setNotificationOpen(false)} notificationOpen={false} /></div>

        <footer
          className="font-montserrat sticky bottom-0 z-10 px-16 py-3"
          style={{ backgroundColor: "#333", borderRight: "8px solid #50B848" }}
        >
          <p className="text-right text-white" style={{ fontSize: "18px" }}>
            You could save a total of{" "}
            <span className="font-extrabold" style={{ fontSize: "20px" }}>
              R{numberWithSpaces(totalSavings)}
            </span>{" "}
            per month
          </p>
        </footer>
      </div>
    </>
  );
};

export default PayYourselfFirst;
