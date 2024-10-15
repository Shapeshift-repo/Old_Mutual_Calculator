'use client';

import React, { useState } from "react";
import Banner from "./Banner";
import Heading from "./Heading";
import Slider from "@mui/material/Slider";
import { alpha, styled } from '@mui/material/styles';
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from "./Button";
import VideoCard from "./VideoCard";
import StepButton from "./StepButton";
import ColorCard from "./ColorCard";
import NumberPlate from "./NumberPlate";

const PrimarySlider = styled(Slider)(({ theme }) => ({
    '& .MuiSlider-thumb': {
        height: 29,
        width: 29,
        backgroundColor: '#009677',
        border: '3px solid white',
        boxShadow: '2px 2px 5px 0 rgba(00, 00, 00, .25)',
        '&:hover, &:focus': {
        boxShadow: '0px 0px 0px 8px rgba(0, 150, 119, 0.16)',
        },
    },
    '& .MuiSlider-track': {
        background: 'linear-gradient(to right, #009677, #50B848)',
        height: '4px',
        border: 0,
        boxShadow: '0 0 7px 0 #8DC63F',
    },
    '& .MuiSlider-rail': {
        backgroundColor: '#D9D9D9',
        height: '4px',
        opacity: 1,
    },
    '& .MuiSlider-valueLabel': {
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: '20px',
        lineHeight: '25px',
        fontWeight: '500',
    },
}));

