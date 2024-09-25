import Link from 'next/link'
import Button from './Button'

export default function Footer() {
  return (
    <footer className="bg-[#252525] pt-[55px] pb-[40px]">
        <div className="container">
            <div className="flex gap-[40px] items-center justify-center lg:justify-between">
                <div className="copy-right-section w-[280px] lg:w-full text-[12px] leading-[18px] lg:text-[14px] lg:leading-[23px] text-white font-light [&>p]:mb-[10px]">
                    <p>Copyright Old Mutual Limited 2024</p>
                    <p>Old Mutual Life Assurance Company (SA) Limited is a licensed FSP and Life Insurer.</p>
                    <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-[10px] [&>li>a:hover]:underline">
                        <li>
                            <Link className="link" href="/">
                                Disclaimer
                            </Link>
                        </li>
                        <li className="hidden lg:inline-block">|</li>
                        <li>
                            <Link className="link" href="/">
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="hidden lg:inline-block">|</li>
                        <li>
                            <Link className="link" href="/">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                    <Button label="ASSUMPTIONS" className="h-[35px] w-[184px] text-[13px] leading-[15px] mt-[15px]" />
                </div>
            </div>
        </div>
    </footer>
  )
}