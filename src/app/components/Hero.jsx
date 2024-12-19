"use client";

import Image from 'next/image';
import Button from './Button';
import Heading from './Heading';

export default function Hero() {

    const icon = () => (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4638 11.8297C15.3041 11.67 15.0875 11.5802 14.8617 11.5802C14.6359 11.5802 14.4193 11.67 14.2596 11.8297L10.3398 15.7495L10.3398 1.13911C10.3232 0.925275 10.2266 0.725563 10.0692 0.579877C9.91182 0.434191 9.70525 0.353261 9.49078 0.353261C9.27631 0.353261 9.06974 0.43419 8.91235 0.579876C8.75495 0.725563 8.65833 0.925276 8.64179 1.13911L8.64179 15.7254L4.75208 11.8357C4.59239 11.676 4.3758 11.5863 4.14996 11.5863C3.92412 11.5863 3.70753 11.676 3.54784 11.8357C3.38815 11.9954 3.29843 12.212 3.29843 12.4378C3.29843 12.6636 3.38815 12.8802 3.54784 13.0399L8.96693 18.459C9.11066 18.6027 9.30559 18.6835 9.50884 18.6835C9.7121 18.6835 9.90703 18.6027 10.0508 18.459L15.4698 13.0399C15.5494 12.9603 15.6125 12.8658 15.6553 12.7617C15.6981 12.6576 15.7198 12.5461 15.7193 12.4335C15.7187 12.321 15.6959 12.2097 15.652 12.106C15.6082 12.0024 15.5442 11.9084 15.4638 11.8297Z" fill="white" />
        </svg>
    );

    const heroContent = {
        title: "SECURE<br>YOUR<br>FUTURE",
        subtitle: "so that your children<br> won’t have to when<br> you retire",
        description: "5 simple steps to a better retirement.",
        buttonLabel: "CALCULATOR",
        buttonLabel2: "5 STEPS"
    };

    const scrollToSection = () => {
        const section = document.getElementById('calculator-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToSectionSteps = () => {
        const section = document.getElementById('steps-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero-section py-0 lg:py-[80px]">
            <div className="container">
                <div className="flex flex-col gap-[40px] lg:gap-[110px] lg:flex-row items-center">
                    <div className="relative z-[1] w-full flex flex-col gap-[10px] justify-center lg:justify-end text-center lg:text-left order-2 lg:order-1">
                        <Heading 
                            content={heroContent.title} 
                            className="text-[40px] leading-[46px] lg:text-[72px] lg:leading-[70px] font-extrabold pb-[5px] text-transparent" 
                            tag="h1"
                        />

                        <div className="relative">
                            <Heading 
                                content={heroContent.subtitle} 
                                className="text-[35px] leading-[40px] lg:text-[52px] lg:leading-[60px] font-semibold text-[#323232]" 
                                tag="h2"
                            />
                        </div>
                        
                        <div className="relative text-[20px] leading-[30px] lg:text-[25px] lg:leading-[35px] font-light">
                            <p
                                dangerouslySetInnerHTML={{ __html: heroContent.description }}
                            />
                        </div>

                        {/* Button - Dynamic Label */}
                        <div className="flex flex-col md:flex-row gap-10 justify-center items-center mt-[20px]">
                          <Button
                            onClick={scrollToSection}
                            label={heroContent.buttonLabel}
                            Icon={icon}
                            className="down-bounce text-white"
                          />
                          <Button
                            onClick={scrollToSectionSteps}
                            label={heroContent.buttonLabel2}
                            Icon={icon}
                            className="down-bounce text-white"
                          />
                        </div>

                    </div>
                    <div className="w-full order-1 lg:order-2">
                        <div className="relative flex justify-center lg:block w-[222px] lg:max-w-[490px] ml-[38%] lg:ml-0">
                            <Image
                                src="/images/hero.png"
                                alt="Hero Image"
                                width={550}
                                height={582}
                                className=" top-[10px] lg:top-[10px] w-[335px] lg:w-fit h-auto max-w-fit opacity-0 animate-zoom-in" 
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
