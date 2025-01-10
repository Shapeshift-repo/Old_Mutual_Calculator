'use client';

import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Link from 'next/link'

export default function TalkForm(){
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    userType: '',
    sliderValue: 50,
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    userType: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when the user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Check if form is valid (i.e., no required field is empty)
  const isFormValid = () => {
    const { name, surname, userType } = formData;
    return name && surname && userType;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Simple validation logic
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.surname) newErrors.surname = 'Surname is required';
    if (!formData.userType) newErrors.userType = 'User type is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Add your form submission logic here
      console.log('Form submitted: ', formData);
    }
  };

  const userTypeOptions = [
    { value: '', label: 'Select User Type' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Your Name"
        name="your-name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <TextInput
        label="Your Surname"
        name="your-surname"
        value={formData.surname}
        onChange={handleChange}
        error={errors.surname}
        required
      />
      <TextInput
        label="Cellphone Number"
        name="phone"
        value={formData.surname}
        onChange={handleChange}
        error={errors.surname}
        required
      />
      <TextInput
        label="Postal Code (optional)"
        name="postal-code"
        value={formData.surname}
        onChange={handleChange}
      />

      <div class="mb-[25px]">
        <Link className="link text-primary text-[18px] leading-[25px] font-light underline" href="https://www.oldmutual.co.za/privacy-notice/">
            View our Privacy Policy
        </Link>
      </div>

      <Button
        label="CALL ME BACK"
        onClick={handleSubmit}
        disabled={!isFormValid()}
      />
    </form>
  );
}