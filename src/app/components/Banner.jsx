import Link from "next/link";
import Heading from "./Heading";

export default function Banner({
  heading = null,
  subHeading = null,
  content = null,
  image = null,
  mobileImage = null,
  icon = null,
  link = null,
  linkIcon = null,
  linkIconClasses = "",
  className = "",
  id = "",
  gradient = ""
}) {
  return (
    <div
      id={id}
      className={`relative lg:fixed min-h-[750px] lg:min-h-[600px] lg:h-[calc(100vh-30px)] w-full lg:w-[600px] rounded-bl-[214px] rounded-br-[214px] lg:rounded-bl-[317px] lg:rounded-br-[317px] overflow-hidden ${className}`}
    >
      <div className="w-full h-full relative">
        {/* Show mobile image on small screens and normal image on larger screens */}
        <img
          src={mobileImage || image || "https://via.placeholder.com/400x300"}
          alt="Banner Image"
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 hover:rotate-3 block lg:hidden`} // Show mobile image only on mobile screens
        />
        <img
          src={image || "https://via.placeholder.com/400x300"}
          alt="Banner Image"
          className={`w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 hover:rotate-3 hidden lg:block`} // Show normal image on large screens
        />
      </div>

      <div
        className="banner-content flex flex-col justify-end items-center absolute bottom-0 w-full h-[100%] px-[45px] lg:px-[80px] pb-[150px] lg:pb-[100px] text-center"
        style={{
          background: gradient || "linear-gradient(8.46deg, rgba(0, 150, 119, 0.93) 17.02%, rgba(80, 184, 72, 0.93) 44.72%, rgba(80, 184, 72, 0) 78.61%)",
        }}
      >
        {icon && (
          <div className="icon-holder flex justify-center mb-[36px]">{icon}</div>
        )}

        {heading && (
          <Heading
            content={heading}
            className="text-[40px] leading-[40px] lg:text-[48px] lg:leading-[48px] font-semibold mb-[10px] lg:mb-[20px] text-white relative z-10"
            tag="h3"
          />
        )}
        {subHeading && (
          <Heading
            content={subHeading}
            className="text-[37px] lg:text-[45px] leading-[25px] font-light text-white relative z-10"
            tag="h3"
          />
        )}
        {content && (
          <p className="text-[20px] leading-[25px] font-light mt-[13px] text-white relative z-10 block md:hidden">
            {content}
          </p>
        )}
        {link && (
          <div className="flex justify-center mt-[36px] relative z-10">
            <Link
              href={link}
              className={`link transition-transform duration-200 ease-in-out ${linkIconClasses}`}
            >
              {linkIcon || (
                <svg
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="43"
                    cy="43"
                    r="43"
                    fill="white"
                    fill-opacity="0.15"
                  />
                  <circle cx="43" cy="43" r="26" fill="white" />
                  <path
                    d="M49.2695 36.0217C49.0833 36.2091 48.9787 36.4625 48.9787 36.7267C48.9787 36.9909 49.0833 37.2443 49.2695 37.4317L53.8295 42.0717L30.2695 42.0717C30.0043 42.0717 29.75 42.1771 29.5624 42.3646C29.3749 42.5521 29.2695 42.8065 29.2695 43.0717C29.2695 43.3369 29.3749 43.5913 29.5624 43.7788C29.75 43.9664 30.0043 44.0717 30.2695 44.0717L53.7995 44.0717L49.2695 48.6017C49.1758 48.6947 49.1014 48.8053 49.0506 48.9271C48.9999 49.049 48.9737 49.1797 48.9737 49.3117C48.9737 49.4437 48.9999 49.5744 49.0506 49.6963C49.1014 49.8181 49.1758 49.9287 49.2695 50.0217C49.4569 50.208 49.7103 50.3125 49.9745 50.3125C50.2387 50.3125 50.4922 50.208 50.6795 50.0217L57.0495 43.6517C57.2175 43.483 57.3117 43.2547 57.3117 43.0167C57.3117 42.7787 57.2175 42.5504 57.0495 42.3817L50.6795 36.0217C50.4922 35.8355 50.2387 35.7309 49.9745 35.7309C49.7103 35.7309 49.4569 35.8355 49.2695 36.0217Z"
                    fill="#009677"
                  />
                </svg>
              )}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}