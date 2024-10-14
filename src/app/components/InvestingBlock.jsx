import Heading from "./Heading"
import Image from "next/image"

export default function InvestingBlock() {
  return (
    <section className="investing-section py-[80px] pb-0 lg:pb-[80px]">
        <div className="container">
            <div className="flex flex-col lg:flex-row gap-[102px] items-center">
                <div className="w-full">
                    <div className="investing-media flex justify-center">
                        
                        <Image
                            src="/images/home-graphics.png"
                            alt=""
                            width={490}
                            height={1610}
                            className="w-[205px] lg:w-[572px] h-auto"
                        />

                    </div>
                </div>
                <div className="w-full">
                    <h5>
                        <Heading 
                            content="Investing in a&nbsp;" 
                            className="text-[24px] leading-[30px] lg:text-[32px] lg:leading-[42px] font-semibold text-[#323232]" 
                            tag="span"
                        />
                        <Heading 
                            content="retirement annuity&nbsp;" 
                            className="text-[24px] leading-[30px] lg:text-[32px] lg:leading-[42px] font-semibold text-transparent" 
                            tag="span"
                        />
                        <Heading 
                            content="is a smart way to secure you,&nbsp;" 
                            className="text-[24px] leading-[30px] lg:text-[32px] lg:leading-[42px] font-semibold text-[#323232] inline lg:block w-full" 
                            tag="span"
                        />
                        <Heading 
                            content="&&nbsp;" 
                            className="text-[24px] leading-[30px] lg:text-[32px] lg:leading-[42px] font-semibold text-primary" 
                            tag="span"
                        />
                        <Heading 
                            content="your family’s financial future." 
                            className="text-[24px] leading-[30px] lg:text-[32px] lg:leading-[42px] font-semibold text-[#323232]" 
                            tag="span"
                        />
                    </h5>
                    <div className="investing-content mt-[30px] text-[16px] leading-[24px] lg:text-[20px] lg:leading-[35px] font-light [&>ul]:py-[20px] [&>ul>li]:text-[18px] lg:[&>ul>li]:text-[20px] [&>ul>li>strong]:text-[26px] lg:[&>ul>li>strong]:text-[24px] [&>ul>li>strong]:font-semibold">
                        <p>Your future wealth depends on how you manage the money you earn today. Understand the benefits of a retirement annuity…</p>
                        <ul>
                            <li><strong>&</strong> get tax back</li>
                            <li><strong>&</strong> the power of compound growth</li>
                            <li><strong>&</strong> secure your future income</li>
                        </ul>
                        <p>Start saving early, stay consistent and secure you, and your family’s financial future.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}