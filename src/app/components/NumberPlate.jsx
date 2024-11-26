import Heading from "./Heading"

export default function NumberPlate({heading = null, content = null, dot = false, colorCode = "#009677", dotShadow = "shadow-[4px_4px_4px_0_rgba(0, 150, 119, 0.15)]", className = ""}) {
  return (
    <div className={`inline-block relative text-right min-w-0 lg:min-w-[212px] min-h-[64px] py-[12px] px-[14px] rounded-[10px] bg-[#F7F7F7] bg-opacity-80 shadow-[4px_4px_4px_0_rgba(0,0,0,0.15)] ${className}`}>
        {dot && (
            <span className={`absolute top-[26px] left-[11px] inline-block h-[10px] w-[10px] rounded-[100%] bg-[${colorCode}] ${dotShadow}`}></span>
        )}
        
        {heading && (
            <Heading 
                content={heading}
                className={`text-[25px] leading-[25px] font-semibold text-[${colorCode}]`} 
                tag="h5"
            />
        )}

        {content && (
            <p className="text-[15px] leading-[17px] font-light">{content}</p>
        )}    
        
    </div>
  )
}