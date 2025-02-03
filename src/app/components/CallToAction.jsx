import Button from "./Button";
import Heading from "./Heading";
import Image from "next/image";

export default function CallToAction({
    heading = null,
    subheading = null,
    content = null,
    buttonLabel = null,
    buttonOnClick,
    href = null,
    buttonIcon = null,
    sectionClasses = "",
    sectionContentClasses = "",
    headingClasses = "",
    buttonClasses = "",
    artwork = null,
    artworkClasses = "",
    img = null,
    imgBoxClasses = "",
    imgClasses = "",
}) {
    return (
        <section className="cta-section mt-[44px] lg:mt-[60px] overflow-hidden">
            <div
                className={`container bg-[#F5F4F7] rounded-[30px] ${sectionClasses}`}
            >
                <div className="flex flex-col lg:flex-row gap:0 lg:gap-[30px] items-start">
                    <div className="relative z-[1] w-full pt-[85px] pb-[96px] lg:py-[86px] pl-[34px] lg:pl-[107px]">
                        <div
                            className={`content max-w-[230px] w-[600px] lg:max-w-[700px] ${sectionContentClasses}`}
                        >
                            {subheading && (
                                <Heading
                                    content={subheading}
                                    className="text-[18px] leading-[26px] lg:text-[23px] mb-0 lg:mb-[12px] lg:leading-[32px] font-normal text-black w-full"
                                    tag="h5"
                                />
                            )}
                            {heading && (
                                <Heading
                                    content={heading}
                                    className={`text-[20px] leading-[25px] lg:text-[27px] lg:leading-[45px] mb-0 lg:mb-[8px] font-semibold w-full ${headingClasses}`}
                                    tag="h3"
                                />
                            )}
                            {content && (
                                <p className="text-[16px] leading-[24px] lg:text-[18px] lg:leading-[28px] mt-[11px] font-light">
                                    {content}
                                </p>
                            )}
                            {buttonLabel && (
                                <Button
                                    label={buttonLabel}
                                    onClick={buttonOnClick}
                                    href={href}
                                    Icon={buttonIcon}
                                    className={`text-[16px] leading-[25px] lg:text-[18px] lg:leading-[35px] px-0 lg:px-[16px] font-normal h-[20px] lg:h-[54px] w-auto lg:w-[256px] mt-0 lg:mt-[30px] bg-transparent ${buttonClasses}`}
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-full relative">
                        {artwork && (
                            <div
                                className={`artwork absolute top-[-270px] lg:top-0 right-[-50px] lg:right-[60px] rotate-[-40deg] lg:rotate-0 ${artworkClasses}`}
                            >
                                {artwork}
                            </div>
                        )}
                        {img && (
                            <div
                                className={`img-box absolute top-[-270px] lg:top-0 right-[-130px] lg:right-[60px] ${imgBoxClasses}`}
                            >
                                <Image
                                    src={img}
                                    alt=""
                                    width="360"
                                    height="340"
                                    className={`w-[290px] lg:w-[468px] h-auto ${imgClasses}`}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
