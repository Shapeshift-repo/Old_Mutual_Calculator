import Link from 'next/link';
import Navbar from './Navbar';
import Image from 'next/image';

export default function Header() {
  
  
  return (
    <header className="absolute top-0 left-0 w-full lg:relative z-50">
      <div class="container">

        <div className="flex relative gap-[40px] items-center justify-between">
          <div className="w-full">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={82}
                height={123}
                className="absolute top-[-20px] lg:top-0 left-0 2xl:left-[-92px]"
              />
            </Link>
          </div>
          <div className="w-full">
            <Navbar />
          </div>
        </div>
        
      </div>
    </header>
  )
}