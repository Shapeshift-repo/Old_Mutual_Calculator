import Button from "./Button"
import Heading from "./Heading"

export default function CallToAction({ heading = null, subheading = null, content = null, buttonLabel = null, buttonOnClick, buttonIcon = null, sectionClasses = '', sectionContentClasses = '', headingClasses = '', buttonClasses = '', artwork = null }) {
  return (
    <section className="cta-section mt-[44px] lg:mt-[60px] overflow-hidden">
        <div className={`container bg-[#F5F4F7] rounded-[30px] ${sectionClasses}`}>
            <div className="flex flex-col lg:flex-row gap:0 lg:gap-[30px] items-start">
                <div className="w-full pt-[85px] pb-[96px] lg:py-[86px] pl-[34px] lg:pl-[107px]">
                    <div className={`content max-w-[277px] lg:max-w-[553px] ${sectionContentClasses}`}>
                        {heading && (
                            <Heading 
                                content={heading} 
                                className={`text-[20px] leading-[25px] lg:text-[27px] lg:leading-[45px] mb-0 lg:mb-[8px] font-semibold w-full ${headingClasses}`} 
                                tag="h3"
                            />
                        )}
                        {heading && (
                            <Heading 
                                content={subheading} 
                                className="text-[18px] leading-[26px] lg:text-[25px] mb-0 lg:mb-[12px] lg:leading-[32px] font-normal text-black w-full" 
                                tag="h5"
                            />
                        )}
                        {content && (
                            <p className="text-[16px] leading-[24px] lg:text-[18px] lg:leading-[28px] mt-[11px] font-light">{content}</p>
                        )}
                        {buttonLabel && (
                            <Button label={buttonLabel} onClick={buttonOnClick} Icon={buttonIcon} className={`text-[16px] leading-[25px] lg:text-[18px] lg:leading-[35px] px-0 lg:px-[16px] font-normal h-[20px] lg:h-[54px] w-auto lg:w-[256px] mt-0 lg:mt-[30px] bg-transparent ${buttonClasses}`} />
                        )}
                    </div>
                </div>
                {artwork && (
                    <div className="w-full relative">
                        <div className="artwork absolute top-[-270px] lg:top-0 right-[-50px] lg:right-[60px] rotate-[-40deg] lg:rotate-0">{artwork}</div>
                    </div>
                )}
            </div>
        </div>
    </section>
  )
}