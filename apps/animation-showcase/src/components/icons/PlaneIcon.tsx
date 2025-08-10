import React from 'react';

const PlaneIcon: React.FC = () => {
  return (
    <img 
      src='/plane.png' 
      alt='plane' 
      width='24' 
      height='24'
      style={{ 
        objectFit: 'contain'
      }}
    />
  );
};

export default PlaneIcon; 