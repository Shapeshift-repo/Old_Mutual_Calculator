'use client';

import Link from 'next/link'
import Image from 'next/image';
import Hero from "./components/Hero";
import InvestingBlock from "./components/InvestingBlock";
import ScrollableTabs from "./components/Tabs";
import CardBlock from "./components/CardBlock";
import CardsData from "./content/cardsData.json";
import CallToAction from './components/CallToAction';
import ArtworkBackgroundBlock from './components/ArtworkBackgroundBlock';

export default function Home() {

  const tabsData = [
    { 
      id: "tab1", 
      title: "STEP 1", 
      subTitle: "Get tax back on your investment", 
      content: (
        <>
          Did you know the taxman (SARS) gives you money back for investing in a retirement annuity? Pay less tax or get a tax refund every year, based on your income and retirement annuity contributions. Getting a tax refund means you&lsquo;re paying less for your investment. Now that&lsquo;s powerful! Use our &nbsp; 
          <Link href="/tax-back">Tax Back calculator</Link> 
          &nbsp;to see your potential savings. Download the comprehensive report to review or share with your financial adviser.
        </>
      )
    },
    { 
      id: "tab2", 
      title: "STEP 2", 
      subTitle: "How much you can save over time", 
      content: "Benefit from the amazing power of compound growth. This is when your money earn returns on your original investment AND all the returns that accumulate over time. It’s like a snowball effect on your money. Over time the growth on your money will accelerate through the power of compounding. Use our Retirement Annuity calculator to see how your investment will grow. Download the comprehensive report to review, or to share with your financial adviser."
    },
    { 
      id: "tab3", 
      title: "STEP 3", 
      subTitle: "What your future income will be", 
      content: "A retirement annuity is a unique savings account for your future income. When you stop working, you have to reinvest your savings into an investment product called an income annuity. This annuity will pay you a regular income when you retire. Use our Income Annuity calculator to see what retirement income you can expect. Download the comprehensive report to review, or to share with your financial adviser."
    },
    { 
      id: "tab4", 
      title: "STEP 4", 
      subTitle: "Plan and find the money", 
      content: "Understanding your income and spending is key to building wealth. A budget helps you manage your monthly finances and set long-term goals. Use the Pay Yourself First calculator to find extra money in your budget. Download the comprehensive report to review, or to share with your financial adviser."
    },
    { 
      id: "tab5", 
      title: "STEP 5", 
      subTitle: "Take action today!", 
      content: "Knowing how much tax savings you can get, and how compound growth boosts your retirement annuity is great, but the most important step is taking action today. Make sure you also have the right life and disability cover. And join Old Mutual Rewards to get even more back. Talk to your financial adviser or buy a retirement annuity online now!"
    },
  ];

  const CallToActionData1 = {
    heading: 'LIFE AND DISABILITY COVER',
    subHeading: 'Protect you & your family’s financial future.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare dignissim nibh, vel feugiat justo.',
    buttonLabel: 'FIND OUT MORE',
    href: '#',
    img: '/images/cta-img-1.png',
  }

  const CallToActionData2 = {
    heading: 'JOIN OLD MUTUAL REWARDS',
    subHeading: 'Make your savings journey much <br/>more rewarding.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare dignissim nibh, vel feugiat justo.',
    buttonLabel: 'FIND OUT MORE',
    href: '#',
    artwork: (
      <>
        <svg width="557" height="433" viewBox="0 0 557 433" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M97.8225 421C64.0533 370.941 -17.1057 247.388 39.5479 273.78C110.365 306.769 233.311 458.421 206.755 355.514C180.198 252.607 119.217 127.05 219.049 216.171C318.881 305.291 426.582 376.687 398.551 273.78C370.519 170.872 351.831 27.0974 416.747 103.909C481.662 180.72 544.611 239.804 536.25 136.897C529.562 54.5709 528.546 11.9965 528.873 1" stroke="url(#paint0_linear_1_66461)" stroke-width="40"/>
          <defs>
          <linearGradient id="paint0_linear_1_66461" x1="20" y1="211" x2="537" y2="211" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ED0080"/>
          <stop offset="1" stop-color="#F37021"/>
          </linearGradient>
          </defs>
        </svg>
      </>
    ),  
    img: '/images/cta-img-2.png',
  }

  const onClickAction = () => {
    console.log('add action to this button');
  }

  const handleSliderChange = (newValue) => {
    console.log("New slider value:", newValue);
  };

  return (
    <>
      <div className='relative pt-[118px] lg:p-0'>
        <Hero />
      </div>
      <div className="side-bg hidden lg:block sm-hidden absolute top-[1000px] right-0 z-[-1]">
        <Image
          src="/images/side-bg.png"
          alt=""
          width={490}
          height={1610}
        />
      </div>
      <InvestingBlock />
      <ScrollableTabs tabs={tabsData} />
      <CardBlock cardsData={CardsData} />
      <section className="container">
       <CallToAction heading={CallToActionData1.heading} subheading={CallToActionData1.subHeading} content={CallToActionData1.content} buttonLabel={CallToActionData1.buttonLabel} href={CallToActionData1.href} sectionClasses='bg-gradient-to-r from-[#F4F3F6] to-[#807c79]' headingClasses='text-transparent bg-gradient-to-l custom-gradient' buttonClasses='border-0 lg:border border-primary text-primary from-transparent to-transparent' img={CallToActionData1.img} imgBoxClasses="right-[-165px] lg:right-[60px]" imgClasses="w-[290px] lg:w-[444px]" />
      </section>
      <section className="container">
        <CallToAction heading={CallToActionData2.heading} subheading={CallToActionData2.subHeading} content={CallToActionData2.content} buttonLabel={CallToActionData2.buttonLabel} href={CallToActionData2.href} sectionClasses='custom-artwork' headingClasses='from-[#ED0080] to-[#F37021] text-transparent' buttonClasses='border-0 lg:border border-[#ED0080] text-[#ED0080] from-transparent to-transparent' artwork={CallToActionData2.artwork} img={CallToActionData2.img} />
      </section>
      <ArtworkBackgroundBlock />
    </>
  );
}