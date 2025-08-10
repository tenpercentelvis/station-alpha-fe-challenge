import React from 'react';

const TickIcon: React.FC = () => {
  return (
    <img 
      src='/tick.png' 
      alt='tick' 
      width='20' 
      height='20'
      style={{ 
        objectFit: 'contain'
      }}
    />
  );
};

export default TickIcon;
