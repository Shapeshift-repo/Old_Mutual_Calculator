'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Banner from "../components/Banner";
import Heading from "../components/Heading";
import Slider from '@mui/material/Slider';
import { alpha, styled } from '@mui/material/styles';
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import VideoCard from "../components/VideoCard";
import ProgressBar from "../components/ProgressBar";
import ColorCard from "../components/ColorCard";
import Tooltip from "../components/Tooltip";
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

export default function RetirementAnnuity() {

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

    // Use useEffect to retrieve the stored value when the component mounts
    useEffect(() => {
        const savedInvestment = localStorage.getItem('totalInvestment');
        setFormData((prevData) => ({
            ...prevData,
            monthlyInvest: savedInvestment ? `R${formatNumberWithSpaces(savedInvestment)}` : ''
        }));
    }, []);

    const [errors, setErrors] = useState({
        monthlyInvest: ""
    });

    const [value, setValue] = useState(60);

    const handleSlideChange = (event, newValue) => {
        setValue(newValue);
    };

    const min = 2.5;
    const max = 8;

    function valuetext(value) {
        return `${value}%`;
    }

    function calculateRoundedValueForTodaysMoney(E64, G45, N9, D45) {
        const value = E64 * G45 / 12 * Math.pow(1 + N9, -D45);
        
        // Round down to the nearest multiple of 1000
        const roundedValue = Math.floor(value / 1000) * 1000;

        // Format the result
        return roundedValue;
      }

    const [value2, setValue2] = useState(4.5);

    const handleSlide2Change = (event, newValue) => {
        setValue2(newValue); // Update the slider value
    
        // Safely convert `monthlyInvest` to a string and clean it
        let { monthlyInvest } = formData;
        monthlyInvest = parseFloat(String(monthlyInvest || '').replace(/[^\d]/g, '')); // Convert to string before replace
    
        // Ensure the value is valid before calculation
        if (!isNaN(monthlyInvest)) {
            const result = calculateInvestmentAndTax({ ...formData, monthlyInvest }, newValue); // Pass the updated slider value
            setResult(result);
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
        const { monthlyInvest } = formData;
        return monthlyInvest && !errors.monthlyInvest;
    };

    const roundDownThousand = value => Math.floor(value / 1000) * 1000;

    const calculateRoundedValue = (G45, P50, E52) => Math.round(((G45 + P50) / E52) / 12);

    const calculateInvestmentAndTax = (formData, currentValue2) => {
        // Safely convert `monthlyInvest` to a string and clean it
        let { monthlyInvest } = formData;
        monthlyInvest = parseFloat(String(monthlyInvest || '').replace(/[^\d]/g, '')) || 0; // Convert to string before replace
        
        let N5 = 0.05; // Default escalation rate 
        let N9 = 0.05; // Default inflation assumption
        let X5 = 0.275;// Maximum % Gross Salary Tax Deductible
        let X6 = 350000; // Maximum Notional Deduction
    
        let G45 = monthlyInvest;
    
        let E64 = (currentValue2 || value2) / 100; // Use passed slider value or fallback to state
        
        let E52 = roundDownThousand((G45 * E64) / 12);
    
        let J64 = 0.5;

        let P47 = N9 + 0.02;
        let P48 = N9 + 0.04;
    
        let P47 = -0.01;
    
        let P50 = G45 * P47 * (1 - E64) / E64;

        let Q47 = (1+P47) ** (1/12) - 1;
        let Q48 = (1+P48) ** (1/12) - 1;

        let U49 = 0.175;

        let P53 = Math.log((U49 * (1 - (E64 / 12 * P47 / (Q47 / (1 + Q47)) / (P47 - N9)))) /(E64 - (U49 * E64 / 12 * P47 / (Q47 / (1 + Q47)) / (P47 - N9)))) / Math.log((1 + N9) / (1 + P47));
    
        let P56 = P53 / J64;
    
        let P48 = 0.03;
    
        let P51 = (G45 * P48 * (1 - E64)) / E64;
    
        let P54 = Math.log((U49 * (1 - (E64 / 12 * P48 / (Q48 / (1 + Q48)) / (P48 - N9)))) /(E64 - (U49 * E64 / 12 * P48 / (Q48 / (1 + Q48)) / (P48 - N9)))) / Math.log((1 + N9) / (1 + P48));
    
        let P57 = P54 / J64;

        let D45 = 40; // Years until retirement

        let E53 = calculateRoundedValueForTodaysMoney(E64, G45, N9, D45);
    
        return { E52, P53, P54, G45, E53 };
    };        

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

    const linkIcon = (
        <svg width="15" height="29" viewBox="0 0 15 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.2908 20C14.1034 19.8137 13.85 19.7092 13.5858 19.7092C13.3216 19.7092 13.0682 19.8137 12.8808 20L8.24079 24.56V1C8.24079 0.734784 8.13544 0.48043 7.9479 0.292893C7.76036 0.105357 7.50601 0 7.24079 0C6.97558 0 6.72122 0.105357 6.53369 0.292893C6.34615 0.48043 6.24079 0.734784 6.24079 1V24.53L1.71079 20C1.61783 19.9063 1.50723 19.8319 1.38537 19.7811C1.26351 19.7303 1.1328 19.7042 1.00079 19.7042C0.868781 19.7042 0.738075 19.7303 0.616216 19.7811C0.494356 19.8319 0.383755 19.9063 0.290792 20C0.104542 20.1874 0 20.4408 0 20.705C0 20.9692 0.104542 21.2226 0.290792 21.41L6.66079 27.78C6.82946 27.9479 7.05778 28.0422 7.29579 28.0422C7.5338 28.0422 7.76213 27.9479 7.93079 27.78L14.2908 21.41C14.477 21.2226 14.5816 20.9692 14.5816 20.705C14.5816 20.4408 14.477 20.1874 14.2908 20Z" fill="white"/>
        </svg>
    );

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
            width: '35%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            display: 'flex',
        },
        boxBorder: {
            width: '65%',
            borderLeftWidth: 1,
            borderLeftColor: '#009677',
            alignItems: 'start',
        },
        boxBold: {
            fontSize: 20,
            fontWeight: 'semibold',
            color: '#009677',
        },
        boxText: {
            fontSize: 14,
            fontWeight: 'medium',
            color: '#009677',
            textAlign: 'center',
            marginBottom: 5,
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

    const handleDownload = async () => {
        const blob = await pdf(<MyDocument />).toBlob(); // Generate PDF as a blob
        const url = URL.createObjectURL(blob); // Create a URL for the blob

        // Create a link element and trigger a download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'retirement-income.pdf');
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Clean up the DOM
    };

    const MyDocument = () => (
        <Document title="Retirement Income">
            <Page  size={{ width: 595.28, height: 920 }} style={styles.page}>
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

                <View style={styles.contentTop1}>
                    <Text style={styles.contentHi}>Hi</Text>
                    <Text style={styles.contentAfterHi}>When you retire (from the age of 55), your retirement savings will need to provide an income so that you can support yourself and your family. You have to invest a minimum of two thirds of your retirement savings to buy an income annuity. This is an investment that will pay you a regular income during your retirement. You may withdraw the rest of your retirement savings as a lump sum when you retire. This will depend on how much you have withdrawn before retirement. For more information visit <PDFLink style={styles.greenText} src="https://www.oldmutual.co.za/two-pot-retirement-system">www.oldmutual.co.za/two-pot-retirement-system</PDFLink>.</Text>
                </View>
                
                <View style={styles.contentTop2}>
                    <Text>
                        If you manage to save up a capital amount of <Text style={styles.boldGreen}>R{result && formatNumberWithSpaces(result.G45)}</Text> by your retirement age of <Text style={styles.boldGreen}>{value}</Text> years, you can expect an income of <Text style={styles.boldGreen}>R{result ? formatNumberWithSpaces(result.E52) : ''}</Text> per month at a drawdown rate of <Text style={styles.boldGreen}>{value2}%</Text>.
                    </Text>
                    <Text>
                        In Average markets ({result ? formatNumberWithSpaces(result.P53) : 0}% growth), your income will last about <Text style={styles.boldGreen}>10</Text> years. If you experience {result ? formatNumberWithSpaces(result.P54) : 0}% growth, your income could last up to <Text style={styles.boldGreen}>25</Text> years.
                    </Text>
                </View>

                <View style={styles.imageBoxes}>
                    <View style={styles.box}>                    
                        <Text style={styles.boxText}>You can expect a monthly income of</Text>
                        <Text style={styles.boxBold}>R{result ? formatNumberWithSpaces(result.E52) : 0}</Text>
                    </View>

                    <View style={[styles.box, styles.boxBorder]}>
                        
                        <Text style={styles.boxBorderHeading}>Your income will last</Text>
                        <Text style={styles.boxBorderLabel}>{result ? formatNumberWithSpaces(result.P53) : 0} Years</Text>

                        <View style={styles.barBox}>
                            <View style={styles.barGray}></View>
                            <View style={[styles.barRed, { width: `${result ? formatNumberWithSpaces(result.P53) : 0}%` }]}></View>
                        </View>

                        <View>
                            <Text style={styles.barInfo}>Average markets (7% growth)</Text>
                        </View>

                        <Text style={[styles.boxBorderLabel, styles.boxBorderLabelGreen]}>{result ? formatNumberWithSpaces(result.P54) : 0} Years</Text>

                        <View style={styles.barBox}>
                            <View style={styles.barGray}></View>
                            <View style={[styles.barRed, styles.barGreen, , { width: `${result ? formatNumberWithSpaces(result.P54) : 0}%` }]}></View>
                        </View>

                        <View>
                            <Text style={styles.barInfo}>Good markets (9% growth)</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.smallTextWrapper}>
                    <Text style={styles.smallText}>The income illustration above is for a living annuity.</Text>
                </View>

                <View style={styles.contentBottom}>
                    <Text style={styles.bottomHeading1}>Your different income annuity options at retirement</Text>
                    <Text style={styles.bottomHeading2}>Living annuity</Text>
                    <Text>A living annuity is a flexibility plan where you decide how your savings are invested and you choose an income level that suits your needs. You can withdraw an income between 2.5% and 17.5% of your investment a year, allowing you to adapt your income when needed. You can adjust your income every year, but if your investment underperforms or you withdraw too much, you could run out of retirement savings.</Text>
                    <Text style={styles.bottomHeading2}>Guaranteed (or life) annuity</Text>
                    <Text>A guaranteed annuity ensures that you receive a regular income for as long as you live. You can choose an escalation option that determines how the purchasing power of your income will increase or decrease over time.</Text>
                    <Text style={styles.bottomHeading2}>Composite (or compound) annuity</Text>
                    <Text>By combining the features of a living annuity and a guaranteed annuity, a composite annuity ensures that you receive an income for life and allows you to keep a portion of your capital invested in the markets.</Text>
                    <Text style={{ height: 10 }}></Text>
                    <Text>For more information, <PDFLink style={styles.greenText} src="#">watch this video</PDFLink>.</Text>
                    <Text style={styles.bottomHeading3}>Knowing what your income will be when you retire is great, but the most important step is taking action today.</Text>
                    <Text>It really is smart to contribute to a retirement annuity and have peace of mind when you retire.</Text>
                    <Text>Contact your financial adviser to help you choose the best investment for your future. If you don’t have a financial adviser, call <Text style={styles.phone}>0860 66 66 59</Text> and we will gladly assist you.</Text>
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
                            You can earn a percentage of your contributions on qualifying financial products in Rewards points monthly. You also earn points for learning how to take control of your finances using our online financial  education content, online assessments, Rewards calculators and tools. Your Rewards tier determines the rate at which you earn points and other discounted benefits, such as discounts on domestic and international flights.
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
                    <div className="relative lg:static top-0 lg:top-[-230px] left-0 w-full">
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
                    <div id="calculator-form" className="w-full relative min-h-[400px] 2xl:min-h-[900px]">
                        <form className="mt-[155px] lg:mt-0 px-[34px] lg:px-0">

                            <div className="form-field-holder max-w-[570px]">
                                <Heading 
                                    content="See what monthly income you could get during retirement from a Living Annuity"
                                    className="text-[24px] leading-[28px] hidden lg:flex font-normal pb-[60px] text-[#1E1E1E] pr-[20px]" 
                                    tag="h3"
                                />
                                <div className="flex justify-between items-center">
                                    <label>Select your retirement age</label>
                                    <span>{value}</span>
                                </div>

                                <PrimarySlider 
                                    aria-label="Age" 
                                    min={55} 
                                    max={65} 
                                    value={value} 
                                    defaultValue={60} 
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
                            
                            <div id="anchor-point" className="pt-[110px] mt-[59px] lg:mt-[99px]"></div>
                            <div className="output-holder relative z-10">
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
                                        <p className="text-[22px] leading-[19px] font-light text-white text-center w-full">({`R ${result ? formatNumberWithSpaces(result.E53) : ''}`} in today’s money)</p>
                                    </div>
                                    <div className="estimate-body pt-[55px] pb-[48px] px-[34px] lg:px-[75px] bg-[#F0F0F0]">
                                        <Heading 
                                            content="Your income will last*"
                                            className="text-[20px] leading-[19px] font-medium text-primary w-full" 
                                            tag="h5"
                                        />
                                        
                                        <ProgressBar 
                                            label={`${result ? formatNumberWithSpaces(result.P53) : 0} Years`} 
                                            hint={`Average markets 7% growth)`}
                                            progress={`${result ? result.P53 : 0}`}
                                            labelClasses="mt-[42px] from-[#ED0080] to-[#F37021]" 
                                            trackClasses=""
                                            progressClasses="from-[#ED0080] to-[#F37021]"
                                            hintClasses = ""
                                        />

                                       <ProgressBar 
                                            label={`${result ? (result.P54 ? formatNumberWithSpaces(result.P54) : "120") : 0} Years`} 
                                            hint={`Good markets 9% growth)`}
                                            progress={`${result ? (result.P54 ? formatNumberWithSpaces(result.P54) : 100) : 0}`}
                                            labelClasses="mt-[37px]" 
                                            trackClasses=""
                                            progressClasses=""
                                            hintClasses = ""
                                        />
                                    </div>
                                    <div className="estimate-footer pt-[35px] pb-[69px] px-[34px] lg:px-[75px] bg-[#E9E9E9] rounded-bl-[62px] rounded-br-[62px] lg:rounded-bl-[20px] lg:rounded-br-[20px]">

                                        <div className="relative flex justify-between custom-tooltip">
                                            <Heading 
                                                content="Adjust your yearly drawdown rate"
                                                className="text-[20px] leading-[25px] mb-[44px] font-light text-black w-full" 
                                                tag="h5"
                                            />
                                            <Tooltip text="The drawdown rate, in the context of living annuities, refers to the percentage of the total value of funds in your retirement income annuity that is withdrawn to provide you with retirement income. This rate, which can be set each year, determines how much money you'll receive regularly, typically monthly. Setting an appropriate drawdown rate is important to balance your income needs with the goal of making the retirement fund last for your lifetime." />
                                        </div>

                                        <PrimarySlider 
                                            aria-label="Rate" 
                                            min={min} 
                                            max={max} 
                                            value={value2} 
                                            defaultValue={4.5} 
                                            step={0.1}
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

                                <p>
                                    <span className="text-[18px] pt-[40px] pb-[0px] font-light block inline-block text-center">*The years above indicate the point at which the purchasing power of your income will begin to decline.</span>
                                </p>

                                <div className="container px-[34px] lg:px-0">
                                    <ColorCard 
                                        heading="" 
                                        content={`
                                            <p>Your different income annuity options at retirement</p>
                                            <p><strong>Living annuity</strong><br><br>A living annuity is a flexibility plan where you decide how your savings are invested and you choose an income level that suits your needs.</p>
                                            <p><strong>Guaranteed (or life) annuity</strong><br><br>A guaranteed annuity ensures that you receive a regular income for as long as you live.</p>
                                            <p><strong>Composite (or compound) annuity</strong><br><br>By combining the features of a living annuity and a guaranteed annuity, a composite annuity ensures that you receive an income for life and allows you to keep a portion of your capital invested in the markets.</p>
                                        `}
                                        className="rounded-[15px] px-[25px] lg:px-[65px] py-[45px] lg:py-[60px] mt-[40px] [&>div>div>div>div>p]:mb-[32px]" 
                                        showShadow={false} 
                                    />
                                </div>
                                
                                <p>
                                    <span className="text-[18px] pt-[40px] pb-[0px] font-light block inline-block text-center">This calculator will produce estimates. To get a more accurate income plan, speak to your financial adviser  or click on the CALL ME BACK button below.</span>
                                </p>

                                <div className="generate-report bg-transparent rounded-[15px] pt-[20px] pb-[54px] px-[15px]">
                                    
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

                                <VideoCard heading="Tax back explained" image="/images/video-thumb.jpg" videoID="L61p2uyiMSo" className="mt-[60px]"/>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
