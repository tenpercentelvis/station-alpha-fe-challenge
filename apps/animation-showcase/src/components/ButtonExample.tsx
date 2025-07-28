import React from 'react';
import styled from 'styled-components';

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
`;

const ButtonExample: React.FC = () => {

  return (
    <ExampleContainer>
      <img src="./button-animation-challenge.gif" alt="Animation Description" />
    </ExampleContainer>
  );
};

export default ButtonExample; 