'use client';

import React, { useState } from "react";
import Image from 'next/image';
import Banner from "./Banner";
import Heading from "./Heading";
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import TextInput from "./TextInput";
import Button from "./Button";
import VideoCard from "./VideoCard";
import StepButton from "./StepButton";
import { colors } from "@mui/material";

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

export default function TaxBackForm() {

    const [formData, setFormData] = useState({
        grossIncome: "",
        monthlyInvest: ""
    });

    const [errors, setErrors] = useState({
        grossIncome: "",
        monthlyInvest: ""
    });

    const [value, setValue] = useState(45);

    const handleSlideChange = (event, newValue) => {
        setValue(newValue);
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
        monthlyInvest: 0,
        taxBack: 0,
        sum: 0
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
    
            // Calculate the maximum allowable tax deduction (27.5% of gross income)
            const maxTaxFreeContribution = grossIncome * 0.275;
    
            // The tax back is based on the smaller of monthlyInvest and maxTaxFreeContribution
            const applicableInvestment = Math.min(monthlyInvest, maxTaxFreeContribution);
    
            // Calculate the tax back as 27.5% of the applicable investment
            const taxBack = Math.round(applicableInvestment * 0.275);
            
            // Calculate the final sum as the investment minus the tax back
            const sum = Math.round(monthlyInvest - taxBack);
    
            // Update the investmentDetails state
            setInvestmentDetails({
                monthlyInvest,
                taxBack,
                sum
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

    const icon = (<svg width="54" height="43" viewBox="0 0 54 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.890625 8.90637C0.399 8.90637 0 8.50737 0 8.01575C0 7.52412 0.399 7.12512 0.890625 7.12512C26.5121 7.12512 41.9769 7.12512 46.4621 0.397342C46.6812 0.0695919 47.0873 -0.076471 47.4614 0.0393102C47.8355 0.151529 48.0938 0.497092 48.0938 0.890748V5.34387C48.0938 5.8355 47.6948 6.2345 47.2031 6.2345C46.7115 6.2345 46.3125 5.8355 46.3125 5.34387V3.25269C39.973 8.90637 24.7273 8.90637 0.890625 8.90637Z" fill="white"/>
                <path d="M23.1188 12.5719C19.9482 12.5719 16.5532 12.5469 12.9426 12.5238C9.10753 12.4971 5.07834 12.4686 0.890625 12.4686C0.399 12.4686 0 12.0696 0 11.5779C0 11.0863 0.399 10.6873 0.890625 10.6873C5.08369 10.6873 9.11644 10.7158 12.9533 10.7408C31.8203 10.8637 46.7204 10.9723 50.119 7.40091C50.372 7.13728 50.7585 7.05357 51.0952 7.18894C51.4336 7.32253 51.6562 7.65207 51.6562 8.01544V11.5779C51.6562 12.0696 51.2573 12.4686 50.7656 12.4686C50.274 12.4686 49.875 12.0696 49.875 11.5779V9.78244C45.5858 12.1658 36.3179 12.5719 23.1188 12.5719Z" fill="white"/>
                <path d="M0.890625 14.25C0.399 14.25 0 14.649 0 15.1406C0 15.6322 0.399 16.0312 0.890625 16.0312H51.6562V40.9688H0.890625C0.399 40.9688 0 41.3678 0 41.8594C0 42.351 0.399 42.75 0.890625 42.75H52.5469C53.0385 42.75 53.4375 42.351 53.4375 41.8594V15.1406C53.4375 14.649 53.0385 14.25 52.5469 14.25H0.890625Z" fill="white"/>
                <path d="M0 18.7012V41.8592C0 42.3508 0.399 42.7498 0.890625 42.7498C1.38225 42.7498 1.78125 42.3508 1.78125 41.8592V18.7012C1.78125 18.2095 1.38225 17.8105 0.890625 17.8105C0.399 17.8105 0 18.2095 0 18.7012Z" fill="white"/>
                <path d="M20.4844 39.1875H7.92478C7.49016 39.1875 7.11966 38.8722 7.04662 38.4447C6.783 36.8665 5.67328 35.5502 4.15388 35.0087C3.79941 34.884 3.5625 34.5491 3.5625 34.1715V22.8303C3.5625 22.4527 3.79941 22.1178 4.15388 21.9913C5.67506 21.4498 6.783 20.1335 7.04662 18.5553C7.11787 18.1278 7.49016 17.8125 7.92478 17.8125H20.4844C20.976 17.8125 21.375 18.2115 21.375 18.7031C21.375 19.1947 20.976 19.5938 20.4844 19.5938H8.63194C8.12963 21.2699 6.93619 22.6664 5.34375 23.4217V33.5766C6.93441 34.3336 8.12963 35.7301 8.63194 37.4062H20.4844C20.976 37.4062 21.375 37.8053 21.375 38.2969C21.375 38.7885 20.976 39.1875 20.4844 39.1875Z" fill="white"/>
                <path d="M32.9531 39.1875H45.5127C45.9473 39.1875 46.3178 38.8722 46.3909 38.4447C46.6545 36.8665 47.7642 35.5502 49.2836 35.0087C49.6381 34.884 49.875 34.5491 49.875 34.1715V22.8303C49.875 22.4527 49.6381 22.1178 49.2836 21.9913C47.7624 21.4498 46.6545 20.1335 46.3909 18.5553C46.3196 18.1278 45.9473 17.8125 45.5127 17.8125H32.9531C32.4615 17.8125 32.0625 18.2115 32.0625 18.7031C32.0625 19.1947 32.4615 19.5938 32.9531 19.5938H44.8056C45.3061 21.2699 46.5013 22.6664 48.0938 23.4217V33.5766C46.5031 34.3336 45.3079 35.7283 44.8056 37.4045H32.9531C32.4615 37.4045 32.0625 37.8035 32.0625 38.2951C32.0625 38.7867 32.4615 39.1875 32.9531 39.1875Z" fill="white"/>
                <path d="M22.3092 36.0008C22.1552 36.0008 22.0362 35.9588 21.9522 35.8748C21.8682 35.7768 21.8262 35.6578 21.8262 35.5178V21.8048C21.8262 21.6508 21.8682 21.5318 21.9522 21.4478C22.0362 21.3498 22.1552 21.3008 22.3092 21.3008H27.4332C29.0152 21.3008 30.2682 21.6718 31.1922 22.4138C32.1162 23.1558 32.5782 24.2548 32.5782 25.7108C32.5782 26.7888 32.3052 27.6708 31.7592 28.3568C31.2272 29.0288 30.4992 29.4978 29.5752 29.7638L32.8092 35.3498C32.8512 35.4338 32.8722 35.5108 32.8722 35.5808C32.8722 35.6928 32.8232 35.7908 32.7252 35.8748C32.6412 35.9588 32.5432 36.0008 32.4312 36.0008H31.4232C31.1852 36.0008 31.0102 35.9378 30.8982 35.8118C30.7862 35.6858 30.6882 35.5598 30.6042 35.4338L27.5592 30.0998H23.8842V35.5178C23.8842 35.6578 23.8352 35.7768 23.7372 35.8748C23.6532 35.9588 23.5342 36.0008 23.3802 36.0008H22.3092ZM23.8842 28.3148H27.3492C28.3992 28.3148 29.1832 28.0978 29.7012 27.6638C30.2192 27.2158 30.4782 26.5578 30.4782 25.6898C30.4782 24.8358 30.2192 24.1848 29.7012 23.7368C29.1972 23.2888 28.4132 23.0648 27.3492 23.0648H23.8842V28.3148Z" fill="white"/>
            </svg>);

    const linkIcon = (<svg width="86" height="86" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="43" cy="43" r="43" fill="white" fill-opacity="0.15"/>
                    <circle cx="43" cy="43" r="26" fill="white"/>
                    <path d="M49.2695 36.0217C49.0833 36.2091 48.9787 36.4625 48.9787 36.7267C48.9787 36.9909 49.0833 37.2443 49.2695 37.4317L53.8295 42.0717L30.2695 42.0717C30.0043 42.0717 29.75 42.1771 29.5624 42.3646C29.3749 42.5521 29.2695 42.8065 29.2695 43.0717C29.2695 43.3369 29.3749 43.5913 29.5624 43.7788C29.75 43.9664 30.0043 44.0717 30.2695 44.0717L53.7995 44.0717L49.2695 48.6017C49.1758 48.6947 49.1014 48.8053 49.0506 48.9271C48.9999 49.049 48.9737 49.1797 48.9737 49.3117C48.9737 49.4437 48.9999 49.5744 49.0506 49.6963C49.1014 49.8181 49.1758 49.9287 49.2695 50.0217C49.4569 50.208 49.7103 50.3125 49.9745 50.3125C50.2387 50.3125 50.4922 50.208 50.6795 50.0217L57.0495 43.6517C57.2175 43.483 57.3117 43.2547 57.3117 43.0167C57.3117 42.7787 57.2175 42.5504 57.0495 42.3817L50.6795 36.0217C50.4922 35.8355 50.2387 35.7309 49.9745 35.7309C49.7103 35.7309 49.4569 35.8355 49.2695 36.0217Z" fill="#009677"/>
                </svg>);

    return (
        <section className="tax-back-section pt-0 lg:pt-[118px] pb-[100px]">
            <div className="container px-0 lg:px-[15px]">
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-[150px] items-start">
                    <div className="w-full relative z-10">
                        <div className="relative lg:absolute top-0 lg:top-[-230px] left-0 w-full">
                            <Banner 
                                heading="TAX BACK"
                                subHeading="CALCULATOR"
                                content="See what you can get back when you invest in a retirement annuity"
                                image="https://via.placeholder.com/600x400"
                                icon={icon}
                                link="#calculator-form"
                                linkIcon={linkIcon}
                                linkIconClasses="rotate-[90deg] lg:rotate-0"
                                className="before:content-[''] before:absolute before:top-0 before:left-[5%] lg:before:left-[7%] before:h-[97%] lg:before:h-[96%] before:w-[90%] lg:before:w-[86%] before:rounded-bl-[214px] before:rounded-br-[214px] lg:before:rounded-bl-[317px] lg:before:rounded-br-[317px] before:border before:border-white before:z-10"
                            />
                        </div>
                    </div>
                    <div id="calculator-form" className="w-full relative">
                        <form className="relative px-[30px] lg:px-0 mt-[-418px] lg:mt-0 pt-[468px] lg:pt-0 pb-[88px] lg:pb-0 bg-[#F0F0F0] lg:bg-transparent rounded-bl-[214px] lg:rounded-bl-0 rounded-br-[214px] lg:rounded-br-0">

                            <div className="form-field-holder max-w-[570px]">
                                <Heading 
                                    content="See what you can get back when you invest in a retirement annuity"
                                    className="text-[24px] leading-[28px] hidden lg:flex font-normal pb-[60px] text-[#1E1E1E] pr-[20px]" 
                                    tag="h3"
                                />
                                <div className="flex justify-between items-center">
                                    <label>Age</label>
                                    <span>{value}</span>
                                </div>
                                
                                <PrimarySlider 
                                    aria-label="Age" 
                                    min={18} max={88} 
                                    value={value} 
                                    defaultValue={45} 
                                    onChange={handleSlideChange} 
                                />
                                
                                <TextInput 
                                    label="Gross income per month" 
                                    tooltipText="Gross income is your total income before deductions." 
                                    required 
                                    className="mt-[28px]" 
                                    onlyNumber={true} 
                                    currencySign="R" 
                                    value={formData.grossIncome} 
                                    onChange={handleChange}
                                    name="grossIncome"
                                />

                                <TextInput 
                                    label="How much you’d like to invest monthly?"
                                    required 
                                    className="mt-[28px]"
                                    value={formData.monthlyInvest} 
                                    onChange={handleChange} 
                                    onlyNumber={true} 
                                    currencySign="R" 
                                    name="monthlyInvest"
                                    maxValue={350000}
                                    maxValueError="There is a limit on tax-free contributions of 27.5% or R350 000 per year."
                                />

                                <div className="flex justify-center">
                                    <Button
                                        label="CALCULATE"
                                        onClick={handleSubmit}
                                        disabled={!isFormValid()}
                                        className="text-white mt-[30px]"
                                        tooltipText={errors.monthlyInvest}  // Set error tooltip dynamically
                                    />
                                </div>

                                <Heading 
                                    content="Total yearly investment"
                                    className="text-[22px] leading-[24px] mt-[73px] lg:mt-[92px] font-light text-primary text-center w-full" 
                                    tag="h5"
                                />

                                <Heading 
                                    content={`R${formatNumberWithSpaces(investmentDetails.monthlyInvest)}`}
                                    className="text-[47px] leading-[25px] font-semibold pt-[22px] text-primary text-center w-full" 
                                    tag="h3"
                                />

                                <div className="note-icon mt-[17px] flex justify-center">
                                    <svg width="54" height="43" viewBox="0 0 54 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.890625 8.90637C0.399 8.90637 0 8.50737 0 8.01575C0 7.52412 0.399 7.12512 0.890625 7.12512C26.5121 7.12512 41.9769 7.12512 46.4621 0.397342C46.6812 0.0695919 47.0873 -0.076471 47.4614 0.0393102C47.8355 0.151529 48.0938 0.497092 48.0938 0.890748V5.34387C48.0938 5.8355 47.6948 6.2345 47.2031 6.2345C46.7115 6.2345 46.3125 5.8355 46.3125 5.34387V3.25269C39.973 8.90637 24.7273 8.90637 0.890625 8.90637Z" fill="#009677"/>
                                        <path d="M23.1188 12.5719C19.9482 12.5719 16.5532 12.5469 12.9426 12.5238C9.10753 12.4971 5.07834 12.4686 0.890625 12.4686C0.399 12.4686 0 12.0696 0 11.5779C0 11.0863 0.399 10.6873 0.890625 10.6873C5.08369 10.6873 9.11644 10.7158 12.9533 10.7408C31.8203 10.8637 46.7204 10.9723 50.119 7.40091C50.372 7.13728 50.7585 7.05357 51.0952 7.18894C51.4336 7.32253 51.6562 7.65207 51.6562 8.01544V11.5779C51.6562 12.0696 51.2573 12.4686 50.7656 12.4686C50.274 12.4686 49.875 12.0696 49.875 11.5779V9.78244C45.5858 12.1658 36.3179 12.5719 23.1188 12.5719Z" fill="#009677"/>
                                        <path d="M0.890625 14.25C0.399 14.25 0 14.649 0 15.1406C0 15.6322 0.399 16.0312 0.890625 16.0312H51.6562V40.9688H0.890625C0.399 40.9688 0 41.3678 0 41.8594C0 42.351 0.399 42.75 0.890625 42.75H52.5469C53.0385 42.75 53.4375 42.351 53.4375 41.8594V15.1406C53.4375 14.649 53.0385 14.25 52.5469 14.25H0.890625Z" fill="#009677"/>
                                        <path d="M0 18.7012V41.8592C0 42.3508 0.399 42.7498 0.890625 42.7498C1.38225 42.7498 1.78125 42.3508 1.78125 41.8592V18.7012C1.78125 18.2095 1.38225 17.8105 0.890625 17.8105C0.399 17.8105 0 18.2095 0 18.7012Z" fill="#009677"/>
                                        <path d="M20.4844 39.1875H7.92478C7.49016 39.1875 7.11966 38.8722 7.04662 38.4447C6.783 36.8665 5.67328 35.5502 4.15388 35.0087C3.79941 34.884 3.5625 34.5491 3.5625 34.1715V22.8303C3.5625 22.4527 3.79941 22.1178 4.15388 21.9913C5.67506 21.4498 6.783 20.1335 7.04662 18.5553C7.11787 18.1278 7.49016 17.8125 7.92478 17.8125H20.4844C20.976 17.8125 21.375 18.2115 21.375 18.7031C21.375 19.1947 20.976 19.5938 20.4844 19.5938H8.63194C8.12963 21.2699 6.93619 22.6664 5.34375 23.4217V33.5766C6.93441 34.3336 8.12963 35.7301 8.63194 37.4062H20.4844C20.976 37.4062 21.375 37.8053 21.375 38.2969C21.375 38.7885 20.976 39.1875 20.4844 39.1875Z" fill="#009677"/>
                                        <path d="M32.9531 39.1875H45.5127C45.9473 39.1875 46.3178 38.8722 46.3909 38.4447C46.6545 36.8665 47.7642 35.5502 49.2836 35.0087C49.6381 34.884 49.875 34.5491 49.875 34.1715V22.8303C49.875 22.4527 49.6381 22.1178 49.2836 21.9913C47.7624 21.4498 46.6545 20.1335 46.3909 18.5553C46.3196 18.1278 45.9473 17.8125 45.5127 17.8125H32.9531C32.4615 17.8125 32.0625 18.2115 32.0625 18.7031C32.0625 19.1947 32.4615 19.5938 32.9531 19.5938H44.8056C45.3061 21.2699 46.5013 22.6664 48.0938 23.4217V33.5766C46.5031 34.3336 45.3079 35.7283 44.8056 37.4045H32.9531C32.4615 37.4045 32.0625 37.8035 32.0625 38.2951C32.0625 38.7867 32.4615 39.1875 32.9531 39.1875Z" fill="#009677"/>
                                        <path d="M22.3092 36.0008C22.1552 36.0008 22.0362 35.9588 21.9522 35.8748C21.8682 35.7768 21.8262 35.6578 21.8262 35.5178V21.8048C21.8262 21.6508 21.8682 21.5318 21.9522 21.4478C22.0362 21.3498 22.1552 21.3008 22.3092 21.3008H27.4332C29.0152 21.3008 30.2682 21.6718 31.1922 22.4138C32.1162 23.1558 32.5782 24.2548 32.5782 25.7108C32.5782 26.7888 32.3052 27.6708 31.7592 28.3568C31.2272 29.0288 30.4992 29.4978 29.5752 29.7638L32.8092 35.3498C32.8512 35.4338 32.8722 35.5108 32.8722 35.5808C32.8722 35.6928 32.8232 35.7908 32.7252 35.8748C32.6412 35.9588 32.5432 36.0008 32.4312 36.0008H31.4232C31.1852 36.0008 31.0102 35.9378 30.8982 35.8118C30.7862 35.6858 30.6882 35.5598 30.6042 35.4338L27.5592 30.0998H23.8842V35.5178C23.8842 35.6578 23.8352 35.7768 23.7372 35.8748C23.6532 35.9588 23.5342 36.0008 23.3802 36.0008H22.3092ZM23.8842 28.3148H27.3492C28.3992 28.3148 29.1832 28.0978 29.7012 27.6638C30.2192 27.2158 30.4782 26.5578 30.4782 25.6898C30.4782 24.8358 30.2192 24.1848 29.7012 23.7368C29.1972 23.2888 28.4132 23.0648 27.3492 23.0648H23.8842V28.3148Z" fill="#009677"/>
                                    </svg>
                                </div>
                                
                            </div>
                        </form>

                        <div id="form-output" className="form-output relative">
                            <div className="bg-holder w-full absolute top-0 right-[50px] lg:right-0 lg:top-[50px] flex justify-center lg:justify-start text-center">
                                
                                <svg className="hidden lg:block desktop-line" width="477" height="2286" viewBox="0 0 477 2286" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M280.062 1C172.594 33.8635 10.8279 163.5 1.20593 478.008C-10.6055 864.085 487.828 1339 475.331 1720.85C465.589 2018.53 303.856 2220.27 243.01 2285.5" stroke="#A3A3A3"/>
                                    <circle cx="31.0625" cy="286" r="5.5" fill="#009677"/>
                                    <circle cx="117.062" cy="879" r="5.5" fill="#009677"/>
                                    <circle cx="397.062" cy="2052" r="5.5" fill="#009677"/>
                                </svg>

                                
                                <svg className="block lg:hidden mobile-line" width="178" height="1939" viewBox="0 0 178 1939" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M143.878 1C104.636 28.8341 21.4787 149.027 2.78122 407.125C-20.5906 729.747 194.084 1147.26 175.906 1459.76C161.363 1709.76 113.292 1882.75 91.0748 1938" stroke="#A3A3A3"/>
                                    <circle cx="46.5" cy="170.5" r="5.5" fill="#009677"/>
                                    <circle cx="16.5" cy="628.5" r="5.5" fill="#009677"/>
                                    <circle cx="170.5" cy="1318.5" r="5.5" fill="#009677"/>
                                </svg>


                            </div>
                            <div className="output-holder relative z-10">

                                <div className="notes-icon pt-[95px] lg:pt-[260px] pl-[45px] lg:pl-0 flex justify-center">
                                    <div class="pr-0 lg:pr-[105px]">
                                        <Image
                                            src="/images/notes.png"
                                            alt=""
                                            width={241}
                                            height={387}
                                        />
                                    </div>
                                </div>

                                <div className="get-box flex justify-center mt-[10px] lg:mt-[42px]">
                                    <div className="inline-block pl-[180px] lg:pl-0">
                                        <p>
                                            <span className="text-[20px] leading-[26px] lg:text-[30px] lg:leading-[25px] font-light block">You get</span>
                                            <strong className="text-[37px] leading-[25px] lg:text-[47px] lg:leading-[25px] font-semibold block my-[7px] lg:my-[17px]">R{formatNumberWithSpaces(investmentDetails.taxBack)}</strong>
                                            <span className="text-[20px] lg:text-[30px] leading-[25px] font-light block">TAX BACK</span>
                                        </p>
                                    </div>
                                </div>

                                <div class="means flex justify-center mt-[130px] lg:mt-[265px]">
                                    <div>
                                        <Image
                                            src="/images/graph-group.png"
                                            alt=""
                                            width={284}
                                            height={279}
                                        />
                                    </div>
                                </div>

                                <div class="after-means flex justify-center mt-[74px]">
                                    <div class="inline-block min-w-[308px]">
                                        <p>
                                            <span className="text-[20px] leading-[26px] lg:text-[30px] lg:leading-[35px] font-light block">That means your</span>
                                            <strong className="text-[20px] leading-[26px] lg:text-[30px] lg:leading-[35px] font-semibold block">R{formatNumberWithSpaces(investmentDetails.monthlyInvest)} investment</strong>
                                            <span className="text-[20px] leading-[26px] lg:text-[30px] lg:leading-[35px] font-light block">only really costs you</span>
                                            <strong className="text-[37px] leading-[25px] lg:text-[47px] font-semimedium block mt-[21px]"></strong>
                                        </p>
                                    </div>
                                </div>

                                <div className="now mt-[225px] lg:mt-[298px] flex justify-center text-center mb-[380px]">
                                    <div class="inline-block min-w-[308px]">
                                        <p>
                                            <span className="text-[30px] lg:text-[40px] leading-[36px] font-light block">Now that’s a</span>
                                            <strong className="text-[30px] lg:text-[40px] leading-[36px] font-semibold block">great investment!</strong>
                                        </p>
                                    </div>
                                </div>

                                <div className="generate-report bg-[#F2F2F2] rounded-[15px] lg:pt-[75px] pb-[54px] px-[15px]">
                                    <Heading 
                                        content="Start today and"
                                        className="text-[30px] leading-[36px] font-light text-[#1E1E1E]black text-center w-full" 
                                        tag="h4"
                                    />

                                    <Heading 
                                        content="Start today and"
                                        className="text-[30px] leading-[36px] font-semibold text-black text-center w-full" 
                                        tag="h3"
                                    />
                                    
                                    <div className="flex flex-col items-center gap-[20px] justify-center mt-[35px]">
                                        <Button label="GENERATE REPORT" className="text-primary w-full max-w-[310px] border border-primary bg-transparent from-transparent to-transparent" />
                                        <Button label="CALL ME BACK" className="text-white w-full max-w-[310px]" />
                                    </div>

                                </div>

                                <VideoCard heading="Tax back explained" videoID="L61p2uyiMSo" className="mt-[60px]"/>

                                <StepButton heading="NEXT STEP" content="See how your money will grow until retirement." link="/" className="mt-[60px]" />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}