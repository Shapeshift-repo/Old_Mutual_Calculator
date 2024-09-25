export default function Button({ label, onClick, Icon = null, disabled = false, className = '' }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`relative site-btn flex items-center justify-center w-[238px] h-[49px] lg:h-[52px] rounded-[30px] text-[16px] lg:text-[18px] leading-[18px] transition-transform duration-200 ease-in-out from-[#009677] to-[#50B848] ${className}
          ${disabled ? 'cursor-not-allowed bg-[#DCDCDC]' : `hover:scale-105 active:scale-100 bg-gradient-to-r`}
        `}
      >
        {Icon && <span>{<Icon />}</span>}
        {label}
      </button>
    );
}