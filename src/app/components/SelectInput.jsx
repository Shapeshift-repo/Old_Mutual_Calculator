'use client'

import React from 'react';
import Tooltip from './Tooltip';

export default function SelectInput({ label, name, value, onChange, options, error, required, tooltipText }){
  return (  // Missing return
    <div className="form-group">
      <label 
        htmlFor={name} 
        className="flex items-center justify-between text-[20px] leading-[25px] font-light mb-[10px]"
      >
        <span>{label}{required && ''}</span>
        {tooltipText && <Tooltip text={tooltipText} />}
      </label>
      <select 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange}
        className="border border-[#C9C9C9] rounded-[2px] w-full h-[45px] mb-[15px] text-[20px] leading-[25px] font-normal px-[10px] outline-0 focus:border-[#50B848]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}