import { useState } from "react";

import EducationIcon from "/public/education-icon.svg";
import GoalIcon from "/public/goal-icon.svg";
import RetirementIcon from "/public/retirement-icon.svg";

const SavingType = ({ onSavingChange }) => {
  const [savingsType, setSavingsType] = useState();

  const handleSavingsType = (value) => {
    setSavingsType(value);
    onSavingChange(value);
  };

  return (
    <section id="SavingType" className="py-20 pb-[40px]">
      <h2 className="text-4xl text-grey mb-[30px]">
        What do you want to save towards?
      </h2>
      <div className="flex space-x-10">
        <div
          className="flex flex-col items-center justify-center bg-[#F7F7F7] py-11 px-16  w-1/3 cursor-pointer"
          onClick={() => handleSavingsType("Retirement")}
        >
          <img
            className="w-[63px] mb-[30px]"
            src={RetirementIcon.src}
            alt="Retirement"
          />
          <h3 className="text-2xl text-grey mb-4">Retirement</h3>
          {savingsType === "Retirement" ? (
            <div className="bg-white border border-[#DDDDDD] rounded-full w-8 h-8">
              <div className="border-white border-4 rounded-full w-full h-full bg-gradient-to-r from-[#009677] to-[#60B849]"></div>
            </div>
          ) : (
            <div className="bg-white border border-[#DDDDDD] rounded-full w-8 h-8 "></div>
          )}
        </div>
        <div
          className="flex flex-col items-center justify-center bg-[#F7F7F7] py-11 px-16  w-1/3  cursor-pointer"
          onClick={() => handleSavingsType("Education")}
        >
          <img
            className="w-[66px] mb-[30px]"
            src={EducationIcon.src}
            alt="Education"
          />
          <h3 className="text-2xl text-grey mb-4">Education</h3>
          {savingsType === "Education" ? (
            <div className="bg-white border border-[#DDDDDD] rounded-full w-8 h-8">
              <div className="border-white border-4 rounded-full w-full h-full bg-gradient-to-r from-[#009677] to-[#60B849]"></div>
            </div>
          ) : (
            <div className="bg-white border border-[#DDDDDD] rounded-full w-8 h-8"></div>
          )}
        </div>
        <div
          id="final_savings_otion"
          className="flex flex-col items-center justify-center bg-[#F7F7F7] py-11 px-16 w-1/3 cursor-pointer"
          onClick={() => handleSavingsType("A Goal")}
        >
          <img className="w-[68px] mb-[30px]" src={GoalIcon.src} alt="A Goal" />
          <h3 className="text-2xl text-grey mb-4">A Goal</h3>
          {savingsType === "A Goal" ? (
            <div className="bg-white border border-[#DDDDDD] rounded-full w-8 h-8">
              <div className="border-white border-4 rounded-full w-full h-full bg-gradient-to-r from-[#009677] to-[#60B849]"></div>
            </div>
          ) : (
            <div className="bg-white border border-[#DDDDDD] rounded-full w-8 h-8"></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SavingType;
