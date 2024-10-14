import Link from "next/link"
import Heading from "./Heading"


export default function StepButton({heading = null, content = null, link = null, className = ""}) {
  return (
    <div className="container px-[34px] lg:px-0">
        <div 
            className={`flex w-full items-center step-btn relative px-[28px] lg:px-[58px] py-[18px] min-h-[122px] lg:min-h-[153px] rounded-[20px] ${className}`}
            style={{ background: 'linear-gradient(90deg, #009677 0%, #50B848 143.37%)' }}
        >
            <div className="flex justify-between items-center gap-[30px]">
                <div>
                    {heading && (
                        <Heading 
                            content={heading}
                            className="text-[18px] lg:text-[30px] leading-[19px] mb-[7px] lg:mb-[12px] font-semibold text-white" 
                            tag="h4"
                        />
                    )}

                    {content && (
                        <p className="text-[16px] lg:text-[20px] leading-[23px] text-white font-light">{content}</p>
                    )}
                </div>
                {link && (
                <div>
                    <Link className="link" href={link}>                    
                        <svg width="29" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 1.20921C19.8137 1.39657 19.7092 1.65002 19.7092 1.91421C19.7092 2.17839 19.8137 2.43184 20 2.61921L24.56 7.25921L1 7.25921C0.734783 7.25921 0.480429 7.36456 0.292893 7.5521C0.105356 7.73964 -3.28098e-07 7.99399 -3.16505e-07 8.25921C-3.04912e-07 8.52442 0.105357 8.77878 0.292893 8.96631C0.480429 9.15385 0.734783 9.25921 1 9.25921L24.53 9.25921L20 13.7892C19.9063 13.8822 19.8319 13.9928 19.7811 14.1146C19.7303 14.2365 19.7042 14.3672 19.7042 14.4992C19.7042 14.6312 19.7303 14.7619 19.7811 14.8838C19.8319 15.0056 19.9063 15.1162 20 15.2092C20.1874 15.3955 20.4408 15.5 20.705 15.5C20.9692 15.5 21.2226 15.3955 21.41 15.2092L27.78 8.83921C27.9479 8.67054 28.0422 8.44222 28.0422 8.20421C28.0422 7.96619 27.9479 7.73787 27.78 7.56921L21.41 1.20921C21.2226 1.02296 20.9692 0.918413 20.705 0.918413C20.4408 0.918413 20.1874 1.02296 20 1.20921Z" fill="white"/>
                        </svg>
                    </Link>
                </div>
                )}
            </div>

            <div className="section-shadow absolute left-0 bottom-[5px] w-full h-[71px] z-[-1]">            
                <svg className="w-full" width="759" height="140" viewBox="0 0 759 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.6" filter="url(#filter0_f_1_25916)">
                    <path d="M673.736 103.611C482.295 83.1805 199.446 95.0984 81.9508 103.611C18.9994 116.23 31.2879 62.8001 45.301 34.5078H709.308C726.914 60.7971 744.449 111.423 673.736 103.611Z" fill="url(#paint0_linear_1_25916)"/>
                    </g>
                    <defs>
                    <filter id="filter0_f_1_25916" x="0" y="0.507812" width="759" height="139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1_25916"/>
                    </filter>
                    <linearGradient id="paint0_linear_1_25916" x1="34" y1="70.0078" x2="725" y2="70.0078" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#009677"/>
                    <stop offset="1" stop-color="#50B848"/>
                    </linearGradient>
                    </defs>
                </svg>
            </div>

        </div>
    </div>
  )
}