import React from 'react';
import { Pressable } from 'react-native';

import { styleFormula } from './CalculatorOutput';

import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

// import AsyncStorage from '@react-native-async-storage/async-storage';

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
  background-color: ${({ index, pressed }) => {
    if (pressed) return 'grey';
    else return index % 2 === 0 ? '#2a2d35' : '#212326';
  }};
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
  font-size: 30px;
`;

const Column = styled.View`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const RollText = styled.Text`
  color: white;
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
    if (i !== 0) string += `${part.addition ? ' + ' : ' - '}`;

    if (part.number) string += `${part.number}`;
    else if (
      part.results &&
      typeof part.results === 'object' &&
      part.results.length > 15
    ) {
      string += `[${part.results.slice(0, 5).join()}, ... ]`;
    } else if (part.results) string += `${JSON.stringify(part.results)}`;
  });

  return string;
};

const Roll = ({ formula, formulaDetails, result, index }) => {
  const onLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Toast.show({
      autoHide: true,
      visibilityTime: 3000,
      type: 'rollToast',
      text1: 'Pressed!',
      text2: 'Test',
    });
  };

  const styledFormula = styleFormula(formula);
  const styledFormulaDetails = displayFormulaDetails(formulaDetails);

  return (
    <Pressable onPress={() => {}} onLongPress={onLongPress}>
      {({ pressed }) => (
        <RollContainer pressed={pressed} index={index}>
          <Column>
            <RollText>{styledFormula}</RollText>
            {styledFormula !== styledFormulaDetails && (
              <RollText>{styledFormulaDetails}</RollText>
            )}
          </Column>
          <RollResultContainer index={index}>
            <RollResultText adjustsFontSizeToFit>{result}</RollResultText>
          </RollResultContainer>
        </RollContainer>
      )}
    </Pressable>
  );
};

const CalculatorHistory = ({ history }) => {
  return (
    <>
      {/* TODO: Need to add scroll to bottom on size change */}
      <Container
        inverted
        data={history}
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
