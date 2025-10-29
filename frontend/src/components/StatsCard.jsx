import React from 'react';

const StatsCard = ({ title, value, color }) => {
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    red: 'border-red-500 bg-red-50',
    yellow: 'border-yellow-500 bg-yellow-50',
  };

  const textColors = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    red: 'text-red-700',
    yellow: 'text-yellow-700',
  };

  const valueColors = {
    blue: 'text-blue-900',
    green: 'text-green-900',
    red: 'text-red-900',
    yellow: 'text-yellow-900',
  };

  return (
    <div className={`${colorClasses[color]} border-l-4 rounded-lg shadow-md p-6 transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1`}>
      <div className="text-center">
        <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${textColors[color]}`}>
          {title}
        </p>
        <p className={`text-5xl font-bold ${valueColors[color]}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
