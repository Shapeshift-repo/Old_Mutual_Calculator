'use client';

import { useEffect, useRef, useState } from 'react';
import Heading from "./Heading";

export default function ProgressBar({label, hint, progress = 0, labelClasses, trackClasses = "", progressClasses = "", hintClasses = ""}) {
    const progressRef = useRef(null);  // Reference to the progress bar element
    const [visible, setVisible] = useState(false);  // Track if the element is in view
    const [currentProgress, setCurrentProgress] = useState(0);  // Animate progress value

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setVisible(true);  // Set to true when the element is visible
            }
        }, { threshold: 0.5 });  // Adjust threshold to trigger when 50% of the element is visible

        if (progressRef.current) {
            observer.observe(progressRef.current);
        }

        return () => {
            if (progressRef.current) {
                observer.unobserve(progressRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (visible) {
            let progressValue = 0;
            const interval = setInterval(() => {
                progressValue += 1;
                if (progressValue <= progress) {
                    setCurrentProgress(progressValue);  // Increment progress until target value is reached
                } else {
                    clearInterval(interval);  // Clear interval when the target progress is reached
                }
            }, 20);  // Adjust the speed of the animation here (in milliseconds)

            return () => clearInterval(interval);  // Cleanup the interval
        }
    }, [visible, progress]);
    
    return (
        <div className="progress-bar" ref={progressRef}>
            <Heading 
                content={label} 
                className={`w-full text-[25px] leading-[25px] font-medium mb-[6px] text-transparent ${labelClasses}`} 
                tag="label"
            />
            <div className="progress-holder relative">
                <div className={`progress-track w-full rounded-[20px] overflow-hidden bg-[#DADADA] ${trackClasses}`}>
                    <div 
                        className={`pregress bg-gradient-to-r from-[#009677] to-[#50B848] h-[20px] rounded-[20px] ${progressClasses}`}
                        style={{ width: `${currentProgress}%`, transition: 'width 0.3s ease' }}  // Smooth transition
                    >
                    </div>
                </div>
            </div>
            <span className={`hint block w-full text-[17px] leading-[25px] text-[#818181] mt-[4px] ${hintClasses}`}>
                {hint}
            </span>
        </div>
    );
}