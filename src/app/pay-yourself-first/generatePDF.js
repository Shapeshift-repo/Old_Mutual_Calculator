import {
  Circle,
  Defs,
  Document,
  Font,
  Image,
  LinearGradient,
  Link,
  PDFDownloadLink,
  Page,
  Path,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { useState } from "react";

import { numberWithSpaces } from "../cost-of-education/calculator_functions";

import MontserratLight from "../../../public/fonts/montserrat-v25-latin-200.ttf";
import MontserratRegular from "../../../public/fonts/montserrat-v25-latin-700.ttf";
import MontserratBold from "../../../public/fonts/montserrat-v25-latin-regular.ttf";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: MontserratLight,
      fontWeight: "200",
    },
    {
      src: MontserratRegular,
      fontWeight: "300",
    },
    {
      src: MontserratBold,
      fontWeight: "700",
    },
  ],
});

const Report = ({
  currentCost,
  futureCost,
  years,
  costByYear,
  premiumsInvested,
  premiumsGrowth,
  monthlyPremium,
  loanCost,
  percentage,
  fullLoan,
  futureRepaymentRate,
}) => {
  const currentDate = new Date();
  const currentYear = Number(currentDate.getFullYear());

  return (
    <Document>
      <Page size="A4">
        <View>
          <Image src="./saving_vs_loans_PDF_header.png" />
        </View>
        <View style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <View style={{ paddingTop: "20px", paddingBottom: "10px" }}>
            <View style={{ paddingBottom: "5px" }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                }}
              >
                Hi
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 200,
                fontFamily: "Montserrat",
              }}
            >
              This report shows you just how much you can save on education
              costs by starting early. With time on your side, you can invest
              smaller amounts over a longer term and benefit from compound
              growth. Taking out a loan to pay for your child&apos;s education in
              future will cost you so much more, because of high interest rates.
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#009677",
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "Montserrat",
              }}
            >
              Total estimated cost of education today R
              {numberWithSpaces(currentCost)}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "40px",
            }}
          >
            <View style={{ width: "300px" }}>
              <Image
                src="./saving-vs-loans-PDF-saving-header.png"
                width={75}
              ></Image>
              <View style={{ backgroundColor: "#F7F7F7", padding: "10px" }}>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 200,
                    fontSize: 12,
                    color: "#282828",
                  }}
                >
                  Future cost of tertiary education {"\n"}in {years} years
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#009677",
                  }}
                >
                  R{numberWithSpaces(Math.ceil(futureCost))}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 200,
                    fontSize: 12,
                    paddingTop: "20px",
                  }}
                >
                  Monthly premium if you start {"\n"}saving today
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#009677",
                  }}
                >
                  R{numberWithSpaces(Math.ceil(costByYear))}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#009677",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  paddingLeft: "20px",
                  paddingright: "20px",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 200,
                    fontSize: 12,
                    color: "#FFFFFF",
                  }}
                >
                  Total premiums invested
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  R{numberWithSpaces(Math.ceil(premiumsInvested))}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 200,
                    fontSize: 12,
                    paddingTop: "10px",
                    color: "#FFFFFF",
                  }}
                >
                  Total growth on your premiums
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                    fontSize: 12,
                    color: "#FFFFFF",
                  }}
                >
                  R{numberWithSpaces(Math.ceil(premiumsGrowth))}
                </Text>
              </View>
            </View>
            <Image
              src="./saving-vs-loans-PDF-vs-icon.png"
              style={{
                width: "35px",
                height: "30px",
                marginLeft: "10px",
                marginRight: "10px",
                marginTop: "80px",
              }}
            />
            <View style={{ width: "300px" }}>
              <Image
                src="./saving-vs-loans-PDF-loans-header.png"
                width={75}
              ></Image>
              <View
                style={{
                  backgroundColor: "#F7F7F7",
                  paddingTop: "10px",
                  paddingRight: "10px",
                  paddingBottom: "20px",
                  paddingLeft: "10px",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 200,
                    fontSize: 12,
                    color: "#282828",
                  }}
                >
                  Cost of a loan in {years + currentYear}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#ED0080",
                  }}
                >
                  R{numberWithSpaces(Math.ceil(fullLoan))}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 200,
                    fontSize: 12,
                    paddingTop: "10px",
                  }}
                >
                  Monthly premium in {years} years will be.
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#ED0080",
                    paddingBottom: "16px",
                  }}
                >
                  R{numberWithSpaces(Math.ceil(futureRepaymentRate))} {"\n"}(R
                  {numberWithSpaces(monthlyPremium)} in today&apos;s value)
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#ED1580",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 200,
                    fontSize: 12,
                    color: "#FFFFFF",
                  }}
                >
                  How much{" "}
                  <Text
                    style={{ fontFamily: "Montserrat", fontWeight: "bold" }}
                  >
                    extra
                  </Text>{" "}
                  an education loan could cost you
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  R{numberWithSpaces(Math.ceil(loanCost))}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              fontFamily: "Montserrat",
              fontWeight: 200,
              fontSize: 12,
              color: "#282828",
              textAlign: "center",
              maxWidth: "250px",
              margin: "0 auto",
              paddingTop: "30px",
              paddingBottom: "10px",
            }}
          >
            <Text>
              If you start saving today you will pay a total of{" "}
              <Text style={{ fontWeight: "700" }}>
                R{numberWithSpaces(Math.ceil(premiumsInvested))}
              </Text>{" "}
              versus{" "}
              <Text style={{ fontWeight: "700" }}>
                R{numberWithSpaces(fullLoan)}
              </Text>{" "}
              which is the total loan amount with interest.
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 16,
                color: "#ED1580",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              YOU SAVE {percentage}%
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#009677",
                fontSize: 12,
                fontWeight: 500,
                fontFamily: "Montserrat",
              }}
            >
              It really does pay to start saving for your child&apos;s education
              today!
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 200,
                fontFamily: "Montserrat",
                paddingTop: "5px",
              }}
            >
              Avoid taking out an expensive loan in future and start saving for
              your child&apos;s education today. Contact your financial adviser
              to help you choose the best savings solution for your family. If
              you don&apos;t have a financial adviser, call{" "}
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                }}
              >
                0860 66 66 59
              </Text>{" "}
              and we will gladly assist you.
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#F7F7F7",
            paddingBottom: "10px",
            paddingTop: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            marginTop: "50px",
          }}
        >
          <Text
            style={{
              fontSize: 7,
              fontWeight: 300,
              fontFamily: "Montserrat",
              color: "#727272",
            }}
          >
            DISCLAIMER: The information in this calculator is intended for
            illustrative purposes only and the values shown aren&apos;t
            guaranteed. This isn&apos;t an offer and it&apos;s not part of a
            contractual undertaking by Old Mutual Limited, Old Mutual Life
            Assurance Company (South Africa) Ltd or any of Old Mutual
            Limited&apos;s subsidiaries. The calculator also doesn&apos;t
            represent financial advice by any of the companies in the Old Mutual
            Limited Group. The personal information provided will only be used
            to generate a report and no personal information provided will be
            stored during this process. Old Mutual Life Assurance Company (SA)
            Limited is a licensed FSP and life insurer.
          </Text>
          <Text
            style={{
              fontSize: 7,
              fontWeight: 300,
              fontFamily: "Montserrat",
              color: "#727272",
            }}
          >
            Assumptions: Investment strategies are taken at their target
            midpoint. CPI (Consumer Price Index) or inflation is set at 5% per
            year. Education inflation has been set at 7%. Yearly growth on
            investment is 10%. Yearly escalation rate of 7%. The loan is a
            5-year term. Interest on loan is 15.5% per year.
          </Text>
        </View>
      </Page>
      <Page size="A4">
        <View>
          <Image src="./cost-pdf-header.png" />
        </View>
        <View
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "50px",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "20%" }}>
              <Image
                src="./protect-icon-PDF.png"
                style={{
                  width: "40px",
                  margin: "0 auto",
                }}
              />
            </View>
            <View style={{ width: "80%", paddingLeft: "50px" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                  paddingBottom: "5px",
                  color: "#159677",
                  paddingTop: "20px",
                }}
              >
                PROTECT YOUR EDUCATION SAVINGS GOAL
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 200,
                  fontFamily: "Montserrat",
                  color: "#282828",
                }}
              >
                It is important to save for education, but it&apos;s equally
                important to protect those dreams. Our life and disability cover
                options ensure that you can still achieve your savings goals if
                anything happens to you. Ask your adviser about the right life
                and disability cover for you and your family.
                <Link
                  src="https://www.oldmutual.co.za/personal/solutions/life-and-disability/ "
                  style={{ color: "#009677" }}
                >
                  Click here for more information.
                </Link>
                .
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: "30px",
            }}
          >
            <View style={{ width: "20%" }}>
              <Image
                src="./rewards-icon-PDF.png"
                style={{
                  width: "60px",
                  margin: "0 auto",
                }}
              />
            </View>
            <View style={{ width: "80%", paddingLeft: "50px" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                  paddingBottom: "5px",
                  color: "#159677",
                  paddingTop: "20px",
                }}
              >
                GET REWARDED WHILE SAVING
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 200,
                  fontFamily: "Montserrat",
                  color: "#282828",
                  paddingBottom: "10px",
                }}
              >
                Old Mutual Rewards is a free-to-join financial wellness
                programme designed to partner with you on your savings journey.
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 200,
                  fontFamily: "Montserrat",
                  color: "#282828",
                  paddingBottom: "10px",
                }}
              >
                You can earn a percentage of your premiums on qualifying
                financial products in Rewards points monthly. You also earn
                points for learning how to take control of your finances using
                our online financial education content, online assessments,
                Rewards calculators and tools. Your Rewards tier determines the
                rate at which you earn points and other discounted benefits,
                such as discounts on domestic and international flights.
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 200,
                  fontFamily: "Montserrat",
                  color: "#282828",
                  paddingBottom: "10px",
                }}
              >
                Redeem your points with our partners – buy groceries and fuel,
                watch a movie, treat the family to a meal. Or save them for the
                future – save points in your Old Mutual Money Account, or even
                donate your points to a charity.
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 200,
                  fontFamily: "Montserrat",
                  color: "#282828",
                  paddingBottom: "10px",
                }}
              >
                Register today on{" "}
                <Link
                  src="http://oldmutual.co.za/rewards"
                  style={{ color: "#009677" }}
                >
                  oldmutual.co.za/rewards
                </Link>{" "}
                and explore the many ways that you can earn and spend your
                points.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#F7F7F7",
            paddingBottom: "15px",
            paddingTop: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            marginTop: "130px",
          }}
        >
          <Text
            style={{
              fontSize: 8,
              fontWeight: 300,
              fontFamily: "Montserrat",
              paddingBottom: "10px",
              color: "#727272",
            }}
          >
            DISCLAIMER: The information in this calculator is intended for
            illustrative purposes only and the values shown aren&#39;t
            guaranteed. This isn&#39;t an offer and it&#39;s not part of a
            contractual undertaking by Old Mutual Limited, Old Mutual Life
            Assurance Company (South Africa) Ltd or any of Old Mutual
            Limited&#39;s subsidiaries. The calculator also doesn&#39;t
            represent financial advice by any of the companies in the Old Mutual
            Limited Group. The personal information provided will only be used
            to generate a report and no personal information provided will be
            stored during this process. Old Mutual Life Assurance Company (SA)
            Limited is a licensed FSP and life insurer.
          </Text>
          <Text
            style={{
              fontSize: 8,
              fontWeight: 300,
              fontFamily: "Montserrat",
              color: "#727272",
            }}
          >
            PLUSAssumptions: Investment strategies are taken at their target
            midpoint. CPI (Consumer Price Index) or inflation is set at 5% per
            year. Education inflation has been set at 7%. Although tuition fees
            were sourced during research, these figures can vary from year to
            year.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const GeneratePDF = ({
  currentCost,
  futureCost,
  years,
  costByYear,
  premiumsInvested,
  premiumsGrowth,
  monthlyPremium,
  loanCost,
  percentage,
  fullLoan,
  futureRepaymentRate,
}) => {
  const [readyPDF, setReadyPDF] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setReadyPDF(true);
  };
  return (
    <div>
      <div className="title-gradient h-1 w-full"></div>
      <form onSubmit={handleSubmit}>
        {readyPDF ? (
          <PDFDownloadLink
            document={
              <Report
                currentCost={currentCost}
                futureCost={futureCost}
                years={years}
                costByYear={costByYear}
                premiumsInvested={premiumsInvested}
                premiumsGrowth={premiumsGrowth}
                monthlyPremium={monthlyPremium}
                loanCost={loanCost}
                percentage={percentage}
                fullLoan={fullLoan}
                futureRepaymentRate={futureRepaymentRate}
              />
            }
            fileName="Saving-vs-Loans.pdf"
            id="PDFLink"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <span className="m-auto flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-secondaryGreen to-primaryGreen px-11 py-4 text-base font-light text-white">
                  Loading...
                </span>
              ) : (
                <span className="m-auto flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-secondaryGreen  to-primaryGreen px-11 py-4 text-base font-light text-white">
                  Download
                </span>
              )
            }
          </PDFDownloadLink>
        ) : (
          <button
            type="submit"
            className="m-auto block rounded-full bg-gradient-to-r from-secondaryGreen  to-primaryGreen px-11 py-4 text-center text-base font-light text-white"
          >
            Create PDF Report
          </button>
        )}
      </form>
    </div>
  );
};

export default GeneratePDF;
