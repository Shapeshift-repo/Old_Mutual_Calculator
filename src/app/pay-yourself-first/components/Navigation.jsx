import { NavLink, useLocation } from "react-router-dom";
import Logo from "/public/header-logo-tag.svg";
const Navigation = () => {
  const location = useLocation();
  return (
    <>
      <section className="max-w-[1920px] mx-auto flex justify-between items-center px-14 relative z-10 font-montserrat">
        <img
          className="-mt-[7px]"
          src={Logo}
          alt="Old Mutual Logo"
          width="79px"
        />
        <nav>
          <ul className="flex justify-between items-center space-x-7">
            <li>
              <NavLink
                to="/"
                className={
                  location.pathname === "/" ? "text-white" : "text-grey"
                }
              >
                Home
                <span className="active-border block bg-gradient-to-r from-[#009677] to-[#60B849] w-full h-1 -mb-1"></span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calculator"
                className={
                  location.pathname === "/" ? "text-white" : "text-grey"
                }
              >
                Calculator
                <span className="active-border block bg-gradient-to-r from-[#009677] to-[#60B849] w-full h-1 -mb-1"></span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Navigation;
