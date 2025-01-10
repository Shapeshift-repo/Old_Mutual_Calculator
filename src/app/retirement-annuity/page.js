'use client';

import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Heading from "../components/Heading";
import Slider from "@mui/material/Slider";
import { alpha, styled } from '@mui/material/styles';
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from "../components/Button";
import VideoCard from "../components/VideoCard";
import StepButton from "../components/StepButton";
import ColorCard from "../components/ColorCard";
import NumberPlate from "../components/NumberPlate";
import { Font, Page, Text, Link as PDFLink, View, Image, Document, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';

Font.register({
    family: 'Montserrat',
    fonts: [
      { src: '/fonts/Montserrat-Regular.ttf', fontWeight: 'normal' },
      { src: '/fonts/Montserrat-Medium.ttf', fontWeight: 'medium' },
      { src: '/fonts/Montserrat-SemiBold.ttf', fontWeight: 'semibold' },
      { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 'bold' },
      { src: '/fonts/Montserrat-Light.ttf', fontWeight: 'light' },
    ],
});

const PrimarySlider = styled(Slider)(({ theme }) => ({
    '& .MuiSlider-thumb': {
        height: 29,
        width: 29,
        backgroundColor: '#009677', // Default color
        border: '3px solid white',
        boxShadow: '2px 2px 5px 0 rgba(00, 00, 00, .25)',
        '&:hover, &:focus': {
            boxShadow: '0px 0px 0px 8px rgba(0, 150, 119, 0.16)',
        },
        // Change color for the left thumb (if needed, use :nth-child for specific instance)
        '&:nth-of-type(1)': {
            backgroundColor: '#FF0000', // New color for the left thumb
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

export default function RetirementAnnuity() {

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
        investment: "moderate",
        saving: 0,
        monthly: 0
    });

    const [result, setResult] = useState(null);

    const [errors, setErrors] = useState({
        grossIncome: "",
        contribution: "",
    });

    const [choice, setChoice] = React.useState('no');

    const handleChoice = (event, newChoice) => {
        if (newChoice !== null) {
            setChoice(newChoice);

            // Set J9 based on the new choice value
            const J9 = newChoice === 'yes' ? 1 : 0;

            // Clean the values by removing non-numeric characters
            let { grossIncome, contribution, investment, saving, monthly } = formData;

            const age = value;
            const N8 = value1[1];

            grossIncome = parseFloat(grossIncome.replace(/[^\d]/g, '')); 
            const annualIncome = grossIncome * 12;
            contribution = parseFloat(contribution.replace(/[^\d]/g, ''));
            const annualContribution = contribution * 12;

            // Clean and set saving and monthly, defaulting to 0 if empty
            saving = parseFloat((saving || '').replace(/[^\d]/g, '')) || 0;
            monthly = parseFloat((monthly || '').replace(/[^\d]/g, '')) || 0;

            // Calculate the investment and tax based on the cleaned formData
            const result = calculateInvestmentAndTax({
                ...formData,
                age,
                J9,
                N8
            });
            setResult(result);
        }
    };

    const [value, setValue] = useState(25); // Slider 1 value (single value)
    const [value1, setValue1] = useState([25, 65]); // Slider 2 range value [min, max]

    const minDistance = 0; // Minimum distance between the two thumbs on Slider 2

    // Ensure both sliders remain in sync when value1[0] changes
    useEffect(() => {
        if (value1[0] !== value) {
            setValue(value1[0]); // Update Slider 1's value when Slider 2's min changes
        }
    }, [value1]);

    useEffect(() => {
        if (isFormValid()) {
            const age = value;
            const N8 = value1[1];
            const J9 = choice === 'yes' ? 1 : 0;
            const result = calculateInvestmentAndTax({ ...formData, age, J9, N8 });
            setResult(result);
        }
    }, [formData, value, value1, choice]);

    // Handle change for Slider 1 (single value)
    const handleSlideChange = (event) => {
        const newValue = parseInt(event.target.value); // Get the new value as an integer
        setValue(newValue); // Update Slider 1's value
        setValue1([newValue, Math.max(newValue, value1[1])]); // Adjust Slider 2's min value

        // Clean the values by removing non-numeric characters
        let { grossIncome, contribution, investment, saving, monthly } = formData;

        const age = value; // Use the slider value as the age
        const N8 = value1[1];

        grossIncome = parseFloat(grossIncome.replace(/[^\d]/g, '')); 
        const annualIncome = grossIncome * 12;
        contribution = parseFloat(contribution.replace(/[^\d]/g, ''));
        const annualContribution = contribution * 12;
        
        // Clean and set saving and monthly, defaulting to 0 if empty
        saving = parseFloat((saving || '').replace(/[^\d]/g, '')) || 0;
        monthly = parseFloat((monthly || '').replace(/[^\d]/g, '')) || "";

        const J9 = choice === 'yes' ? 1 : 0;

        const result = calculateInvestmentAndTax({
            ...formData,
            age,
            J9,
            N8
        });
        
        setResult(result);

    };

    // Handle change for Slider 2 (range value)
    const handleSlide2Change = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return; // Ensure newValue is an array

        if (activeThumb === 0) {
            // Ensure Slider 2's min value cannot be less than Slider 1's value
            const minValue = Math.max(newValue[0], 18); // Ensure minimum limit at 18
            setValue1([minValue, value1[1]]);
            setValue(minValue); // Synchronize Slider 1 with the new min value
        } else {
            // Ensure the max value is valid
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }

        // Clean the values by removing non-numeric characters
        let { grossIncome, contribution, investment, saving, monthly } = formData;

        const age = value; // Use the slider value as the age
        const N8 = value1[1];

        grossIncome = parseFloat(grossIncome.replace(/[^\d]/g, '')); 
        const annualIncome = grossIncome * 12;
        contribution = parseFloat(contribution.replace(/[^\d]/g, ''));
        const annualContribution = contribution * 12;
        
        // Clean and set saving and monthly, defaulting to 0 if empty
        saving = parseFloat((saving || '').replace(/[^\d]/g, '')) || 0;
        monthly = parseFloat((monthly || '').replace(/[^\d]/g, '')) || "";

        const J9 = choice === 'yes' ? 1 : 0;

        const result = calculateInvestmentAndTax({
            ...formData,
            age,
            J9,
            N8
        });
        
        setResult(result);

    };

    // Display value as text for sliders
    function valuetext(value) {
        return `${value}`;
    }

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
        const { age, grossIncome, contribution, investment } = formData;
        return grossIncome && contribution;
    };

    const investmentStrategyTable = [
        {
            lowest: 1.5,
            low: 2.63,
            light: 3.08,
            moderate: 4.67,
            medium: 5.24,
            high: 5.60,
            highest: 6.41
        }
    ];
    
    const taxBrackets = [
        { bracket: 0, startBracket: 0, taxRate: 0, previousBracket: 0 },
        { bracket: 1, startBracket: 95750, taxRate: 18, previousBracket: 0 },
        { bracket: 2, startBracket: 237100, taxRate: 26, previousBracket: 25443 },
        { bracket: 3, startBracket: 370500, taxRate: 31, previousBracket: 60127 },
        { bracket: 4, startBracket: 512800, taxRate: 36, previousBracket: 104240 },
        { bracket: 5, startBracket: 673000, taxRate: 39, previousBracket: 161912 },
        { bracket: 6, startBracket: 857900, taxRate: 41, previousBracket: 234023 },
        { bracket: 7, startBracket: 1817000, taxRate: 45, previousBracket: 627254 }
    ];
    
    const calculateInvestmentAndTax = (formData) => {
        
        // Clean the values by removing non-numeric characters
        let { age, grossIncome, contribution, investment, saving, monthly, J9, N8 } = formData;
        
        grossIncome = parseFloat((grossIncome || '').replace(/R|\D/g, '')) || 0; 
        const annualIncome = grossIncome * 12;
        contribution = parseFloat((contribution || '').replace(/R|\D/g, '')) || 0;
        const annualContribution = contribution * 12;
        
        // Clean and set saving and monthly, defaulting to 0 if empty
        saving = parseFloat((saving || '').replace(/R|\D/g, '')) || 0;
        if(J9 == 1){
            J9 = saving;
        }
           
        monthly = parseFloat((monthly || '').replace(/R|\D/g, '')) || 0;
        
        // Parsing inputs
        let D9 = age;
        let G9 = grossIncome;
        let D11 = contribution;
        let investmentStrategyValue = investmentStrategyTable[0][investment] / 100;
        let D13 = monthly;
        let D15 = D13 + D11; // Total Monthly Contributions
        
        let N5 = 0.05; // 5% as a decimal
        
        let N9 = 0.05; // Rate again
    
        // Calculate effective return rate
        let N7 = (1 + N9) * (1 + investmentStrategyValue) - 1;

        N7 = Math.round(N7 * 10000) / 10000;

        let N15 = N5 === 0
            ? D15 * (N8 - D9) * 12
            : 12 * D15 * (((1 + N5) ** (N8 - D9) - 1) / N5);

        N15 = Math.round(N15);
        
        let N16 = J9; // Initial investment
    
        let Q5 = ((1 + N7) ** (1 / 12)) - 1;
        Q5 = Math.round(Q5 * 100000000) / 100000000;

        // Step 1: Calculate the first part of the formula
        let part1 = (1 + Q5) ** 12 - 1; // (1 + 0.0079)^12 - 1
        let part2 = Q5 / (1 + Q5); // 0.0079 / (1 + 0.0079)
        let firstTerm = D15 * (part1 / part2); // First term calculation

        // Step 2: Calculate the second part of the formula
        let part3 = (1 + N7) ** (N8 - D9) - (1 + N5) ** (N8 - D9); 
        let part4 = N7 - N5;
        let secondTerm = firstTerm * (part3 / part4); // Second term calculation

        // Step 3: Calculate the third term
        let thirdTerm = J9 * (1 + N7) ** (N8 - D9); // J9 * (1 + 0.099)^(55 - 38)

        // Step 4: Sum all terms to get the final result
        let N13 = secondTerm + thirdTerm;

        // Step 5: Round to 2 decimal places (to match Excel)
        N13 = Math.round(N13 * 100) / 100;

        let N14 = N13 - N15 - N16;
    
        // Function to calculate tax based on income
        const calculateTax = (income) => {
            // Check for income less than the lowest bracket
            if (income < taxBrackets[1].startBracket) return 0;
        
            let taxAmount = 0;
            let previousBracket = 0;
        
            // Find the applicable tax bracket using a loop
            for (const bracket of taxBrackets) {
                if (income >= bracket.startBracket) {
                    // Calculate tax for the current bracket
                    taxAmount += (Math.min(income, bracket.startBracket) - previousBracket) * (bracket.taxRate / 100);
                    previousBracket = bracket.startBracket;
                } else {
                    // Break the loop if income is less than the current bracket
                    break;
                }
            }
            
            return taxAmount;
        };

        const getBracketDetails = (income) => {
            let bracketDetails = {};
        
            for (const bracket of taxBrackets) {
                if (income >= bracket.startBracket) {
                    bracketDetails = {
                        startBracket: bracket.startBracket,
                        previousBracket: bracket.previousBracket,
                        taxRate: bracket.taxRate,
                    };
                } else {
                    // Once the correct bracket is found, exit the loop
                    break;
                }
            }
        
            return bracketDetails;
        };
    
        let U14 = G9 * 12; // Annual gross income

        let { startBracket: U16, previousBracket: U17, taxRate: U15 } = getBracketDetails(U14);
        
        U15 = U15 / 100;

        let U18 = U17+(U14-U16)*U15;

        let U19 = U14 - D15 * 12 - J9;
        
        let { startBracket: U21, previousBracket: U22, taxRate: U20 } = getBracketDetails(U19);

        U20 = U20 / 100;

        let U23 = U22+(U19-U21)*U20;
        
        let U24 = (U18 - U23) / (D15 * 12 + J9);
        
        let Q13 = U24 * (N16 + 12 * D15);
        
        let V14 = G9 * 12;
        
        let { startBracket: V16, previousBracket: V17, taxRate: V15 } = getBracketDetails(V14);

        V15 = V15 / 100;

        let V18 = V17+(V14-V16)*V15;
        
        let V19 = V14 - D15 * 12;
        
        let { startBracket: V21, previousBracket: V22, taxRate: V20 } = getBracketDetails(V19);

        V20 = V20 / 100;

        let V23 = V22+(V19-V21)*V20;
        
        let V24 = (V18 - V23) / (D15 * 12);
        
        let Q14 = V24 * (N15 - 12 * D15);
        
        let Q15 = Math.round(Q13 + Q14);
        
        const totalInvestment = N13.toFixed(0);
        localStorage.setItem('totalInvestment', totalInvestment);
        const taxGetBack = Q15.toFixed(0);
        const investmentGrowth = N14.toFixed(0);
        const totalContributionPaid = (N15 + N16).toFixed(0);
        const lampSum = J9.toFixed(0);

        const investmentOption = contributionOptions.find(option => option.value === investment);
        const investmentLabel = investmentOption ? investmentOption.label.split(' - ')[1] : 'inflation plus 3%-4%';

        return { totalInvestment, taxGetBack, investmentGrowth, totalContributionPaid, lampSum, grossIncome, contribution, monthly, age, investmentLabel };
    };

    // On submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            // Clean the values by removing non-numeric characters
            let { grossIncome, contribution, investment, saving, monthly } = formData;

            const age = value; // Use the slider value as the age
            const N8 = value1[1];

            grossIncome = parseFloat(grossIncome.replace(/[^\d]/g, '')); 
            const annualIncome = grossIncome * 12;
            contribution = parseFloat(contribution.replace(/[^\d]/g, ''));
            const annualContribution = contribution * 12;
            
            // Clean and set saving and monthly, defaulting to 0 if empty
            saving = parseFloat((saving || '').replace(/[^\d]/g, '')) || 0;
            monthly = parseFloat((monthly || '').replace(/[^\d]/g, '')) || "";

            const J9 = choice === 'yes' ? 1 : 0;

            const result = calculateInvestmentAndTax({
                ...formData,
                age,
                J9,
                N8
            });
            
            setResult(result);

            // Ensure values are valid
            if (isNaN(grossIncome) || isNaN(annualIncome) || isNaN(contribution) || isNaN(annualContribution)) return;  
    
            // Scroll to the output section
            const outputElement = document.getElementById('form-output');
            const anchorPoint = document.getElementById('anchor-point');
            if (outputElement) {
                outputElement.classList.remove('hidden');
                anchorPoint.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };   
    
    const formatNumberWithSpaces = (number) => {
        return new Intl.NumberFormat('en-US', {
            useGrouping: true,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,  // No decimal digits
        }).format(Math.round(number)).replace(/,/g, ' ');
    };

    const contributionOptions = [
        { value: 'lowest', label: 'Lowest - Cash' },
        { value: 'low', label: 'Low - Enhanced Income' },
        { value: 'light', label: 'Light - Inflation plus 2%-3%' },
        { value: 'moderate', label: 'Moderate - Inflation plus 3%-4%' },
        { value: 'medium', label: 'Medium - Inflation plus 4%-5% ' },
        { value: 'high', label: 'High - Inflation plus 5%-7%' },
        { value: 'highest', label: 'Highest - Maximum Return' },
    ];

    const linkIcon = (
        <svg width="15" height="29" viewBox="0 0 15 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2908 20C14.1034 19.8137 13.85 19.7092 13.5858 19.7092C13.3216 19.7092 13.0682 19.8137 12.8808 20L8.24079 24.56V1C8.24079 0.734784 8.13544 0.48043 7.9479 0.292893C7.76036 0.105357 7.50601 0 7.24079 0C6.97558 0 6.72122 0.105357 6.53369 0.292893C6.34615 0.48043 6.24079 0.734784 6.24079 1V24.53L1.71079 20C1.61783 19.9063 1.50723 19.8319 1.38537 19.7811C1.26351 19.7303 1.1328 19.7042 1.00079 19.7042C0.868781 19.7042 0.738075 19.7303 0.616216 19.7811C0.494356 19.8319 0.383755 19.9063 0.290792 20C0.104542 20.1874 0 20.4408 0 20.705C0 20.9692 0.104542 21.2226 0.290792 21.41L6.66079 27.78C6.82946 27.9479 7.05778 28.0422 7.29579 28.0422C7.5338 28.0422 7.76213 27.9479 7.93079 27.78L14.2908 21.41C14.477 21.2226 14.5816 20.9692 14.5816 20.705C14.5816 20.4408 14.477 20.1874 14.2908 20Z" fill="white"/>
        </svg>
    );

    const handleDownload = async () => {
        const blob = await pdf(<MyDocument />).toBlob(); // Generate PDF as a blob
        const url = URL.createObjectURL(blob); // Create a URL for the blob

        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'retirement-annuity.pdf');
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Clean up the DOM
    };

    // Create styles
    const styles = StyleSheet.create({
        page: {
            padding: 0,
            backgroundColor: '#FFFFFF',
            fontFamily: 'Montserrat',
        },
        headerContainer: {
            flexDirection: 'row', // Mimic `flex` and `justify-between`
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 91,
            backgroundColor: '#EDEDED',
            paddingTop: 10,
            paddingLeft: 25,
            paddingRight: 35,
        },
        imageContainer: {
            width: '50%',
        },
        textContainer: {
            width: '50%',
            alignItems: 'flex-end',
        },
        headerStrong: {
            fontWeight: 'semibold',
            fontSize: 16,
            marginBottom: 0,
            color: '#009677',
        },
        headerSpan: {
            fontSize: 16,
            fontWeight: 'light',
            color: '#009677',
        },
        contentTop1: {
            marginTop: 20,
            paddingLeft: 30,
            paddingRight: 30,
            fontWeight: 'light',
        },
        contentHi: {
            fontSize: 12,
            fontWeight: 'semibold',
            marginBottom: 10,
        },
        contentAfterHi: {
            fontSize: 10,
            lineHeight: 1.1,
        },
        contentTop2: {
            marginTop: 8,
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 12,
            fontWeight: 'light',
            lineHeight: 1.2,
        },
        boldGreen: {
            fontWeight: 'semibold',
            color: '#009677',
        },
        barWrapper: {
            position: 'relative',
            width: '100%',
            fontSize: 10,
            fontWeight: 'light',
            lineHeight: 1.1,
        },
        barWrapperHeading: {
            fontSize: 16,
            fontWeight: 'semibold',
        },
        barWrapperHeadingGreen: {
            color: '#009677',
        },
        barWrapperHeadingRed: {
            color: '#ED0080',
        },
        barWrapperHeadingBlue: {
            color: '#00C0E8',
        },
        tagBox: {
            width: 161,
            height: 48,
            position: 'absolute',
            top: 16,
            right: 70,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 15,
            textAlign: 'right',
            paddingBottom: 10,
        }, 
        tagBox2: {
            top: 85,
        },          
        tagBox3: {
            top: 170,
        },          
        tagBox4: {
            right: 'auto',
            left: 58,
            top: 170,
            textAlign: 'left',
            alignItems: 'flex-start',
        },           
        tagBoxImage: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
        },        
        imageBoxes: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: '#F9F9F9',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingRight: 30,
            marginTop: 10,
            marginBottom: 5,
        },
        box: {
            width: '55%',
            display: 'flex',
        },
        graphBox: {
            width: '45%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingLeft: 20,
            justifyContent: 'space-between',
            fontSize: 10,
            fontWeight: 'light',
            lineHeight: 1.1,
        },
        graphCol: {
            width: '47%',
        },
        graphBar: {
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            height: 250,
            backgroundColor: '#009677',
            padding: 8,
            display: 'flex',
            justifyContent: 'flex-end',
        },
        lightBar: {
            backgroundColor: '#50B848',
            height: 210,
        },
        beforeWhiteBox: {
            color: '#FFFFFF',
            marginBottom: 80,
        },
        beforeWhiteBoxLarge: {
            marginBottom: 60,
        },
        whiteBox: {
            backgroundColor: '#FFFFFF',
            padding: 10,
        },
        whiteBoxLarge: {
            paddingTop: 20,
            paddingBottom: 20,
        },
        graphStrong: {
            fontWeight: 'semibold',
        },
        graphGreen: {
            color: '#009677',
        },
        graphLightGreen: {
            color: '#50B848',
        },
        boxHeading: {
            fontSize: 18,
            fontWeight: 'medium',
            marginBottom: 10,
        },
        boxText: {
            fontSize: 10,
            fontWeight: 'light',
            lineHeight: 1.1,
        },
        boxBold: {
            fontSize: 10,
            fontWeight: 'bold',
            lineHeight: 1.1,
        },
        boxGreen: {
            color: '#009677',
            fontWeight: 'medium',
        },
        boxLightGreen: {
            color: '#50B848',
            fontWeight: 'medium',
        },
        boxStrong: {
            fontWeight: 'medium',
        },
        boxBorderHeading: {
            fontSize: 14,
            fontWeight: 'semibold',
            color: '#009677',
        },
        boxBorderLabel: {
            fontSize: 16,
            fontWeight: 'semibold',
            color: '#ED0080',
            marginBottom: 2,
            marginTop: 6,
        },
        boxBorderLabelGreen: {
            color: '#009677',
        },
        barBox: {
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            height: 12,
            borderRadius: 15,
            marginBottom: 3,
        },
        barGray: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#DADADA',
        },
        barRed: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '30%',
            height: '100%',
            backgroundColor: '#ED0080',
            borderRadius: 15,
        },
        barGreen: {
            width: '56%',
            backgroundColor: '#009677',
        },
        barInfo: {
            fontSize: 10,
            fontWeight: 'normal',
            color: '#818181',
        },
        smallTextWrapper: {
            paddingLeft: 30,
            paddingRight: 30,
            marginBottom: 15,
        },
        smallText: {
            fontSize: 8,
            fontWeight: 'light',
            color: '#323232',
        },
        contentBottom: {
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 10,
            fontWeight: 'light',
            lineHeight: 1.2,
        },
        bottomHeading1: {
            fontSize: 13,
            fontWeight: 'semibold',
            marginBottom: 8,
        },
        bottomHeading2: {
            fontSize: 10,
            fontWeight: 'semibold',
            marginTop: 10,
            marginBottom: 2,
        },
        bottomHeading3: {
            fontSize: 9,
            fontWeight: 'bold',
            marginTop: 10,
        },
        phone: {
            fontWeight: 'medium',
        },
        greenText: {
            color: '#009677',
            textDecoration: 'none',
        },
        bottomBold: {
            fontWeight: 'medium',
        },
        bottomList: {
            flexDirection: 'row',
            alignItems: 'flex-center',
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#F9F9F9',
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 7,
            fontWeight: 'light',
        },
        footerText: {
            marginBottom: 3,
        },
        footerBold: {
            fontWeight: 'medium',
        },
        infoBox1: {
            width: '100%',
            height: 200,
            position: 'relative',
            overflow: 'hidden',
            marginTop: 40,
        },
        infoBox2: {
            width: '100%',
            height: 300,
            position: 'relative',
            overflow: 'hidden',
            marginTop: 40,
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        infoContent: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 40,
        },
        infoText: {
            fontSize: 10,
            fontWeight: 'light',
            lineHeight: 1.2,
            width: 400,
        },
        infoTextSmall: {
            fontSize: 8,
            fontWeight: 'light',
            lineHeight: 1,
            width: 400,
        },
        infoHeading1: {
            fontSize: 14,
            fontWeight: 'semibold',
            color: '#009677',
            marginBottom: 4,
        },
        infoHeading2: {
            fontSize: 14,
            fontWeight: 'semibold',
            color: '#ED0080',
            marginBottom: 4,
        },
    });

    const MyDocument = () => (
        <Document title="Retirement Annuity">
            <Page size={{ width: 595.28, height: 980 }} style={styles.page}>
                <View style={styles.headerContainer}>
                    <View style={styles.imageContainer}>
                        <Image 
                            src="/images/pdf-logo.png" 
                            style={{ width: 204, height: 56 }} 
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.headerStrong}>RETIREMENT ANNUITY</Text>
                        <Text style={styles.headerSpan}>REPORT</Text>
                    </View>
                </View>
                <View>
                    <Image
                        src="/images/pdf-border.png" 
                        style={{ width: '100%', height: 4 }} 
                    />
                </View>

                <View style={styles.contentTop1}>
                    <Text style={styles.contentHi}>Hi</Text>
                    <Text style={styles.contentAfterHi}>Saving for the future might be the most important thing you ever do for you and your family. And the earlier you start, the less money it will take. The longer your money is invested, the more it can grow.  See how much your investment will grow if you invest consistently and into your retirement annuity.</Text>
                </View>
                
                <View style={styles.contentTop2}>
                    <Text>
                        With your monthly contribution of <Text style={styles.boldGreen}>R{result ? formatNumberWithSpaces(result.grossIncome) : 0}</Text> and your current retirement savings of <Text style={styles.boldGreen}>R{result ? formatNumberWithSpaces(result.contribution) : 0}</Text>, with an investment strategy of <Text style={styles.boldGreen}>{result ? result.investmentLabel : 'inflation plus 3%-4%'}</Text>, your total savings at age <Text style={styles.boldGreen}>{result ? result.age : 25}</Text> will be <Text style={styles.boldGreen}>R{result ? formatNumberWithSpaces(result.taxGetBack) : 0}.</Text> Your cost of delay is <Text style={styles.boldGreen}>R{result ? formatNumberWithSpaces(result.lampSum) : 0}</Text>
                    </Text>
                </View>

                <View style={styles.barWrapper}>
                    <Image
                        src="/images/bar-box.png" 
                        style={{ width: '100%', height: 'auto' }} 
                    />
                    <View style={styles.tagBox}>
                        <Image
                            src="/images/tag-box1.png" 
                            style={styles.tagBoxImage} 
                        />
                        <Text style={[styles.barWrapperHeading, styles.barWrapperHeadingGreen]}>R{result ? formatNumberWithSpaces(result.totalInvestment) : 0}</Text>
                        <Text>Total investment value</Text>
                    </View>
                    
                    <View style={[styles.tagBox, styles.tagBox2]}>
                        <Image
                            src="/images/tag-box2.png" 
                            style={styles.tagBoxImage} 
                        />
                        <Text style={[styles.barWrapperHeading, styles.barWrapperHeadingRed]}>R{result ? formatNumberWithSpaces(result.investmentGrowth) : 0}</Text>
                        <Text>Your investment growth</Text>
                    </View>
                    
                    <View style={[styles.tagBox, styles.tagBox3]}>
                        <Image
                            src="/images/tag-box3.png" 
                            style={styles.tagBoxImage} 
                        />
                        <Text style={[styles.barWrapperHeading, styles.barWrapperHeadingBlue]}>R{result ? formatNumberWithSpaces(result.totalContributionPaid) : 0}</Text>
                        <Text>Total contributions paid</Text>
                    </View>
                    {choice === 'yes' && (
                        <View style={[styles.tagBox, styles.tagBox4]}>
                            <Text style={styles.barWrapperHeading}>R{result ? formatNumberWithSpaces(result.lampSum) : 0}</Text>
                            <Text>Lump sum</Text>
                        </View>
                    )}

                </View>

                <View style={styles.imageBoxes}>
                    <View style={styles.box}>                    
                        <Text style={styles.boxHeading}>What is compound growth?</Text>
                        <Text style={styles.boxText}>Compound growth is the process of earning returns on both your original investment and the interest or gains that accumulate over time. The earlier you start investing, the more you benefit from compound growth.</Text>
                        <Text style={styles.boxText}>For more information, see the example below or <PDFLink style={styles.greenText} src="#">watch this video.</PDFLink></Text>
                        <Text style={{ height: 5 }}></Text>
                        <Text style={styles.boxBold}>Example</Text>
                        <Text style={{ height: 2 }}></Text>
                        <Text style={styles.boxText}>Take a look at the benefits of starting early and using the power of compound growth to grow your money over time. Two friends, Lebo and Sibo. invest R1 000 a month at 10% growth.</Text>
                        <Text style={{ height: 10 }}></Text>
                        <Text style={styles.boxText}><Text style={styles.boxGreen}>Lebo</Text> saves R1 000 a month from age 25 to age 35. He then stops investing and leaves the money to grow.</Text>
                        <Text style={styles.boxText}><Text style={styles.boxLightGreen}>Sibo</Text> saves R1 000 a month, but only starts at age 35 and saves all the way to 70.</Text>
                        <Text style={{ height: 10 }}></Text>
                        <Text style={styles.boxText}>Sibo will never catch up to Lebo, even though she invests 25 years longer. Now, that’s the power of compound growth!</Text>
                        <Text style={{ height: 10 }}></Text>
                        <Text style={styles.boxBold}>It really is smart to contribute to a retirement annuity as soon as possible and let your money grow.</Text>
                        <Text style={styles.boxText}>Knowing how your money will grow over time is great, but the most important step is taking action <Text style={styles.boxStrong}>today</Text>.  Contact your financial adviser to help you choose the best investment for your future. </Text>
                        <Text style={styles.boxText}>If you don’t have a financial adviser, call <Text style={styles.boxStrong}>0860 66 66 59</Text> and we will gladly assist you.</Text>
                    </View>

                    <View style={styles.graphBox}>
                        
                        <View style={styles.graphCol}>
                            <Text>Total return</Text>
                            <Text style={styles.graphStrong}>R3 961 860</Text>
                            <Text style={{ height: 5 }}></Text>
                            <View style={styles.graphBar}>
                                <View style={styles.beforeWhiteBox}>
                                    <Text>Compound</Text>
                                    <Text>Growth</Text>
                                </View>
                                <View style={styles.whiteBox}>
                                    <Text style={styles.graphStrong}>R120 000</Text>
                                    <Text>Contributed</Text>
                                </View>
                            </View>
                            <Text style={{ height: 8 }}></Text>
                            <Text style={[styles.graphStrong, styles.graphGreen]}>Lebo</Text>
                            <Text style={styles.graphGreen}>Saves for 10 years</Text>
                        </View>

                        <View style={styles.graphCol}>
                            <Text>Total return</Text>
                            <Text style={styles.graphStrong}>R3 961 860</Text>
                            <Text style={{ height: 5 }}></Text>
                            <View style={[styles.graphBar, styles.lightBar]}>
                                <View style={[styles.beforeWhiteBox, styles.beforeWhiteBoxLarge]}>
                                    <Text>Compound</Text>
                                    <Text>Growth</Text>
                                </View>
                                <View style={[styles.whiteBox, styles.whiteBoxLarge]}>
                                    <Text style={styles.graphStrong}>R120 000</Text>
                                    <Text>Contributed</Text>
                                </View>
                            </View>
                            <Text style={{ height: 8 }}></Text>
                            <Text style={[styles.graphStrong, styles.graphLightGreen]}>Sibo</Text>
                            <Text style={styles.graphLightGreen}>Saves for 35 years</Text>
                        </View>

                    </View>

                </View>
                
                <View style={styles.footer}>
                    <Text style={styles.footerText}><Text style={styles.footerBold}>DISCLAIMER:</Text> The information in this tool is intended for illustrative purposes only and the values shown aren&lsquo;t guaranteed. This isn&lsquo;t an offer and it&lsquo;s not part of a contractual undertaking by Old Mutual Limited, Old Mutual Life Assurance Company (South Africa) Ltd or any of Old Mutual Limited&lsquo;s subsidiaries. The tool also doesn&lsquo;t represent financial advice by any of the companies in the Old Mutual Limited Group. The personal information provided will only be used to generate a report and no personal information provided will be stored during this process.</Text>
                    <Text style={styles.footerText}><Text style={styles.footerBold}>ASSUMPTIONS:</Text> Input age is the age at next tax year end. Calculated assuming your salary is your only income. You have not exceeded the limit of 27.5% of your yearly taxable income (or R350 000) which includes your pension or provident fund yearly contributions. You don’t skip any contributions throughout the year. Fees are not taken into account. The calculation is based on the 2024/25 SARS income tax tables.</Text>
                    <Text style={styles.footerText}><Text style={styles.footerBold}>IMPORTANT:</Text> The yearly tax deduction on a retirement annuity is limited to 27.5% of your income, up to a maximum of R350 000. Any amount above this is treated as deduction in the following year.</Text>
                    <Text style={styles.footerText}>Old Mutual Life Assurance Company (SA) Limited is a licensed FSP and life insurer.</Text>               
                </View>

            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.headerContainer}>
                    <View style={styles.imageContainer}>
                        <Image 
                            src="/images/pdf-logo.png" 
                            style={{ width: 204, height: 56 }} 
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.headerStrong}>RETIREMENT INCOME</Text>
                        <Text style={styles.headerSpan}>REPORT</Text>
                    </View>
                </View>
                <View>
                    <Image
                        src="/images/pdf-border.png" 
                        style={{ width: '100%', height: 4 }} 
                    />
                </View>
                
                <View style={styles.infoBox1}>
                    <Image src="/images/info-box-1.png" style={styles.backgroundImage} />

                    <View style={styles.infoContent}>
                        <Text style={styles.infoHeading1}>PROTECT YOUR RETIREMENT SAVINGS </Text>
                        <Text style={styles.infoText}>
                            It is important to save for your retirement, but it’s equally important to protect your savings.
                            Our life and disability insurance options ensure that you can still achieve your savings goals if anything happens to you.
                            Ask your adviser about the right life and disability cover for you and your family. Click here for more information.
                        </Text>
                    </View>
                </View>
                
                <View style={styles.infoBox2}>
                    <Image src="/images/info-box-2.png" style={styles.backgroundImage} />

                    <View style={styles.infoContent}>
                        <Text style={styles.infoHeading2}>PROTECT YOUR RETIREMENT SAVINGS </Text>
                        <Text style={styles.infoText}>
                            Old Mutual Rewards is a free-to-join financial wellness programme designed to partner with you on your savings journey.
                        </Text>
                        <Text style={{ height: 5 }} ></Text>
                        <Text style={styles.infoText}>
                            You can earn a percentage of your contributions on qualifying financial products in Rewards points monthly. You also earn points for learning how to take control of your finances using our online financial education content, online assessments, Rewards calculators and tools. Your Rewards tier determines the rate at which you earn points and other discounted benefits, such as discounts on domestic and international flights.
                        </Text>
                        <Text style={{ height: 5 }} ></Text>
                        <Text style={styles.infoText}>
                            Redeem your points at over 50 partners – buy groceries and fuel, watch a movie, and treat the family to a meal. Or save your Old Mutual Rewards points for the future ­– save points in qualifying Old Mutual products, or even donate your points to a charity. Plus, get up to 100% off with TaxTim to simplify tax filing and boost your chances of a refund!
                        </Text>
                        <Text style={{ height: 5 }} ></Text>
                        <Text style={styles.infoText}>
                            Register today on <PDFLink style={styles.greenText} src="https://www.sars.gov.za">oldmutual.co.za/rewards</PDFLink> and explore the many ways that you can earn and spend your points.
                        </Text>
                        <Text style={{ height: 5 }} ></Text>
                        <Text style={styles.infoTextSmall}>
                            Old Mutual Rewards (Pty) Ltd. is a company in the Old Mutual Group. Terms, Conditions and Programme Rules apply.
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}><Text style={styles.footerBold}>DISCLAIMER:</Text> The information in this tool is intended for illustrative purposes only and the values shown aren&lsquo;t guaranteed. This isn&lsquo;t an offer and it&lsquo;s not part of a contractual undertaking by Old Mutual Limited, Old Mutual Life Assurance Company (South Africa) Ltd or any of Old Mutual Limited&lsquo;s subsidiaries. The tool also doesn&lsquo;t represent financial advice by any of the companies in the Old Mutual Limited Group. The personal information provided will only be used to generate a report and no personal information provided will be stored during this process.</Text>
                    <Text style={styles.footerText}><Text style={styles.footerBold}>ASSUMPTIONS:</Text> Input age is the age at next tax year end. Calculated assuming your salary is your only income. You have not exceeded the limit of 27.5% of your yearly taxable income (or R350 000) which includes your pension or provident fund yearly contributions. You don’t skip any contributions throughout the year. Fees are not taken into account. The calculation is based on the 2024/25 SARS income tax tables.</Text>
                    <Text style={styles.footerText}><Text style={styles.footerBold}>IMPORTANT:</Text> The yearly tax deduction on a retirement annuity is limited to 27.5% of your income, up to a maximum of R350 000. Any amount above this is treated as deduction in the following year.</Text>
                    <Text style={styles.footerText}>Old Mutual Life Assurance Company (SA) Limited is a licensed FSP and life insurer.</Text>               
                </View>

            </Page>
        
        </Document>
    );

    return (
        <section className="tax-back-section pt-0 lg:pt-[118px] pb-[100px]">
            <div className="container px-0 lg:px-[15px]">
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-[150px] items-start">
                    <div className="w-full relative lg:sticky top-0  mt-[-230px] z-10 rounded-bl-[62px] rounded-br-[62px] lg:rounded-bl-[62px] lg:rounded-br-[62px]">
                        <div className="relative lg:static w-ful top-0 lg:top-[-230px] left-0 w-full">
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
                                    max={64} 
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
                                        label="Add lump-sum amount"
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
                        <div id="anchor-point" className="pt-[110px] pt-0 lg:pt-[90px]"></div>
                        <div id="form-output" className="form-output hidden relative z-[1]">
                            
                            <ColorCard 
                                heading={`R${result ? formatNumberWithSpaces(result.taxGetBack) : ''}`}
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

                                <NumberPlate heading={`R${result ? formatNumberWithSpaces(result.totalInvestment) : ''}`} content="Total investment value" dot={true} />

                                <NumberPlate heading={`R${result ? formatNumberWithSpaces(result.investmentGrowth) : ''}`} content="Your investment growth" colorCode="#ED0080" />

                                <div className={`flex ${choice === 'yes' ? 'justify-between' : 'justify-end'} w-full`}>
                                    {choice === 'yes' && (
                                        <NumberPlate
                                            heading={`R${result ? formatNumberWithSpaces(result.lampSum) : ''}`}
                                            content="Lump sum"
                                            colorCode="#000000"
                                            className="simple-plate"
                                        />
                                    )}
                                    <NumberPlate heading={`R${result ? formatNumberWithSpaces(result.totalContributionPaid) : ''}`} content="Total contributions paid" colorCode="#00C0E8" className="custom-blue" />
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
                                    min={18} 
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
                                        <button
                                            onClick={handleDownload}
                                            className="relative site-btn flex items-center justify-center w-[238px] h-[49px] lg:h-[52px] rounded-[30px] text-[16px] lg:text-[18px] leading-[18px] transition-transform duration-200 ease-in-out from-[#009677] to-[#50B848] text-primary w-full max-w-[255px] lg:max-w-[310px] border border-primary bg-transparent from-transparent to-transparent hover:scale-105 active:scale-100"
                                        >
                                            GENERATE REPORT
                                        </button>
                                        <Button label="CALL ME BACK" onClick={toggleSideForm} className="text-white w-full max-w-[310px]" />
                                    </div>

                                </div>

                                <VideoCard heading="Retirement income explained" image="/images/video-2-thumb.png" videoID="L61p2uyiMSo" className="mt-[60px]"/>

                                <StepButton heading="NEXT STEP" content="See what income your savings will give you in retirement." link="/retirement-income" className="mt-[60px]" />

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}