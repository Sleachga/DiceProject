import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 50%;
  background-color: #212326;
`;

const OutputContainer = styled.View`
  padding: 5px 5px 5px 20px;
`;

const Formula = styled.Text`
  font-size: 50px;
  font-family: 'Neucha';
  color: #fff;
`;

const styleFormula = (formula) => {
  let output = '';
  [...formula].forEach((char) => {
    if (char === '-' || char === '+') output += ` ${char} `;
    else output += char;
  });
  return output;
};

const CalculatorOutput = ({ formula }) => {
  return (
    <Container>
      <OutputContainer>
        <Formula>{styleFormula(formula)}</Formula>
      </OutputContainer>
    </Container>
  );
};

export default CalculatorOutput;
