import Lottie from "lottie-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import animationData2 from "../animations/animation2.json";
import Heading from "./Heading";

export default function InvestingBlock() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTaxOpen, setTaxOpen] = useState(false);
  const [isRetirementOpen, setRetirementOpen] = useState(false);
  const [isIncomeOpen, setIncomeOpen] = useState(false);
  const animationRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Adjust as needed (50% of the element is in view)
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return (
    <section
      className="investing-section py-[80px] pb-0 lg:pb-[80px]"
      ref={observerRef}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[10px] items-center">
          <div className="w-full lg:w-[230px]">
            <div className="investing-media flex justify-center">
              <div className="flex justify-center items-center max-w-[200px] lg:max-w-[320px] fadeIn">
                {isVisible && (
                  <Lottie
                    animationData={animationData2}
                    loop={false}
                    lottieRef={animationRef}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full max-w-[880px]">
            <h5>
              <Heading
                content="Investing in a&nbsp;"
                className="text-[24px] leading-[30px] lg:text-[35px] lg:leading-[45px] font-semibold text-[#323232]"
                tag="span"
              />
              <Heading
                content="retirement annuity&nbsp;"
                className="text-[24px] leading-[30px] lg:text-[35px] lg:leading-[45px] font-semibold text-transparent inline"
                tag="span"
              />
              <Heading
                content="is a smart way to secure you, and your family&rsquo;s financial future."
                className="text-[24px] leading-[30px] lg:text-[35px] lg:leading-[45px] font-semibold text-[#323232] inline"
                tag="span"
              />
            </h5>
            <div className="investing-content mt-[30px] text-[16px] leading-[24px] lg:text-[20px] lg:leading-[35px] font-light [&>ul]:py-[20px] [&>ul>li]:text-[18px] lg:[&>ul>li]:text-[20px] [&>ul>li>strong]:text-[26px] lg:[&>ul>li>strong]:text-[24px] [&>ul>li>strong]:font-semibold">
              <p>
                Your future wealth depends on how you manage the money you earn
                today. Make a wise choice, invest in a retirement annuity.
              </p>
              <ul>
                <li className="relative pl-[15px]">
                  <span className="absolute left-0 top-[-5px]">.</span> You get{" "}
                  <span
                    className="underline decoration-1 text-primary cursor-pointer"
                    onClick={() => setTaxOpen(true)}
                  >
                    tax back
                  </span>
                </li>
                <li className="relative pl-[15px]">
                  <span className="absolute left-0 top-[-5px]">.</span> Your
                  investment growth is tax free
                </li>
                <li className="relative pl-[15px]">
                  <span className="absolute left-0 top-[-5px]">.</span> Benefit
                  from{" "}
                  <span
                    className="underline decoration-1 text-primary cursor-pointer"
                    onClick={() => setRetirementOpen(true)}
                  >
                    compound growth
                  </span>
                </li>
                <li className="relative pl-[15px]">
                  <span className="absolute left-0 top-[-5px]">.</span> Secure
                  your{" "}
                  <span
                    className="underline decoration-1 text-primary cursor-pointer"
                    onClick={() => setIncomeOpen(true)}
                  >
                    future income
                  </span>
                </li>
              </ul>
              <p>
                Use the 5 steps below to secure you and your family&rsquo;s
                financial future.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="custom"
        isOpen={isTaxOpen}
        url="/videos/video-1.mp4"
        onClose={() => setTaxOpen(false)}
        ratio="9:16"
      />
      <ModalVideo
        channel="custom"
        isOpen={isRetirementOpen}
        url="/videos/video-2.mp4"
        onClose={() => setRetirementOpen(false)}
        ratio="9:16"
      />
      <ModalVideo
        channel="custom"
        isOpen={isIncomeOpen}
        url="/videos/video-3.mp4"
        onClose={() => setIncomeOpen(false)}
        ratio="9:16"
      />
    </section>
  );
}
