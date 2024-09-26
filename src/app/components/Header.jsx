import Navbar from "./Navbar"

export default function Header() {
  
  
  return (
    <header className="absolute top-0 left-0 w-full lg:relative z-50">
      <div class="container">

        <div className="flex gap-[40px] items-center justify-between">
          <div className="w-full">
            {/* place for logo */}
          </div>
          <div className="w-full">
            <Navbar />
          </div>
        </div>
        
      </div>
    </header>
  )
}