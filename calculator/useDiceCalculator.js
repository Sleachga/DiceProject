import { useState } from 'react';
import { last, slice } from 'lodash';

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

  return [formula, setFormula, { push: pushIfValid, pop, clear, roll }];
};

const isValid = (formula) => {
  return true;
};

const roll = (formula) => {
  Toast.show({
    autoHide: true,
    visibilityTime: 3000,
    type: 'info',
    text2: 'This is some something',
  });
  console.log('Rolled!');
};

export default useDiceCalculator;
