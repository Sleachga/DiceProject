import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';

import useDiceCalculator from './useDiceCalculator';

import CalculatorOutput from './CalculatorOutput';
import CalculatorButtons from './CalculatorButtons';
import CalculatorHistory from './CalculatorHistory';

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

const CalculatorPage = ({ rollHistory, setRollHistory }) => {
  const [formula, setFormula, { push, pop, roll, clear }] = useDiceCalculator(
    rollHistory,
    setRollHistory
  );
  return (
    <Container>
      <Content>
        <CalculatorHistory history={rollHistory} />
        <CalculatorOutput formula={formula} />
        <CalculatorButtons push={push} pop={pop} roll={roll} clear={clear} />
      </Content>
      <StatusBar style='auto' />
    </Container>
  );
};

export default CalculatorPage;
