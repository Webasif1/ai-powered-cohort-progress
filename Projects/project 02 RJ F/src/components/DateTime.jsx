import React, { useState, useEffect } from 'react';

const DateTime = () => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).replace(/,/g,'');
      setFormattedDate(formatted);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      {formattedDate}
    </div>
  );
};

export default DateTime;
