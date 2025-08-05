// src/components/Spinner.jsx
import React from 'react';

function Spinner({ size = 'lg', color = 'primary', message = 'Loading magic...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <span className={`loading loading-spinner loading-${size} text-${color}`}></span>
      <p className="text-sm text-gray-500 animate-pulse">{message}</p>
    </div>
  );
}

export default Spinner;
