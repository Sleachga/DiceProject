import { useState } from 'react';
import { last, slice, findIndex } from 'lodash';

import Toast from 'react-native-toast-message';

const useDiceCalculator = (rollHistory, setRollHistory) => {
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
    {
      push: pushIfValid,
      pop,
      clear,
      roll: () => roll(formula, rollHistory, setRollHistory),
    },
  ];
};

const isValid = (button, formula) => {
  if (formula.length === 0) return Number.isInteger(button);

  // Makes sure you can't do 1d6d etc...
  if (formula.includes('D') && button === 'D') {
    let operatorCount = 0;
    let dCount = 0;
    formula.forEach((item) => {
      if (['+', '-'].includes(item)) operatorCount++;
      if (item === 'D') dCount++;
    });
    if (operatorCount < dCount) return false;
  }

  if (['+', '-', 'D'].includes(last(formula))) return Number.isInteger(button);

  return true;
};

const calculateSingleRoll = (arr) => {
  const dIndex = findIndex(arr, (button) => button === 'D');
  const numDice = parseInt(slice(arr, 0, dIndex).join(''));
  const diceType = parseInt(slice(arr, dIndex + 1).join(''));

  if (numDice > 100) throw Error("Can't roll more than 100 dice at a time...");
  if (diceType > 100) throw Error('Maximum dice type is a D100');

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
  let error = false;

  groupedArray.forEach((arr) => {
    if (arr.length === 1 && arr[0] === '+') add = true;
    else if (arr.length === 1 && arr[0] === '-') add = false;
    else if (!arr.includes('D')) {
      const number = parseInt(arr.join(''));
      if (add) result += number;
      else result -= number;
      resultsArr.push(number);
    } else {
      try {
        const rollArr = calculateSingleRoll(arr);
        if (add) result += rollArr.reduce((sum, roll) => roll + sum, 0);
        else result -= rollArr.reduce((sum, roll) => roll + sum, 0);
        resultsArr.push(rollArr);
      } catch (e) {
        error = e;
      }
    }
  });

  let operators = [];
  formula.forEach((item) => {
    if (['+', '-'].includes(item)) operators.push(item);
  });

  const formulaDetails = resultsArr.map((roll, index) => {
    let addition;
    if (index === 0) addition = true;
    else addition = operators.shift() === '+';

    if (typeof roll === 'number') return { addition, number: roll };
    else return { addition, results: roll };
  });

  return { result, formulaDetails, error };
};

const roll = (formula, rollHistory, setRollHistory) => {
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

  const { result, formulaDetails, error } = rollDice(formula);

  if (error) {
    Toast.show({
      autoHide: true,
      visibilityTime: 3000,
      type: 'rollToast',
      text1: error.toString(),
    });
    return;
  }

  setRollHistory([
    {
      formula,
      result,
      formulaDetails,
      index: rollHistory.length,
    },
    ...rollHistory,
  ]);
};

export default useDiceCalculator;
