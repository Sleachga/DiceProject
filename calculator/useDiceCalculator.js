import { useState } from 'react';
import { last, slice, findIndex, flatten } from 'lodash';

import { styleFormula } from './CalculatorOutput';

import Toast from 'react-native-toast-message';

const useDiceCalculator = (setRollHistory) => {
  const [formula, setFormula] = useState([]);

  const push = (item) => setFormula([...formula, item]);
  const pop = () => {
    const lastElement = last(formula);
    setFormula(slice(formula, 0, -1));
    return lastElement;
  };
  const clear = () => setFormula([]);

  const pushIfValid = (button) => {
    if (isValid(button, formula)) push(button);
  };

  return [
    formula,
    setFormula,
    { push: pushIfValid, pop, clear, roll: () => roll(formula) },
  ];
};

const isValid = (button, formula) => {
  if (formula.length === 0) return Number.isInteger(button);
  if (['+', '-', 'D'].includes(last(formula))) return Number.isInteger(button);
  return true;
};

const calculateSingleRoll = (arr) => {
  const dIndex = findIndex(arr, (button) => button === 'D');
  const numDice = parseInt(slice(arr, 0, dIndex).join(''));
  const diceType = parseInt(slice(arr, dIndex + 1).join(''));

  let resultsArr = [];
  for (let i = 0; i < numDice; i++) {
    resultsArr.push(Math.ceil(Math.random() * diceType));
  }

  return resultsArr;
};

const rollDice = (formula) => {
  // group by between each operator (+/-)
  const groupedArray = [];
  let currentArr = [];
  formula.forEach((button) => {
    if (['+', '-'].includes(button)) {
      groupedArray.push(currentArr);
      groupedArray.push([button]);
      currentArr = [];
    } else {
      currentArr.push(button);
    }
  });
  if (currentArr.length > 0) groupedArray.push(currentArr);

  // Add rolls and get individual rolls arr
  let result = 0;
  let add = true;
  let resultsArr = [];

  groupedArray.forEach((arr) => {
    if (arr.length === 1 && arr[0] === '+') add = true;
    else if (arr.length === 1 && arr[0] === '-') add = false;
    else if (add && arr.length === 1) {
      result += arr[0];
      resultsArr.push(arr[0]);
    } else if (arr.length === 1) {
      result -= arr[0];
      resultsArr.push(arr[0]);
    } else if (add) {
      const rollArr = calculateSingleRoll(arr);
      result += rollArr.reduce((sum, roll) => roll + sum, 0);
      resultsArr.push(rollArr);
    } else {
      const rollArr = calculateSingleRoll(arr);
      result -= rollArr.reduce((sum, roll) => roll + sum, 0);
      resultsArr.push(rollArr);
    }
  });

  resultsArr = flatten(resultsArr);

  return { result, resultsArr };
};

const roll = (formula) => {
  if (formula.length < 3) {
    Toast.show({
      autoHide: true,
      visibilityTime: 500,
      type: 'rollToast',
      text1: 'Not valid...',
    });
    return;
  }
  if (['+', '-'].includes(last(formula))) {
    Toast.show({
      autoHide: true,
      visibilityTime: 500,
      type: 'rollToast',
      text1: 'Not valid...',
    });
    return;
  }

  const { result, resultsArr } = rollDice(formula);
  if (!result) return;

  Toast.show({
    autoHide: true,
    visibilityTime: 3000,
    type: 'rollToast',
    text1: styleFormula(formula),
    text2: JSON.stringify({ result, resultsArr }),
  });
  console.log('Rolled!');
};

export default useDiceCalculator;
