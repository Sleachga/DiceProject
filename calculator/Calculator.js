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

const CalcButton = ({ children }) => {
  return (
    <Pressable style={{ flexGrow: 1, flex: 1 }} onPress={() => null}>
      {({ pressed }) => (
        <Button pressed={pressed}>
          <ButtonText>{children}</ButtonText>
        </Button>
      )}
    </Pressable>
  );
};

const Calculator = () => {
  return (
    <Container>
      <Row>
        <CalcButton>7</CalcButton>
        <CalcButton>8</CalcButton>
        <CalcButton>9</CalcButton>
      </Row>
      <Row>
        <CalcButton>4</CalcButton>
        <CalcButton>5</CalcButton>
        <CalcButton>6</CalcButton>
      </Row>
      <Row>
        <CalcButton>1</CalcButton>
        <CalcButton>2</CalcButton>
        <CalcButton>3</CalcButton>
      </Row>
      <Row>
        <CalcButton> -</CalcButton>
        <CalcButton>0</CalcButton>
        <CalcButton>+</CalcButton>
      </Row>
      <Row>
        <CalcButton>D</CalcButton>
        <CalcButton onPress={async () => handleAnimation()}>
          <FontAwesome5 name='dice-d20' size={24} color='white' />
          {/* Roll */}
        </CalcButton>
        <CalcButton>
          <Feather name='delete' size={24} color='white' />
          {/* Delete */}
        </CalcButton>
      </Row>
    </Container>
  );
};

export default Calculator;
