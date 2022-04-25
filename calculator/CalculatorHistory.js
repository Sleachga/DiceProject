import React from 'react';

import { styleFormula } from './CalculatorOutput';

import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const testData = [
  {
    index: 0,
    formula: ['2', 'D', '6', '+', '5'],
    formulaDetails: [
      { addition: true, results: [2, 4] },
      { addition: true, number: 5 },
    ],
    result: '131',
  },
  {
    index: 1,
    formula: ['4', 'D', '8', '+', '3', '+', '2', 'D', '4'],
    formulaDetails: [
      {
        addition: true,
        results: [1, 2, 1, 1], // TODO: Do we even need this other than results?
      },
      {
        addition: true,
        number: 3,
      },
      {
        addition: true,
        results: [2, 4],
      },
      {
        addition: true,
        number: 5,
      },
      {
        addition: true,
        results: [2, 4],
      },
      {
        addition: true,
        number: 5,
      },
      {
        addition: true,
        results: [2, 4],
      },
      {
        addition: true,
        number: 5,
      },
    ],
    result: '19',
  },
  {
    index: 2,
    formula: ['3', 'D', '10', '+', '2'],
    formulaDetails: [
      {
        addition: true,
        results: [6, 4, 8],
      },
      {
        addition: false,
        number: 2,
      },
    ],
    result: '16',
  },
  {
    index: 3,
    formula: ['8', 'D', '10', '-', '2'],
    formulaDetails: [
      {
        addition: true,
        results: [6, 4, 8],
      },
      {
        addition: false,
        number: 2,
      },
    ],
    result: '16',
  },
  {
    index: 4,
    formula: ['3', 'D', '4', '-', '2'],
    formulaDetails: [
      {
        addition: true,
        results: [6, 4, 8],
      },
      {
        addition: false,
        number: 2,
      },
    ],
    result: '16',
  },
  {
    index: 5,
    formula: ['6', 'D', '12'],
    formulaDetails: [
      {
        addition: true,
        results: [6, 4, 8],
      },
      {
        addition: false,
        number: 2,
      },
    ],
    result: '16',
  },
  {
    index: 6,
    formula: ['3', 'D', '4', '+', '8'],
    formulaDetails: [
      {
        addition: true,
        results: [6, 4, 8],
      },
      {
        addition: false,
        number: 2,
      },
    ],
    result: '16',
  },
];

const Container = styled.FlatList`
  width: 100%;
  height: 100%;
`;

const RollContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  background-color: ${({ index }) => (index % 2 === 0 ? '#2a2d35' : '#212326')};
  padding-top: 5px;
  padding-bottom: 5px;
`;

const RollResultContainer = styled.View`
  padding: 10px;
  border-radius: 5px;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid white;
`;

const RollResultText = styled.Text`
  color: white;
  font-family: 'Neucha';
  font-size: 30px;
`;

const Column = styled.View`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const RollText = styled.Text`
  color: white;
  font-family: 'Neucha';
  font-size: 20px;
`;

const GradientView = styled.View`
  z-index: 100;
  width: 100%;
  height: 40%;
  position: absolute;
  top: 0;
`;

const displayFormulaDetails = (formulaDetails) => {
  let string = '';

  formulaDetails.forEach((part, i) => {
    if (i !== 0) {
      string += `${part.addition ? ' + ' : ' - '}`;
    }

    if (part.results) string += `${JSON.stringify(part.results)}`;
    if (part.number) string += `${part.number}`;
  });

  return string;
};

const Roll = ({ formula, formulaDetails, result, index }) => {
  return (
    <RollContainer index={index}>
      <Column>
        <RollText>{styleFormula(formula)}</RollText>
        <RollText>{displayFormulaDetails(formulaDetails)}</RollText>
      </Column>
      <RollResultContainer index={index}>
        <RollResultText adjustsFontSizeToFit>{result}</RollResultText>
      </RollResultContainer>
    </RollContainer>
  );
};

const CalculatorHistory = ({ setFormula }) => {
  return (
    <>
      <Container
        inverted
        data={testData}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <Roll
            formula={item.formula}
            formulaDetails={item.formulaDetails}
            result={item.result}
            index={item.index}
          />
        )}
        keyExtractor={(item) => item.index}
      />
      <GradientView pointerEvents='none'>
        <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={['#212326', 'transparent']}
        />
      </GradientView>
    </>
  );
};

export default CalculatorHistory;
