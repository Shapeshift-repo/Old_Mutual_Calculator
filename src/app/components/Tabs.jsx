"use client";

import { useEffect, useRef, useState } from "react";
import Heading from "./Heading";

export default function ScrollableTabs({ tabs }) {
    const containerRef = useRef(null);
    const mainRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const container = containerRef.current;
            if (container) {
                setShowLeftArrow(container.scrollLeft > 0);
                setShowRightArrow(
                    container.scrollWidth >
                        container.clientWidth + container.scrollLeft
                );
            }
        };

        handleResize(); // Check on mount
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [tabs]);

    const scroll = (direction) => {
        const container = containerRef.current;
        if (container) {
            const tabElements = Array.from(container.children);
            const tabWidth = tabElements[0]?.offsetWidth || 0;

            let newIndex =
                direction === "left"
                    ? Math.max(0, activeTabIndex - 1)
                    : Math.min(tabs.length - 1, activeTabIndex + 1);

            setActiveTabIndex(newIndex);
            const newTab = tabElements[newIndex];

            if (newTab) {
                newTab.scrollIntoView({ behavior: "smooth", inline: "start" });
                mainRef.current.scrollIntoView();
            }

            // Update arrow visibility
            setShowLeftArrow(newIndex > 0);
            setShowRightArrow(newIndex < tabs.length - 1);
        }
    };

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
        const tabElement = containerRef.current.children[index];
    };

    return (
        <section
            id="steps-section"
            className="shadow-box relative py-[80px] pb-[51px] lg:pb-[80px]"
        >
            <div ref={mainRef} className="absolute -top-10"></div>
            <div className="container">
                <div className="shadow-box-holder  bg-white pt-[24px] lg:pt-[52px] pb-0 px-[27px] lg:px-[70px] rounded-[30px] shadow-[0_4px_64px_0_rgba(0,0,0,0.12)] lg:shadow-[0_0_12px_0_rgba(0,0,0,0.12)]">
                    <div className="relative overflow-hidden">
                        {showLeftArrow && (
                            <button
                                className="absolute block lg:hidden top-[10px] left-0 transform -translate-y-1/2 z-10 p-[10px] bg-white shadow-md rounded-full"
                                onClick={() => scroll("left")}
                            >
                                <svg
                                    width="19"
                                    height="19"
                                    viewBox="0 0 19 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.17035 15.4638C7.33004 15.3041 7.41976 15.0875 7.41976 14.8617C7.41976 14.6359 7.33004 14.4193 7.17035 14.2596L3.25053 10.3398L17.8609 10.3398C18.0747 10.3232 18.2744 10.2266 18.4201 10.0692C18.5658 9.91182 18.6467 9.70525 18.6467 9.49078C18.6467 9.27631 18.5658 9.06974 18.4201 8.91235C18.2744 8.75495 18.0747 8.65833 17.8609 8.64179L3.27462 8.64179L7.16433 4.75208C7.32402 4.59239 7.41373 4.3758 7.41373 4.14996C7.41373 3.92412 7.32402 3.70753 7.16433 3.54784C7.00463 3.38814 6.78804 3.29843 6.5622 3.29843C6.33636 3.29843 6.11977 3.38815 5.96008 3.54784L0.540986 8.96693C0.397263 9.11066 0.31652 9.30559 0.31652 9.50884C0.31652 9.7121 0.397263 9.90703 0.540986 10.0508L5.96008 15.4698C6.03966 15.5494 6.13422 15.6125 6.23831 15.6553C6.34239 15.6981 6.45393 15.7198 6.56647 15.7193C6.67901 15.7187 6.79033 15.6959 6.89398 15.652C6.99763 15.6082 7.09157 15.5442 7.17035 15.4638Z"
                                        fill="#009677"
                                    />
                                </svg>
                            </button>
                        )}
                        <div
                            ref={containerRef}
                            className="relative flex justify-between overflow-x-auto whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:h-[4px] after:w-full after:bg-[#D9D9D9] after:rounded-md scroll-smooth scrollbar-hide"
                            onScroll={() => {
                                const container = containerRef.current;
                                if (container) {
                                    setShowLeftArrow(container.scrollLeft > 0);
                                    setShowRightArrow(
                                        container.scrollWidth >
                                            container.clientWidth +
                                                container.scrollLeft
                                    );
                                }
                            }}
                        >
                            {tabs.map((tab, index) => (
                                <div
                                    key={tab.id}
                                    className={`relative inline-block min-w-full md:min-w-[209px] md:max-w-[209px] px-[15px] pt-0 pb-[14px] lg:pb-[32px] cursor-pointer whitespace-break-spaces tab-item before:content-[''] before:ease-linear before:absolute before:z-10 before:left-0 before:bottom-0 before:h-[4px] before:w-0 before:bg-gradient-to-r before:from-[#009677] before:to-[#50B848] before:rounded-md ${
                                        activeTabIndex === index
                                            ? "active before:w-full"
                                            : ""
                                    }`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    <Heading
                                        content={tab.title}
                                        className={`text-[18px] leading-[35px] lg:text-[20px] text-center lg:text-left font-semibold w-full ${
                                            activeTabIndex === index
                                                ? " text-transparent tabs-title"
                                                : "text-[#323232]"
                                        }`}
                                        tag="h5"
                                    />
                                    <Heading
                                        content={tab.subTitle}
                                        className={`text-[15px] hidden lg:block leading-[20px] font-normal max-w-[175px] ${
                                            activeTabIndex === index
                                                ? "text-[#009677]"
                                                : "text-[#323232]"
                                        }`}
                                        tag="span"
                                    />
                                </div>
                            ))}
                        </div>
                        {showRightArrow && (
                            <button
                                className="absolute block lg:hidden top-[10px] right-0 transform -translate-y-1/2 z-10 p-[10px] bg-white shadow-md rounded-full"
                                onClick={() => scroll("right")}
                            >
                                <svg
                                    width="19"
                                    height="13"
                                    viewBox="0 0 19 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.8297 0.536173C11.67 0.695865 11.5802 0.912454 11.5802 1.13829C11.5802 1.36413 11.67 1.58072 11.8297 1.74042L15.7495 5.66023L1.13911 5.66023C0.925276 5.67677 0.725563 5.77339 0.579877 5.93079C0.434191 6.08818 0.353261 6.29475 0.353261 6.50922C0.353261 6.72369 0.43419 6.93026 0.579876 7.08765C0.725563 7.24505 0.925276 7.34167 1.13911 7.35821L15.7254 7.35821L11.8357 11.2479C11.676 11.4076 11.5863 11.6242 11.5863 11.85C11.5863 12.0759 11.676 12.2925 11.8357 12.4522C11.9954 12.6119 12.212 12.7016 12.4378 12.7016C12.6636 12.7016 12.8802 12.6119 13.0399 12.4522L18.459 7.03307C18.6027 6.88934 18.6835 6.69441 18.6835 6.49116C18.6835 6.2879 18.6027 6.09297 18.459 5.94925L13.0399 0.530151Z"
                                        fill="#009677"
                                    />
                                </svg>
                            </button>
                        )}
                        <div className="pt-[35px] px-0 pb-[100px] lg:p-[85px]">
                            <Heading
                                content={tabs[activeTabIndex]?.heading}
                                className={`text-[18px] leading-[35px] lg:text-[35px] font-semibold text-primary w-full mb-[34px]`}
                                tag="h3"
                            />
                            <div className="text-[16px] leading-[24px] lg:text-[20px] lg:leading-[35px] font-light [&>a]:text-primary [&>a]:underline [&>a]:font-medium">
                                {tabs[activeTabIndex]?.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
