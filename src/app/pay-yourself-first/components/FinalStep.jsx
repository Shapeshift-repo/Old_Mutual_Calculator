import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
//import GeneratePDF from "./GeneratePDF";
import OMLineChart from "./Graph";
import RangeSlider from "./RangeSlider";
import ToolTip from "/public/images/tooltip.svg";

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const FinalStep = ({
  totalSavings,
  type,
  food,
  energy,
  fuel,
  entertainment,
  sections,
}) => {
  const DEFAULT_TERM_YEARS = 10;
  const CPI1 = 100.52617;
  const CPI2 = 100.60449;
  const CPI3 = 100.68215;
  const CPI4 = 100.75915;
  const CPI5 = 100.87346;
  const CPI6 = 101.02368;

  const [strategyValue, setStrategyValue] = useState(CPI1);
  const [months, setMonths] = useState(DEFAULT_TERM_YEARS * 12);
  const [savingsObject, setSavingsObject] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSavings, setSelectedSavings] = useState(totalSavings);
  const originalSavings = totalSavings;

  const savingCalculation = () => {
    let savingObject = [];
    let saving = 0;
    let increment = selectedSavings; //amount to save is incremented each year

    for (let i = 1; i <= months; i++) {
      //Save first value just for graph display at 1 year
      if (i === 1) {
        savingObject.push({ value: saving });
      }
      //Saving at each year
      if (i % 12 === 0) {
        savingObject.push({
          value: Math.round((saving + increment) * (strategyValue / 100)),
        });
      }
      //increment saved amount
      saving = parseFloat(
        ((saving + increment) * (strategyValue / 100)).toFixed(7)
      );

      //increment amount to save by 6% each year
      if (i % 12 === 0) {
        increment = increment + increment * 0.06;
      }

      setSavingsObject(savingObject);
    }
  };

  const handleFormDisplay = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    savingCalculation();
  }, [selectedSavings, months, strategyValue]);

  return (
    <div className="py-20 border-t border-[#DDDDDD] ">
      <div className="final_container flex mt-9">
        <div className="final_graph_container w-3/5 mr-20">
          <div className="pb-10">
            <p className="text-2xl text-brandGreen mb-2 font-montserrat font-semibold">
              Your potential savings invested over time
            </p>
            <p className="text-base text-grey font-light">
              Use the slider below the graph to choose how long you want to save.
            </p>
          </div>
          <div className="w-full mb-10 ">
            <OMLineChart data={savingsObject} />
          </div>
          <RangeSlider
            onUpdate={(value) => setMonths(value * 12)}
            defaultValue={DEFAULT_TERM_YEARS}
            min={1}
            max={30}
            theme="green"
            symbol="years"
            budget={30}
          />
        </div>
        {showForm ? (
          <GeneratePDF
            amount={selectedSavings}
            originalAmount={originalSavings}
            type={type}
            months={months}
            food={food}
            energy={energy}
            fuel={fuel}
            entertainment={entertainment}
            saved={savingsObject[savingsObject.length - 1].value}
            strategy={strategyValue}
            sections={sections}
          />
        ) : (
          <div className="mw=2/5 pt-7">
            <div className="pb-7 text-base font-light">
              Select your preferred Investment Strategy
			  <div className={`inline-block ml-1 relative group/tooltip top-1 z-10 `}>
					<img src={ToolTip.src} className="cursor-pointer " alt="" />
					<div className="p-5 bg-[#F7F7F7] top-5 right-5 rounded-lg shadow-xl absolute w-[300px] hidden group-hover/tooltip:block">
						<p className="text-sm font-light">
						Your investment strategy determines how much above inflation you would like your investment to grow. Inflation is currently 5%. The higher the investment strategy, the higher your investment risk.
						</p>
					</div>
					
				</div>
            </div>
            <Select
              value={strategyValue}
              onChange={(e) => {
                setStrategyValue(e.target.value);
              }}
              variant="standard"
              disableUnderline
              sx={{
                border: "none",
                borderRadius: 0,
                background: "#FFF",
                width: "100%",
                color: "#159677",
                "& .MuiSelect-select": {
                  paddingRight: "30px !important",
                  padding: "15px 30px 15px 20px",
                },
                "& .MuiSvgIcon-root": {
                  marginRight: "10px",
                },
                marginBottom:0
              }}
            >
              <MenuItem value={CPI1}>Inflation + 1% - 2%</MenuItem>
              <MenuItem value={CPI2}>Inflation + 2% - 3%</MenuItem>
              <MenuItem value={CPI3}>Inflation + 3% - 4%</MenuItem>
              <MenuItem value={CPI4}>Inflation + 4% - 5%</MenuItem>
              <MenuItem value={CPI5}>Inflation + 5% - 7%</MenuItem>
              <MenuItem value={CPI6}>Inflation + 7% - 9%</MenuItem>
            </Select>
            <div className="title-gradient w-full h-1 bg-gradient-to-r from-[rgba(233,21,130,1)] to-[rgba(54,136,231,1)]"></div>
            <div className="bg-white shadow-lg pt-0 pb-10 mt-0">
              <p className="text-sm text-grey px-5 pt-5 max-w-xs">
                Select how much of your savings you want to invest
              </p>
              <Select
                value={selectedSavings}
                onChange={(e) => {
                  setSelectedSavings(e.target.value);
                }}
                variant="standard"
                disableUnderline
                sx={{
                  border: "none",
                  background: "#FFFFFF !important",
                  borderBottom: "solid 1px #EEE",
                  width:'100%',
                  borderRadius: '0',
                  color: "#282828",
                  fontWeight: "600",
                  fontSize: "20px",
                  "& .MuiSelect-select": {
                    paddingRight: "30px !important",
                    padding: "15px 30px 15px 20px",
                  },
                  "& .MuiSvgIcon-root": {
                    marginRight: "10px",
                  },
                }}
              >
                <MenuItem value={totalSavings}>
                  R {numberWithSpaces(totalSavings)}
                </MenuItem>
                <span className="block h-[1px] w-full bg-grey"></span>
                <MenuItem value={500}>R 500</MenuItem>
                <MenuItem value={1000}>R 1 000</MenuItem>
                <MenuItem value={1500}>R 1 500</MenuItem>
                <MenuItem value={2000}>R 2 000</MenuItem>
                <MenuItem value={2500}>R 2 500</MenuItem>
                <MenuItem value={3000}>R 3 000</MenuItem>
                <MenuItem value={3500}>R 3 500</MenuItem>
                <MenuItem value={3500}>R 3 500</MenuItem>
                <MenuItem value={4000}>R 4 000</MenuItem>
                <MenuItem value={4500}>R 4 500</MenuItem>
                <MenuItem value={5000}>R 5 000</MenuItem>
              </Select>
              <p className="text-xl text-brandGreen font-light pt-5 px-5">
                {months / 12}
                {months / 12 === 1 ? " YEAR" : " YEARS"}
              </p>

              <SavedTotal object={savingsObject} />

              <p className="text-xl text-brandGreen font-light px-5">
                Towards my savings for
              </p>
              <p className="text-[44px] leading-[44px] text-brandGreen font-bold px-5">
                {type}
              </p>
            </div>
            <p className="text-center text-bas text-grey font-semibold mt-7">
              Today is the day to start saving.
            </p>
            <div className="flex justify-center mt-7">
              <button
                onClick={handleFormDisplay}
                className="text-base w-full text-center font-semibold tracking-[0.4px] items-center bg-gradient-to-r from-[#009677] to-[#50B848] rounded-full px-11 py-4 text-white"
              >
                YOUR REPORT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SavedTotal = ({ object }) => {
  return (
    <p className="text-brandGreen text-[44px] leading-[44px] font-bold px-5 py-0">
      R{object.length > 0 && numberWithSpaces(object[object.length - 1].value)}
    </p>
  );
};

export default FinalStep;
