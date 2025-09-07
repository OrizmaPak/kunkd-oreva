import React from 'react';

const MyKids: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-gray-500 text-lg">No kids data available</div>
      <div className="text-gray-400 text-sm">Please add your kids to see them here.</div>
    </div>
  );
};

export default MyKids;
