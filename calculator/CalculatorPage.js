import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

import CalculatorOutput from './CalculatorOutput';
import CalculatorButtons from './CalculatorButtons';

const Container = styled.View`
  display: flex;
  background-color: red;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  background-color: #212326;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const App = () => {
  const [formula, setFormula] = useState('');

  return (
    <Container>
      <Content>
        <CalculatorOutput formula={formula} />
        <CalculatorButtons formula={formula} setFormula={setFormula} />
      </Content>
      <StatusBar style='auto' />
    </Container>
  );
};

export default App;
