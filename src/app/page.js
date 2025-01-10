'use client';

import Link from 'next/link'
import Image from 'next/image';
import Hero from "./components/Hero2";
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
      subTitle: "See how much TAX you could get back", 
      heading: "Get tax back on your investment",
      content: (
        <>
          <p className='mb-[30px]'>See how much tax you could receive back each year by contributing regularly to your retirement annuity.</p>
          <p><strong className='font-bold text-primary'>Did you know?</strong></p>
          <p className='mb-[30px]'>SARS offers you money back for investing in a retirement annuity!</p>
          <p>This means that you will get a tax refund every year or pay less tax, based on your income and retirement annuity contributions. Use this <Link className='font-bold text-primary underline' href="/tax-back">TAX BACK calculator</Link> to discover your potential savings and download the comprehensive report to share with your financial adviser.</p>
        </>
      )
    },
    { 
      id: "tab2", 
      title: "STEP 2", 
      subTitle: "Benefit from compound growth", 
      heading: "Benefit from compound growth ",
      content: (
        <>
          <p className='mb-[30px]'>Discover how much your investments can grow when you contribute to a retirement annuity.</p>
          <p className='mb-[30px]'>Compound growth is when the money you save earns interest, and then that interest also starts earning interest. The longer you save, the more your money grows.</p>
          <p>Use our <Link className='font-bold text-primary underline' href="/retirement-annuity">Retirement Annuity calculator</Link> to see how your investment will grow. Download the comprehensive report to review or share with your financial adviser.</p>
        </>
      )
    },
    { 
      id: "tab3", 
      title: "STEP 3", 
      subTitle: "Work out your income at retirement", 
      heading: "Work out your income at retirement",
      content: (
        <>
          <p className='mb-[30px]'>Discover how much monthly income you can expect to receive at retirement.</p>
          <p className='mb-[30px]'>A retirement annuity helps you save for future income, ensuring you receive a regular income when you stop working. Contribute consistently, let your money grow, and enjoy a sustainable income in retirement.</p>
          <p>Use our <Link className='font-bold text-primary underline' href="/retirement-income">Income Annuity calculator</Link> to see the income you can expect at retirement. Download the comprehensive report to review or share with your financial adviser.</p>
        </>
      )
    },
    { 
      id: "tab4", 
      title: "STEP 4", 
      subTitle: "Plan and find the money", 
      heading: "Plan and find the money",
      content: (
        <>
          <p className='mb-[30px]'>See how much you can save in your budget through small behaviour changes.</p>
          <p className='mb-[30px]'>The Pay Yourself First calculator will guide you towards saving money on daily and monthly expenses such as food, energy, fuel and entertainment.</p>
          <p className='mb-[30px]'>Use the Pay <Link className='font-bold text-primary underline' href="#">Yourself First calculator</Link> to find extra money in your budget.</p>
          <p>Download the comprehensive report to review or share with your financial adviser</p>
        </>
      )
    },
    { 
      id: "tab5", 
      title: "STEP 5", 
      subTitle: "Take action today! ", 
      heading: "Take action today! ",
      content: (
        <>
          <p className='mb-[30px]'>Knowing how much tax you will get back and how compound growth boosts your retirement annuity is great, but the most important step is to take action today.</p>
          <p className='text-[#4fb848]'>Talk to your financial adviser or purchase a retirement annuity online now!</p>
        </>
      )
    },
  ];

  const CallToActionData1 = {
    heading: 'LIFE AND DISABILITY COVER',
    subHeading: 'Protect you & your family’s financial future with',
    content: (
      <>
        Protect yours and your family’s financial future with <Link className="font-bold text-primary underline" href="https://www.oldmutual.co.za/personal/solutions/life-and-disability/life-insurance/">LIFE AND DISABILITY INSURANCE.</Link>
      </>
    ),
    buttonLabel: 'FIND OUT MORE',
    href: '#',
    img: '/images/cta-img-1.png',
  }

  const CallToActionData2 = {
    heading: 'JOIN OLD MUTUAL REWARDS',
    subHeading: 'Make your savings journey much more rewarding',
    content: (
      <>
        Protect yours and your family’s financial future with <Link className="font-bold text-[#ED0080] underline" href="https://www.oldmutual.co.za/personal/solutions/life-and-disability/life-insurance/">LIFE AND DISABILITY INSURANCE.</Link>
      </>
    ),
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