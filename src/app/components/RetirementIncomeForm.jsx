'use client';

import React, { useState } from "react";
import Link from "next/link";
import Banner from "./Banner";
import Heading from "./Heading";
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import TextInput from "./TextInput";
import Button from "./Button";
import VideoCard from "./VideoCard";
import StepButton from "./StepButton";
import ProgressBar from "./ProgressBar";
import ColorCard from "./ColorCard";

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

    const [result, setResult] = useState(null);

    const [formData, setFormData] = useState({
        monthlyInvest: ""
    });

    const [errors, setErrors] = useState({
        monthlyInvest: ""
    });

    const [value, setValue] = useState(45);

    const handleSlideChange = (event, newValue) => {
        setValue(newValue);
    };

    const min = '2.5';
    const max = '8';

    function valuetext(value) {
        return `${value}%`;
    }

    const [value2, setValue2] = useState(4.5);

    const handleSlide2Change = (event, newValue) => {
        setValue2(newValue);
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
        const { monthlyInvest } = formData;
        return monthlyInvest && !errors.monthlyInvest;
    };

    const roundDownThousand = value => Math.floor(value / 1000) * 1000;

    const calculateRoundedValue = (G45, P50, E52) => Math.round(((G45 + P50) / E52) / 12);

    const calculateInvestmentAndTax = (formData) => {
        
        // Clean the values by removing non-numeric characters
        let { monthlyInvest } = formData;

        monthlyInvest = parseFloat((monthlyInvest || '').replace(/[^\d]/g, '')) || 0;

        let G45 = monthlyInvest;

        let E64 = value2 / 100;

        let E52 = roundDownThousand((G45 * E64) / 12);
        
        let J64 = .5;

        let P47 = -0.01;

        let P50 = G45*P47*(1-E64)/E64;
        
        let P53 = calculateRoundedValue(G45, P50, E52);

        let P56 = P53 / J64;

        let P48 = 0.03;

        let P51 = (G45 * P48 * (1 - E64)) / E64;

        let P54 = Math.round(((G45 + P51) / E52) / 12);

        let P57 = P54 / J64;

        return { E52, P53, P54 };

    }

    // On submit
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isFormValid()) {
            // Clean the values by removing non-numeric characters
            let { monthlyInvest } = formData;
    
            monthlyInvest = parseFloat(monthlyInvest.replace(/[^\d]/g, ''));
    
            // Ensure values are valid
            if (isNaN(monthlyInvest)) return;
           
            const result = calculateInvestmentAndTax(formData);
            
            setResult(result);
    
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
                                heading="RETIREMENT INCOME"
                                subHeading="CALCULATOR"
                                content="See what monthly income you could get during retirement from a Living Annuity"
                                image="/images/banner3-img-desktop.jpg"
                                mobileImage="/images/banner3-img-mobile.jpg"
                                icon=""
                                link="#calculator-form"
                                linkIcon={linkIcon}
                                linkIconClasses="block md:hidden"
                                className="third-banner rounded-bl-[62px] rounded-br-[62px] lg:rounded-bl-[62px] lg:rounded-br-[62px] custom-shadow"
                                gradient="linear-gradient(0deg, #009677 24.3%, rgba(0, 150, 119, 0) 91.96%)"
                            />
                        </div>
                    </div>
                    <div id="calculator-form" className="w-full relative">
                        <form className="mt-[155px] lg:mt-0 px-[34px] lg:px-0">

                            <div className="form-field-holder max-w-[570px]">
                                <Heading 
                                    content="See what monthly income you could get during retirement from a Living Annuity"
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
                                    label="Your total investment at retirement"
                                    required 
                                    className="mt-[28px]"
                                    value={formData.monthlyInvest} 
                                    onChange={handleChange} 
                                    onlyNumber={true} 
                                    currencySign="R" 
                                    name="monthlyInvest"
                                />

                                <p className="text-[14px] leading-[19px] text-[#50B848] font-normal">
                                    Not sure about this amount? Go to the &nbsp;
                                    <Link className="link underline" href="/retirement-annuity">                    
                                        Retirement annuity calculator
                                    </Link>
                                </p>

                                <div className="flex justify-center">
                                    <Button
                                        label="CALCULATE"
                                        onClick={handleSubmit}
                                        disabled={!isFormValid()}
                                        className="text-white mt-[68px]"
                                    />
                                </div>
                                
                            </div>
                        </form>

                        <div id="form-output" className="form-output hidden relative">
                            
                            <div className="output-holder relative z-10 mt-[169px] lg:mt-[209px]">

                                <div className="estimate-box">
                                    <div 
                                        className="estimate-head relative py-[44px] px-[15px] rounded-tl-[62px] rounded-tr-[62px] lg:rounded-tl-[20px] lg:rounded-tr-[20px] shadow-[0_4px_29px_0_rgba(0,0,0,0.25)] lg:shadow-none"
                                        style={{ background: 'linear-gradient(98.34deg, #009677 4.08%, #50B848 100%)' }}
                                    >
                                        <p className="text-[22px] leading-[19px] font-light text-white text-center w-full">Estimated monthly income</p>
                                        <Heading 
                                            content={`R${result ? formatNumberWithSpaces(result.E52) : ''}`}
                                            className="text-[47px] leading-[26px] font-semibold pt-[15px] text-white text-center w-full" 
                                            tag="h5"
                                        />
                                    </div>
                                    <div className="estimate-body pt-[55px] pb-[48px] px-[34px] lg:px-[75px] bg-[#F0F0F0]">
                                        <Heading 
                                            content="Your income will last"
                                            className="text-[20px] leading-[19px] font-medium text-primary w-full" 
                                            tag="h5"
                                        />
                                        
                                        <ProgressBar 
                                            label="10 Years" 
                                            hint={`Poor markets (${result ? formatNumberWithSpaces(result.P53) : 0}% growth)`}
                                            progress={`${result ? result.P53 : 0}`}
                                            labelClasses="mt-[42px] from-[#ED0080] to-[#F37021]" 
                                            trackClasses=""
                                            progressClasses="from-[#ED0080] to-[#F37021]"
                                            hintClasses = ""
                                        />

                                        <ProgressBar 
                                            label="25 Years" 
                                            hint={`Average markets (${result ? formatNumberWithSpaces(result.P54) : 0}% growth)`}
                                            progress={`${result ? result.P54 : 0}`}
                                            labelClasses="mt-[37px]" 
                                            trackClasses=""
                                            progressClasses=""
                                            hintClasses = ""
                                        />

                                    </div>
                                    <div className="estimate-footer pt-[35px] pb-[69px] px-[34px] lg:px-[75px] bg-[#E9E9E9] rounded-bl-[62px] rounded-br-[62px] lg:rounded-bl-[20px] lg:rounded-br-[20px]">
                                        <Heading 
                                            content="Adjust your drawdown rate"
                                            className="text-[20px] leading-[25px] mb-[44px] font-light text-black w-full" 
                                            tag="h5"
                                        />

                                        <PrimarySlider 
                                            aria-label="Rate" 
                                            min={min} 
                                            max={max} 
                                            value={value2} 
                                            defaultValue={4.5} 
                                            getAriaValueText={valuetext}
                                            onChange={handleSlide2Change} 
                                            valueLabelDisplay="on"
                                        />
                                        
                                        <label className="flex justify-between w-full mt-[11px] text-[17px] leading-[25px] text-[#6E6E6E] font-light">
                                            <span>{min}%</span>
                                            <span>{max}%</span>
                                        </label>

                                    </div>
                                </div>

                                <div className="container px-[34px] lg:px-0">
                                    <ColorCard 
                                        heading="" 
                                        content={`
                                            <p>There are other annuities to consider such as a <strong>Guaranteed Annuity</strong> and a <strong>Composite Annuity</strong>.</p>
                                            <p>There are other annuities to consider such as a <strong>Guaranteed Annuity</strong> and a <strong>Composite Annuity</strong>.</p>
                                            <p>There are other annuities to consider such as a <strong>Guaranteed Annuity</strong> and a <strong>Composite Annuity</strong>.</p>
                                        `}
                                        className="rounded-[15px] px-[25px] lg:px-[65px] py-[45px] lg:py-[60px] mt-[78px] [&>div>div>div>div>p]:mb-[32px]" 
                                        showShadow={false} 
                                    />
                                </div>

                                <div className="generate-report bg-transparent rounded-[15px] pt-[90px] pb-[54px] px-[15px]">
                                    
                                    <div className="flex flex-col items-center gap-[20px] justify-center mt-[35px]">
                                        <Button label="GENERATE REPORT" className="text-primary w-full max-w-[310px] border border-primary bg-transparent from-transparent to-transparent" />
                                        <Button label="CALL ME BACK" onClick={toggleSideForm} className="text-white w-full max-w-[310px]" />
                                    </div>

                                </div>

                                <VideoCard heading="Tax back explained" image="/images/video-thumb.jpg" videoID="L61p2uyiMSo" className="mt-[60px]"/>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}