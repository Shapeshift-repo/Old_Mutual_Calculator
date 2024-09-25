import Button from './Button';
import Heading from './Heading';

export default function Hero() {

    const icon = () => (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4638 11.8297C15.3041 11.67 15.0875 11.5802 14.8617 11.5802C14.6359 11.5802 14.4193 11.67 14.2596 11.8297L10.3398 15.7495L10.3398 1.13911C10.3232 0.925275 10.2266 0.725563 10.0692 0.579877C9.91182 0.434191 9.70525 0.353261 9.49078 0.353261C9.27631 0.353261 9.06974 0.43419 8.91235 0.579876C8.75495 0.725563 8.65833 0.925276 8.64179 1.13911L8.64179 15.7254L4.75208 11.8357C4.59239 11.676 4.3758 11.5863 4.14996 11.5863C3.92412 11.5863 3.70753 11.676 3.54784 11.8357C3.38815 11.9954 3.29843 12.212 3.29843 12.4378C3.29843 12.6636 3.38815 12.8802 3.54784 13.0399L8.96693 18.459C9.11066 18.6027 9.30559 18.6835 9.50884 18.6835C9.7121 18.6835 9.90703 18.6027 10.0508 18.459L15.4698 13.0399C15.5494 12.9603 15.6125 12.8658 15.6553 12.7617C15.6981 12.6576 15.7198 12.5461 15.7193 12.4335C15.7187 12.321 15.6959 12.2097 15.652 12.106C15.6082 12.0024 15.5442 11.9084 15.4638 11.8297Z" fill="white" />
        </svg>
    );

    const heroContent = {
        title: "Invest in <br>your future &",
        subtitle: "get your tax back <br>for that holiday",
        description: "Five steps to a secure financial <br>future for you, & your family.",
        buttonLabel: "CALCULATOR"
    };

    return (
        <section className="hero-section py-0 lg:py-[80px]">
            <div className="container">
                <div className="flex flex-col gap-[40px] lg:gap-[160px] lg:flex-row items-center">
                    <div className="w-full flex flex-col gap-[10px] justify-center lg:justify-end text-center lg:text-right order-2 lg:order-1">
                        <Heading 
                            content={heroContent.title} 
                            className="text-[40px] leading-[46px] lg:text-[72px] lg:leading-[70px] font-extrabold pb-[5px] text-transparent" 
                            tag="h1"
                        />

                        <div className="relative after:hidden lg:after:block after:content-[''] after:absolute after:h-full after:w-[4px] after:top-0 after:right-[-30px] after:rounded-[10px] after:bg-gradient-to-b after:from-[#50B848] after:to-[#009677]">
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
                        <div className="flex justify-center lg:justify-end mt-[20px]">
                            <Button label={heroContent.buttonLabel} Icon={icon} className="down-bounce text-white" />
                        </div>
                    </div>
                    <div className="w-full order-1 lg:order-2">
                        <div className="relative flex justify-center lg:block">
                            <svg className="w-[222px] lg:w-[525px] h-auto" width="525" height="632" viewBox="0 0 515 632" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path id="animated-path" d="M482.979 632C456.295 605.333 421.013 570.667 377.133 528C348.67 560 317.835 584.593 284.629 601.778C251.422 618.37 217.326 626.667 182.34 626.667C149.134 626.667 118.595 619.259 90.7254 604.444C62.8555 589.63 40.6189 569.482 24.0155 544C8.00518 517.926 0 489.185 0 457.778C0 416.889 12.4525 383.111 37.3575 356.444C62.8555 329.778 98.4341 304.296 144.093 280C122.153 251.556 105.55 225.185 94.2832 200.889C83.6097 176.593 78.2729 153.185 78.2729 130.667C78.2729 105.778 84.4991 83.5556 96.9516 64C109.404 43.8518 126.897 28.1481 149.43 16.8889C172.556 5.62962 198.647 0 227.703 0C269.211 0 303.011 11.5555 329.102 34.6666C355.193 57.1852 368.238 86.5185 368.238 122.667C368.238 148.741 361.123 171.852 346.891 192C332.66 212.148 315.167 229.333 294.413 243.556C273.659 257.185 246.085 273.185 211.693 291.556C242.527 328.889 295.599 384.593 370.907 458.667C395.219 422.519 417.159 381.037 436.727 334.222L478.532 364.444C456.592 414.222 432.28 456.889 405.596 492.444L515 600.889L482.979 632ZM128.083 130.667C128.083 165.63 147.058 208.296 185.009 258.667C214.657 243.259 238.377 229.63 256.166 217.778C274.548 205.926 289.372 192.296 300.639 176.889C312.499 160.889 318.428 142.519 318.428 121.778C318.428 97.4815 310.127 77.9259 293.523 63.1111C276.92 47.7037 254.98 40 227.703 40C198.054 40 174.039 48.5926 155.656 65.7778C137.274 82.9629 128.083 104.593 128.083 130.667ZM184.119 579.556C239.859 579.556 292.93 551.111 343.333 494.222C262.096 414.222 204.577 354.074 170.777 313.778C132.827 335.111 103.474 356.444 82.7202 377.778C61.966 398.519 51.5889 424 51.5889 454.222C51.5889 490.37 64.3379 520.296 89.8359 544C115.334 567.704 146.762 579.556 184.119 579.556Z" />
                                <defs>
                                    <linearGradient id="paint0_linear_1_66382" x1="122" y1="113" x2="499" y2="453" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#009677" />
                                    <stop offset="1" stop-color="#50B848" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="shodow-holder absolute bottom-[-115px] left-[-25px]">
                                
                                <svg width="430" height="298" viewBox="0 0 430 298" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5" filter="url(#filter0_f_1_66381)">
                                <ellipse cx="215" cy="149" rx="131" ry="65" fill="url(#paint0_linear_1_66381)"/>
                                </g>
                                <defs>
                                <filter id="filter0_f_1_66381" x="0" y="0" width="430" height="298" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="42" result="effect1_foregroundBlur_1_66381"/>
                                </filter>
                                <linearGradient id="paint0_linear_1_66381" x1="84" y1="149" x2="346" y2="149" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#009677"/>
                                <stop offset="1" stop-color="#50B848"/>
                                </linearGradient>
                                </defs>
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}