export default function RetirementAnnuityForm() {

    const toggleSideForm = () => {
        const element = document.querySelector('#sideform');
        if (element.classList.contains('active')) {
          element.classList.remove('active');
        } else {
          element.classList.add('active');
        }
    };

    const [formData, setFormData] = useState({
        grossIncome: "",
        contribution: "",
        investment: "",
        monthlyInvest: "",
        saving: "",
        monthly: ""
    });

    const [errors, setErrors] = useState({
        grossIncome: "",
        contribution: "",
        investment: "",
        monthlyInvest: "",
        saving: "",
        monthly: ""
    });

    const [choice, setChoice] = React.useState('no');

    const handleChoice = (event, newChoice) => {
        setChoice(newChoice);
    };

    const [value, setValue] = useState(45);

    const handleSlideChange = (event, newValue) => {
        setValue(newValue);
    };

    function valuetext(value) {
        return `${value}`;
    }
      
    const minDistance = 5;

    const [value1, setValue1] = React.useState([25, 55]);

    const handleSlide2Change = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            // If the minimum value changes, decrease LumpSum based on the new value
            const minValue = Math.min(newValue[0], value1[1] - minDistance);
            setValue1([minValue, value1[1]]);
            
            // Example: Decrease LumpSum based on the minimum slider value
            const decreasedLumpSum = 250000 - minValue - 5000; // Decrease LumpSum as min value goes down
            const updatedLumpSum = Math.max(decreasedLumpSum, 0); // Ensure LumpSum doesn't go negative

            // Update investment details with the new LumpSum
            setInvestmentDetails(prevDetails => ({
                ...prevDetails,
                LumpSum: updatedLumpSum
            }));
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };

    const handleChange = (event, cleanValue) => {
        const { name, value, error } = event.target;
        setFormData({
            ...formData,
            [name]: cleanValue || value // Update with cleaned or raw value
        });
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error || ""  // Update errors state
        }));
    };

    // Check if form is valid (i.e., no required field is empty and no errors)
    const isFormValid = () => {
        const { grossIncome, monthlyInvest } = formData;
        return grossIncome && monthlyInvest && !errors.monthlyInvest;
    };

    const [investmentDetails, setInvestmentDetails] = useState({
        taxBack: 0,
        totalInvestment: 0,
        yourInvestment: 0,
        contributionsPaid: 0,
        contributionsPaid: 0,
        LumpSum: 0
    });

    // On submit
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isFormValid()) {
            // Clean the values by removing non-numeric characters
            let { grossIncome, monthlyInvest } = formData;
    
            grossIncome = parseFloat(grossIncome.replace(/[^\d]/g, '')); 
            monthlyInvest = parseFloat(monthlyInvest.replace(/[^\d]/g, ''));
    
            // Ensure values are valid
            if (isNaN(grossIncome) || isNaN(monthlyInvest)) return;
    
            // Calculate the tax back as 27.5% of the applicable investment
            const taxBack = 111600;

            const totalInvestment = 820000;

            const yourInvestment = 467000;

            const contributionsPaid = 360000;

            // Calculate the final sum as the investment minus the tax back
            const LumpSum = 250000;
    
            // Update the investmentDetails state
            setInvestmentDetails({
                taxBack,
                totalInvestment,
                yourInvestment,
                contributionsPaid,
                LumpSum
            });
    
            // Scroll to the output section
            const outputElement = document.getElementById('form-output');
            if (outputElement) {
                outputElement.classList.remove('hidden');
                outputElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };   
    
    const formatNumberWithSpaces = (number) => {
        return new Intl.NumberFormat('en-US', {
            useGrouping: true,
            minimumFractionDigits: 0,
        }).format(number).replace(/,/g, ' ');  // Replace commas with spaces
    };

    const contributionOptions = [
        { value: '3', label: 'Inflation plus 3%-4%' },
        { value: '4', label: 'Inflation plus 4%-5%' },
        { value: '5', label: 'Inflation plus 5%-6%' },
    ];

    const linkIcon = (
        <svg width="15" height="29" viewBox="0 0 15 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2908 20C14.1034 19.8137 13.85 19.7092 13.5858 19.7092C13.3216 19.7092 13.0682 19.8137 12.8808 20L8.24079 24.56V1C8.24079 0.734784 8.13544 0.48043 7.9479 0.292893C7.76036 0.105357 7.50601 0 7.24079 0C6.97558 0 6.72122 0.105357 6.53369 0.292893C6.34615 0.48043 6.24079 0.734784 6.24079 1V24.53L1.71079 20C1.61783 19.9063 1.50723 19.8319 1.38537 19.7811C1.26351 19.7303 1.1328 19.7042 1.00079 19.7042C0.868781 19.7042 0.738075 19.7303 0.616216 19.7811C0.494356 19.8319 0.383755 19.9063 0.290792 20C0.104542 20.1874 0 20.4408 0 20.705C0 20.9692 0.104542 21.2226 0.290792 21.41L6.66079 27.78C6.82946 27.9479 7.05778 28.0422 7.29579 28.0422C7.5338 28.0422 7.76213 27.9479 7.93079 27.78L14.2908 21.41C14.477 21.2226 14.5816 20.9692 14.5816 20.705C14.5816 20.4408 14.477 20.1874 14.2908 20Z" fill="white"/>
        </svg>
    );

    return (
        <section className="tax-back-section pt-0 lg:pt-[118px] pb-[100px]">
            <div className="container px-0 lg:px-[15px]">
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-[150px] items-start">
                    <div className="w-full relative">
                        <div className="relative lg:absolute top-0 lg:top-[-230px] left-0 w-full">
                            <Banner 
                                id="main-banner"
                                heading="RETIREMENT ANNUITY"
                                subHeading="CALCULATOR"
                                content="See how your money will grow over time with the power of compound growth."
                                image="/images/banner2-img-desktop.jpg"
                                mobileImage="/images/banner2-img-mobile.jpg"
                                icon=""
                                link="#calculator-form"
                                linkIcon={linkIcon}
                                linkIconClasses="block md:hidden"
                                className="rounded-bl-[62px] rounded-br-[62px] lg:rounded-bl-[62px] lg:rounded-br-[62px] min-h-[880px]"
                            />
                        </div>
                    </div>
                    <div id="calculator-form" className="w-full relative">
                        <form className="relative mt-[-110px] pt-[30px] pb-[48px] lg:pb-0 lg:pt-0 lg:mt-0 bg-white px-[34px] lg:px-0 rounded-[64px] lg:rounded-0 z-10 lg:z-2 shadow-[0_4px_29px_0_rgba(0,0,0,0.24)] lg:shadow-none">
                            <div className="flex justify-center mb-[60px] block lg:hidden">
                                <span className="w-[66px] h-[7px] rounded-[4px] bg-[#028F72]"></span>
                            </div>
                            <div className="form-field-holder max-w-[570px]">
                                <Heading 
                                    content="See how your money will grow over time with the power of compound growth."
                                    className="text-[24px] leading-[28px] hidden lg:flex font-normal pb-[60px] text-[#1E1E1E] pr-[20px]" 
                                    tag="h3"
                                />
                                <div className="flex justify-between items-center">
                                    <label>Age</label>
                                    <span>{value}</span>
                                </div>

                                <PrimarySlider 
                                    aria-label="Age" 
                                    min={18} 
                                    max={65} 
                                    value={value} 
                                    defaultValue={45} 
                                    onChange={handleSlideChange} 
                                />
                                
                                <TextInput 
                                    label="Gross income per month" 
                                    required 
                                    className="mt-[28px]" 
                                    onlyNumber={true} 
                                    currencySign="R" 
                                    value={formData.grossIncome} 
                                    onChange={handleChange}
                                    name="grossIncome"
                                />
                                
                                <TextInput 
                                    label="Monthly contribution you can afford" 
                                    required 
                                    className="mt-[28px]" 
                                    onlyNumber={true} 
                                    currencySign="R" 
                                    value={formData.contribution} 
                                    onChange={handleChange}
                                    name="contribution"
                                />

                                <SelectInput
                                    label="Investment strategy"
                                    required
                                    className="mt-[28px]" 
                                    value={formData.investment}
                                    onChange={handleChange}
                                    name="investment"
                                    options={contributionOptions}
                                />

                                <label className="mt-[20px] mb-[15px] text-[20px] leading-[25px] font-light block">Do you have any current retirement savings?</label>
                                <ToggleButtonGroup
                                    value={choice}
                                    exclusive
                                    onChange={handleChoice}
                                    aria-label="Retirement savings"
                                    sx={{
                                        width: '100%', // Full width
                                        backgroundColor: '#ECECEC', // Background color
                                        borderRadius: '30px', // Rounded corners
                                    }}
                                >
                                    <ToggleButton
                                        value="no"
                                        aria-label="no"
                                        sx={{
                                        width: '50%', // Half width for each button
                                        height: '44px', // Set height
                                        backgroundColor: '#ECECEC', // Button background
                                        borderRadius: '30px', // Rounded corners
                                        border: 0, // Remove border
                                        color: '#ACACAC', // Text color
                                        fontSize: '20px', // Font size
                                        fontWeight: '400', // Font weight
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            backgroundColor: '#ECECEC', // Hover background
                                        },
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundImage: 'linear-gradient(to right, #009677, #50B848)', // Gradient background for selected
                                            color: 'white', // White text when selected
                                            borderRadius: '30px',
                                        },
                                        }}
                                    >
                                        No
                                    </ToggleButton>

                                    <ToggleButton
                                        value="yes"
                                        aria-label="yes"
                                        sx={{
                                        width: '50%',
                                        height: '44px',
                                        backgroundColor: '#ECECEC',
                                        borderRadius: '30px',
                                        border: 0,
                                        color: '#ACACAC',
                                        fontSize: '20px',
                                        fontWeight: '400',
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            backgroundColor: '#ECECEC',
                                        },
                                        '&.Mui-selected, &.Mui-selected:hover': {
                                            backgroundImage: 'linear-gradient(to right, #009677, #50B848)',
                                            color: 'white',
                                            borderRadius: '30px',
                                        },
                                        }}
                                    >
                                        Yes
                                    </ToggleButton>
                                </ToggleButtonGroup>

                                {choice === "yes" && (
                                    <div id="hidden-fields">
                                    <TextInput 
                                        label="Your retirement savings to date"
                                        required 
                                        className="mt-[28px]"
                                        value={formData.saving} 
                                        onChange={handleChange} 
                                        onlyNumber={true} 
                                        currencySign="R" 
                                        name="saving"
                                    />
                                    <TextInput 
                                        label="Your monthly retirement contribution"
                                        required 
                                        className="mt-[28px]"
                                        value={formData.monthly} 
                                        onChange={handleChange} 
                                        onlyNumber={true} 
                                        currencySign="R" 
                                        name="monthly"
                                    />
                                    </div>
                                )}

                                <div className="flex justify-center">
                                    <Button
                                        label="CALCULATE"
                                        onClick={handleSubmit}
                                        disabled={!isFormValid()}
                                        className="text-white mt-[30px]"
                                        tooltipText={errors.monthlyInvest}  // Set error tooltip dynamically
                                    />
                                </div>
                                
                            </div>
                        </form>

                        <div id="form-output" className="form-output hidden relative mt-0 lg:mt-[90px] z-[1]">

                            <ColorCard 
                                heading={`R${formatNumberWithSpaces(investmentDetails.taxBack)}`}
                                content="<p>Total TAX BACK over the term</p>" 
                                className="mt-[-200px] lg:mt-0 pt-[236px] lg:pt-[50px] rounded-[64px] lg:rounded-0" 
                            />

                            <div className="flex flex-col justify-end items-end gap-[100px] graph-holder relative mt-[64px] px-[17px] lg:px-0">

                                <div className="graph-line absolute bottom-[-75px] left-[15px] z-0">
                                    <svg
                                        width="703"
                                        height="459"
                                        viewBox="0 0 703 459"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            class="animated-line"
                                            d="M2 457C151.627 437.403 500.905 318.966 701 2"
                                            stroke="#009677"
                                            stroke-width="3.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>

                                </div>

                                <div className="graph-line absolute bottom-[-46px] left-[15px] z-0">
                                    <svg
                                        width="703"
                                        height="163"
                                        viewBox="0 0 703 163"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            class="animated-line"
                                            d="M2 161C151.627 154.152 500.905 112.764 701 2"
                                            stroke="#00C0E8"
                                            stroke-width="3.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>

                                </div>

                                <NumberPlate heading={`R${formatNumberWithSpaces(investmentDetails.totalInvestment)}`} content="Total investment value" dot={true} />

                                <NumberPlate heading={`R${formatNumberWithSpaces(investmentDetails.yourInvestment)}`} content="Your investment growth" colorCode="#ED0080" />

                                <div className="flex justify-between w-full">
                                    <NumberPlate heading={`R${formatNumberWithSpaces(investmentDetails.LumpSum)}`} content="Lump sum" colorCode="#000000" className="simple-plate" />
                                    <NumberPlate heading={`R${formatNumberWithSpaces(investmentDetails.contributionsPaid)}`} content="Total contributions paid" colorCode="#00C0E8" className="custom-blue" />
                                </div>

                            </div>

                            <div className="multi-range-holder relative mx-[17px] lg:mx-0 w-[calc(100%-34px)] lg:w-full min-h-[235px] lg:min-h-[185px] mt-[35px] pt-[77px] px-[35px] bg-[#F0F0F0] rounded-[20px]">
                                
                                <div className="absolute top-0 left-0 flex justify-center w-full">
                                    <span 
                                        className="inline-block py-[4px] px-[18px] rounded-bl-[8px] rounded-br-[8px] text-[20px] leading-[25px] font-normal text-white"
                                        style={{ background: 'linear-gradient(9.55deg, #009677 0%, #50B848 100%)' }}
                                    >Age</span>
                                </div>

                                <PrimarySlider
                                    getAriaLabel={() => 'Age'}
                                    value={value1}
                                    min={25} 
                                    max={65}
                                    onChange={handleSlide2Change}
                                    valueLabelDisplay="on"
                                    getAriaValueText={valuetext}
                                    disableSwap
                                />

                                <div 
                                    className="after-range absolute z-10 bottom-0 left-0 w-full py-[14px] px-[19px] lg:px-[50px] text-white text-[14px] lg:text-[16px] leading-[17px] font-normal rounded-bl-[20px] rounded-br-[20px]"
                                    style={{ background: 'linear-gradient(272.22deg, #ED0080 26.63%, #F37021 80.57%)' }}
                                >
                                    <div className="absolute top-[-6px] left-[34px] transform -translate-x-1/2 w-3 h-3 bg-[#F47122] rotate-45"></div>
                                    <p>Move the orange slider to see the negative impact on <br className="hidden lg:block"></br>your investment if you start saving later.</p>
                                </div>
           
                                <div className="section-shadow absolute left-[-15px] bottom-[15px] w-[calc(100%+30px)] h-[46px]">            
                                    
                                    <svg className="w-full" width="759" height="115" viewBox="0 0 759 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.6" filter="url(#filter0_f_1_53148)">
                                        <path d="M85.2636 79.7444C276.705 66.22 559.554 74.1092 677.049 79.7444C740.001 88.0977 727.712 52.7287 713.699 34H49.6918C32.0855 51.4028 14.5511 84.9155 85.2636 79.7444Z" fill="url(#paint0_linear_1_53148)"/>
                                        </g>
                                        <defs>
                                        <filter id="filter0_f_1_53148" x="0" y="0" width="759" height="115" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                        <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1_53148"/>
                                        </filter>
                                        <linearGradient id="paint0_linear_1_53148" x1="725" y1="57.5" x2="34" y2="57.5" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#ED0080"/>
                                        <stop offset="1" stop-color="#F37021"/>
                                        </linearGradient>
                                        </defs>
                                    </svg>

                                </div>

                            </div>
                            
                                <div className="generate-report bg-transparent rounded-[15px] pt-[90px] pb-[54px] px-[15px]">
                                    
                                    <div className="flex flex-col items-center gap-[20px] justify-center mt-[35px]">
                                        <Button label="GENERATE REPORT" className="text-primary w-full max-w-[310px] border border-primary bg-transparent from-transparent to-transparent" />
                                        <Button label="CALL ME BACK" onClick={toggleSideForm} className="text-white w-full max-w-[310px]" />
                                    </div>

                                </div>

                                <VideoCard heading="Tax back explained" image="/images/video-thumb.jpg" videoID="L61p2uyiMSo" className="mt-[60px]"/>

                                <StepButton heading="NEXT STEP" content="See what income your savings will give you in retirement." link="/retirement-income" className="mt-[60px]" />

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}