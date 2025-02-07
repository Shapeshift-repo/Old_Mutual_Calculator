"use client";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif", // Use Montserrat font
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export default function Footer() {
  const [open, setOpen] = useState(false);
  const footerRef = useRef(null);
  const pathname = usePathname(); // Get the current pathname

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleIntersection = ([entry]) => {
    const mainBanner = document.getElementById("main-banner");
    if (!mainBanner) return;

    if (entry.isIntersecting) {
      //mainBanner.classList.add('active');
    } else {
      //mainBanner.classList.remove('active');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });
    const footerElement = footerRef.current;

    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []); // Runs only once when component mounts

  useEffect(() => {
    // This will run every time the pathname changes
    if (footerRef.current) {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0,
      });
      observer.observe(footerRef.current);
    }
  }, [pathname]); // Observes changes in the current pathname

  return (
    <ThemeProvider theme={theme}>
      <footer ref={footerRef} className="bg-[#252525] relative 2xl:pl-[30px]">
        <div className="max-w-[1920px] pt-[55px] pb-[40px] relative">
          <Link
            href="/"
            className="mobile-logo flex justify-center items-start p-[10px] absolute top-[-26px] lg:top-[-11px] left-[10px] lg:left-0 w-[82px] h-[calc(100%+26px)] lg:h-[calc(100%+11px)] bg-gradient-to-r from-[#009677] to-[#50B848]"
          >
            <h4 className="rotate-[-90deg] absolute top-[75px] lg:top-[85px] text-white text-[20px] lg:text-[24px]">
              OLD<span className="font-bold">MUTUAL</span>
            </h4>
          </Link>
          <div className="flex gap-[40px] items-center justify-center lg:justify-between pl-[90px] lg:pl-[100px]">
            <div className="copy-right-section w-[280px] lg:w-full text-[12px] leading-[18px] lg:text-[14px] lg:leading-[23px] text-white font-light [&>p]:mb-[10px]">
              <p>Copyright Old Mutual Limited 2025</p>
              <p>
                Old Mutual Life Assurance Company (SA) Limited is a licensed FSP
                and Life Insurer.
              </p>
              <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-[10px] [&>li>a:hover]:underline">
                <li>
                  <Link
                    className="link"
                    href="https://www.oldmutual.co.za/privacy-notice/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="hidden lg:inline-block">|</li>
                <li>
                  <Link
                    className="link"
                    href="https://www.oldmutual.co.za/cookie-policy/"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
              <Button
                label="ASSUMPTIONS"
                onClick={handleOpen}
                className="h-[35px] w-[184px] text-[13px] leading-[15px] mt-[15px]"
              />
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[2%] left-[3%] lg:top-1/2 lg:left-1/2 transform translate-x-0 translate-y-0 lg:-translate-x-1/2 lg:-translate-y-1/2 w-[94%] lg:w-[900px] h-5/6 bg-white rounded-[15px] shadow-lg p-8 overflow-y-scroll ">
            <span
              CloseIcon
              onClick={handleClose}
              className="absolute top-[20px] right-[19px] cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L17 17"
                  stroke="#009677"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 17L17 1"
                  stroke="#009677"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-primary text-[20px] leading-[20px] font-semibold mb-[34px]"
              >
                Assumptions
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="text-[16px] leading-[24px] [&>h6]:mb-[30px] [&>h6]:font-bold">
                  <p className="mb-2 font-bold">TAX BACK CALCULATOR </p>
                  <p>
                    Input age is the age at next tax year end. Calculated
                    assuming your salary is your only income. Your input
                    contributions are your only retirement fund contributions in
                    the tax year. Any additional pension or provident fund
                    contributions are ignored. Tax benefit is limited according
                    to the tax-deductible limit of 27.5% of your yearly taxable
                    income (or R350 000). You don’t skip any contributions
                    throughout the year. Fees are not taken into account. The
                    calculation is based on the 2024/25 SARS income tax tables.
                  </p>
                  <p className="mb-2 mt-5 font-bold">
                    RETIREMENT ANNUITY CALCULATOR
                  </p>

                  <p>
                    Input age is the age at next tax year end. Tax refunded
                    doesn’t get reinvested. Inflation is at 5% (compounded
                    yearly). Annual salary increase matches inflation at 5%
                    (compounded yearly). You stay within your tax bracket until
                    retirement. Yearly contribution escalation of 5% (compounded
                    yearly). If you entered any additional investment, the
                    assumptions are the same. Lump sum comes from retirement
                    fund savings, meaning no tax back is earned on the lump-sum
                    contribution. Calculated assuming your salary is your only
                    taxable income. Your input contributions are your only
                    retirement fund contributions in the tax year. Any
                    additional pension or provident fund contributions are
                    ignored. Tax back is limited according to the tax deductible
                    limit of 27.5% of your yearly taxable income (or R350 000).
                    The tax deductible limit increases with inflation.
                    Inflation, escalation rate and investment return are greater
                    than zero. Growth is determined by the investment strategy
                    selection in the calculator. No savings component
                    withdrawals were made during the investment period. Fees are
                    not taken into account. Calculator assumes first payment is
                    made on 1 March. The calculation is based on the 2024/25
                    SARS income tax tables.
                  </p>
                  <p className="mb-2 mt-5 font-bold">
                    INCOME ANNUITY CALCULATOR
                  </p>
                  <p>
                    Retirement age is 55 unless selected otherwise. Inflation is
                    at 5% (compounded yearly). Growth at 7% (compounded yearly)
                    in average markets, and 9% (compounded yearly) in good
                    markets. Calculations presented are from a living annuity.
                    The initial yearly drawdown rate is determined by the
                    selection in the calculator. Drawdown rate is adjusted each
                    year to keep up with inflation and maintain purchasing
                    power, subject to the drawdown limits of 2.5% to 17.5%. A
                    maximum of 120 years is displayed. Fees are not taken into
                    account. Fees will reduce the time that funds last (please
                    contact a financial adviser for more detailed information on
                    fees). Monthly income amount is a pre-tax amount.{" "}
                  </p>
                </div>
              </Typography>
            </div>
          </Box>
        </Modal>
      </footer>
    </ThemeProvider>
  );
}
