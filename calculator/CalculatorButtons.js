import React from 'react';

import { Pressable } from 'react-native';

import styled from 'styled-components/native';
import * as Haptics from 'expo-haptics';

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
  color: #fff;
`;

const CalcButton = ({ onPress, onPressIn, onLongPress, children }) => {
  return (
    <Pressable
      style={{ flexGrow: 1, flex: 1 }}
      onPress={onPress}
      onPressIn={onPressIn}
      onLongPress={onLongPress}
    >
      {({ pressed }) => (
        <Button pressed={pressed}>
          <ButtonText>{children}</ButtonText>
        </Button>
      )}
    </Pressable>
  );
};

const CalculatorButtons = ({ push, pop, roll, clear }) => {
  return (
    <Container>
      <Row>
        {[7, 8, 9].map((n) => (
          <CalcButton key={n} onPressIn={() => push(n)}>
            {n}
          </CalcButton>
        ))}
      </Row>
      <Row>
        {[4, 5, 6].map((n) => (
          <CalcButton key={n} onPressIn={() => push(n)}>
            {n}
          </CalcButton>
        ))}
      </Row>
      <Row>
        {[1, 2, 3].map((n) => (
          <CalcButton key={n} onPressIn={() => push(n)}>
            {n}
          </CalcButton>
        ))}
      </Row>
      <Row>
        <CalcButton onPressIn={() => push('-')}> -</CalcButton>
        <CalcButton onPressIn={() => push(0)}>0</CalcButton>
        <CalcButton onPressIn={() => push('+')}>+</CalcButton>
      </Row>
      <Row>
        <CalcButton onPressIn={() => push('D')}>D</CalcButton>
        <CalcButton onPressIn={roll}>Roll</CalcButton>
        <CalcButton
          onPress={pop}
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            clear();
          }}
        >
          Delete
        </CalcButton>
      </Row>
    </Container>
  );
};

export default CalculatorButtons;
