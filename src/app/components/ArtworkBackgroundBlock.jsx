import Heading from "./Heading"

export default function ArtworkBackgroundBlock({artwork = null, heading = null, subHeading = null, sectionClasses = ''}) {
  return (
    <section className={`artwork-section py-[64px] lg:py-[100px] overflow-hidden ${sectionClasses}`}>
        <div className="relative container">
            <div className="flex items-center justify-center opacity-10">
                <svg className="w-[298px] lg:w-[525px] h-auto" width="525" height="632" viewBox="0 0 515 632" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="animated-path-2" d="M482.979 632C456.295 605.333 421.013 570.667 377.133 528C348.67 560 317.835 584.593 284.629 601.778C251.422 618.37 217.326 626.667 182.34 626.667C149.134 626.667 118.595 619.259 90.7254 604.444C62.8555 589.63 40.6189 569.482 24.0155 544C8.00518 517.926 0 489.185 0 457.778C0 416.889 12.4525 383.111 37.3575 356.444C62.8555 329.778 98.4341 304.296 144.093 280C122.153 251.556 105.55 225.185 94.2832 200.889C83.6097 176.593 78.2729 153.185 78.2729 130.667C78.2729 105.778 84.4991 83.5556 96.9516 64C109.404 43.8518 126.897 28.1481 149.43 16.8889C172.556 5.62962 198.647 0 227.703 0C269.211 0 303.011 11.5555 329.102 34.6666C355.193 57.1852 368.238 86.5185 368.238 122.667C368.238 148.741 361.123 171.852 346.891 192C332.66 212.148 315.167 229.333 294.413 243.556C273.659 257.185 246.085 273.185 211.693 291.556C242.527 328.889 295.599 384.593 370.907 458.667C395.219 422.519 417.159 381.037 436.727 334.222L478.532 364.444C456.592 414.222 432.28 456.889 405.596 492.444L515 600.889L482.979 632ZM128.083 130.667C128.083 165.63 147.058 208.296 185.009 258.667C214.657 243.259 238.377 229.63 256.166 217.778C274.548 205.926 289.372 192.296 300.639 176.889C312.499 160.889 318.428 142.519 318.428 121.778C318.428 97.4815 310.127 77.9259 293.523 63.1111C276.92 47.7037 254.98 40 227.703 40C198.054 40 174.039 48.5926 155.656 65.7778C137.274 82.9629 128.083 104.593 128.083 130.667ZM184.119 579.556C239.859 579.556 292.93 551.111 343.333 494.222C262.096 414.222 204.577 354.074 170.777 313.778C132.827 335.111 103.474 356.444 82.7202 377.778C61.966 398.519 51.5889 424 51.5889 454.222C51.5889 490.37 64.3379 520.296 89.8359 544C115.334 567.704 146.762 579.556 184.119 579.556Z" />
                    <defs>
                        <linearGradient id="paint0_linear_1_66382" x1="122" y1="113" x2="499" y2="453" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6C6C6C" />
                            <stop offset="1" stop-color="#ABABAB" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="absolute top-0 left-0 w-full flex flex-col gap-[16px] justify-center items-center text-center py-[64px] lg:py-[130px]">
                <Heading 
                    content="It's not just about <br>saving money." 
                    className="text-[30px] leading-[30px] lg:text-[52px] lg:leading-[60px] max-w-[940px] font-normal text-[#323232]" 
                    tag="h3"
                />
                <Heading 
                    content="It's about investing in the future. <br>For you, and your <br>family."
                    className="text-[35px] leading-[40px] lg:text-[72px] lg:leading-[72px] max-w-[940px] font-extrabold px-[15px] lg:px-0 pb-[5px] text-transparent" 
                    tag="h2"
                />
            </div>
        </div>
    </section>
  )
}