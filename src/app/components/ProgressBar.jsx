import Heading from "./Heading"

export default function ProgressBar({label, hint, progress = 0, labelClasses, trackClasses = "", progressClasses = "", hintClasses = ""}) {
  return (
    <div className="progress-bar">
        <Heading 
          content={label} 
          className={`w-full text-[25px] leading-[25px] font-medium mb-[6px] text-transparent ${labelClasses}`} 
          tag="label"
        />
        <div className="progress-holder relative">
            <div className={`progress-track w-full rounded-[20px] overflow-hidden bg-[#DADADA] ${trackClasses}`}>
                <div 
                    className={`pregress bg-gradient-to-r from-[#009677] to-[#50B848] h-[20px] rounded-[20px] ${progressClasses}`}
                    style={{ width: `${progress}%` }}
                >

                </div>
            </div>
        </div>
        <span className={`hint block w-full text-[17px] leading-[25px] text-[#818181] mt-[4px] ${hintClasses}`}>{hint}</span>
    </div>
  )
}