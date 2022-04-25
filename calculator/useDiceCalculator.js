import { useState } from 'react';
import { last, slice } from 'lodash';

import { styleFormula } from './CalculatorOutput';

import Toast from 'react-native-toast-message';

const useDiceCalculator = () => {
  const [formula, setFormula] = useState([]);

  const push = (item) => setFormula([...formula, item]);
  const pop = () => {
    const lastElement = last(formula);
    setFormula(slice(formula, 0, -1));
    return lastElement;
  };
  const clear = () => setFormula([]);

  const pushIfValid = (data) => {
    if (isValid(formula)) push(data);
  };

  return [
    formula,
    setFormula,
    { push: pushIfValid, pop, clear, roll: () => roll(formula) },
  ];
};

const isValid = (formula) => {
  return true;
};

const roll = (formula) => {
  console.log(styleFormula(formula));

  Toast.show({
    autoHide: true,
    visibilityTime: 3000,
    type: 'rollToast',
    text1: styleFormula(formula),
  });
  console.log('Rolled!');
};

export default useDiceCalculator;
