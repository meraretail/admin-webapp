import React from 'react';

const MainContainer = ({ className, children }) => {
  return (
    <div className={`px-4 mt-[5.5rem] mb-10 space-y-6 ${className}`}>
      {children}
    </div>
  );
};

export default MainContainer;
