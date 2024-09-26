'use client';

import { useEffect, useState } from 'react';

const ErrorTooltip = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide the tooltip after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className="absolute bg-red-600 text-white text-sm rounded py-1 px-2"
      style={{ top: '-2.5rem', left: '0', zIndex: 10 }}
    >
      {message}
    </div>
  );
};

export default ErrorTooltip;