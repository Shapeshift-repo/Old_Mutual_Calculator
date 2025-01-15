'use client';

import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import Link from 'next/link';

export default function TalkForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    phone: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

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

  // UseEffect to check form validity whenever formData changes
  useEffect(() => {
    const { name, surname, phone } = formData;
    const valid = name && surname && phone;
    setIsFormValid(valid);
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    // Simple validation logic
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.surname) newErrors.surname = 'Surname is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log('Errors:', newErrors);
    } else {
      const requestBody = {
        pageURL: "https://www.oldmutual.co.za",
        source: "USSD: ",
        googleAnalyticsId: "USSDLeads",
        formData: {
          firstName: formData.name,
          surname: formData.surname,
          phoneNumber: formData.phone,
          comment: "Let's talk",
          sourceProduct: "USSD-FuneralEasiPlus",
        },
        // Additional fields
        postalCode: formData.postalCode,
      };
  
      try {
        const response = await fetch('https://leadscapture.qa.digital.omapps.net/v1/chatbot/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.status === 201) {
          console.log('Form submitted successfully:', await response.json());
        } else {
          console.error('Failed to submit form. Status code:', response.status);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Your Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <TextInput
        label="Your Surname"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        error={errors.surname}
        required
      />
      <TextInput
        label="Cellphone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
      />
      <TextInput
        label="Postal Code (optional)"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
      />

      <div className="mb-[25px]">
        <Link className="link text-primary text-[18px] leading-[25px] font-light underline" href="https://www.oldmutual.co.za/privacy-notice/">
          View our Privacy Policy
        </Link>
      </div>

      <Button
        label="CALL ME BACK"
        onClick={handleSubmit}
        disabled={!isFormValid}
        className="down-bounce text-white disabled:text-black"
      />
    </form>
  );
}