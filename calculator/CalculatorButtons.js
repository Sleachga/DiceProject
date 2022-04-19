import React from 'react';

import { Pressable } from 'react-native';

import styled from 'styled-components/native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

const Container = styled.View`
  display: flex;
  padding: 20px;
  background-color: #2a2d35;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
`;

const Button = styled.View`
  margin: 5px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ pressed }) => (pressed ? 'grey' : '#212326')};
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  font-size: 30px;
  font-family: 'Neucha';
  color: #fff;
`;

const CalcButton = ({ onPress, children }) => {
  return (
    <Pressable style={{ flexGrow: 1, flex: 1 }} onPress={onPress}>
      {({ pressed }) => (
        <Button pressed={pressed}>
          <ButtonText>{children}</ButtonText>
        </Button>
      )}
    </Pressable>
  );
};

const Calculator = ({ formula, setFormula }) => {
  const NumberButton = ({ number }) => {
    return (
      <CalcButton onPress={() => setFormula(formula + number)}>
        {number}
      </CalcButton>
    );
  };

  return (
    <Container>
      <Row>
        <NumberButton number='7' />
        <NumberButton number='8' />
        <NumberButton number='9' />
      </Row>
      <Row>
        <NumberButton number='4' />
        <NumberButton number='5' />
        <NumberButton number='6' />
      </Row>
      <Row>
        <NumberButton number='1' />
        <NumberButton number='2' />
        <NumberButton number='3' />
      </Row>
      <Row>
        <CalcButton onPress={() => setFormula(formula + '-')}> -</CalcButton>
        <NumberButton number='0' />
        <CalcButton onPress={() => setFormula(formula + '+')}>+</CalcButton>
      </Row>
      <Row>
        <CalcButton onPress={() => setFormula(formula + 'D')}>D</CalcButton>
        <CalcButton onPress={async () => handleAnimation()}>
          <FontAwesome5 name='dice-d20' size={24} color='white' />
          {/* Roll */}
        </CalcButton>
        <CalcButton
          onPress={() => setFormula(formula.substring(0, formula.length - 1))}
        >
          <Feather name='delete' size={24} color='white' />
          {/* Delete */}
        </CalcButton>
      </Row>
    </Container>
  );
};

export default Calculator;
