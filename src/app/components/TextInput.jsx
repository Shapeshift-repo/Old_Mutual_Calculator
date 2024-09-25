'use client';

import Tooltip from './Tooltip';

const TextInput = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  tooltipText,
  className = "",
  onlyNumber = false,
  currencySign = "",
  maxValue = Infinity,
  maxValueError = ""
}) => {

  // Function to format number with spaces (e.g., 40000 => 40 000)
  const formatNumber = (number) => {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Add space every 3 digits
  };

  // Handle input change to allow only numbers if onlyNumber is true
  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    if (onlyNumber) {
      // Remove all non-numeric characters except for the currency sign if present
      inputValue = inputValue.replace(/[^\d]/g, '');

      // Format the number with spaces
      inputValue = formatNumber(inputValue);
    }

    // Prepend the currency sign if provided and inputValue contains numbers
    if (currencySign && inputValue) {
      inputValue = currencySign + inputValue;
    }

    // If the inputValue only contains the currency sign (no numbers), clear it
    if (currencySign && inputValue === currencySign) {
      inputValue = "";
    }

    // Check if the cleaned value exceeds maxValue
    const cleanedValue = inputValue.replace(/[^\d]/g, ''); // Remove currency sign and spaces
    const numericValue = parseFloat(cleanedValue);

    // Ensure onChange is a valid function before calling it
    if (typeof onChange === 'function') {
      onChange({ 
        target: { 
          name, 
          value: inputValue, 
          error: numericValue > maxValue ? maxValueError : ""  // Pass error message if value exceeds maxValue
        }
      });
    }
  };

  return (
    <div className={`field-holder ${className}`}>
      <label
        htmlFor={name}
        className="flex items-center justify-between text-[20px] leading-[25px] font-light mb-[10px]"
      >
        <span>{label}{required && ''}</span>
        {tooltipText && <Tooltip text={tooltipText} />}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        className="border border-[#C9C9C9] rounded-[2px] w-full h-[45px] mb-[15px] text-[20px] leading-[25px] font-normal px-[10px] outline-0 focus:border-[#50B848]"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TextInput;