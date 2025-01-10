import Heading from "./Heading"

export default function ArtworkBackgroundBlock({artwork = null, heading = null, subHeading = null, sectionClasses = ''}) {
  return (
    <section className={`artwork-section py-[64px] lg:py-[100px] overflow-hidden ${sectionClasses}`}>
        <div className="relative container">
            <div className="top-0 left-0 w-full flex flex-col gap-[16px] justify-center items-center text-center py-[64px] lg:py-[130px]">
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