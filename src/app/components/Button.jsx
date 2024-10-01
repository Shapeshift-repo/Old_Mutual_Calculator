import Link from 'next/link';

export default function Button({ label, onClick, Icon = null, disabled = false, className = '', href = null, target = '' }) {
    const buttonContent = (
        <>
            {Icon && <span>{<Icon />}</span>}
            {label}
        </>
    );

    if (href) {
      return (
        <Link href={href} target={target} className={`relative site-btn flex items-center justify-center w-[238px] h-[49px] lg:h-[52px] rounded-[30px] text-[16px] lg:text-[18px] leading-[18px] transition-transform duration-200 ease-in-out from-[#009677] to-[#50B848] ${className}
          ${disabled ? 'cursor-not-allowed bg-[#DCDCDC]' : 'hover:scale-105 active:scale-100 bg-gradient-to-r'}
        `}>
              {buttonContent}
          </Link>
      );
    }

    // If no `href`, render as a button
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative site-btn flex items-center justify-center w-[238px] h-[49px] lg:h-[52px] rounded-[30px] text-[16px] lg:text-[18px] leading-[18px] transition-transform duration-200 ease-in-out from-[#009677] to-[#50B848] ${className}
              ${disabled ? 'cursor-not-allowed bg-[#DCDCDC]' : 'hover:scale-105 active:scale-100 bg-gradient-to-r'}
            `}
        >
            {buttonContent}
        </button>
    );
}