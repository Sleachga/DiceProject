import React, { useRef } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  background-color: #212326;
`;

const OutputContainer = styled.View`
  height: 70px;
`;

const ScrollContainer = styled.ScrollView`
  margin: 0px 0px 0px 30px;
`;

const Formula = styled.Text`
  font-size: 50px;
  font-family: 'Neucha';
  color: #fff;
  padding: 5px 30px 0px 0px;
`;

export const styleFormula = (formula) => {
  let output = '';
  formula.forEach((char) => {
    if (char === '-' || char === '+') output += ` ${char} `;
    else output += char;
  });

  return output;
};

const CalculatorOutput = ({ formula }) => {
  const scrollViewRef = useRef();
  return (
    <Container>
      <OutputContainer>
        <ScrollContainer
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: false })
          }
        >
          <Formula>{styleFormula(formula)}</Formula>
        </ScrollContainer>
      </OutputContainer>
    </Container>
  );
};

export default CalculatorOutput;
